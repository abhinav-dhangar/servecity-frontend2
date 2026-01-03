"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Mail,
  Phone,
  Smartphone,
  ShoppingBag,
  MapPin,
  User,
  HelpCircle,
  MessageCircle,
  LogOut,
  ArrowUpRight,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useProfile } from "@/hooks/useProfile";
import Image from "next/image";

import { useAuthStore } from "@/store/auth-store";
import { ArrowButton } from "@/widgets/ArrowButton/Button";

/* -------------------------------------------------------------------------- */
/*                                  PAGE                                      */
/* -------------------------------------------------------------------------- */

export default function ProfilePage() {
  const { data, isLoading, isError } = useProfile();
  const logout = useAuthStore((s) => s.logout);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <p className="text-lg animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <p className="text-lg text-red-500">Failed to load profile.</p>
      </div>
    );
  }

  const { user, profile, deviceId } = data;

  return (
    <AnimatedProfilePage
      name={profile?.fullName || ""}
      email={user.email}
      phone={profile?.phone || "Not added"}
      deviceId={deviceId}
      customerType={profile?.role || "User"}
      avatarUrl={profile?.avatar || ""}
      logout={logout}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                           Animated Profile Page                             */
/* -------------------------------------------------------------------------- */

interface ProfilePageProps {
  name: string;
  email: string;
  phone: string;
  deviceId: string;
  customerType: string;
  avatarUrl: string;
  logout: () => void;
  className?: string;
}

const AnimatedProfilePage: React.FC<ProfilePageProps> = ({
  name,
  email,
  phone,
  deviceId,
  customerType,
  avatarUrl,
  logout,
  className,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = !shouldReduceMotion;

  const isProfileIncomplete = !name || !avatarUrl;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 260, damping: 22 },
    },
  };

  const avatarVariants = {
    hidden: { scale: 0.85, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 18 },
    },
  };

  const menuItems = [
    { icon: ShoppingBag, label: "Your Orders", href: "/orders" },
    { icon: MapPin, label: "Your Addresses", href: "/address" },
    { icon: User, label: "Edit Profile", href: "/profile/edit" },
    { icon: HelpCircle, label: "FAQs", href: "/faqs" },
    { icon: MessageCircle, label: "Chat with Us", href: "/chat" },
    { icon: LogOut, label: "Logout", onClick: logout },
  ];

  const badgeColor =
    {
      vendor: "bg-yellow-100 text-yellow-700",
      admin: "bg-red-100 text-red-700",
      premium: "bg-violet-100 text-violet-700",
      user: "bg-sky-100 text-sky-700",
    }[customerType.toLowerCase()] ?? "bg-sky-100 text-sky-700";

  return (
    <div
      className={cn(
        "min-h-screen bg-gradient-to-b from-background via-background to-muted/30 p-4 md:p-8",
        className
      )}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-2xl"
      >
        {/* 🔔 COMPLETE PROFILE BANNER */}
        {isProfileIncomplete && (
          <motion.div variants={itemVariants} className="mb-6">
            <Card className="border-dashed border-primary/40 bg-primary/5">
              <CardContent className="flex items-center justify-between gap-4 p-5">
                <div className="flex items-center gap-3">
                  <User className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold text-sm">
                      Complete your profile
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Add your name and profile picture
                    </p>
                  </div>
                </div>

                <Button
                  size="sm"
                  className="gap-2"
                  onClick={() => (window.location.href = "/profile/edit")}
                >
                  Complete
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* PROFILE CARD */}
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden shadow-xl bg-card/95 backdrop-blur">
            <div className="relative h-40">
              <Image
                src="/rose.gif"
                alt="Profile cover"
                fill
                className="object-cover"
                unoptimized
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>

            <CardContent className="relative px-6 pb-8">
              <motion.div
                variants={avatarVariants}
                className="flex justify-center -mt-16 mb-4"
              >
                <Avatar className="h-32 w-32 ring-4 ring-background shadow-2xl">
                  <AvatarImage src={avatarUrl} />
                  <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                    {name
                      ? name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      : "U"}
                  </AvatarFallback>
                </Avatar>
              </motion.div>

              <div className="text-center mb-2">
                <h1 className="text-3xl font-bold">{name || "Unnamed User"}</h1>
              </div>

              <div className="flex justify-center mb-6">
                <Badge className={cn("px-4 py-1.5", badgeColor)}>
                  {customerType}
                </Badge>
              </div>

              <div className="space-y-3">
                <InfoItem icon={Mail} text={email} />
                <InfoItem icon={Phone} text={phone} />
                <InfoItem icon={Smartphone} text={deviceId} mono />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ACTION BUTTONS */}
        <motion.div variants={itemVariants} className="mt-6 space-y-3">
          {menuItems.map((item) => (
            <motion.div
              key={item.label}
              whileHover={{
                scale: shouldAnimate ? 1.02 : 1,
                x: shouldAnimate ? 4 : 0,
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className="w-full h-14 justify-start text-base"
                onClick={() => {
                  if (item.onClick) return item.onClick();
                  if (item.href) window.location.href = item.href;
                }}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Button>
            </motion.div>
          ))}

          <ArrowButton href="/vendor/add-vendor" buttonText="Become Vendor" />
        </motion.div>
      </motion.div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                INFO ITEM                                   */
/* -------------------------------------------------------------------------- */

const InfoItem = ({
  icon: Icon,
  text,
  mono = false,
}: {
  icon: any;
  text: string;
  mono?: boolean;
}) => (
  <div className="flex items-center gap-3 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition">
    <Icon className="h-5 w-5 shrink-0" />
    <span className={cn("text-sm", mono && "font-mono")}>{text}</span>
  </div>
);
