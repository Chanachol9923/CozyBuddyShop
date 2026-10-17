import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import ImageSlot from "../components/ui/ImageSlot"
import { buttonClass } from "../components/ui/buttonStyles"
import { useProduct } from "../hooks/useProduct"
import { useCartStore } from "../store/cartStore"
import { formatPrice } from "../utils/format"

// class ของปุ่ม + / − (ใช้แบบเดียวกับหน้า Cart)
const QTY_BUTTON =
  "flex size-9 items-center justify-center rounded-full text-xl text-cozy-green-dark transition hover:bg-black/10 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"

export default function Product() {
  // ต้องเรียก hook ทั้งหมดไว้บนสุด ก่อน if / return ใดๆ
  const { id } = useParams()
  const { data: product, isLoading, isError, refetch } = useProduct(id)
  const addItem = useCartStore((state) => state.addItem)
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  // 1. กำลังโหลด: แสดงโครงร่างสีเทากระพริบ
  if (isLoading) {
    return (
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:gap-14 lg:py-16">
        <div className="aspect-square w-full animate-pulse bg-cozy-placeholder" />
        <div className="space-y-4">
          <div className="h-10 w-2/3 animate-pulse bg-cozy-placeholder" />
          <div className="h-24 w-full animate-pulse bg-cozy-placeholder" />
          <div className="h-8 w-1/3 animate-pulse bg-cozy-placeholder" />
          <div className="h-12 w-full animate-pulse bg-cozy-placeholder" />
        </div>
      </section>
    )
  }

  // 2. โหลดไม่สำเร็จ หรือไม่พบสินค้า: แจ้งข้อความ มีปุ่มลองใหม่ และปุ่มกลับไปหน้า Shop
  if (isError || !product) {
    return (
      <section className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="mb-3 text-2xl font-medium text-cozy-green-dark">Product not found</h1>
        <p className="mb-6 text-sm text-cozy-muted">
          โหลดข้อมูลสินค้าไม่สำเร็จ ลองใหม่อีกครั้ง หรือกลับไปเลือกสินค้าที่หน้า Shop
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button type="button" onClick={() => refetch()} className={buttonClass("md", "green")}>
            Try again
          </button>
          <Link to="/shop" className={buttonClass("md", "olive")}>
            Back to shop
          </Link>
        </div>
      </section>
    )
  }

  // 3. ปุ่มต่างๆ (เขียนหลัง if ด้านบน เพื่อให้ TypeScript รู้ว่า product มีค่าแล้ว)
  const decrease = () => {
    setQuantity(quantity - 1)
    setAdded(false)
  }

  const increase = () => {
    setQuantity(quantity + 1)
    setAdded(false)
  }

  // เพิ่มลงตะกร้า แล้วแสดงข้อความยืนยันอยู่หน้าเดิม
  const handleAddToCart = () => {
    addItem(product.id, quantity)
    setAdded(true)
  }

  // ซื้อทันที: เพิ่มลงตะกร้า แล้วไปหน้า Cart เลย
  const handleBuyNow = () => {
    addItem(product.id, quantity)
    navigate("/cart")
  }

  // 4. แสดงรายละเอียดสินค้า
  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      {/* เส้นทางหน้า: Home / Shop / ชื่อสินค้า */}
      <nav className="mb-6 text-sm text-cozy-muted">
        <Link to="/" className="hover:text-cozy-green hover:underline">
          Home
        </Link>
        {" / "}
        <Link to="/shop" className="hover:text-cozy-green hover:underline">
          Shop
        </Link>
        {" / "}
        <span className="text-cozy-green-dark">{product.name}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-2 lg:gap-14">
        {/* รูปสินค้าขนาดใหญ่ */}
        <ImageSlot src={product.image} alt={product.name} className="aspect-square w-full" />

        {/* ข้อมูลสินค้า */}
        <div>
          <h1 className="mb-3 text-3xl font-medium text-cozy-green-dark sm:text-4xl">{product.name}</h1>
          <p className="mb-6 text-cozy-muted">{product.description}</p>
          <p className="mb-6 text-2xl font-semibold text-cozy-green-dark">{formatPrice(product.price)} ฿</p>

          {/* จำนวนสินค้า */}
          <div className="mb-6 flex items-center gap-4">
            <span className="text-sm text-cozy-green-dark">Quantity</span>
            <div className="flex items-center gap-1 rounded-full bg-cozy-cream-dark px-1">
              <button
                type="button"
                onClick={decrease}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className={QTY_BUTTON}
              >
                −
              </button>
              <span className="min-w-8 text-center tabular-nums text-cozy-green-dark">{quantity}</span>
              <button type="button" onClick={increase} aria-label="Increase quantity" className={QTY_BUTTON}>
                +
              </button>
            </div>
          </div>

          {/* ปุ่มเพิ่มลงตะกร้า / ซื้อทันที */}
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={handleAddToCart} className={buttonClass("md", "green")}>
              Add to cart
            </button>
            <button type="button" onClick={handleBuyNow} className={buttonClass("md", "olive")}>
              Buy now!
            </button>
          </div>

          {/* ข้อความยืนยันหลังกด Add to cart */}
          {added && (
            <p role="status" className="mt-4 text-sm text-cozy-green-dark">
              เพิ่มลงตะกร้าแล้ว{" "}
              <Link to="/cart" className="font-semibold underline">
                ดูตะกร้า
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
