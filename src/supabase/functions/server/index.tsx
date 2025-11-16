import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.use('*', logger(console.log));

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Submit a new project inquiry
app.post('/make-server-7b4ef39e/projects', async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, company, serviceType, budget, description } = body;

    if (!name || !email || !serviceType || !budget || !description) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const projectId = crypto.randomUUID();
    const timestamp = new Date().toISOString();

    const project = {
      id: projectId,
      name,
      email,
      company: company || '',
      serviceType,
      budget,
      description,
      status: 'pending', // pending, quoted, accepted, rejected
      quote: null,
      submittedAt: timestamp,
    };

    await kv.set(`project:${projectId}`, project);
    
    // Also store in an index for easy retrieval
    const existingProjects = await kv.get('project:index') || [];
    existingProjects.unshift(projectId);
    await kv.set('project:index', existingProjects);

    console.log(`New project submitted: ${projectId} from ${email}`);

    return c.json({ 
      success: true, 
      projectId,
      message: 'Project submitted successfully. We will review and send you a quote within 24 hours.' 
    }, 201);
  } catch (error) {
    console.error('Error submitting project:', error);
    return c.json({ error: 'Failed to submit project', details: String(error) }, 500);
  }
});

// Get all projects (admin view)
app.get('/make-server-7b4ef39e/projects', async (c) => {
  try {
    const projectIndex = await kv.get('project:index') || [];
    
    if (projectIndex.length === 0) {
      return c.json({ projects: [] });
    }

    const projectKeys = projectIndex.map((id: string) => `project:${id}`);
    const projects = await kv.mget(projectKeys);

    return c.json({ projects: projects.filter(Boolean) });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return c.json({ error: 'Failed to fetch projects', details: String(error) }, 500);
  }
});

// Get a single project by ID
app.get('/make-server-7b4ef39e/projects/:id', async (c) => {
  try {
    const projectId = c.req.param('id');
    const project = await kv.get(`project:${projectId}`);

    if (!project) {
      return c.json({ error: 'Project not found' }, 404);
    }

    return c.json({ project });
  } catch (error) {
    console.error('Error fetching project:', error);
    return c.json({ error: 'Failed to fetch project', details: String(error) }, 500);
  }
});

// Update project with quote (admin action)
app.put('/make-server-7b4ef39e/projects/:id/quote', async (c) => {
  try {
    const projectId = c.req.param('id');
    const body = await c.req.json();
    const { quote, status } = body;

    if (!quote || !status) {
      return c.json({ error: 'Quote and status are required' }, 400);
    }

    const project = await kv.get(`project:${projectId}`);

    if (!project) {
      return c.json({ error: 'Project not found' }, 404);
    }

    const updatedProject = {
      ...project,
      quote,
      status,
      quotedAt: new Date().toISOString(),
    };

    await kv.set(`project:${projectId}`, updatedProject);

    console.log(`Quote added to project ${projectId}: $${quote}`);

    return c.json({ 
      success: true, 
      project: updatedProject,
      message: 'Quote sent successfully' 
    });
  } catch (error) {
    console.error('Error updating project quote:', error);
    return c.json({ error: 'Failed to update quote', details: String(error) }, 500);
  }
});

// Delete a project
app.delete('/make-server-7b4ef39e/projects/:id', async (c) => {
  try {
    const projectId = c.req.param('id');
    
    await kv.del(`project:${projectId}`);
    
    // Remove from index
    const projectIndex = await kv.get('project:index') || [];
    const updatedIndex = projectIndex.filter((id: string) => id !== projectId);
    await kv.set('project:index', updatedIndex);

    console.log(`Project deleted: ${projectId}`);

    return c.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return c.json({ error: 'Failed to delete project', details: String(error) }, 500);
  }
});

// Health check
app.get('/make-server-7b4ef39e/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

Deno.serve(app.fetch);
