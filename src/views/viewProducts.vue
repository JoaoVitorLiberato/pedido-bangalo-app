<template>
  <main
    role="main"
    aria-label="Página de produtos"
  >
    <navbar-filter-products>
      <section-products-filtered
        v-if="getCacheFilterProducts.status"
      />

      <section-products-all
        v-else
      />
    </navbar-filter-products>
  </main>
</template>

<script lang="ts" setup>
  import { storeToRefs } from "pinia"

  import { useCacheStore } from "@/plugins/stores/modules/cacheStoreModule"

  const cacheStore = useCacheStore()
  const { getCacheFilterProducts } = storeToRefs(cacheStore)
</script>
