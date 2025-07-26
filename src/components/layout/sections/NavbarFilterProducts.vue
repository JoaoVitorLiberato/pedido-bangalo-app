<template>
  <v-container
    class="pa-0"
    fluid
    style="background-color:#fff"
    role="main"
    aria-label="Filtro e seleção de produtos"
  >
    <v-row
      class="mx-auto pa-4"
      no-gutters
      :style="`${$vuetify.display.smAndDown ? 'max-width:375px' : 'max-width:1440px'};height:100%`"
    >
      <v-col
        cols="12"
      >
        <v-row
          align="center"
          :class="$vuetify.display.smAndDown ? 'text-center' : ''"
          justify="space-between"
          no-gutters
        >
          <v-col
            cols="12"
            md="8"
          >
            <v-row
              no-gutters
            >
              <v-col
                cols="12"
              >
                <h2
                  class="font-weight-bold"
                  :style="`font-size:${$vuetify.display.smAndDown ? 32 : 42}px`"
                  id="pedido-heading"
                >
                  Faça seu pedido
                </h2>
              </v-col>

              <v-col
                cols="12"
                style="line-height: 1;"
              >
                <span
                  class="font-weight-normal"
                  :style="`font-size:${$vuetify.display.smAndDown ? 14 : 16}px;color:grey`"
                >
                  Selecione os produtos e monte seu pedido personalizado.
                </span>
              </v-col>
            </v-row>
          </v-col>

          <v-col
            class="hidden-sm-and-down"
            cols="2"
          >
            <v-btn
              class="px-1 text-none"
              style="background: linear-gradient(135deg, #DC2626 0%, #F97316 50%, #FBBF24 100%)"
              dark
              rounded="xl"
              size="large"
              variant="flat"
              width="150"
              aria-label="Abrir carrinho de produtos"
              tabindex="0"
            >
              <v-badge
                color="success"
                content="3"
                floating
                class="d-flex align-center"
              >
                <v-icon
                  aria-label="Carrinho de produtos"
                  class="mr-1"
                  size="22"
                >
                  shopping_cart
                </v-icon>

                <span
                  style="font-size:15px"
                  class="font-weight-bold pt-1"
                >
                  Carrinho
                </span>
              </v-badge>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        class="py-4 py-md-8"
        cols="12"
      />

      <v-col
        cols="12"
      >
        <v-row
          no-gutters
          justify-md="space-between"
        >
          <v-col
            cols="12"
            md="4"
          >
            <v-row
              no-gutters
            >
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model:model-value="inputSearchProduct"
                  placeholder="Pesquise o produto que você deseja"
                  :append-inner-icon="getCacheFilterProducts.status ? 'close' : 'search'"
                  rounded="lg"
                  variant="outlined"
                  aria-label="Campo de busca de produtos"
                  @update:model-value="updateInputSearch"
                  @click:append-inner="clearInput()"
                />
              </v-col>

              <v-col
                cols="12"
                class="py-2"
              />

              <v-col
                cols="12"
              >
                <v-card
                  rounded="xl"
                  elevation="4"
                >
                  <v-row
                    no-gutters
                    class="pa-4"
                  >
                    <v-col
                      cols="12"
                      class="px-4"
                    >
                      <span
                        className="mr-2"
                        style="font-size:32px"
                      >
                        🏷️
                      </span>

                      <span
                        class="font-weight-black"
                        style="font-size: 26px;"
                        id="categorias-heading"
                      >
                        Categorias
                      </span>
                    </v-col>

                    <v-col
                      cols="12"
                      class="py-4"
                    />

                    <v-col
                      cols="12"
                    >
                      <v-row
                        no-gutters
                      >
                        <v-col
                          v-for="({ id, name }) in getCacheCategories"
                          :key="`categories-select-${id}`"
                          cols="12"
                          :class="`fix-panel-categories ${categorieSelected === id ? 'fix-apply-background' : ''} pa-4 my-1`"
                          @click="categorieSelected = id, filterForCategories()"
                          role="button"
                          :aria-label="`Selecionar categoria ${name}`"
                          tabindex="0"
                        >
                          <v-row
                            no-gutters
                            align="center"
                          >
                            <v-col
                              cols="2"
                            >
                              <span
                                style="font-size:32px"
                              >
                                {{ icons[id as keyof typeof icons]?.icon }}
                              </span>
                            </v-col>

                            <v-col
                              cols="7"
                            >
                              <span
                                class="font-weight-bold"
                                :style="`font-size: 18px;color:${categorieSelected == id ? '#fff' : '#000'}`"
                              >
                                {{ name }}
                              </span>
                            </v-col>
                            <v-col
                              cols="2"
                            >
                              <div
                                :style="`max-width:45px;height:30px;border: 2px solid ${categorieSelected == id ? '#fff' : '#000'};border-radius:13px`"
                                class="d-flex align-center justify-center"
                              >
                                <span
                                  class="font-weight-bold"
                                  :style="`font-size: 16px;color:${categorieSelected == id ? '#fff' : '#000'}`"
                                >
                                  {{ productCountedForProduct[id as keyof typeof productCountedForProduct] ?? 0 }}
                                </span>
                              </div>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-col>

          <v-col
            cols="12"
            md="7"
          >
            <slot />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="sass">
  .fix-apply-background
    background: linear-gradient(135deg, #DC2626 0%, #F97316 50%, #FBBF24 100%)
  .fix-panel-categories
    border-radius: 10px
    transition: .6s all ease
    &:hover
      cursor: pointer
      background-color: #FFCDD2
      transform: scale(1.02)
</style>

<script lang="ts" setup>
  import { onMounted, useTemplateRef } from "vue";
  import { storeToRefs } from "pinia"

  import { useCacheStore } from "@/plugins/stores/modules/cacheStoreModule"
  import { useCategoriesComposeble } from '@/composebles/useCategoriesComposeble';
  import type { ITypesCategories } from "@/types/categories"
  import DATA_IMAGES_CATEGORIES from "@/data/categories/categories.json"
  import { useProductsComposeble } from "@/composebles/useProductsComposeble"
  import type { ITypesProducts } from "@/types/products"

  const cacheStore = useCacheStore()

  const categoriesComposeble = new useCategoriesComposeble()
  const productComposeble = new useProductsComposeble()

  const {
    getCacheCategories,
    getCacheProducts,
    getCacheFilterProducts
  } = storeToRefs(cacheStore)

  const icons = computed(() => DATA_IMAGES_CATEGORIES)

  const categorieSelected = ref("todascategorias")
  const inputSearchProduct = ref("")
  const productCountedForProduct = ref({})
  const productCount = new Set()


  const productsQtdForCategory = async(categoryId:string): Promise<void> => {
    let count = 0

    for (const product of getCacheProducts.value) {
      const {
        category: {
          id
        }
      } = product

      if (categoryId === id) count += 1
    }

    productCount.add({
      [categoryId]: count
    })

    productCount.add({ "todascategorias": getCacheProducts.value.length })
    Object.assign(productCountedForProduct.value, ...productCount)
  }

  const updateInputSearch = (value:string): void => {
    if (value === "" || value === undefined) {
      cacheStore.setCacheFilterProduct({
        status: false,
        products: [],
        error: false
      })

      return
    }

    const PRODUCT_FILTER_FOR_NAME = getCacheProducts.value
      .filter((product) => {
        if (
          String(product.name)
            .toLowerCase()
              .includes(value.toLowerCase())
        ) {
          return product
        }
      })

    if (
      PRODUCT_FILTER_FOR_NAME === undefined ||
      PRODUCT_FILTER_FOR_NAME.length <= 0
    ) {
      cacheStore.setCacheFilterProduct({
        status: true,
        products: PRODUCT_FILTER_FOR_NAME,
        error: true
      })

      return
    }

    cacheStore.setCacheFilterProduct({
      status: true,
      products: PRODUCT_FILTER_FOR_NAME
    })
  }

  const filterForCategories = (): void => {
    if (String(categorieSelected.value) === "todascategorias") {
      cacheStore.setCacheFilterProduct({
        status: false,
        products: [],
        error: false
      })

      return
    }

    const PRODUCT_FILTER_FOR_CATEGORIES = getCacheProducts.value
      .filter((product) => {
        if (
          String(product.category.id) === String(categorieSelected.value)
        ) {
          return product
        }
      })

    if (
      PRODUCT_FILTER_FOR_CATEGORIES === undefined ||
      PRODUCT_FILTER_FOR_CATEGORIES.length <= 0
    ) {
      cacheStore.setCacheFilterProduct({
        status: true,
        products: PRODUCT_FILTER_FOR_CATEGORIES,
        error: true
      })

      return
    }

    cacheStore.setCacheFilterProduct({
      status: true,
      products: PRODUCT_FILTER_FOR_CATEGORIES
    })
  }

  const clearInput = (): void => {
    inputSearchProduct.value = ""
    cacheStore.setCacheFilterProduct({
      status: false,
      products: [],
      error: false
    })
  }

  onMounted(async() => {
    const [ categories, products ] = await Promise.all([
      categoriesComposeble.view(),
      productComposeble.view()
    ])

    cacheStore.setCacheProducts(products as unknown as ITypesProducts[])

    const allCategories = [
      { id: "todascategorias", name: "Todos" },
      ...categories as unknown as ITypesCategories[]
    ]
    cacheStore.setCacheCategories(allCategories)

    for (const product of getCacheProducts.value) {
      const {
        category: {
          id
        }
      } = product

      await productsQtdForCategory(id)
    }
  })
</script>
