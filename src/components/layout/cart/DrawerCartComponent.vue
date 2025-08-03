<template>
  <v-navigation-drawer
    v-model="openCart"
    color="grey-lighten-3"
    location="right"
    width="315"
    temporary
  >
    <v-list-item
      title="Carrinho de produtos"
      subtitle="Aqui você pode escolher quanto produtos você quer e se vai excluir o produto do carrinho de pedidos."
    ></v-list-item>
    <v-divider></v-divider>
    <v-list-item link title="List Item 1"></v-list-item>
    <v-list-item link title="List Item 2"></v-list-item>
    <v-list-item link title="List Item 3"></v-list-item>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
  import { useCacheStore } from "@/plugins/stores/modules/cacheStoreModule"
  import { storeToRefs } from "pinia"

  const cacheStore = useCacheStore()

  const {
    getCacheOpenCart
  } = storeToRefs(cacheStore)

  const openCart = computed({
    get: () => getCacheOpenCart.value,
    set: (value) => cacheStore.setCacheOpenCart(value)
  })
</script>
