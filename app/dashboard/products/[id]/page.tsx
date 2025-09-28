import { EditForm } from '@/components/EditForm';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import React from 'react';

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!data) {
    return notFound();
  };
  return {...data, price: Number(data.price), createdAt: data.createdAt.toISOString(),};
}

export default async function EditPage({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  return (
    <EditForm data={data}/>
  )
}
