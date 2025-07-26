import { defineStore } from "pinia"
import type { ITypesProducts } from "@/types/products"
import type { ITypesCategories } from "@/types/categories"

export const useCacheStore = defineStore('cacheStoreModule', {
  state: () => ({
    categories: [] as ITypesCategories[],
    products: [] as ITypesProducts[],
    filterProduct: {
      status: false,
      data: [] as ITypesProducts[],
      error: false
    },
  }),
  getters: {
    getCacheCategories: ({ categories }) => categories,
    getCacheProducts: ({ products }) => products,
    getCacheFilterProducts: ({ filterProduct }) => filterProduct
  },
  actions: {
    setCacheCategories (data: ITypesCategories[]) {
      this.categories = data
    },
    setCacheProducts (data: ITypesProducts[]) {
      this.products = data
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
    }
  },
})
