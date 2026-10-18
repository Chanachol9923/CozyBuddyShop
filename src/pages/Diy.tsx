import { useState, type ReactNode } from "react"
import { Link } from "react-router"
import { DIY_COSTUME_COUNT, DIY_DISCOUNT_PERCENT, type ProductFromAPI } from "../assets/types"
import ImageSlot from "../components/ui/ImageSlot"
import { buttonClass } from "../components/ui/buttonStyles"
import { useProducts } from "../hooks/useProducts"
import { useCartStore } from "../store/cartStore"
import { calDiySet } from "../utils/cart"
import { formatPrice } from "../utils/format"

// ตารางตัวเลือก
const OPTION_GRID = "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"

interface OptionCardProps {
  product: ProductFromAPI
  selected: boolean
  disabled?: boolean
  onClick: () => void
}

function OptionCard({ product, selected, disabled = false, onClick }: OptionCardProps) {
  let imageClass = "aspect-square w-full ring-1 ring-transparent transition hover:ring-cozy-olive"
  let nameClass = "text-sm text-cozy-muted"
  if (selected) {
    imageClass = "aspect-square w-full ring-4 ring-cozy-green"
    nameClass = "text-sm font-bold text-cozy-green-dark"
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className="flex flex-col gap-2 text-center disabled:cursor-not-allowed disabled:opacity-40"
    >
      <ImageSlot src={product.image} alt={product.name} className={imageClass} />
      <span className={nameClass}>{product.name}</span>
    </button>
  )
}

export default function Diy() {
  // ต้องเรียกhook ทั้งหมด
  const { data, isLoading, isError, refetch } = useProducts()
  const addDiySet = useCartStore((state) => state.addDiySet)
  const [dollId, setDollId] = useState<string | null>(null)
  const [costumeIds, setCostumeIds] = useState<string[]>([])
  const [added, setAdded] = useState(false)


  if (isLoading) {
    const skeletons = [1, 2, 3, 4, 5, 6, 7, 8]
    return (
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className={OPTION_GRID}>
          {skeletons.map((number) => (
            <div key={number} className="aspect-square animate-pulse bg-cozy-placeholder" />
          ))}
        </div>
      </section>
    )
  }

  if (isError || !data) {
    return (
      <section className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="mb-4 text-cozy-muted">load fail;</p>
        <button type="button" onClick={() => refetch()} className={buttonClass("md", "green")}>
          try again
        </button>
      </section>
    )
  }



  const dolls: ProductFromAPI[] = []
  const costumes: ProductFromAPI[] = []
  for (const product of data) {
    if (product.type === "doll") {
      dolls.push(product)

    }
    if (product.type === "clothes&accessory") {
      costumes.push(product)
    }
  }


  
  let selectedDoll: ProductFromAPI | null = null
  if (dollId !== null) {
    const found = data.find((i) => i.id === dollId)
    if (found) {
      selectedDoll = found
    }
  }


  //4 ช่อง ช่องที่เหลือเป็นnull
  const slots: (ProductFromAPI | null)[] = []
  for (let i = 0; i < DIY_COSTUME_COUNT; i++) {
    let costume: ProductFromAPI | null = null
    if (i < costumeIds.length) {
      const found = data.find((p) => p.id === costumeIds[i])
      if (found) {
        costume = found
      }
    }
    slots.push(costume)
  }

  //CalSetPrice
  let dollKey = ""
  if (dollId !== null) {
    dollKey = dollId
  }
  const price = calDiySet(data, dollKey, costumeIds)
  const canAdd = dollId !== null && costumeIds.length === DIY_COSTUME_COUNT

  //ปุ่มห
  const selectDoll = (id: string) => {
    setDollId(id)
    setAdded(false)
  }

  const toggleCostume = (id: string) => {
    setAdded(false)

    //คลิกอีกรอบเอาออก
    if (costumeIds.includes(id)) {
      const rest: string[] = []
      for (const costumeId of costumeIds) {
        if (costumeId !== id) {
          rest.push(costumeId)
        }
      }
      setCostumeIds(rest)
      return
    }

    //ครบ
    if (costumeIds.length >= DIY_COSTUME_COUNT) {
      return
    }

    setCostumeIds([...costumeIds, id])
  }

  const handleAddSet = () => {
    if (dollId === null || costumeIds.length !== DIY_COSTUME_COUNT) {
      return
    }
    addDiySet(dollId, costumeIds)

    //ล้าง
    setDollId(null)
    setCostumeIds([])
    setAdded(true)
  }



  let hint: ReactNode = null
  if (added) {
    hint = (
      <p role="status" className="mt-3 text-sm text-cozy-green-dark">
        Set added to cart.{" "}
        <Link to="/cart" className="font-semibold underline">
          View cart
        </Link>
      </p>
    )
  } else if (!canAdd) {
    hint = (
      <p className="mt-3 text-sm text-cozy-muted">
        Choose 1 doll and {DIY_COSTUME_COUNT} costumes ({costumeIds.length}/{DIY_COSTUME_COUNT})
      </p>
    )
  }

//แสดงผล
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      {/* หัวข้อ */}
      <div className="mb-10">
        <h1 className="mb-3 text-3xl font-medium text-cozy-green-dark sm:text-4xl">DIY Set</h1>
        <p className="mb-4 text-cozy-muted">
          Build your own doll set - save {DIY_DISCOUNT_PERCENT}% when you buy it as a set
        </p>
      </div>

      {/*เลือกตุ๊กต */}
      <div className="mb-10 bg-cozy-cream p-5 sm:p-7">
        <h2 className="mb-5 text-xl font-medium text-cozy-green-dark">
          Choose one doll
        </h2>
        <div className={OPTION_GRID}>
          {dolls.map((doll) => (
            <OptionCard key={doll.id} product={doll} selected={dollId === doll.id} onClick={() => selectDoll(doll.id)} />
          ))}
        </div>
      </div>

      {/* ชุด */}
      <div className="mb-10">
        <h2 className="mb-5 text-xl font-medium text-cozy-green-dark">
          Choose {DIY_COSTUME_COUNT} Costumes
        </h2>
        <div className={OPTION_GRID}>
          {costumes.map((costume) => {
            const selected = costumeIds.includes(costume.id)
            // ครบ
            const full = costumeIds.length >= DIY_COSTUME_COUNT && !selected
            return (
              <OptionCard
                key={costume.id}
                product={costume}
                selected={selected}
                disabled={full}
                onClick={() => toggleCostume(costume.id)}
              />
            )
          })}
        </div>
      </div>

      {}
      <div className="bg-cozy-cream p-6 text-center sm:p-8">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-5 font-logo text-3xl font-semibold text-cozy-green-dark">My DIY Costume Set</h2>

          {/*ตุ๊กตาที่เลือก */}
          <div className="mx-auto mb-6 w-36">
            {selectedDoll ? (
              <ImageSlot src={selectedDoll.image} alt={selectedDoll.name} className="aspect-square w-full" />
            ) : (
              <div className="flex aspect-square w-full items-center justify-center border-2 border-dashed border-cozy-olive text-sm text-cozy-olive">
                Choose a doll
              </div>
            )}
            {selectedDoll && <p className="mt-2 text-sm font-bold text-cozy-green-dark">{selectedDoll.name}</p>}
          </div>

          {/* ช่องชุด*/}
          <div className="mb-6 grid grid-cols-4 gap-3">
            {slots.map((costume, index) => {
              if (costume) {
                return (
                  <div key={index} className="min-w-0">
                    <ImageSlot src={costume.image} alt={costume.name} className="aspect-square w-full" />
                    <p className="mt-1 truncate text-xs text-cozy-green-dark">{costume.name}</p>
                  </div>
                )
              }
              return (
                <div key={index} className="min-w-0">
                  <div className="flex aspect-square items-center justify-center border-2 border-dashed border-cozy-olive text-xl text-cozy-olive">
                    +
                  </div>
                </div>
              )
            })}
          </div>

          {/*ราคา*/}
          <div className="mb-4 flex items-baseline justify-between text-sm text-cozy-green-dark">
            <span>
              Set price ({costumeIds.length} / {DIY_COSTUME_COUNT} costumes)
            </span>
            <span>
              {price.saved > 0 && (
                <s className="mr-2 text-cozy-muted">{formatPrice(price.subtotal)} ฿</s>
              )}
              <strong className="text-xl">{formatPrice(price.total)} ฿</strong>
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddSet}
            disabled={!canAdd}
            className={`${buttonClass("lg", "green")} w-full disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0`}
          >
            Add Set to Cart
          </button>
          {hint}
        </div>
      </div>
    </section>
  )
}
