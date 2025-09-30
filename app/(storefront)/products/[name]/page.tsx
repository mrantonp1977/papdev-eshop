import { ProductCard } from '@/components/ProductCard';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import React from 'react';

async function getData(productCategory: string) {
  switch (productCategory) {
    case 'all': {
      const data = await prisma.product.findMany({
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
        where: {
          status: 'published',
        },
      });

      return {
        title: 'All Products',
        data: data.map((p) => ({
          ...p,
          price: p.price.toNumber(), //
        })),
      };
    }
    case 'men': {
      const data = await prisma.product.findMany({
        where: {
          status: 'published',
          category: 'men',
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });
      return {
        title: 'Products for Men',
        data: data.map((p) => ({
          ...p,
          price: p.price.toNumber(),
        })),
      };
    }
    case 'women': {
      const data = await prisma.product.findMany({
        where: {
          status: 'published',
          category: 'women',
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });
      return {
        title: 'Products for Women',
        data: data.map((p) => ({
          ...p,
          price: p.price.toNumber(),
        })),
      };
    }
    case 'kids': {
      const data = await prisma.product.findMany({
        where: {
          status: 'published',
          category: 'kids',
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });
      return {
        title: 'Products for Kids',
        data: data.map((p) => ({
          ...p,
          price: p.price.toNumber(),
        })),
      };
    }
    default: {
      return {
        title: notFound(),
        
      };
    }
  }
}

export default async function CategoriesPage({ params } : { params: { name: string }}) {
  const {data, title} = await getData(params.name);
  return (
    <section>
      <h1 className='text-3xl font-extrabold tracking-tight my-8'>
        {title}
      </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 ">
          {data?.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      
    </section>
  )
}
