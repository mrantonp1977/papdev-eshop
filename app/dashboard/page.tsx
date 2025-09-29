import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  EuroIcon,
  PartyPopper,
  ShoppingBag,
  User2Icon,
} from "lucide-react"

export default function Dashboard() {
  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue */}
        <Card className="shadow-orange-700 shadow-md transition-all duration-200 border border-border/60">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/40">
              <EuroIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              145,000 €
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Based on 100 charges
            </p>
          </CardContent>
        </Card>

        {/* Total Sales */}
        <Card className="shadow-orange-700 shadow-md transition-all duration-200 border border-border/60">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Sales
            </CardTitle>
            <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/40">
              <ShoppingBag className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              +50
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Total sales for my store
            </p>
          </CardContent>
        </Card>

        {/* Total Products */}
        <Card className="shadow-orange-700 shadow-md transition-all duration-200 border border-border/60">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Products
            </CardTitle>
            <div className="rounded-full bg-cyan-100 p-2 dark:bg-cyan-900/40">
              <PartyPopper className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              234
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Products available
            </p>
          </CardContent>
        </Card>

        {/* Total Users */}
        <Card className="shadow-orange-700 shadow-md transition-all duration-200 border border-border/60">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
            <div className="rounded-full bg-orange-100 p-2 dark:bg-orange-900/40">
              <User2Icon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              364
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Registered customers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions & Recent Sales */}
      <div className="grid gap-6 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {/* Transactions Card */}
        <Card className="xl:col-span-2 shadow-orange-700 shadow-md transition-all duration-200 border border-border/60 ">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Transactions</CardTitle>
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

        {/* Recent Sales Card */}
        <Card className="shadow-orange-700 shadow-md transition-all duration-200 border border-border/60">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Sales</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex items-center gap-4 pb-4 border-b">
              <Avatar className="h-9 w-9">
                <AvatarFallback>AP</AvatarFallback>
              </Avatar>
              <div className="grid gap-1 leading-none">
                <p className="font-medium">Anatoliy Papazov</p>
                <p className="text-sm text-muted-foreground">test@test.com</p>
              </div>
              <p className="ml-auto font-medium text-green-600 dark:text-green-400">
                325.43 €
              </p>
            </div>

            <div className="flex items-center gap-4 pb-4 border-b">
              <Avatar className="h-9 w-9">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="grid gap-1 leading-none">
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-muted-foreground">john@example.com</p>
              </div>
              <p className="ml-auto font-medium text-green-600 dark:text-green-400">
                120.00 €
              </p>
            </div>

            <div className="flex items-center gap-4 pb-4 border-b">
              <Avatar className="h-9 w-9">
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <div className="grid gap-1 leading-none">
                <p className="font-medium">Maria Silva</p>
                <p className="text-sm text-muted-foreground">maria@example.com</p>
              </div>
              <p className="ml-auto font-medium text-green-600 dark:text-green-400">
                250.00 €
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Avatar className="h-9 w-9">
                <AvatarFallback>LK</AvatarFallback>
              </Avatar>
              <div className="grid gap-1 leading-none">
                <p className="font-medium">Liam Keller</p>
                <p className="text-sm text-muted-foreground">liam@example.com</p>
              </div>
              <p className="ml-auto font-medium text-green-600 dark:text-green-400">
                98.50 €
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
