import { defineStore } from "pinia"

import { getPriceWithDiscount } from "@/helpers/formatedPrice"
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
        if (ITEMS_CONVERTED.length > 0 && this.cart.data.length === 0) {
          this.cart.data = ITEMS_CONVERTED
        }
      }
    },
    setCacheAddItemCart (items: {
      status: string,
      update?:ITypesItemsCart[],
      complements?: Array<ITypesComplements>
    }) {
      try {
        if (/^(updateCart)$/i.test(String(items.status))) {
          this.cart.data = items.update as ITypesItemsCart[]
        } else {
          const PRODUCT = this.cart.item

          const ITEM_CART_FORMATED = {
            id: PRODUCT.id,
            name: PRODUCT.name,
            price: PRODUCT.price,
            quantity: 1,
            total: getPriceWithDiscount(PRODUCT.price),
            differences: PRODUCT.differences,
            complements: items.complements ?? []
          }

          this.cart.data.push(ITEM_CART_FORMATED)

          const ITEMS_CACHE_SESSION_STORAGE = sessionStorage.getItem("items_cart")

          if (ITEMS_CACHE_SESSION_STORAGE) {
            const ITEMS_CONVERTED = JSON.parse(ITEMS_CACHE_SESSION_STORAGE)
            if (ITEMS_CONVERTED.length > 0 && this.cart.data.length === 0) {
              this.cart.data = ITEMS_CONVERTED
              sessionStorage.setItem("items_cart", JSON.stringify([
                ...ITEMS_CONVERTED,

              ]))
            }
          } else sessionStorage.setItem("items_cart", JSON.stringify(this.cart.data))
        }


      } catch {/* empty */}
    }
  },
})
