import type { ShowAllInAPI } from "../assets/types"

const BASE_URL = "http://localhost:3001"


export async function getShowAll():Promise<ShowAllInAPI[]> {

    const res=await fetch(`${BASE_URL}/showallapi`)
    if (!res.ok) throw new Error("load products info maidai kub! try check api")
    return res.json()


}
