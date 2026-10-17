import { useState } from "react"

interface ImageSlotProps {
  src?: string
  alt?: string
  className?: string
}

// ช่องรูป ถ้ายังไม่มี src หรือโหลดรูปไม่ขึ้น จะเป็นกล่องเทาเขียนว่า img
export default function ImageSlot({ src, alt = "", className = "" }: ImageSlotProps) {
  // จำ src ที่โหลดไม่ขึ้นไว้ ถ้า src เปลี่ยนจะลองโหลดใหม่เอง
  const [failedSrc, setFailedSrc] = useState<string>()

  if (src && src !== failedSrc) {
    return <img src={src} alt={alt} onError={() => setFailedSrc(src)} className={`object-cover ${className}`} />
  }

  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center bg-cozy-placeholder text-2xl font-bold text-white ${className}`}
    >
      img
    </div>
  )
}
