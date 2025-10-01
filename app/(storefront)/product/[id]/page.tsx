import { FeaturedProducts } from '@/components/FeaturedProducts';
import { ImageSlider } from '@/components/ImageSlider';
import { SubmitButton } from '@/components/SubmitButtons';
import { addItem } from '@/lib/actions';
import { formatPrice } from '@/lib/helpers/formatPrice';
import { prisma } from '@/lib/prisma';
import { ShoppingBag, StarIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import React from 'react';

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      name: true,
      description: true,
      images: true,
      id: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return {
    ...data,
    price: data.price.toNumber(), // convert Decimal → number
  };
}

export default async function ProductIdPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);

  const addProductToCart = addItem.bind(null, data.id);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 items-start lg:max-w-screen-2xl lg:mx-auto mt-16">
        {/* Left: Image Slider */}
        <ImageSlider images={data.images} />

        {/* Right: Product Info */}
        <div className="space-y-6 md:ml-12">
          {/* Title & Price */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              {data.name}
            </h1>
            <p className="mt-3 text-2xl font-semibold text-primary">
              {formatPrice(data.price)}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className="h-5 w-5 text-yellow-400 fill-yellow-400"
              />
            ))}
            <span className="ml-2 text-sm text-gray-500">(120 reviews)</span>
          </div>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {data.description}
          </p>

          {/* Actions */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <form>
              <SubmitButton
                formAction={addProductToCart}
                title="Add to Cart"
                icon={<ShoppingBag className="h-4 w-4" />}
              />
            </form>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <FeaturedProducts />
      </div>
    </>
  );
}
