import { useState } from "react";
import { Button } from "./ui/button";
import { Lock } from "lucide-react";
import { AdminDashboard } from "./admin-dashboard";

export function AdminAccess() {
  const [showAdmin, setShowAdmin] = useState(false);

  if (!showAdmin) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setShowAdmin(true)}
          size="lg"
          className="bg-slate-900 hover:bg-slate-800 shadow-lg"
        >
          <Lock className="size-4 mr-2" />
          Admin Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <div className="sticky top-0 bg-white border-b z-10 px-4 py-3">
        <Button
          onClick={() => setShowAdmin(false)}
          variant="outline"
        >
          ← Back to Website
        </Button>
      </div>
      <AdminDashboard />
    </div>
  );
}
