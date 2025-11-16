import { Palette, Code, Megaphone, Video, Sparkles, Layout } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const services = [
  {
    icon: Layout,
    title: "UI/UX Design",
    description: "Creating intuitive and beautiful user experiences that engage and delight your audience."
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Building responsive, fast, and scalable websites using modern technologies."
  },
  {
    icon: Palette,
    title: "Branding & Identity",
    description: "Crafting unique brand identities that make your business stand out from the crowd."
  },
  {
    icon: Video,
    title: "Motion Graphics",
    description: "Bringing your stories to life through engaging animations and video content."
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Strategic campaigns that drive growth and connect you with your target audience."
  },
  {
    icon: Sparkles,
    title: "Creative Consulting",
    description: "Expert guidance to refine your vision and execute successful creative strategies."
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full mb-4">
            <span className="text-sm">What We Do</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4">Our Services</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Comprehensive creative solutions to elevate your brand and achieve your business goals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="size-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="size-6 text-white" />
                </div>
                <h3 className="text-xl mb-2">{service.title}</h3>
                <p className="text-slate-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
