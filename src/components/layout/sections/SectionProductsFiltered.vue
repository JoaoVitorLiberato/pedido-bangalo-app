<template>
   <v-container
      class="pa-0"
      fluid
    >
      <v-row
        no-gutters
      >
        <v-col
          v-if="getCacheFilterProducts && getCacheFilterProducts.error"
          cols="12"
        >
          error
        </v-col>

        <v-col
         v-else
          cols="12"
        >
          <v-slide-y-transition
            class="py-0 d-flex flex-wrap"
            name="slide-y-reverse-transition"
            tag="v-row"
            group
            appear
          >
            <v-col
              v-for="product in getCacheFilterProducts.data"
              :key="`card-product-${product.id}`"
              cols="12"
              md="6"
            >
              <card-products
                :data="product"
              />
            </v-col>
          </v-slide-y-transition>
        </v-col>
      </v-row>
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
  const { getCacheFilterProducts } = storeToRefs(cacheStore)
</script>
