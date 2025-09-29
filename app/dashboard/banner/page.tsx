// app/dashboard/banner/page.tsx (Server Component)
import { prisma } from "@/lib/prisma";
import BannerTable from "../../../components/banner-table";


async function getData() {
  const data = await prisma.banner.findMany({
    orderBy: { createdAt: "desc" },
  });
  return data;
}

export default async function BannerPage() {
  const banner = await getData();

  return <BannerTable banners={banner} pageSize={6} />;
}
