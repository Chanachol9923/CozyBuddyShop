import type { ProductFromAPI } from "../../assets/types"
import { formatPrice } from "../../utils/format"
import ImageSlot from "../ui/ImageSlot"

interface CartItemRowProps {
  product: ProductFromAPI
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
  onRemove: () => void
}

const QTY_BUTTON =
  "flex size-8 items-center justify-center rounded-full text-lg text-cozy-green-dark transition hover:bg-black/10 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"

// สินค้า 1 แถวในตะกร้า
// มือถือ: แถวบน = รูป+ชื่อ | ปุ่มลบ, แถวล่าง = จำนวน | ราคา
// จอใหญ่: รูป+ชื่อ | จำนวน | ราคา | ปุ่มลบ
export default function CartItemRow({ product, quantity, onIncrease, onDecrease, onRemove }: CartItemRowProps) {
  return (
    <li className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 p-3 sm:grid-cols-[minmax(0,2.2fr)_1fr_1fr_3rem] sm:p-2.5">
      <div className="flex min-w-0 items-center gap-4 sm:gap-5">
        <ImageSlot src={product.image} alt={product.name} className="size-16 shrink-0 sm:size-20" />
        <span className="text-cozy-green-dark sm:text-lg">{product.name}</span>
      </div>

      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${product.name}`}
        className="justify-self-end rounded-full p-1.5 text-cozy-green-dark transition hover:bg-black/10 sm:order-last sm:justify-self-center"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="size-5" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>

      <div className="flex items-center gap-2 sm:justify-self-center">
        <button type="button" onClick={onIncrease} aria-label={`Increase ${product.name} quantity`} className={QTY_BUTTON}>
          +
        </button>
        <span className="min-w-5 text-center text-cozy-green-dark tabular-nums">{quantity}</span>
        {/* เหลือ 1 ชิ้นจะกดลดไม่ได้ ถ้าจะเอาออกให้กดปุ่ม X แทน */}
        <button
          type="button"
          onClick={onDecrease}
          disabled={quantity <= 1}
          aria-label={`Decrease ${product.name} quantity`}
          className={QTY_BUTTON}
        >
          −
        </button>
      </div>

      <p className="justify-self-end text-sm text-cozy-green-dark tabular-nums sm:justify-self-center">
        {formatPrice(product.price * quantity)}
      </p>
    </li>
  )
}
