import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner@2.0.3";
import { RefreshCw, DollarSign, Mail, Building, Calendar, Trash2 } from "lucide-react";
import { projectId, publicAnonKey } from "../utils/supabase/info";

interface Project {
  id: string;
  name: string;
  email: string;
  company: string;
  serviceType: string;
  budget: string;
  description: string;
  status: string;
  quote: number | null;
  submittedAt: string;
  quotedAt?: string;
}

export function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [quoteAmount, setQuoteAmount] = useState("");
  const [quoteStatus, setQuoteStatus] = useState("quoted");

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-7b4ef39e/projects`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch projects');
      }

      setProjects(data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSendQuote = async () => {
    if (!selectedProject || !quoteAmount) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-7b4ef39e/projects/${selectedProject.id}/quote`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            quote: parseFloat(quoteAmount),
            status: quoteStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send quote');
      }

      toast.success('Quote sent successfully!');
      setSelectedProject(null);
      setQuoteAmount("");
      setQuoteStatus("quoted");
      fetchProjects();
    } catch (error) {
      console.error('Error sending quote:', error);
      toast.error('Failed to send quote');
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-7b4ef39e/projects/${projectId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete project');
      }

      toast.success('Project deleted');
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'quoted': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl mb-2">Admin Dashboard</h1>
            <p className="text-slate-600">Manage client project submissions and send quotes</p>
          </div>
          <Button onClick={fetchProjects} disabled={loading} variant="outline">
            <RefreshCw className={`size-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {loading && projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-block size-8 border-4 border-slate-300 border-t-slate-800 rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-slate-500">No project submissions yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle>{project.name}</CardTitle>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                      <CardDescription className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="size-4" />
                          {project.email}
                        </div>
                        {project.company && (
                          <div className="flex items-center gap-2">
                            <Building className="size-4" />
                            {project.company}
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar className="size-4" />
                          Submitted: {formatDate(project.submittedAt)}
                        </div>
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            onClick={() => {
                              setSelectedProject(project);
                              setQuoteAmount(project.quote?.toString() || "");
                              setQuoteStatus(project.status === 'pending' ? 'quoted' : project.status);
                            }}
                          >
                            <DollarSign className="size-4 mr-2" />
                            {project.quote ? 'Update Quote' : 'Send Quote'}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Send Quote to {project.name}</DialogTitle>
                            <DialogDescription>
                              Provide a price quote for this project
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="quote-amount">Quote Amount ($)</Label>
                              <Input
                                id="quote-amount"
                                type="number"
                                placeholder="10000"
                                value={quoteAmount}
                                onChange={(e) => setQuoteAmount(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="quote-status">Status</Label>
                              <Select value={quoteStatus} onValueChange={setQuoteStatus}>
                                <SelectTrigger id="quote-status">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="quoted">Quoted</SelectItem>
                                  <SelectItem value="accepted">Accepted</SelectItem>
                                  <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={handleSendQuote}>
                              Send Quote
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 className="size-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Service Type</p>
                      <p className="capitalize">{project.serviceType.replace('-', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Budget Range</p>
                      <p>{project.budget}</p>
                    </div>
                    {project.quote && (
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Your Quote</p>
                        <p className="text-green-600">${project.quote.toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-2">Project Description</p>
                    <p className="text-sm bg-slate-50 p-4 rounded-lg">{project.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
