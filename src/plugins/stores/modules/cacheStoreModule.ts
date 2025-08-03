import { defineStore } from "pinia"

import { getFinalPrice } from "@/helpers/formatedPrice"
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
    getCacheItemId: ({ cart }) => cart.item,
    getCacheCart: ({ cart }) => cart.data,
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
    setCacheItemId (data: ITypesProducts) {
      this.cart.item = data
    },
    setCacheOpenCart (data: boolean) {
      this.cart.open = data
    },
    setCacheAddItemCart (items: {
      status: string,
      complements?: Array<ITypesComplements>
    }) {
      try {
        const ITEMS_CACHE_SESSION_STORAGE = sessionStorage.getItem("items_cart")

        if (ITEMS_CACHE_SESSION_STORAGE) {
          const ITEMS_CONVERTED = JSON.parse(ITEMS_CACHE_SESSION_STORAGE)
          if (ITEMS_CONVERTED.length > 0 && this.cart.data.length === 0) {
            this.cart.data = ITEMS_CONVERTED
            if (/^(cacheCart)$/i.test(String(items.status))) throw new Error()
          }
        }

        const PRODUCT = this.cart.item

        const ITEM_CART = {
          id: PRODUCT.id,
          name: PRODUCT.name,
          price: getFinalPrice(PRODUCT.price),
          quantity: 1,
          total: getFinalPrice(PRODUCT.price),
          differences: {
            status: PRODUCT.differences.flambed.status,
            value: PRODUCT.differences.flambed.value
          },
          complements: items.complements ?? []
        }

        if (/^(updateCart)$/i.test(String(items.status))) {
          console.log("update a pensar...")
        } else this.cart.data.push(ITEM_CART)

        sessionStorage.setItem("items_cart", JSON.stringify(this.cart.data))
      } catch {/* empty */}
    }
  },
})
