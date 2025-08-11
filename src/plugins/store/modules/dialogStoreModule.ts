import { defineStore } from "pinia"

export const useDialogStore = defineStore("dialogStoreModule", {
  state: () => ({
    complement: false
  }),
  getters: {
    getDialogComplement: ({ complement }) => complement
  },
  actions: {
    setDialogComplement (data:boolean) {
      this.complement = data
    }
  },
})
