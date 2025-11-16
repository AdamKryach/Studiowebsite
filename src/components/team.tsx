import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Linkedin, Twitter } from "lucide-react";

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    bio: "15+ years shaping brand narratives and leading creative teams.",
    social: { linkedin: "#", twitter: "#" }
  },
  {
    name: "Marcus Johnson",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Full-stack expert specializing in scalable web applications.",
    social: { linkedin: "#", twitter: "#" }
  },
  {
    name: "Emma Rodriguez",
    role: "UX Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    bio: "Passionate about creating seamless user experiences.",
    social: { linkedin: "#", twitter: "#" }
  },
  {
    name: "David Kim",
    role: "Motion Designer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    bio: "Animator bringing static designs to life with dynamic motion.",
    social: { linkedin: "#", twitter: "#" }
  }
];

export function Team() {
  return (
    <section id="team" className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full mb-4">
            <span className="text-sm">Our Team</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4">Meet The Creators</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A diverse team of talented professionals dedicated to bringing your vision to reality.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden bg-slate-100">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl mb-1">{member.name}</h3>
                  <p className="text-blue-600 mb-3">{member.role}</p>
                  <p className="text-sm text-slate-600 mb-4">{member.bio}</p>
                  <div className="flex gap-3">
                    <a href={member.social.linkedin} className="text-slate-400 hover:text-blue-600 transition-colors">
                      <Linkedin className="size-5" />
                    </a>
                    <a href={member.social.twitter} className="text-slate-400 hover:text-blue-400 transition-colors">
                      <Twitter className="size-5" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
