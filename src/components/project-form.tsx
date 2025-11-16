import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner@2.0.3";
import { Send, CheckCircle2 } from "lucide-react";
import { projectId, publicAnonKey } from "../utils/supabase/info";

export function ProjectForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    serviceType: "",
    budget: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-7b4ef39e/projects`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit project');
      }

      toast.success("Project submitted successfully! We'll get back to you with a quote within 24 hours.");
      setFormData({
        name: "",
        email: "",
        company: "",
        serviceType: "",
        budget: "",
        description: ""
      });
    } catch (error) {
      console.error('Error submitting project:', error);
      toast.error('Failed to submit project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="project-form" className="py-24 px-4 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4">
            <span className="text-sm text-white">Get Started</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 text-white">Tell Us About Your Project</h2>
          <p className="text-xl text-slate-300">
            Share your vision with us and we'll provide a custom quote tailored to your needs.
          </p>
        </div>

        <Card className="border-none shadow-2xl">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>
              Fill out the form below and our team will review your project and respond with pricing within 24 hours.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company / Organization</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  placeholder="Your Company Name"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="serviceType">Service Type *</Label>
                  <Select
                    required
                    value={formData.serviceType}
                    onValueChange={(value) => handleChange("serviceType", value)}
                  >
                    <SelectTrigger id="serviceType">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                      <SelectItem value="web-dev">Web Development</SelectItem>
                      <SelectItem value="branding">Branding & Identity</SelectItem>
                      <SelectItem value="motion">Motion Graphics</SelectItem>
                      <SelectItem value="marketing">Digital Marketing</SelectItem>
                      <SelectItem value="consulting">Creative Consulting</SelectItem>
                      <SelectItem value="multiple">Multiple Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Estimated Budget *</Label>
                  <Select
                    required
                    value={formData.budget}
                    onValueChange={(value) => handleChange("budget", value)}
                  >
                    <SelectTrigger id="budget">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                      <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                      <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                      <SelectItem value="100k+">$100,000+</SelectItem>
                      <SelectItem value="not-sure">Not Sure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Description *</Label>
                <Textarea
                  id="description"
                  required
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                  className="min-h-[150px] resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                {isSubmitting ? (
                  <>
                    <CheckCircle2 className="mr-2 size-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 size-5" />
                    Submit Project Request
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}