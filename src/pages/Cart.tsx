import type { ReactNode } from "react"
import CartItemRow from "../components/cart/CartItemRow"
import CartSummary from "../components/cart/CartSummary"
import { useProducts } from "../hooks/useProducts"
import { useCartStore } from "../store/cartStore"
import { calCartTotal } from "../utils/cart"

const GRID_COLUMNS = "sm:grid-cols-[minmax(0,2.2fr)_1fr_1fr_3rem]"

export default function Cart() {
  // ของในตะกร้า (id + จำนวน) มาจาก Zustand ส่วนชื่อ/ราคาสินค้ามาจาก API ผ่าน TanStack Query
  const items = useCartStore((state) => state.items)
  const setQuantity = useCartStore((state) => state.setQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const { data: products, isLoading, isError } = useProducts()

  // จับคู่ของในตะกร้ากับข้อมูลสินค้า
  const lines = items.flatMap((item) => {
    const product = products?.find((p) => p.id === item.productId)
    return product ? [{ product, quantity: item.quantity }] : []
  })
  const subtotal = products ? calCartTotal(items, products) : 0

  let content: ReactNode
  if (items.length === 0) {
    content = <p className="pb-8 text-center text-sm text-cozy-muted">Your cart is currently empty.</p>
  } else if (isLoading) {
    content = <p className="pb-8 text-center text-sm text-cozy-muted">Loading your cart...</p>
  } else if (isError) {
    content = <p className="pb-8 text-center text-sm text-red-700">Couldn't load your cart items. Please try again later.</p>
  } else {
    content = (
      <>
        <div
          className={`hidden gap-x-4 border-b border-cozy-placeholder px-2.5 pb-3 text-xs tracking-wide text-cozy-green-dark uppercase sm:grid ${GRID_COLUMNS}`}
        >
          <span>Product details</span>
          <span className="text-center">Quantity</span>
          <span className="text-center">Price</span>
        </div>

        <ul className="mt-3 sm:mt-2.5">
          {lines.map(({ product, quantity }) => (
            <CartItemRow
              key={product.id}
              product={product}
              quantity={quantity}
              onIncrease={() => setQuantity(product.id, quantity + 1)}
              onDecrease={() => setQuantity(product.id, quantity - 1)}
              onRemove={() => removeItem(product.id)}
            />
          ))}
        </ul>
      </>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="mb-8 text-3xl font-medium text-cozy-green-dark sm:text-4xl">Your Shopping Cart</h1>
      {content}
      <CartSummary subtotal={subtotal} />
    </section>
  )
}
