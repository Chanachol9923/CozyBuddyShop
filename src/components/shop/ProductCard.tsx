import { Link } from "react-router"
import type { ProductFromAPI } from "../../assets/types"
import { formatPrice } from "../../utils/format"
import ImageSlot from "../ui/ImageSlot"

interface ProductCardProps {
  product?: ProductFromAPI
}

// การ์ดสินค้า: ถ้ายังไม่ส่ง product มาจะเป็นกล่องเปล่า (ใช้ตอนโหลด / ยังไม่ต่อข้อมูล)
export default function ProductCard({ product }: ProductCardProps) {
  if (!product) {
    return (
      <article className="flex flex-col gap-1.5">
        {/* ช่องรูปสินค้า */}
        <div className="aspect-square w-full bg-cozy-placeholder" />

        {/* ช่องข้อมูลสินค้า (ชื่อ, ราคา, ปุ่ม) */}
        <div className="h-20 w-full bg-cozy-placeholder" />
      </article>
    )
  }

  return (
    <article>
      <Link to={`/product/${product.id}`} className="group flex flex-col gap-1.5">
        <div className="overflow-hidden">
          <ImageSlot
            src={product.image}
            alt={product.name}
            className="aspect-square w-full transition duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex h-20 flex-col justify-center bg-cozy-cream px-4">
          <h3 className="font-semibold text-cozy-green-dark group-hover:underline">{product.name}</h3>
          <p className="text-sm text-cozy-muted">{formatPrice(product.price)} ฿</p>
        </div>
      </Link>
    </article>
  )
}
