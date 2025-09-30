'use client';

import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageSliderProps {
  images: string[];
}

export function ImageSlider({ images }: ImageSliderProps) {
  const [mainImage, setMainImage] = React.useState(0);

  function handlePrev() {
    setMainImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  function handleNext() {
    setMainImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }

  function handleThumbnailClick(index: number) {
    setMainImage(index);
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-2xl shadow-md h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={mainImage}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={images[mainImage]}
              alt="Product Image"
              fill
              className="object-cover rounded-2xl"
              sizes="(max-width: 768px) 100vw,
                     (max-width: 1200px) 50vw,
                     33vw"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="absolute inset-0 flex items-center justify-between px-3">
          <Button
            onClick={handlePrev}
            size="icon"
            variant="ghost"
            className="rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-sm shadow-md hover:bg-white hover:scale-105 transition"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
          </Button>
          <Button
            onClick={handleNext}
            size="icon"
            variant="ghost"
            className="rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-sm shadow-md hover:bg-white hover:scale-105 transition"
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
          </Button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-3">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`overflow-hidden rounded-lg border-2 transition ${
              index === mainImage
                ? 'border-primary ring-2 ring-primary/30'
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${index + 1}`}
              width={100}
              height={100}
              className="w-full h-20 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
