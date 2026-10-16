import { Link } from "react-router"
import ButtonLink from "../ui/ButtonLink"
import ImageSlot from "../ui/ImageSlot"

interface CategoryCardProps {
  buttonLabel: string
  to: string
  imageUrl?: string
  // class เพิ่มให้รูป เช่น scale-130 = ซูมรูปเข้า (กรอบ overflow-hidden กันรูปล้นการ์ด)
  imageClassName?: string
}

export default function CategoryCard({ buttonLabel, to, imageUrl, imageClassName = "" }: CategoryCardProps) {
  return (
    <article className="flex flex-col">
      {/* รูปกดแล้วไปหน้าเดียวกับปุ่ม (tabIndex -1 + aria-hidden: คีย์บอร์ด/screen reader ใช้ปุ่มแทน จะได้ไม่ซ้ำ 2 ลิงก์) */}
      <Link
        to={to}
        tabIndex={-1}
        aria-hidden="true"
        className="block aspect-[4/3] w-full overflow-hidden transition-opacity hover:opacity-90 sm:aspect-[7/6]"
      >
        <ImageSlot src={imageUrl} className={`h-full w-full ${imageClassName}`} />
      </Link>
      <div className="flex justify-center px-3 pt-5 sm:pt-6">
        <ButtonLink to={to}>{buttonLabel}</ButtonLink>
      </div>
    </article>
  )
}
