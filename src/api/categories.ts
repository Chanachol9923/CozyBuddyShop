import type { Category } from "../assets/types"

const BASE_URL = "http://localhost:3001"



export async function getCategories(): Promise<Category[]> {
    const res = await fetch(`${BASE_URL}/categories`)


    if (!res.ok) throw new Error("load categories maidai! try check api")
        
    return res.json()

}
