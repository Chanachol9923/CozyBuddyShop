import { useProducts } from "../../hooks/useProducts"
import BestSellerCard from "./BestSellerCard"

const BEST_SELLER_COUNT = 3

// สินค้าขายดี 3 ชิ้น (isBestSeller = true) ดึงจาก API ผ่าน TanStack Query
export default function BestSellers() {
  const { data: products, isError } = useProducts()
  const bestSellers = products?.filter((product) => product.isBestSeller).slice(0, BEST_SELLER_COUNT)

  return (
    <>
      <div className="mx-auto grid max-w-xs grid-cols-1 gap-10 sm:max-w-4xl sm:grid-cols-3 sm:gap-8 lg:gap-10">
        {bestSellers
          ? bestSellers.map((product) => <BestSellerCard key={product.id} product={product} />)
          : // ระหว่างโหลด (หรือโหลดไม่ได้) โชว์กล่องเปล่าไว้ก่อน
            Array.from({ length: BEST_SELLER_COUNT }, (_, i) => <BestSellerCard key={i} />)}
      </div>

      {isError && <p className="mt-4 text-center text-sm text-cozy-muted">Couldn't load best sellers right now.</p>}
    </>
  )
  
}
