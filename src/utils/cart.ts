import type { CartItem, ProductFromAPI } from "../assets/types"
import { DIY_DISCOUNT_PERCENT } from "../assets/types"

// นับของตะก้า เอาไว้โชวบนcart icon)
export function countCartItems(items:CartItem[]):number {
    let total=0
    for(const item of items) {

        total = total+item.quantity


    }


    return total
}


export function calCartTotal(items:CartItem[], products:ProductFromAPI[]): number{

    let total =  0


    for (const item of items) {
        const product = products.find((i) => i.id === item.productId)


        if (product) {
            total = total+(product.price*item.quantity)

        }
    }
    return total
}



export function calDiySet(
    products:ProductFromAPI[],
    dollId:string,
    costumeIds: string[]
) {
    // 1. รวมรหัสของตุ๊กตาและชุดทั้งหมดไว้ใน list เดียว
    const allIds:string[] = [dollId]
    for (const costumeId of costumeIds) {
        allIds.push(costumeId)
    }

    // 2. บวกราคาของแต่ละชิ้น (ราคาเต็มก่อนลด)
    let subtotal = 0
    for (const id of allIds) {
        const product = products.find((p) => p.id === id)
        if (product) {
            subtotal = subtotal + product.price
        }
    }

    // 3. คำนวณส่วนลด
    const discount = (subtotal * DIY_DISCOUNT_PERCENT) / 100
    const total = Math.round(subtotal - discount)

    // 4. ส่งผลกลับเป็น object
    return { subtotal: subtotal, total: total, saved: subtotal - total }
}

