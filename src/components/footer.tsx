import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl text-white mb-4">Creative Studio</h3>
            <p className="text-sm">
              Transforming ideas into exceptional digital experiences. Let's create something amazing together.
            </p>
          </div>
          
          <div>
            <h4 className="text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#services" className="hover:text-white transition-colors">Services</a>
              </li>
              <li>
                <a href="#team" className="hover:text-white transition-colors">Team</a>
              </li>
              <li>
                <a href="#project-form" className="hover:text-white transition-colors">Start a Project</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="size-4 mt-0.5 flex-shrink-0" />
                <span>hello@creativestudio.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="size-4 mt-0.5 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="size-4 mt-0.5 flex-shrink-0" />
                <span>123 Creative Ave, Design City, DC 12345</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Creative Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
