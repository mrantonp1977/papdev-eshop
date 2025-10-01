import { ProductCardLoading } from "@/components/ProductCard"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="">
      <Skeleton className="h-10 w-56 my-5" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <ProductCardLoading />
        <ProductCardLoading />
        <ProductCardLoading />
        <ProductCardLoading />
        <ProductCardLoading />
        <ProductCardLoading />
        <ProductCardLoading />
        <ProductCardLoading />
      </div>
    </div>
  )
}

