import { Hero } from "./components/hero";
import { Services } from "./components/services";
import { Team } from "./components/team";
import { ProjectForm } from "./components/project-form";
import { Footer } from "./components/footer";
import { AdminAccess } from "./components/admin-access";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Services />
      <Team />
      <ProjectForm />
      <Footer />
      <AdminAccess />
      <Toaster />
    </div>
  );
}