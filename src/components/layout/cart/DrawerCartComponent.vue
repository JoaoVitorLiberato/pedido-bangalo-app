<template>
  <v-navigation-drawer
    v-model="openCart"
    color="grey-lighten-3"
    location="right"
    width="315"
    temporary
  >
    <v-row
      no-gutters
    >
      <v-col
        v-if="getCacheCart.length > 0"
        cols="12"
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
              @deleteProduct="removeProductCart(index)"
            />
          </v-list-item>
        </v-list>
      </v-col>

      <v-col
        v-else
        cols="12"
        class="mt-10"
      >
        <v-row
          no-gutters
          justify="center"
          align="center"
          class="text-center"
        >
          <v-col
            cols="12"
          >
            <v-icon
              size="100"
            >
              no_food
            </v-icon>
          </v-col>

          <v-col
            cols="12"
            class="py-3"
          />

          <v-col
            cols="12"
          >
            <span>
              O carrinho está sem produtos
            </span>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
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

  const PRODUCTS_CACHE_CART = computed({
    get: () => getCacheCart.value,
    set: (v) => cacheStore.setCacheAddItemCart({
      status: "updateCart",
      update: v
    })
  })

  function removeProductCart (
    index:number|string
  ): void {
    const CACHE_CART = PRODUCTS_CACHE_CART.value.filter((p, index_cache_cart) => {
      if (index_cache_cart !== index) return p
    })

    PRODUCTS_CACHE_CART.value = CACHE_CART
  }

  onMounted(() => {
    cacheStore.setCacheProductCartStorage()
  })
</script>
