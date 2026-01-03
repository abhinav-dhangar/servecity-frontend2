"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { X } from "lucide-react";

export function ServiceDrawer({
  open,
  onOpenChange,
  service,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  service: any;
}) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent
        className="
          right-0 left-auto
          h-full
          w-full
          sm:max-w-[420px]
          rounded-none
        "
      >
        {/* HEADER */}
        <DrawerHeader className="border-b">
          <div className="flex items-start justify-between">
            <div>
              <DrawerTitle className="text-xl">{service.title}</DrawerTitle>
              <p className="text-sm text-muted-foreground">
                {service.totalDuration}
              </p>
            </div>

            <DrawerClose>
              <X className="w-5 h-5" />
            </DrawerClose>
          </div>
        </DrawerHeader>

        {/* SCROLLABLE CONTENT */}
        <div className="overflow-y-auto pb-28">
          {/* Image */}
          <img src={service.image} className="w-full h-56 object-cover" />

          {/* Description */}
          <Section title="About">
            <p className="text-sm text-muted-foreground">
              {service.description}
            </p>
          </Section>

          {/* Process */}
          <Section title="Process">
            <ol className="space-y-4">
              {service.process?.map((step: any, i: number) => (
                <li key={i} className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium">{step.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          {/* What we need */}
          <Section title="What we need from you">
            <ul className="list-disc pl-5 space-y-2 text-sm">
              {service.weNeed?.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Section>

          {/* FAQs */}
          <Section title="FAQs">
            <div className="space-y-4">
              {service.faqs?.map((faq: any, i: number) => (
                <div key={i}>
                  <p className="font-medium">{faq.question}</p>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* STICKY FOOTER */}
        <div className="absolute bottom-0 left-0 right-0 border-t bg-background p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="text-lg font-semibold">₹{service.price}</p>
            </div>
            <button className="px-6 py-3 rounded-lg bg-black text-white">
              Add
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

/* ---------- Helper ---------- */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 py-6 border-b">
      <h3 className="mb-4 font-semibold">{title}</h3>
      {children}
    </div>
  );
}
