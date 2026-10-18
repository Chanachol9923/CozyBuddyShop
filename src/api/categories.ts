import type { Category } from "../assets/types"
import { loadDb } from "./db"


export async function getCategories(): Promise<Category[]> {

    const db = await loadDb()
    return db.categories

}
