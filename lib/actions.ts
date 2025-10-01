'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { userDbEmail } from './constants';
import { redirect } from 'next/navigation';
import { parseWithZod } from '@conform-to/zod';
import { bannerSchema, productSchema } from './zodSchemas';
import { prisma } from './prisma';
import { redis } from './redis';
import { Cart } from './interfaces';
import { revalidatePath } from 'next/cache';

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
      isFeatured: submission.value.isFeatured === true ? true : false,
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
      isFeatured: submission.value.isFeatured === true ? true : false,
      category: submission.value.category,
      images: submission.value.images,
    },
  });

  return redirect('/dashboard/products');
}

export async function deleteProduct(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || user.email !== userDbEmail) {
    return redirect('/');
  }
  await prisma.product.delete({
    where: {
      id: formData.get('productId') as string,
    },
  });

  redirect('/dashboard/products');
}

export async function createBanner(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || user.email !== userDbEmail) {
    return redirect('/');
  }

  const submission = parseWithZod(formData, {
    schema: bannerSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  await prisma.banner.create({
    data: {
      title: submission.value.title,
      imageString: submission.value.imageString,
    },
  });

  return redirect('/dashboard/banner');
}

export async function deleteBanner(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || user.email !== userDbEmail) {
    return redirect('/');
  }

  await prisma.banner.delete({
    where: {
      id: formData.get('bannerId') as string,
    },
  });

  redirect('/dashboard/banner');
}

export async function addItem(productId: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect('/');
  }

  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  const selctedProduct = await prisma.product.findUnique({
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
    },
    where: {
      id: productId,
    },
  });
  if (!selctedProduct) {
    throw new Error('Product not found');
  }
  let myCart = {} as Cart;

  if (!cart || !cart.items) {
    myCart = {
      userId: user.id,
      items: [
        {
          price: Number(selctedProduct.price),
          id: selctedProduct.id,
          imageString: selctedProduct.images[0],
          name: selctedProduct.name,
          quantity: 1,
        },
      ],
    };
  } else {
    let itemFound = false;
    myCart.items = cart.items.map((item) => {
      if (item.id === productId) {
        itemFound = true;
        item.quantity += 1;
      }
      return item;
    });

    if (!itemFound) {
      myCart.items.push({
        price: Number(selctedProduct.price),
        id: selctedProduct.id,
        imageString: selctedProduct.images[0],
        name: selctedProduct.name,
        quantity: 1,
      });
    }
  }
  await redis.set(`cart-${user.id}`, myCart);

  revalidatePath('/', 'layout');
}

export async function deleteItem(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect('/');
  }

  const productId = formData.get('productId') as string;

  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (cart && cart.items) {
    const updateCart: Cart = {
      userId: user.id,
      items: cart.items.filter((item) => item.id !== productId),
    };

    await redis.set(`cart-${user.id}`, updateCart);

    revalidatePath('/bag');
  }
}
