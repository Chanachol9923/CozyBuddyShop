import { useState } from "react"
import { Link, useNavigate } from "react-router"
import type { ProductFromAPI } from "../../assets/types"
import { useCartStore } from "../../store/cartStore"
import { formatPrice } from "../../utils/format"
import { buttonClass } from "../ui/buttonStyles"
import ImageSlot from "../ui/ImageSlot"

interface ProductCardProps {
  product?: ProductFromAPI
}

// การ์ดสินค้า: ถ้ายังไม่ส่ง product มาจะเป็นกล่องเปล่า (ใช้ตอนโหลด / ยังไม่ต่อข้อมูล)
export default function ProductCard({ product }: ProductCardProps) {
  // ต้องเรียก hook ทั้งหมดไว้บนสุด ก่อน if / return ใดๆ
  const addItem = useCartStore((state) => state.addItem)
  const navigate = useNavigate()
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <article className="flex flex-col gap-1.5">
        {/* ช่องรูปสินค้า */}
        <div className="aspect-square w-full bg-cozy-placeholder" />

        {/* ช่องข้อมูลสินค้า (ชื่อ, ราคา, ปุ่ม) */}
        <div className="h-36 w-full bg-cozy-placeholder" />
      </article>
    )
  }

  // เพิ่มลงตะกร้า 1 ชิ้น แล้วเปลี่ยนข้อความปุ่มเป็น Added สักครู่
  const handleAddToCart = () => {
    addItem(product.id)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  // ซื้อทันที: เพิ่มลงตะกร้า แล้วไปหน้า Cart เลย
  const handleShopNow = () => {
    addItem(product.id)
    navigate("/cart")
  }

  return (
    <article className="flex flex-col gap-1.5">
      {/* รูปกดแล้วไปหน้าสินค้า (tabIndex -1 + aria-hidden: คีย์บอร์ด/screen reader ใช้ลิงก์ชื่อสินค้าแทน จะได้ไม่ซ้ำ 2 ลิงก์) */}
      <Link
        to={`/product/${product.id}`}
        tabIndex={-1}
        aria-hidden="true"
        className="group block overflow-hidden border border-cozy-placeholder"
      >
        <ImageSlot
          src={product.image}
          alt={product.name}
          className="aspect-square w-full transition duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col bg-cozy-cream px-4 py-4">
        <h3 className="font-semibold text-cozy-green-dark">
          <Link to={`/product/${product.id}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-cozy-muted">{formatPrice(product.price)} ฿</p>

        {/* ปุ่มเพิ่มลงตะกร้า / ซื้อทันที (mt-auto = ดันปุ่มลงล่างสุด การ์ดแถวเดียวกันปุ่มจะตรงกัน)
            การ์ดกว้างพอ = ปุ่มอยู่แถวเดียวกัน, การ์ดแคบ = ปุ่มลงมาเรียงกันคนละแถว (flex-wrap) */}
        <div className="mt-auto flex flex-wrap gap-2 pt-3">
          <button
            type="button"
            onClick={handleAddToCart}
            className={`${buttonClass("sm", "olive")} flex-auto whitespace-nowrap`}
          >
            {added ? "Added ✓" : "Add to cart"}
          </button>
          <button
            type="button"
            onClick={handleShopNow}
            className={`${buttonClass("sm", "green")} flex-auto whitespace-nowrap`}
          >
            Shop now
          </button>
        </div>
      </div>
    </article>
  )
}
