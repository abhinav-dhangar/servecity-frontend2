"use client";

import React from "react";
// 1. Added X icon import
import { Grid2x2PlusIcon, MenuIcon, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ProfileButton from "@/widgets/ProfileButton";
import { useAuthStore } from "@/store/auth-store";

export function FloatingHeader({
  isAuthenticated,
  profile,
}: {
  isAuthenticated: boolean;
  profile: any;
}) {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const logout = useAuthStore((s) => s.logout);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // 🔥 Hide header on scroll down
  React.useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      setScrolled(currentY > 10);

      if (currentY > lastScrollY.current && currentY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "All Categories", href: "/all-categories" },
    { label: "Your Orders", href: "/orders", isAuth: true },
    { label: "Cart", href: "/cart", isAuth: true },
    { label: "About Us", href: "/about-us" },
  ];

  return (
    <header
      className={cn(
        "mx-auto w-full max-w-3xl rounded-xl border",
        "bg-background/90 backdrop-blur-xl",
        "transition-all duration-300 ease-out",
        scrolled ? "shadow-lg" : "shadow-sm",
        hidden ? "-translate-y-24 opacity-0" : "translate-y-0 opacity-100"
      )}
    >
      <nav className="flex items-center justify-between p-2">
        {/* LOGO */}
        <Link href="/">
          <div className="hover:bg-accent flex items-center gap-2 rounded-md px-3 py-1">
            <Grid2x2PlusIcon className="size-5" />
            <p className="font-mono text-base font-bold">ServeCity</p>
          </div>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) =>
            link.isAuth ? (
              isAuthenticated && (
                <Link href={link.href} key={link.href}>
                  <span
                    className={buttonVariants({ variant: "ghost", size: "sm" })}
                  >
                    {link.label}
                  </span>
                </Link>
              )
            ) : (
              <Link href={link.href} key={link.href}>
                <span
                  className={buttonVariants({ variant: "ghost", size: "sm" })}
                >
                  {link.label}
                </span>
              </Link>
            )
          )}
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-2">
          {!isAuthenticated ? (
            <Link href="/login">
              <Button size="sm">Login</Button>
            </Link>
          ) : (
            <ProfileButton profileImage={profile?.avatar} />
          )}

          {/* MOBILE TRIGGER */}
          <Sheet open={open} onOpenChange={setOpen}>
            <Button
              size="icon"
              variant="outline"
              onClick={() => setOpen(true)}
              className="lg:hidden"
            >
              <MenuIcon className="size-4" />
            </Button>

            {/* 2. Modified SheetContent: removed showClose={false} to show the X */}
            <SheetContent
              side="left"
              className="w-full max-w-full p-0 flex flex-col"
            >
              {/* 3. Added a Header inside the menu for better UX */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <Grid2x2PlusIcon className="size-5" />
                  <span className="font-bold">ServeCity</span>
                </div>
                {/* Custom X button to close */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                >
                 
                </Button>
              </div>

              <div className="grid gap-y-2 px-4 pt-6 flex-1">
                {links.map(
                  (link) =>
                    (!link.isAuth || isAuthenticated) && (
                      <Link
                        href={link.href}
                        key={link.href}
                        onClick={() => setOpen(false)}
                      >
                        <span
                          className={buttonVariants({
                            variant: "ghost",
                            className: "w-full justify-start text-lg",
                          })}
                        >
                          {link.label}
                        </span>
                      </Link>
                    )
                )}

                {isAuthenticated ? (
                  <>
                    <Link href="/profile" onClick={() => setOpen(false)}>
                      <span
                        className={buttonVariants({
                          variant: "ghost",
                          className: "w-full justify-start text-lg",
                        })}
                      >
                        Profile
                      </span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setOpen(false);
                      }}
                      className={buttonVariants({
                        variant: "ghost",
                        className:
                          "w-full justify-start text-lg text-destructive",
                      })}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <span
                      className={buttonVariants({
                        variant: "ghost",
                        className: "w-full justify-start text-lg",
                      })}
                    >
                      Login
                    </span>
                  </Link>
                )}
              </div>

              <SheetFooter className="p-4 text-sm opacity-60 border-t">
                ServeCity © 2024
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
