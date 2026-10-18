import type { ReactNode } from "react"
import categoryAnimal from "../assets/img/home/category-animal.jpg"
import categoryCostume from "../assets/img/home/category-custume.jpg"
import categoryDoll from "../assets/img/home/category-doll.jpg"
import diyBanner from "../assets/img/home/d.i.y-banner.jpg"
import BestSellers from "../components/home/BestSellers"
import CategoryCard from "../components/home/CategoryCard"
import HomeHero from "../components/home/HomeHero"
import PromoBanner from "../components/home/PromoBanner"

const CATEGORY_CARDS: { id: string; buttonLabel: string; to: string; imageUrl: string; imageClassName?: string }[] = [
  // ?type=... บอกหน้า shop ว่าให้ Filter by เลือกชนิดไหนไว้ตั้งแต่แรก
  { id: "dolls", buttonLabel: "Choose Your Dolls", to: "/shop?type=doll", imageUrl: categoryDoll },
  {
    id: "animals",
    buttonLabel: "Choose Your Animals",
    to: "/shop?type=animal",
    imageUrl: categoryAnimal,
    // ตุ๊กตาในรูปนี้ตัวเล็ก ซูมเข้า 1.3 เท่า (จุดกลางซูมอยู่ที่ตัวตุ๊กตา) ให้ดูใหญ่เท่ารูป doll
    imageClassName: "scale-130 origin-[47%_45%]",
  },
  {
    id: "clothes&accessory",
    buttonLabel: "Choose Your Clothes & Accessories",
    // เครื่องหมาย & ใน URL ต้องเขียนเป็น %26 ไม่งั้นจะถูกตัดเป็นพารามิเตอร์ใหม่
    to: "/shop?type=clothes%26accessory",
    imageUrl: categoryCostume,
  },
]

function HomeSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:pt-20">
      <h2 className="mb-8 text-center text-2xl font-bold text-cozy-green-dark sm:text-3xl">{title}</h2>
      {children}
    </section>
  )
}

export default function Home() {
  return (
    <div className="pb-20 lg:pb-24">
      <HomeHero />

      <HomeSection title="Shop by Category">
        <div className="grid grid-cols-1 gap-x-1 gap-y-10 sm:grid-cols-3">
          {CATEGORY_CARDS.map((card) => (
            <CategoryCard
              key={card.id}
              buttonLabel={card.buttonLabel}
              to={card.to}
              imageUrl={card.imageUrl}
              imageClassName={card.imageClassName}
            />
          ))}
        </div>
      </HomeSection>

      <HomeSection title="Best Sellers">
        <BestSellers />
      </HomeSection>

      <HomeSection title="Create a D.I.Y Set">
        <PromoBanner
          to="/diy"
          ctaLabel="Create Your Own"
          imageUrl={diyBanner}
          imageClassName="object-[50%_25%]"
          className="h-72 sm:h-96 lg:h-[30rem]"
        />
      </HomeSection>
    </div>
  )
}
