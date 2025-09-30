import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';

async function getData() {
  const data = await prisma.banner.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return data;
}

export async function Hero() {
  const data = await getData();
  return (
    <Carousel className="mt-12 w-full">
      <CarouselContent>
        {data.map((item) => (
          <CarouselItem key={item.id}>
            <div className="relative h-[60vh] lg:h-[80vh] w-full overflow-hidden rounded-2xl shadow-2xl">
              {/* Background Image */}
              <Image
                src={item.imageString}
                alt={item.title}
                fill
                priority
                className="object-cover w-full h-full scale-105 hover:scale-110 transition-transform duration-700 ease-in-out"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-2xl" />

              {/* Text Content */}
              <div className="absolute bottom-30 left-8 md:left-12 max-w-xl">
                <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">
                  {item.title}
                </h1>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex ml-20" />
      <CarouselNext className="hidden md:flex mr-20" />
    </Carousel>
  );
}
