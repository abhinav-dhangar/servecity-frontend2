import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BentoGridShowcase } from "@/components/ui/bento-grid";
import { Calendar, HeartPulse, Plus, Slack, Zap } from "lucide-react";

/* ---------------- Integrations Card ---------------- */

const IntegrationsCard = () => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle className="text-lg">Seamless Services</CardTitle>
      <CardDescription>
        Everything you need for quick and reliable home services.
      </CardDescription>
    </CardHeader>
    <CardContent className="flex items-center justify-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Calendar className="h-6 w-6 text-muted-foreground" />
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Slack className="h-6 w-6 text-muted-foreground" />
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Zap className="h-6 w-6 text-muted-foreground" />
      </div>
    </CardContent>
  </Card>
);

/* ---------------- Feature Tags Card ---------------- */

const FeatureTagsCard = () => (
  <Card className="h-full">
    <CardContent className="flex h-full flex-col justify-center gap-3 p-6">
      <Badge
        variant="outline"
        className="w-fit items-center gap-1.5 border-purple-300 py-1.5 px-3 text-purple-700"
      >
        Verified Professionals <Plus className="h-3 w-3" />
      </Badge>
      <Badge
        variant="secondary"
        className="w-fit items-center gap-1.5 bg-purple-100 py-1.5 px-3 text-purple-700"
      >
        Transparent Pricing
      </Badge>
      <Badge
        variant="outline"
        className="w-fit items-center gap-1.5 border-purple-300 py-1.5 px-3 text-purple-700"
      >
        Fast & Reliable <Plus className="h-3 w-3" />
      </Badge>
    </CardContent>
  </Card>
);

/* ---------------- Main Feature Card ---------------- */

const MainFeatureCard = () => (
  <Card className="relative h-full w-full overflow-hidden">
    <div className="absolute top-6 left-6 z-10 rounded-lg bg-background/50 p-2 backdrop-blur-sm">
      <p className="text-xl font-bold tracking-tighter">
        UrbanPro Home Services
      </p>
    </div>
    <img
      src="https://plus.unsplash.com/premium_photo-1705883267055-b4000d390bae?auto=format&fit=crop&q=60&w=900"
      alt="Home service professional"
      className="h-full w-full object-cover"
    />
  </Card>
);

/* ---------------- Statistic Card ---------------- */

const StatCard = () => (
  <Card className="flex h-full flex-col justify-between bg-lime-100/80 p-6">
    <HeartPulse className="h-8 w-8 text-lime-700" />
    <div>
      <p className="text-6xl font-bold text-lime-900">4.8★</p>
      <p className="text-sm text-lime-800">
        Average customer rating across all home services.
      </p>
    </div>
  </Card>
);

/* ---------------- Secondary Feature Card ---------------- */

const SecondaryFeatureCard = () => (
  <Card className="relative h-full w-full overflow-hidden">
    <img
      src="https://images.unsplash.com/photo-1667133295352-ef4c83620e8e?auto=format&fit=crop&q=60&w=900"
      alt="Professional service at home"
      className="h-60 w-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 via-transparent to-transparent" />
    <p className="absolute bottom-6 left-6 z-10 max-w-[80%] text-xl font-bold text-white">
      Trusted professionals for everyday home needs.
    </p>
  </Card>
);

/* ---------------- Journey Card ---------------- */

const JourneyCard = () => (
  <Card className="relative h-full w-full overflow-hidden p-6">
    <CardTitle className="text-lg">Easy Booking Journey</CardTitle>
    <CardDescription>
      Choose a service, book instantly, and get the job done.
    </CardDescription>

    <div className="absolute -right-4 -bottom-4 h-48 w-48">
      <div className="absolute top-8 left-20">
        <Avatar>
          <AvatarImage src="https://api.uifaces.co/our-content/faces/49.jpg" />
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
      </div>
      <div className="absolute top-24 left-8">
        <Avatar>
          <AvatarImage src="https://api.uifaces.co/our-content/faces/14.jpg" />
          <AvatarFallback>S</AvatarFallback>
        </Avatar>
      </div>
    </div>
  </Card>
);

/* ---------------- Page Component ---------------- */

export default function BentoGridShowcaseDemo() {
  return (
    <div className="flex items-center justify-center">

    <div className="w-[90%] p-4 md:p-10">
      <div className="mb-8">
        <h1 className="text-center text-4xl font-bold tracking-tight">
          Home Services, On Demand
        </h1>
        <p className="text-center text-lg text-muted-foreground">
          Book trusted professionals for cleaning, repairs, and more.
        </p>
      </div>

      <BentoGridShowcase
        integrations={<IntegrationsCard />}
        featureTags={<FeatureTagsCard />}
        mainFeature={<MainFeatureCard />}
        secondaryFeature={<SecondaryFeatureCard />}
        statistic={<StatCard />}
        journey={<JourneyCard />}
        />
    </div>
        </div>
  );
}
