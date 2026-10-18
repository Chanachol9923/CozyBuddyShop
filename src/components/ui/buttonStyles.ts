// class ของปุ่มที่ใช้ร่วมกัน ทั้ง <Link> (ButtonLink) และ <button> ธรรมดา
const BASE =
  "inline-flex items-center justify-center rounded-lg text-center font-bold text-white uppercase shadow-sm transition hover:-translate-y-0.5"

const SIZES = {
  sm: "px-3 py-2.5 text-[0.65rem] tracking-wider",
  md: "px-6 py-3 text-[0.7rem] tracking-wider sm:px-8 sm:py-3.5 sm:text-xs",
  lg: "px-8 py-4 text-sm tracking-wide sm:px-10 sm:py-5 sm:text-base",
}

const VARIANTS = {
  green: "bg-cozy-green hover:bg-cozy-green-dark",
  olive: "bg-cozy-olive hover:bg-cozy-olive-dark",
}

export type ButtonSize = keyof typeof SIZES
export type ButtonVariant = keyof typeof VARIANTS

export function buttonClass(size: ButtonSize = "md", variant: ButtonVariant = "green") {
  return `${BASE} ${SIZES[size]} ${VARIANTS[variant]}`
}
