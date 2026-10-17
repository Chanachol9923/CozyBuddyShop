import { Outlet, ScrollRestoration } from "react-router"
import Footer from "../components/layout/Footer"
import Navbar from "../components/layout/Navbar"

// layout หลัก: navbar กับ footer อยู่ตลอด ส่วนเนื้อหาแต่ละหน้าจะมาแสดงที่ <Outlet />
// flex-col + flex-1 ที่ main = footer อยู่ล่างสุดเสมอ แม้หน้าจะสั้น
export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-cozy text-cozy-text scheme-light">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {/* เปลี่ยนหน้าแล้วเลื่อนขึ้นบนสุด (กด back จะกลับไปตำแหน่งเดิม) */}
      <ScrollRestoration />
    </div>
  )
}
