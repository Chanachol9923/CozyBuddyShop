import type { ReactNode } from "react"
import { Link } from "react-router"
import { buttonClass, type ButtonSize, type ButtonVariant } from "./buttonStyles"

interface ButtonLinkProps {
  to: string
  children: ReactNode
  size?: ButtonSize
  variant?: ButtonVariant
  className?: string
}

// ปุ่มที่กดแล้วไปหน้าอื่น (สีเขียวเข้มเป็นค่าเริ่มต้น)
export default function ButtonLink({ to, children, size = "md", variant = "green", className = "" }: ButtonLinkProps) {
  return (
    <Link to={to} className={`${buttonClass(size, variant)} ${className}`}>
      {children}
    </Link>
  )
}
