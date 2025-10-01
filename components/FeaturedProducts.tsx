// components/FeaturedProducts.tsx
import { prisma } from "@/lib/prisma";
import React, { Suspense } from "react";
import { ProductCard, ProductCardLoading } from "./ProductCard";

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

export  function FeaturedProducts() {
  return (
    <>
      <h2 className="text-3xl font-extrabold tracking-tight">
        Featured Products
      </h2>
      <Suspense fallback={<LoadingRows />}>
        <FeaturedProductsLoading />
      </Suspense>
    </>
  );
}

async function FeaturedProductsLoading() {
  const data = await getData();
  return (
    <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {data.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
  )
};

function LoadingRows() {
  return (
    <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <ProductCardLoading />
      <ProductCardLoading />
      <ProductCardLoading />
      <ProductCardLoading />
    </div>
  )
};
