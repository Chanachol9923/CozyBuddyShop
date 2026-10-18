import type { Category, ProductFromAPI } from "../assets/types"

// ข้อมูลทั้งหมดอยู่ในไฟล์ public/CozyBuddyDB.json
// Vite และ Vercel เสิร์ฟไฟล์ใน public/ ที่ path "/" ให้อัตโนมัติ
const DB_URL = "/CozyBuddyDB.json"

interface Db {
    categories: Category[]
    products: ProductFromAPI[]
}

export async function loadDb(): Promise<Db> {

    const res = await fetch(DB_URL)
    if (!res.ok) throw new Error("load data maidai! try check CozyBuddyDB.json")
    return res.json()

}
