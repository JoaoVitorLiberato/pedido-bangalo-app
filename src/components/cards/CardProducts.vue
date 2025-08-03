<template>
  <v-card
    max-width="426"
    class="fix-animation-hover ma-md-3 my-4"
    style="border-radius: 15px;"
  >
    <v-row
      no-gutters
    >
      <v-col
        cols="12"
      >
        <v-img
          :src="url ?? '/assets/produto-nao-encontrado.png'"
          height="224"
          cover
          alt="Imagem do produto: {{ name }}"
          role="img"
          :aria-label="`Imagem do produto: ${name}`"
        >
          <v-row
            no-gutters
            class="pa-2"
            justify="space-between"
            style="height: 100%;"
          >
            <v-col
              cols="8"
              md="7"
            >
              <v-chip
                style="background: linear-gradient(135deg, #DC2626 0%, #F97316 50%, #FBBF24 100%)"
                color="#000"
                class="mr-2"
                size="small"
              >
                <span>
                  {{ category.icon }}
                </span>

                <span
                  style="font-size: 12px;"
                  class="font-weight-black ml-1 py-1"
                >
                  {{ category.name }}
                </span>
              </v-chip>

              <v-chip
                v-if="price.discount.status"
                style="background-color: #DC2626;"
                color="#ddd"
                size="small"
              >

                <span
                  style="font-size: 12px;"
                  class="font-weight-black"
                >
                  -{{ price.discount.percentage }}%
                </span>
              </v-chip>
            </v-col>

            <v-col
              cols="12"
              class="d-flex justify-end align-end"
            >
              <v-chip
                color="#ddd"
                size="small"
                class="d-flex align-center"
              >
                <div>
                  <v-rating
                    :model-value="note_client"
                    :length="5"
                    density="compact"
                    :size="16"
                    disabled
                    active-color="#FBBF24"
                  />
                </div>

                <span
                  style="font-size: 13px;"
                  class="font-weight-medium ml-1"
                >
                  {{ note_client }}
                </span>
              </v-chip>
            </v-col>
          </v-row>
        </v-img>
      </v-col>

      <v-col
        cols="12"
        class="py-2"
      />

      <v-col
        cols="12"
        class="py-2 px-3 px-md-5"
      >
        <v-row
          no-gutters
        >
          <v-col
            cols="12"
          >
            <span
              class="font-weight-black"
              style="font-size: 20px;"
              v-text="name"
            />
          </v-col>

          <v-col
            cols="12"
            class="py-1"
          />

          <v-col
            cols="12"
          >
            <span
              style="color: grey;"
              v-text="description"
            />
          </v-col>

          <v-col
            cols="12"
            class="py-2"
          />

          <v-col
            cols="12"
          >
            <v-divider
              color="grey"
            />
          </v-col>

          <v-col
            cols="12"
            class="py-2"
          />

          <v-col
            cols="12"
          >
            <v-row
              no-gutters
              align="center"
              justify="space-between"
            >
              <v-col
                cols="7"
                md="6"
              >
                <v-row
                  v-if="price"
                  no-gutters
                  style="line-height: 1;"
                >
                  <v-col
                    cols="12"
                  >
                    <v-row
                      no-gutters
                    >
                      <v-col
                        v-if="price.discount.status"
                        cols="12"
                      >
                        <span
                          style="font-size: 13px;"
                          class="d-block"
                        >
                          De
                          <span
                            style="text-decoration: line-through;"
                          >
                            R${{ formatedPrice(price.default, ".") }}
                          </span> por
                        </span>

                        <span
                          style="font-size: 30px;color:#e72d00;"
                          class="font-weight-black"
                        >
                          R$ {{ formatedPrice(getFinalPrice(price), ".") }}
                        </span>
                      </v-col>

                      <v-col
                        v-else
                        cols="12"
                      >
                        <span
                          style="font-size: 30px;color:#e72d00;"
                          class="font-weight-black"
                        >
                          R$ {{ formatedPrice(price.default, ".") }}
                        </span>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col
                    cols="12"
                  >
                    <v-icon
                      color="grey"
                      size="x-small"
                    >
                      schedule
                    </v-icon>

                    <span
                      style="font-size: 14px;color:grey;"
                      class="font-weight-light mr-2"
                    >
                      40-60 min
                    </span>
                  </v-col>
                </v-row>
              </v-col>

              <v-col
                cols="5"
              >
                <v-btn
                  variant="flat"
                  class="text-none"
                  style="background: linear-gradient(135deg, #DC2626 0%, #F97316 50%, #FBBF24 100%)"
                  dark
                  rounded="lg"
                  size="large"
                  @click="$emit('addToCart')"
                  aria-label="Adicionar produto ao carrinho"
                  tabindex="0"
                  block
                >
                  <span
                    class="font-weight-bold"
                    style="color: #000;font-size: 14px;"
                  >
                    Adicionar
                  </span>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<style lang="sass">
  .fix-animation-hover
    transition: .5s all ease
    &:hover
      transform: scale(1.04)
</style>

<script lang="ts" setup>
  import type { ITypesProducts } from '@/types/products';
  import {
    formatedPrice,
    getFinalPrice
  } from '@/helpers/formatedPrice';

  defineEmits(["addToCart"])

  const props = defineProps<{
    data: ITypesProducts
  }>()

  const {
    data: {
      name,
      description,
      price,
      note_client,
      category,
      tumbnail: {
        url
      }
    }
  } = props
</script>
