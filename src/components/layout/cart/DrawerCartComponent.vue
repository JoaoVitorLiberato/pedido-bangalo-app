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

    <v-divider />

    <v-list
      class="pa-1"
    >
      <v-list-item
        v-for="(cart_item, index) in getCacheCart"
        :key="`item-cart-${index}-${cart_item.name}`"
        class="pa-0 my-2"
      >
        <card-cart-product
          :item="cart_item"
        />
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
  import { useCacheStore } from "@/plugins/stores/modules/cacheStoreModule"
  import { storeToRefs } from "pinia"

  const cacheStore = useCacheStore()

  const {
    getCacheOpenCart,
    getCacheCart
  } = storeToRefs(cacheStore)

  const openCart = computed({
    get: () => getCacheOpenCart.value,
    set: (value) => cacheStore.setCacheOpenCart(value)
  })
</script>
