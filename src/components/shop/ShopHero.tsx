import shopHeroImage from "../../assets/header-bg-shop.jpg"
import ImageSlot from "../ui/ImageSlot"

interface ShopHeroProps {
  imageUrl?: string
}

// แบนเนอร์บนสุดของหน้า shop ถ้าไม่ส่ง imageUrl มาจะใช้ header-bg-shop.jpg
export default function ShopHero({ imageUrl = shopHeroImage }: ShopHeroProps) {
  return (
    <section className="h-48 w-full sm:h-60 lg:h-72">
      <ImageSlot src={imageUrl} className="h-full w-full" />
    </section>
  )
}
