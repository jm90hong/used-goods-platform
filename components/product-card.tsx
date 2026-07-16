import Image from "next/image"
import Link from "next/link"

import type { Product } from "@/lib/types"
import { formatPoints } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import Item from "@/types/Item"

export function ProductCard({ item }: { item: Item }) {
  return (
    <Link href={`/products/${item.idx}`} className="group block">
      <Card className="overflow-hidden pt-0 transition-shadow hover:shadow-md">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={item.imgUrl || "/placeholder.svg"}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent>
          <h3 className="line-clamp-1 text-sm font-medium">{item.name}</h3>
          <p className="mt-1 text-base font-bold text-primary">
            {formatPoints(item.price)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {item.user?.nick} · {item.createdAt.toString().split('T')[0]}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
