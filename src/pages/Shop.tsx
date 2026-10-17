import { useState, type ReactNode } from "react"
import type { ProductFromAPI, ProductType } from "../assets/types"
import ProductCard from "../components/shop/ProductCard"
import ShopHero from "../components/shop/ShopHero"
import SortSelect from "../components/shop/SortSelect"
import { buttonClass } from "../components/ui/buttonStyles"
import { useProducts } from "../hooks/useProducts"

// ตารางการ์ดสินค้า (class เดิมของ Ben)
const GRID = "grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-7"

export default function Shop() {
  const [sortBy, setSortBy] = useState<ProductType>("doll")
  const { data, isLoading, isError, refetch } = useProducts()

  // เรียงสินค้า: ชนิดที่เลือกขึ้นก่อน แล้วตามด้วยชนิดอื่น (ยังแสดงสินค้าทั้งหมดอยู่)
  const sortedProducts: ProductFromAPI[] = []
  if (data) {
    for (const product of data) {
      if (product.type === sortBy) {
        sortedProducts.push(product)
      }
    }
    for (const product of data) {
      if (product.type !== sortBy) {
        
        sortedProducts.push(product)
      }
    }
  }

  // เลือกว่าจะแสดงอะไรในส่วนรายการสินค้า
  let content: ReactNode
  if (isLoading) {
    // กำลังโหลด: การ์ดเปล่ากระพริบ 8 ใบ (ProductCard ที่ไม่ส่ง product = กล่องเทา)
    const skeletons = [1, 2, 3, 4, 5, 6, 7, 8]
    content = (
      <div className={GRID}>
        {skeletons.map((number) => (
          <div key={number} className="animate-pulse">
            <ProductCard />
          </div>
        ))}
      </div>
    )
  } else if (isError) {
    // โหลดไม่สำเร็จ: แจ้งข้อความ และมีปุ่มลองใหม่
    content = (
      <div className="py-12 text-center">
        <p className="mb-4 text-cozy-muted">โหลดสินค้าไม่สำเร็จ กรุณาลองใหม่อีกครั้ง</p>
        <button type="button" onClick={() => refetch()} className={buttonClass("md", "green")}>
          Try again
        </button>
      </div>
    )
  } else if (sortedProducts.length === 0) {
    content = <p className="py-12 text-center text-cozy-muted">No products found.</p>
  } else {
    content = (
      <div className={GRID}>
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    )
  }

  return (
    <>
      <h1 className="sr-only">Shop</h1>
      <ShopHero />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-14">
        <div className="mb-4 flex justify-end">
          <SortSelect value={sortBy} onChange={setSortBy} />
        </div>

        {content}
      </section>
    </>
  )
}
