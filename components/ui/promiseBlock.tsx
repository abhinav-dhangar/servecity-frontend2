"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const promises = [
  "Verified Professionals",
  "Hassle-Free Booking",
  "Transparent Pricing",
];

export function PromiseBlock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className="rounded-xl border bg-background shadow-sm">
        <CardContent className="p-4 space-y-3">
          <h3 className="text-sm font-semibold text-neutral-900">ServeCity Promises:</h3>

          <ul className="space-y-2">
            {promises.map((item, idx) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="flex items-center gap-2 text-sm text-neutral-700"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900/90 text-white">
                  <Check className="h-3 w-3" />
                </span>
                {item}
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}
