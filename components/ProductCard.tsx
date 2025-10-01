import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import Image from 'next/image';
import { Button } from './ui/button';
import { formatPrice } from '@/lib/helpers/formatPrice';
import Link from 'next/link';
import { Skeleton } from './ui/skeleton';

interface ProductCardProps {
  item: {
    id: string;
    name: string;
    description: string;
    images: string[];
    price: number;
  };
}

export function ProductCard({ item }: ProductCardProps) {
  return (
    <div className="group rounded-2xl shadow-md bg-white dark:bg-slate-900 overflow-hidden transition hover:shadow-xl hover:-translate-y-1">
      {/* Product Images */}
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {item.images.map((img, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[300px]">
                  <Image
                    src={img}
                    alt={`${item.name} image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 
                           (max-width: 1200px) 50vw, 
                           33vw"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-md p-2 shadow-md hover:bg-white dark:hover:bg-black" />
          <CarouselNext className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-md p-2 shadow-md hover:bg-white dark:hover:bg-black" />
        </Carousel>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-lg transition">
            {item.name}
          </h1>
          <span className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-sm font-medium dark:text-amber-300 text-primary ring-1 ring-inset ring-primary/20">
            {formatPrice(item.price)}
          </span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {item.description}
        </p>

        <Button
          variant="outline"
          className="w-full rounded-lg font-medium group-hover:border-primary hover:text-primary transition"
          asChild
        >
          <Link href={`/product/${item.id}`}>View details</Link>
        </Button>
      </div>
    </div>
  );
}


export function ProductCardLoading() {
  return (
    <div className="flex flex-col">
      <Skeleton className="h-[330px] w-full" />
      <div className="flex flex-col mt-2 gap-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
      <Skeleton className="h-10 w-full mt-5" />
    </div>
  )
};
