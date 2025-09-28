'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { userDbEmail } from './constants';
import { redirect } from 'next/navigation';
import { parseWithZod } from '@conform-to/zod';
import { productSchema } from './zodSchemas';
import { prisma } from './prisma';

export async function createProduct(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || user.email !== userDbEmail) {
    return redirect('/');
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  await prisma.product.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      price: submission.value.price,
      status: submission.value.status,
      isFeatured: submission.value.isFeatured ?? false,
      category: submission.value.category,
      images: submission.value.images,
    },
  });

  return redirect('/dashboard/products');
}

export async function editProduct(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || user.email !== userDbEmail) {
    return redirect('/');
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const productId = formData.get('productId') as string;
  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: submission.value.name,
      description: submission.value.description,
      price: submission.value.price,
      status: submission.value.status,
      isFeatured: submission.value.isFeatured ?? false,
      category: submission.value.category,
      images: submission.value.images,
    },
  });

  return redirect('/dashboard/products');
}
