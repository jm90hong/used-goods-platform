"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { PlusCircle, Search, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductCard } from "@/components/product-card"
import { useItemStore } from "@/stores/useItemStore"

export default function HomePage() {
  const [query, setQuery] = useState("")
  const [searchWord, setSearchWord] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [order, setOrder] = useState<"desc" | "asc">("desc")
  const klimit = 12

  const { itemsInHomePage, getItemsInHomePage } = useItemStore()

  useEffect(() => {
    getItemsInHomePage({
      page: currentPage,
      limit: klimit,
      searchWord,
      order,
    })
  }, [currentPage, order, searchWord])

  const handleMoreItems = () => {
    setCurrentPage((prev) => prev + 1)
  }

  const handleOrderDesc = () => {
    setOrder("desc")
    setCurrentPage(1)
  }

  const handleOrderAsc = () => {
    setOrder("asc")
    setCurrentPage(1)
  }

  const handleSearch = () => {
    setSearchWord(query)
    setCurrentPage(1)
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <section className="mb-8 flex flex-col items-start gap-4 rounded-2xl bg-primary px-6 py-10 text-primary-foreground sm:px-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-medium">
          <ShieldCheck className="size-3.5" />
          포인트로 안전하게 거래하는 우리 동네 중고마켓
        </span>
        <h1 className="text-3xl font-bold text-balance sm:text-4xl">
          필요한 물건, 이웃과 나눠요
        </h1>
        <p className="max-w-xl text-sm text-primary-foreground/85 sm:text-base">
          수성마켓에서 믿을 수 있는 이웃과 중고 상품을 사고팔아 보세요. 간편하게
          등록하고 포인트로 신청하면 거래 끝!
        </p>
        <Button
          variant="secondary"
          nativeButton={false}
          render={<Link href="/sell" />}
          className="mt-2"
        >
          <PlusCircle data-icon="inline-start" />
          상품 등록하기
        </Button>
      </section>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold">전체 상품</h2>
          <p className="text-sm text-muted-foreground">
            총 {itemsInHomePage.length}개의 상품이 등록되어 있어요
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          {/*최신순 과거순 버튼*/}
          <div className="flex gap-2">
            <Button
              variant={order === "desc" ? "default" : "outline"}
              onClick={handleOrderDesc}
              className="cursor-pointer"
            >
              최신순
            </Button>
            <Button
              variant={order === "asc" ? "default" : "outline"}
              onClick={handleOrderAsc}
              className="cursor-pointer"
            >
              과거순
            </Button>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <button
              type="button"
              onClick={handleSearch}
              className="absolute top-1/2 left-3 z-10 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground"
              aria-label="검색"
            >
              <Search className="size-4" />
            </button>
            <Input
              placeholder="상품명으로 검색"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch()
              }}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      {itemsInHomePage.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {itemsInHomePage.map((item) => (
              <ProductCard key={item.idx} item={item} />
            ))}
          </div>

          {/*더보기 버튼*/}
          <div className="mt-10 flex justify-center">
            <Button
              onClick={handleMoreItems}
              variant="outline"
              className="w-[300px] cursor-pointer p-6 text-lg hover:bg-gray-100"
            >
              더보기
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed py-16 text-center">
          <p className="font-medium">검색 결과가 없어요</p>
          <p className="text-sm text-muted-foreground">
            다른 검색어로 다시 시도해 보세요.
          </p>
        </div>
      )}
    </main>
  )
}
