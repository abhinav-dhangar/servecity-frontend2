"use client";

import { FloatingHeader } from "@/components/ui/floating-header";
import { useProfile } from "@/hooks/useProfile";
import { useAuthStore } from "@/store/auth-store";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { isAuthenticated } = useAuthStore();
  const { data } = useProfile();
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/signup";
  if (isAuthPage) return null;

  return (
    <div className="sticky top-2 z-30 w-full px-4">
      <FloatingHeader
        isAuthenticated={isAuthenticated}
        profile={data?.profile}
      />
    </div>
  );
}
