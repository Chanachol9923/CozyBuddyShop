import type { ReactNode } from "react"
import { useSearchParams } from "react-router"
import type { ProductFromAPI, ProductType } from "../assets/types"
import ProductCard from "../components/shop/ProductCard"
import ShopHero from "../components/shop/ShopHero"
import FilterSelect, { type ProductFilter } from "../components/shop/FilterSelect"
import { buttonClass } from "../components/ui/buttonStyles"
import { useProducts } from "../hooks/useProducts"

const GRID = "grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-7"

const PRODUCT_TYPES: ProductType[] = ["doll", "animal", "clothes&accessory"]

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const typeParam = searchParams.get("type")
  let filterBy: ProductFilter = "all"
  for (const type of PRODUCT_TYPES) {
    if (type === typeParam) {
      filterBy = type
    }
  }

  function setFilterBy(value: ProductFilter) {
    if (value === "all") {
      setSearchParams({}, { replace: true, preventScrollReset: true })
    } else {
      setSearchParams({ type: value }, { replace: true, preventScrollReset: true })
    }
  }

  const { data, isLoading, isError, refetch } = useProducts()

  const filteredProducts: ProductFromAPI[] = []
  if (data) {
    for (const product of data) {
      if (filterBy === "all" || product.type === filterBy) {
        filteredProducts.push(product)
      }
    }
  }

  let content: ReactNode
  if (isLoading) {
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
    content = (
      <div className="py-12 text-center">
        <p className="mb-4 text-cozy-muted">loading fail</p>
        <button type="button" onClick={() => refetch()} className={buttonClass("md", "green")}>
          Try again
        </button>
      </div>
    )
  } else if (filteredProducts.length === 0) {
    content = <p className="py-12 text-center text-cozy-muted">No products found.</p>
  } else {
    content = (
      <div className={GRID}>
        {filteredProducts.map((product) => (
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
          <FilterSelect value={filterBy} onChange={setFilterBy} />
        </div>

        {content}
      </section>
    </>
  )
}
