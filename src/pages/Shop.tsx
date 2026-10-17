import { useState } from "react"
import type { ProductType } from "../assets/types"
import ProductCard from "../components/shop/ProductCard"
import ShopHero from "../components/shop/ShopHero"
import SortSelect from "../components/shop/SortSelect"

export default function Shop() {
  const [sortBy, setSortBy] = useState<ProductType>("doll")

  return (
    <>
      <h1 className="sr-only">Shop</h1>
      <ShopHero />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-14">
        <div className="mb-4 flex justify-end">
          <SortSelect value={sortBy} onChange={setSortBy} />
        </div>

        {/* ตอนต่อข้อมูล: เปลี่ยนเป็น data.map((product) => <ProductCard key={product.id} ... />) */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-7">
          <ProductCard />
        </div>
      </section>
    </>
  )
}
