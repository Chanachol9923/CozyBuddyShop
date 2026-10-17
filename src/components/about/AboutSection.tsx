import type { ReactNode } from "react"
import ImageSlot from "../ui/ImageSlot"

interface AboutSectionProps {
  title: string
  children: ReactNode
  imageSrc?: string
  imageAlt?: string
  // true = รูปอยู่ขวา ข้อความอยู่ซ้าย (บนมือถือรูปจะอยู่บนเสมอ)
  reverse?: boolean
}

// 1 บล็อกของหน้า about: รูป 1 ฝั่ง + หัวข้อกับข้อความอีกฝั่ง
export default function AboutSection({ title, children, imageSrc, imageAlt = "", reverse = false }: AboutSectionProps) {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 md:gap-14 lg:py-14">
      <ImageSlot
        src={imageSrc}
        alt={imageAlt}
        className={`aspect-[4/5] w-full rounded-md ${reverse ? "md:order-last" : ""}`}
      />

      <div className="max-w-lg">
        <h2 className="mb-3 font-heading text-2xl font-bold text-cozy-green sm:text-3xl">{title}</h2>
        <p className="font-slab leading-7 text-cozy-muted">{children}</p>
      </div>
    </section>
  )
}
