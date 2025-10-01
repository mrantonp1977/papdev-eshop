import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';

async function getData() {
  const data = await prisma.banner.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return data;
}

export async function Hero() {
  const data = await getData();
  return (
    <section className="mt-12 w-full px-6 md:px-12">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        {/* Left side – Text */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 bg-clip-text text-transparent">
            Welcome to PapDev Eshop
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Discover exclusive products, trending items, and amazing deals every
            day. Shop with confidence and elevate your lifestyle.
          </p>
          <Link href="/products/all">
            <button className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg transition">
              Start Shopping
            </button>
          </Link>
        </div>

        {/* Right side – Carousel */}
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {data.map((item) => (
                <CarouselItem key={item.id}>
                  <div className="relative h-[45vh] md:h-[55vh] w-full overflow-hidden rounded-lg shadow-2xl">
                    <Image
                      src={item.imageString}
                      alt={item.title}
                      fill
                      priority
                      className="object-cover w-full h-full scale-105 hover:scale-110 transition-transform duration-700 ease-in-out"
                    />

                    {/* Overlay title inside image (optional) */}
                    <div className="absolute bottom-6 left-6 max-w-md">
                      <h2 className="text-2xl md:text-4xl font-bold text-white [text-shadow:_1px_1px_6px_rgba(0,0,0,0.7),_-1px_-1px_4px_rgba(255,255,255,0.5)]">
                        {item.title}
                      </h2>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex ml-6" />
            <CarouselNext className="hidden md:flex mr-6" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
