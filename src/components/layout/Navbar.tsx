import { Link, NavLink } from "react-router"
import logo from "../../assets/Cozy_Buddy.png"
import { useCartStore } from "../../store/cartStore"
import { countCartItems } from "../../utils/cart"

const NAV_LINKS = [
  { to: "/shop", label: "Shop" },
  { to: "/diy", label: "Custom Pack" },
  { to: "/about", label: "About Us" },
]

export default function Navbar() {
  // เลือกเฉพาะจำนวนชิ้น navbar จะ re-render ตอนจำนวนเปลี่ยนเท่านั้น
  const cartCount = useCartStore((state) => countCartItems(state.items))

  return (
    // sticky top-0 = navbar ติดด้านบนตอน scroll
    <header className="sticky top-0 z-50 border-b border-cozy-cream-dark bg-cozy-cream">
      <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 sm:gap-3 sm:px-8">
        <Link to="/" className="justify-self-start">
          <img src={logo} alt="Cozy Buddy" className="block h-5 w-auto sm:h-8 lg:h-6" />
        </Link>

        <nav aria-label="Main">
          <ul className="flex items-center gap-3 sm:gap-9">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `border-b py-1 text-[0.65rem] whitespace-nowrap uppercase transition-colors sm:text-xs sm:tracking-wider ${
                      isActive
                        ? "border-cozy-green text-cozy-green-dark"
                        : "border-transparent text-cozy-green-soft hover:text-cozy-green-dark"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          to="/cart"
          aria-label={`Cart, ${cartCount} items`}
          className="relative justify-self-end text-cozy-green transition-colors hover:text-cozy-green-dark"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6"
            aria-hidden="true"
          >
            <circle cx="9" cy="20" r="1.4" />
            <circle cx="18" cy="20" r="1.4" />
            <path d="M2 3h3l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.9a1.5 1.5 0 0 0 1.5-1.1L21 7H6" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-cozy-green px-1 text-[0.65rem] font-bold text-white">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}
