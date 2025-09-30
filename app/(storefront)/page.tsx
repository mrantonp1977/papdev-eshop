
import { CategoriesSelection } from '@/components/CategorySelection'
import { FeaturedProducts } from '@/components/FeaturedProducts'
import { Hero } from '@/components/Hero'
import React from 'react'

export default function IndexPage() {
  return (
    <div>
      <Hero />
      <CategoriesSelection />
      <FeaturedProducts />
    </div>
  )
}
