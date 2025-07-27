<template>
   <v-container
      class="pa-0"
      fluid
    >
      <v-slide-y-transition
        v-if="getCacheProducts.length > 0"
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
          class="pa-0"
        >
          <card-products
            :data="product"
            @add-to-cart="dialogStore.setDialogComplement(true)"
          />
        </v-col>
      </v-slide-y-transition>

      <error-product-not-found
        v-else
      />
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
  import { useDialogStore } from "@/plugins/stores/modules/dialogStoreModule"

  const cacheStore = useCacheStore()
  const { getCacheProducts } = storeToRefs(cacheStore)

  const dialogStore = useDialogStore()
</script>
