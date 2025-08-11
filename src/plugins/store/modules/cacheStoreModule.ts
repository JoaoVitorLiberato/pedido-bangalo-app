import { defineStore } from "pinia"

import type { ITypesProducts } from "@/types/products"
import type { ITypesCategories } from "@/types/categories"
import type { ITypesComplements } from "@/types/complement"
import type { ITypesItemsCart } from "@/types/cartItem"

export const useCacheStore = defineStore("cacheStoreModule", {
  state: () => ({
    categories: [] as ITypesCategories[],
    products: [] as ITypesProducts[],
    complements: [] as ITypesComplements[],
    filterProduct: {
      status: false,
      data: [] as ITypesProducts[],
      error: false
    },
    cart: {
      open: false,
      item: {} as ITypesProducts,
      data: [] as ITypesItemsCart[]
    }
  }),
  getters: {
    getCacheCategories: ({ categories }) => categories,
    getCacheProducts: ({ products }) => products,
    getCacheComplements: ({ complements }) => complements,
    getCacheFilterProducts: ({ filterProduct }) => filterProduct,
    getCacheItemSelected: ({ cart }) => cart.item,
    getCacheCartItems: ({ cart }) => cart.data,
    getCacheOpenCart: ({ cart }) => cart.open,
  },
  actions: {
    setCacheCategories (data: ITypesCategories[]) {
      this.categories = data
    },
    setCacheProducts (data: ITypesProducts[]) {
      this.products = data
    },
    setCacheComplements (data: ITypesComplements[]) {
      this.complements = data
    },
    setCacheFilterProduct (
      data: {
        status:boolean,
        products: ITypesProducts[],
        error?: boolean
      }) {
      this.filterProduct = {
        status: data.status,
        data: data.products,
        error: data.error ?? false
      }
    },
    setCacheTempItemCart (data: ITypesProducts) {
      this.cart.item = data
    },
    setCacheOpenCart (data: boolean) {
      this.cart.open = data
    },
    setCacheProductCartStorage () {
      const ITEMS_CACHE_SESSION_STORAGE = sessionStorage.getItem("items_cart")

      if (ITEMS_CACHE_SESSION_STORAGE) {
        const ITEMS_CONVERTED = JSON.parse(ITEMS_CACHE_SESSION_STORAGE)
        if (ITEMS_CONVERTED.length > 0) {
          this.cart.data = ITEMS_CONVERTED
        }
      }
    },
    setCacheAddItemCart (data: {
      status: string,
      item: Array<ITypesItemsCart>|ITypesItemsCart
    }) {
      try {
        if (data.status === "update") {
          this.cart.data = data.item as Array<ITypesItemsCart>
          sessionStorage.setItem("items_cart", JSON.stringify(data.item as Array<ITypesItemsCart>))
        } else {
          this.cart.data.push(data.item as ITypesItemsCart)
          const ITEMS_CACHE_SESSION_STORAGE = sessionStorage.getItem("items_cart")

          if (ITEMS_CACHE_SESSION_STORAGE) {
            const ITEMS_CONVERTED = JSON.parse(ITEMS_CACHE_SESSION_STORAGE)
            if (ITEMS_CONVERTED.length > 0) {
              sessionStorage.setItem("items_cart", JSON.stringify([
                ...ITEMS_CONVERTED,
                data.item
              ]))
            }
          } else sessionStorage.setItem("items_cart", JSON.stringify(this.cart.data))
        }
      } catch {/* empty */}
    }
  },
})
