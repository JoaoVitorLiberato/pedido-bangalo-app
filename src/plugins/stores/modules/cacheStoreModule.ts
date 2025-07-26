import { defineStore } from "pinia"
import type { ITypesProducts } from "@/types/products"
import type { ITypesCategories } from "@/types/categories"

export const useCacheStore = defineStore('cacheStoreModule', {
  state: () => ({
    categories: [] as ITypesCategories[],
    products: [] as ITypesProducts[],
  }),
  getters: {
    getCacheCategories: ({ categories }) => categories,
    getCacheProducts: ({ products }) => products
  },
  actions: {
    setCacheCategories (data: ITypesCategories[]) {
      this.categories = data
    },
    setCacheProducts (data: ITypesProducts[]) {
      this.products = data
    }
  },
})
