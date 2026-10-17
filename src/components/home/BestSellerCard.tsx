import { Link } from "react-router"
import type { ProductFromAPI } from "../../assets/types"
import ImageSlot from "../ui/ImageSlot"

interface BestSellerCardProps {
  product?: ProductFromAPI
}

// การ์ดสินค้าขายดีหน้า home: รูปแนวตั้ง + ชื่อสินค้าตรงกลาง (ไม่มีราคา ไม่มีพื้นหลัง)
// ถ้ายังไม่มี product (กำลังโหลด) จะเป็นกล่องเปล่า
export default function BestSellerCard({ product }: BestSellerCardProps) {
  if (!product) {
    return (
      <article className="flex flex-col items-center gap-4">
        <div className="aspect-[3/4] w-full bg-cozy-placeholder" />
        <div className="h-5 w-2/3 bg-cozy-placeholder" />
      </article>
    )
  }

  return (
    <article>
      <Link to={`/product/${product.id}`} className="group flex flex-col items-center gap-4 text-center">
        <div className="w-full overflow-hidden">
          <ImageSlot
            src={product.image}
            alt={product.name}
            className="aspect-[3/4] w-full transition duration-300 group-hover:scale-105"
          />
        </div>
        <h3 className="font-tagline text-lg font-medium text-cozy-green-dark">
          {product.name}
        </h3>
      </Link>
    </article>
  )
}
