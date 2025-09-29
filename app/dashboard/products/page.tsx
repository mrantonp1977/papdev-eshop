// app/dashboard/products/page.tsx
import { prisma } from "@/lib/prisma";
import ProductsTable from "../../../components/products-table";

async function getData() {
  const data = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Convert Decimal and Date to string/number
  return data.map((p) => ({
    ...p,
    price: p.price.toNumber(),       // Prisma Decimal → number
    createdAt: p.createdAt.toISOString(), // Date → string
  }));
}

export default async function ProductsPage() {
  const products = await getData();
  return <ProductsTable products={products} pageSize={6} />;
}

