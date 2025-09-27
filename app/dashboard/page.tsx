import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  EuroIcon,
  PartyPopper,
  ShoppingBag,
  User2Icon,
} from "lucide-react"
import React from "react"

export default function Dashboard() {
  return (
    <>
      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Revenue",
            value: "145,000 €",
            desc: "Based on 100 charges",
            icon: EuroIcon,
            color: "green",
          },
          {
            title: "Total Sales",
            value: "+50",
            desc: "Total sales for my store",
            icon: ShoppingBag,
            color: "blue",
          },
          {
            title: "Total Products",
            value: "234",
            desc: "Products available",
            icon: PartyPopper,
            color: "cyan",
          },
          {
            title: "Total Users",
            value: "364",
            desc: "Registered customers",
            icon: User2Icon,
            color: "orange",
          },
        ].map((stat, i) => (
          <Card
            key={i}
            className="shadow-sm hover:shadow-md transition-all duration-200 border border-border/60"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div
                className={`rounded-full bg-${stat.color}-100 p-2 dark:bg-${stat.color}-900/40`}
              >
                <stat.icon
                  className={`h-5 w-5 text-${stat.color}-600 dark:text-${stat.color}-400`}
                />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {stat.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transactions & Recent Sales */}
      <div className="grid gap-6 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-8">
        <Card className="xl:col-span-2 shadow-sm border border-border/60">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Transactions
            </CardTitle>
            <CardDescription>
              Latest transactions from your customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
              📊 Transaction graph or table goes here
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border border-border/60">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Recent Sales
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 pb-4 border-b last:border-0"
              >
                <Avatar className="h-9 w-9">
                  <AvatarFallback>
                    {i % 2 === 0 ? "AP" : "JD"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1 leading-none">
                  <p className="font-medium">
                    {i % 2 === 0 ? "Anatoliy Papazov" : "John Doe"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {i % 2 === 0
                      ? "test@test.com"
                      : "john@example.com"}
                  </p>
                </div>
                <p className="ml-auto font-medium text-green-600 dark:text-green-400">
                  {i % 2 === 0 ? "325.43 €" : "120.00 €"}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
