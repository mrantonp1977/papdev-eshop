import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export function CategoriesSelection() {
  const categories = [
    { title: 'All Products', image: '/Photo141.jpg', href: '/products/all' },
    { title: 'Men', image: '/Photo97.jpg', href: '/products/men' },
    { title: 'Women', image: '/Photo140.jpg', href: '/products/women' },
    { title: 'Kids', image: '/Photo147.jpg', href: '/products/kids' },
  ]

  return (
    <section className="py-20 sm:py-28">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight">Shop by Category</h2>
        <Link 
          href="/products/all" 
          className="text-md font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          See All Products &rarr;
        </Link> 
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, index) => (
          <Link key={index} href={category.href} className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <Image 
              src={category.image}
              alt={category.title}
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105 h-120 w-full"
              width={500}
              height={500}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 opacity-70 group-hover:opacity-80 transition-opacity" />
            <div className="absolute bottom-4 left-4">
              <h3 className="text-xl font-bold text-white drop-shadow-md">
                {category.title}
              </h3>
              <p className="mt-1 text-sm text-white/90">Shop Now</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
