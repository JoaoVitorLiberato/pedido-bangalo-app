<template>
  <v-btn
    size="x-large"
    icon
    dark
    style="
      position: fixed;
      bottom: 10px;
      right: 10px;
      background: linear-gradient(135deg, #DC2626 0%, #F97316 50%, #FBBF24 100%);
    "
    @click="handleOpenCart"
  >
    <v-badge
      color="red"
      :content="getCacheCart.length"
      floating
      class="d-flex align-center"
    >
      <v-icon>
        shopping_cart
      </v-icon>
    </v-badge>
  </v-btn>
</template>

<script lang="ts" setup>
  import { storeToRefs } from "pinia"
  import { useCacheStore } from "@/plugins/stores/modules/cacheStoreModule"

  const cacheStore = useCacheStore()

  const {
    getCacheCart,
    getCacheOpenCart
  } = storeToRefs(cacheStore)

  const handleOpenCart = () => {
    cacheStore.setCacheOpenCart(!getCacheOpenCart.value)
  }
</script>
