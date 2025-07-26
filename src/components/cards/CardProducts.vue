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
        >
          teste
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
                cols="6"
              >
                <v-row
                  v-if="price"
                  no-gutters
                  style="line-height: 1;"
                >
                  <v-col
                    cols="12"
                  >
                    <span
                      style="font-size: 30px;color:#e72d00;"
                      class="font-weight-black"
                    >
                      R$ {{ formatedPrice(price.default, ".") }}
                    </span>
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
                      class="font-weight-light"
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
                >
                  <v-icon
                    color="#fff"
                    class="mr-1"
                    size="small"
                  >
                    add
                  </v-icon>

                  <span
                    class="font-weight-medium"
                    style="color: #fff;font-size: 14px;"
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
  import { formatedPrice } from '@/helpers/formatedPrice';

  defineEmits(["addToCart"])

  const props = defineProps<{
    data: ITypesProducts
  }>()

  const {
    data: {
      name,
      description,
      price,
      tumbnail: {
        url
      }
    }
  } = props
</script>
