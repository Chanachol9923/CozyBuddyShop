export type ProductType = "doll" |"animal"| "costume&accessory";

export interface Category {
    id: string;
    name: string;
    image: string;

}

export interface ProductFromAPI {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    type: ProductType;
    categoryId:string;
    isBestSeller: boolean;

}

export interface DiySet{
    dollId: string|null;
    costumeId: string[];

}

export interface CartItem{
    productId: string;
    quantity: number;

}
export const DIY_COSTUME_COUNT =4;
export const DIY_DISCOUNT_PERCENT = 20;

