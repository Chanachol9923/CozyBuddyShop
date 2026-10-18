import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import ImageSlot from "../components/ui/ImageSlot"
import { buttonClass } from "../components/ui/buttonStyles"
import { useProduct } from "../hooks/useProduct"
import { useCartStore } from "../store/cartStore"
import { formatPrice } from "../utils/format"

const QTY_BUTTON =
  "flex size-9 items-center justify-center rounded-full text-xl text-cozy-green-dark transition hover:bg-black/10 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"

export default function Product() {
  const { id } = useParams()
  const { data: product, isLoading, isError, refetch } = useProduct(id)
  const addItem = useCartStore((state) => state.addItem)
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

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

  const decrease = () => {
    setQuantity(quantity - 1)
    setAdded(false)
  }

  const increase = () => {
    setQuantity(quantity + 1)
    setAdded(false)
  }

  const handleAddToCart = () => {
    addItem(product.id, quantity)
    setAdded(true)
  }

  const handleBuyNow = () => {
    addItem(product.id, quantity)
    navigate("/cart")
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">

      <div className="grid gap-8 md:grid-cols-2 lg:gap-14">
        <ImageSlot src={product.image} alt={product.name} className="aspect-square w-full border border-cozy-placeholder" />

        <div>
          <h1 className="mb-3 text-3xl font-medium text-cozy-green-dark sm:text-4xl">{product.name}</h1>
          <p className="mb-6 text-cozy-muted">{product.description}</p>
          <p className="mb-6 text-2xl font-semibold text-cozy-green-dark">{formatPrice(product.price)} ฿</p>

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

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={handleAddToCart} className={buttonClass("md", "olive")}>
              Add to cart
            </button>
            <button type="button" onClick={handleBuyNow} className={buttonClass("md", "green")}>
              Buy now
            </button>
          </div>

          {added && (
            <p role="status" className="mt-4 text-sm text-cozy-green-dark">
              Added to cart.{" "}
              <Link to="/cart" className="font-semibold underline">
                View cart
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
