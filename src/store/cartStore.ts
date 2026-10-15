
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '../assets/types'

interface CartState {
  items: CartItem[]                                       
  addItem: (productId:string, quantity?:number) => void 
  removeItem:(productId:string) => void                
  setQuantity: (productId:string, quantity:number) => void 
  clear: () =>void                                      
}

export const useCartStore = create<CartState>()(   
  persist(                                         
    (set) => ({                                    
      items:[],                                   

      addItem: (productId, quantity = 1) =>
        set((state) => {                           
          const newItems: CartItem[]=[]          
          let found = false

          for (const item of state.items){  
            if (item.productId=== productId) {

              newItems.push({ productId: item.productId, quantity: item.quantity + quantity })
              found = true

            } else {

              newItems.push(item)             
            }
          }

          if (found === false) {
            newItems.push({ productId: productId, quantity: quantity })
          }

          return { items: newItems }              

        }),


      removeItem: (productId) =>
        set((state) => {
          const newItems: CartItem[]=[]

          for (const item of state.items) {
            if (item.productId !== productId) {    
              newItems.push(item)
            }
          }

          return { items:newItems }
        }),


      setQuantity: (productId, quantity) =>
        set((state) => {
          const newItems: CartItem[]= []

          for (const item of state.items) {
            if (item.productId === productId) {
              newItems.push({ productId: item.productId, quantity: quantity })
            } else {
              newItems.push(item)
            }
          }

          return { items: newItems }
        }),

      clear: () => set({ items: [] }),
    }),
    { name:'cozybuddy-cart' } 
  )
)
