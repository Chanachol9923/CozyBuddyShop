// footer สีเขียวด้านล่างทุกหน้า (บนมือถือข้อความแต่ละส่วนจะขึ้นบรรทัดใหม่)
export default function Footer() {
  return (
    <footer className="bg-cozy-green px-4 py-6 text-center text-xs leading-6 text-cozy-cream/80 sm:px-8">
      <p className="mx-auto max-w-5xl">
        <span className="block sm:inline">
          © 2026 Warantorn Chongkolrat, Benya Pengkhuean and Chanachol Polketkit. All rights reserved.
        </span>
        <span className="hidden px-2 sm:inline" aria-hidden="true">|</span>
        <span className="block sm:inline">Developed for CS319, Bangkok University by Modern Decoupled SPA</span>
        <span className="hidden px-2 sm:inline" aria-hidden="true">|</span>
        <span className="block sm:inline">
          Special thanks to{" "}
          <a
            href="https://hazelvillage.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 hover:text-white hover:underline"
          >
            Hazel Village
          </a>{" "}
          for the original data.
        </span>
      </p>
    </footer>
  )
}
