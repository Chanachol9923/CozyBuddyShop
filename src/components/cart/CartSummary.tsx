import { formatPriceWithDecimals } from "../../utils/format"
import ButtonLink from "../ui/ButtonLink"
import { buttonClass } from "../ui/buttonStyles"

interface CartSummaryProps {
  subtotal: number
  onCheckout: () => void
  // ตะกร้าว่าง = กด Checkout ไม่ได้
  checkoutDisabled?: boolean
}

// ราคารวม + ปุ่ม checkout / continue shopping ด้านล่างของตะกร้า
export default function CartSummary({ subtotal, onCheckout, checkoutDisabled = false }: CartSummaryProps) {
  return (
    <div className="mt-3 border-t border-cozy-placeholder pt-8">
      <p className="flex items-baseline justify-end gap-6 text-2xl text-cozy-green-dark sm:gap-12 sm:text-3xl">
        <span>Subtotal:</span>
        <span className="font-medium tabular-nums">{formatPriceWithDecimals(subtotal)} ฿</span>
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:ml-auto sm:w-52">
        <button
          type="button"
          onClick={onCheckout}
          disabled={checkoutDisabled}
          className={`${buttonClass("md", "green")} w-full disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0`}
        >
          Checkout
        </button>
        <ButtonLink to="/shop" variant="olive" className="w-full">
          Continue Shopping
        </ButtonLink>
      </div>
    </div>
  )
}
