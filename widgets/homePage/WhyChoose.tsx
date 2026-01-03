"use client";

import { motion } from "motion/react";
import { ShieldCheck, Truck, IndianRupee } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 16,
    },
  },
};

export default function WhyChooseSection() {
  return (
    <section className="relative py-24 bg-background">
      {/* subtle background glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-transparent" />

      <div className="container relative mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Why Choose <span className="text-primary">Serve City</span>?
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">
            We make buying and selling pre-owned services safe, simple, and truly
            rewarding.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-3"
        >
          <FeatureCard
            icon={ShieldCheck}
            title="Verified Quality"
            description="Every services is carefully inspected and verified by our team before being listed."
          />

          <FeatureCard
            icon={Truck}
            title="Fast & Secure Shipping"
            description="Safe packaging and tracked delivery ensure your items arrive in perfect condition."
          />

          <FeatureCard
            icon={IndianRupee}
            title="Earn Rewards"
            description="Get paid for selling quality items on our trusted and transparent marketplace."
          />
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="group relative h-full border-muted bg-card/80 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        {/* hover glow */}
        <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition group-hover:opacity-100 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />

        <CardContent className="relative flex h-full flex-col items-center gap-4 p-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:scale-110">
            <Icon className="h-7 w-7" strokeWidth={1.6} />
          </div>

          <h3 className="text-lg font-semibold">{title}</h3>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
