
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductLoadingPage() {
  return (
    <div className="grid grid-cols-2 gap-5 items-start lg:gap-x-24 py-6">
      <div>
        <Skeleton className="h-[600px] w-[600px] my-5" />
        <div className='grid grid-cols-5 gap-4 mt-6'>
          <Skeleton className="h-[100px] w-[100px]" />
          <Skeleton className="h-[100px] w-[100px]" />
          <Skeleton className="h-[100px] w-[100px]" />
          <Skeleton className="h-[100px] w-[100px]" />
          <Skeleton className="h-[100px] w-[100px]" />
        </div>
      </div>
      <div className="">
        <Skeleton className="h-12 w-56" />
        <Skeleton className="h-12 w-36 mt-4" />
        <Skeleton className="h-60 w-full mt-4" />
        <Skeleton className="h-12 w-full mt-5" />
      </div>
    </div>
  );
}
