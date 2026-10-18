import type { ProductType } from "../../assets/types"

// "all" = ไม่กรอง แสดงสินค้าทุกชนิด
export type ProductFilter = "all" | ProductType

const FILTER_OPTIONS: { value: ProductFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "doll", label: "Doll" },
  { value: "animal", label: "Animal" },
  { value: "clothes&accessory", label: "Clothes & Accessory" },
]

interface FilterSelectProps {
  value: ProductFilter
  onChange: (value: ProductFilter) => void
}

export default function FilterSelect({ value, onChange }: FilterSelectProps) {
  return (
    <label className="flex items-center gap-3">
      <span className="text-xs font-bold tracking-wider text-cozy-green-dark uppercase">Filter by</span>
      <span className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as ProductFilter)}
          className="min-w-38 cursor-pointer appearance-none rounded-md border border-cozy-green-soft bg-white py-1.5 pr-10 pl-3.5 text-xs font-semibold tracking-wide text-cozy-green-dark uppercase focus:ring-2 focus:ring-cozy-green/30 focus:outline-none"
        >
          {FILTER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-cozy-green-dark"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
    </label>
  )
}
