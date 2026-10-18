import type { CartDiySet, ProductFromAPI } from "../../assets/types"
import { calDiySet } from "../../utils/cart"
import { formatPrice } from "../../utils/format"
import ImageSlot from "../ui/ImageSlot"

interface CartDiySetRowProps {
  diySet: CartDiySet
  products: ProductFromAPI[]
  onRemove: () => void
}

export default function CartDiySetRow({ diySet, products, onRemove }: CartDiySetRowProps) {
  const doll = products.find((p) => p.id === diySet.dollId)

  const costumeNames: string[] = []
  for (const costumeId of diySet.costumeIds) {
    const costume = products.find((p) => p.id === costumeId)
    if (costume) {
      costumeNames.push(costume.name)
    }
  }

  const price = calDiySet(products, diySet.dollId, diySet.costumeIds)

  let dollName = ""
  let dollImage = ""
  if (doll) {
    dollName = doll.name
    dollImage = doll.image
  }

  return (
    <li className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 p-3 sm:grid-cols-[minmax(0,2.2fr)_1fr_1fr_3rem] sm:p-2.5">
      <div className="flex min-w-0 items-center gap-4 sm:gap-5">
        <ImageSlot src={dollImage} alt={dollName} className="size-16 shrink-0 sm:size-20" />
        <div className="min-w-0">
          <p className="text-cozy-green-dark sm:text-lg">DIY Set: {dollName}</p>
          <p className="text-xs text-cozy-muted">{costumeNames.join(", ")}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove DIY set ${dollName}`}
        className="justify-self-end rounded-full p-1.5 text-cozy-green-dark transition hover:bg-black/10 sm:order-last sm:justify-self-center"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="size-5" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>

      <p className="text-sm text-cozy-green-dark sm:justify-self-center">1 set</p>

      <p className="justify-self-end text-sm text-cozy-green-dark tabular-nums sm:justify-self-center">
        {price.saved > 0 && <s className="mr-2 text-cozy-muted">{formatPrice(price.subtotal)}</s>}
        {formatPrice(price.total)}
      </p>
    </li>
  )
}
