<template>
  <navbar-filter-products>
    <v-container
      class="pa-0"
      fluid
    >
      <v-row
        no-gutters
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
      </v-row>
    </v-container>
  </navbar-filter-products>
</template>

<script lang="ts" setup>
  import { storeToRefs } from "pinia"

  import { useCacheStore } from "@/plugins/stores/modules/cacheStoreModule"

  const cacheStore = useCacheStore()
  const { getCacheProducts } = storeToRefs(cacheStore)
</script>
