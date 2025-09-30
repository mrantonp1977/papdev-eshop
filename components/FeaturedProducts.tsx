// components/FeaturedProducts.tsx
import { prisma } from "@/lib/prisma";
import React from "react";
import { ProductCard } from "./ProductCard";

async function getData() {
  const products = await prisma.product.findMany({
    where: {
      status: "published",
      isFeatured: true,
    },
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      price: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 4
  });

  // Convert Decimal → number
  return products.map((p) => ({
    ...p,
    price: p.price.toNumber(),
  }));
}

export async function FeaturedProducts() {
  const data = await getData();
  return (
    <>
      <h2 className="text-3xl font-extrabold tracking-tight">
        Featured Products
      </h2>
      <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {data.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
