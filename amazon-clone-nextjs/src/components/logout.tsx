"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  // return (
  //   <Button variant="outline" onClick={handleLogout}>
  //     Logout <LogOut className="size-4" />
  //   </Button>
  // );
  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 text-white hover:bg-gray-700 transition-colors font-medium shadow-sm"
    >
      <LogOut className="size-4 text-white" />
      Logout
    </button>
  );
}