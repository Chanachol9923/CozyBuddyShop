import type { ProductFromAPI } from "../assets/types"

const BASE_URL = "http://localhost:3001"


export async function getProducts():Promise<ProductFromAPI[]> {

    const res=await fetch(`${BASE_URL}/products`)
    if (!res.ok) throw new Error("load products info maidai kub! try check api")
    return res.json()


}


//ดึงอันเดียว
export async function getProduct(id:string):Promise<ProductFromAPI> {

    const res=await fetch(`${BASE_URL}/products/${id}`)
    if (!res.ok) throw new Error("load products info maidai kub! try check apii")
    return res.json()


}
