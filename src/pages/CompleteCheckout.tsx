import completeCheckoutImage from "../assets/img/completeCheckout/completeCheckout-pic.jpg"
import ButtonLink from "../components/ui/ButtonLink"
import ImageSlot from "../components/ui/ImageSlot"

// หน้าขอบคุณหลังกด Checkout (ตะกร้าถูกล้างไปแล้วตอนกดปุ่มในหน้า Cart)
export default function CompleteCheckout() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:py-24">
      <h1 className="mb-8 text-3xl font-medium text-cozy-green-dark sm:text-4xl">Thank you for Shopping</h1>

      <ImageSlot
        src={completeCheckoutImage}
        alt="Watercolor bunny in a mail hat carrying a stack of parcels"
        className="mb-8 aspect-square w-64 sm:w-80"
      />

      <ButtonLink to="/">Back to Home</ButtonLink>
    </section>
  )
}
