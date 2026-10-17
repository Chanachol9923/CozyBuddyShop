
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartDiySet, CartItem } from '../assets/types'

interface CartState {
  items: CartItem[]
  diySets: CartDiySet[]                                   // เซต DIY ที่อยู่ในตะกร้า (เก็บแค่ id)
  addItem: (productId:string, quantity?:number) => void
  removeItem:(productId:string) => void
  setQuantity: (productId:string, quantity:number) => void
  addDiySet: (dollId:string, costumeIds:string[]) => void
  removeDiySet: (id:string) => void
  clear: () =>void
}

export const useCartStore = create<CartState>()(   
  persist(                                         
    (set) => ({                                    
      items:[],
      diySets:[],

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

        
//ไว้กด +-ของ
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




    // เพิ่มเซตdiy เก็บแค่ id ไม่เก็บราคา
      addDiySet: (dollId, costumeIds) =>
        set((state) => {
          const newSets: CartDiySet[] = []

          for (const diySet of state.diySets) {
            newSets.push(diySet)
            
          }

          newSets.push({ id: Date.now().toString(), dollId: dollId, costumeIds: costumeIds })

          return { diySets: newSets }


        }),


      removeDiySet: (id) =>
        set((state) => {
          const newSets:CartDiySet[] = []

          for (const diySet of state.diySets) {
            if (diySet.id !== id) {
              newSets.push(diySet)

            }
          }

          return { diySets: newSets }

        }),


      clear: () => set({ items: [], diySets: [] }),

    }),

    { name:'cozybuddy-cart' } 

  )

)
