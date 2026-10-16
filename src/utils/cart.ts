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




