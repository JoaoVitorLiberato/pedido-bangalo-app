<template>
   <v-container
      class="pa-0"
      fluid
    >
      <v-slide-y-transition
        class="py-0 d-flex flex-wrap"
        name="slide-y-reverse-transition"
        tag="v-row"
        group
        apper
      >
        <v-col
          v-for="product in getCacheProducts"
          :key="`card-product-${product.id}`"
          cols="12"
          md="6"
        >
          <card-products
            :data="product"
          />
        </v-col>
      </v-slide-y-transition>
    </v-container>
</template>

<style lang="sass">
  .slide-y-reverse-transition-move,
  .slide-y-reverse-transition-enter-active,
  .slide-y-reverse-transition-leave-active
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) !important
</style>

<script lang="ts" setup>
  import { storeToRefs } from "pinia"

  import { useCacheStore } from "@/plugins/stores/modules/cacheStoreModule"

  const cacheStore = useCacheStore()
  const { getCacheProducts } = storeToRefs(cacheStore)
</script>
