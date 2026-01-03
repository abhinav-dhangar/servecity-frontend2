"use client";

import * as React from "react";
import { useGetCategories } from "@/hooks/categories/useGetCategories";
import { motion } from "framer-motion";

export default function CategoryGrid() {
  const { data, isLoading } = useGetCategories();

  if (isLoading) {
    return <p className="text-center py-20">Loading categories...</p>;
  }

  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="
            grid gap-8
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {data?.map((cat: any) => (
            <CategoryBlock
              key={cat.id}
              title={cat.categoryName}
              image={cat.image}
              href={`/all-categories/${cat.slug ?? cat.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------
   BIG CATEGORY BLOCK
----------------------------------- */
function CategoryBlock({
  title,
  image,
  href,
}: {
  title: string;
  image: string;
  href: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className="
        group block
        rounded-2xl
        overflow-hidden
        border
        bg-white
        shadow-sm
        hover:shadow-lg
        transition-shadow
      "
    >
      {/* Image Section */}
      <div className="relative h-[240px] sm:h-[260px]">
        <img
          src={image}
          alt={title}
          className="
            absolute inset-0
            w-full h-full
            object-cover
            transition-transform duration-500
            group-hover:scale-105
          "
        />
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          {title}
        </h3>

        {/* <p className="mt-2 text-sm text-gray-500">
          Explore trusted professionals and services
        </p> */}

        <div className="mt-4 inline-flex items-center text-sm font-medium text-primary">
          View services →
        </div>
      </div>
    </motion.a>
  );
}
