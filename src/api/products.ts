import type { ProductFromAPI } from "../assets/types"
import { loadDb } from "./db"


export async function getProducts():Promise<ProductFromAPI[]> {

    const db = await loadDb()
    return db.products

}


//ดึงอันเดียว
export async function getProduct(id:string):Promise<ProductFromAPI> {

    const db = await loadDb()

    for (const product of db.products) {
        if (product.id === id) {
            return product
        }
    }

    throw new Error("product not found")

}
