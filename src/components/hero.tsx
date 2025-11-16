import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export function Hero() {
  const scrollToForm = () => {
    document.getElementById("project-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920')] opacity-10 bg-cover bg-center" />
      
      <div className="relative max-w-6xl mx-auto text-center z-10">
        <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
          <span className="text-sm">Creative Studio</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl mb-6 tracking-tight">
          We Bring Your
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Ideas to Life
          </span>
        </h1>
        
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          A full-service creative studio delivering exceptional design, development, and digital experiences tailored to your vision.
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <Button 
            size="lg" 
            onClick={scrollToForm}
            className="bg-white text-slate-900 hover:bg-slate-100"
          >
            Start Your Project
            <ArrowRight className="ml-2 size-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            className="border-white text-white hover:bg-white/10"
          >
            View Services
          </Button>
        </div>
      </div>
    </section>
  );
}
