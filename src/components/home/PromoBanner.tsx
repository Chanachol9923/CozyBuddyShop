import ButtonLink from "../ui/ButtonLink"
import ImageSlot from "../ui/ImageSlot"

interface PromoBannerProps {
  to: string
  ctaLabel: string
  imageUrl?: string
  className?: string
  // class เพิ่มให้รูป เช่น object-[50%_30%] = เลื่อนจุดครอปรูปขึ้นด้านบน
  imageClassName?: string
}

// กล่องรูปใหญ่ + ปุ่มตรงกลางด้านล่าง (ใช้กับ D.I.Y)
export default function PromoBanner({ to, ctaLabel, imageUrl, className = "", imageClassName = "" }: PromoBannerProps) {
  return (
    <div className={`relative w-full ${className}`}>
      <ImageSlot src={imageUrl} className={`h-full w-full ${imageClassName}`} />
      <div className="absolute inset-x-0 bottom-8 flex justify-center px-4 sm:bottom-10">
        <ButtonLink to={to}>{ctaLabel}</ButtonLink>
      </div>
    </div>
  )
}
