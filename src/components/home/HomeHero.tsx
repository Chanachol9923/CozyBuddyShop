import heroImage from "../../assets/header-bg.jpg"
import ButtonLink from "../ui/ButtonLink"

// แบนเนอร์แรกของหน้า home: รูปพื้นหลัง + ข้อความต้อนรับ + ปุ่มไปหน้า shop
export default function HomeHero() {
  return (
    <section className="relative flex h-[32rem] items-center justify-center overflow-hidden px-4 sm:h-[38rem] lg:h-[42rem]">
      <img
        src={heroImage}
        alt=""
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative flex max-w-5xl flex-col items-center text-center">
        {/* [text-shadow] = เงาสีครีมรอบตัวอักษร ช่วยให้อ่านง่ายตอนข้อความทับรูป */}
        <h1 className="font-title text-4xl leading-tight font-bold tracking-wide text-cozy-green uppercase [text-shadow:0_0_18px_rgb(245_242_233/0.9)] sm:text-5xl lg:text-6xl">
          Welcome to our forest home
        </h1>
        <p className="mt-4 font-tagline text-lg text-cozy-green-dark italic [text-shadow:0_0_18px_rgb(245_242_233/0.9)] sm:mt-6 sm:text-2xl">
          Soft dolls &amp; woodland animals, ethically handmade by local artisans
        </p>
        <div className="mt-8 sm:mt-10">
          <ButtonLink to="/shop" size="lg">
            Meet the Buddies
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
