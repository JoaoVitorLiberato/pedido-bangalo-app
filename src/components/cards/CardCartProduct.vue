<template>
  <v-card
    variant="flat"
    class="pa-2"
  >
    <v-row
      no-gutters
    >
      <v-col
        cols="12"
        style="max-width: 306px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
      >
        <span
          style="font-size: 14px;"
          class="font-weight-medium text-uppercase"
        >
          {{ item.name }}
        </span>
      </v-col>

      <v-col
        cols="12"
        class="pb-1"
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
            cols="8"
          >
            <v-chip
              v-if="/flambed/i.test(String(Object.keys(item.differences)[0]))"
              color="error"
              density="compact"
              variant="tonal"
              class="pa-1 mr-1"
              style="font-size: 10px;"
            >
              Flambado
            </v-chip>

            <v-chip
              v-else-if="/breaded/i.test(String(Object.keys(item.differences)[0]))"
              color="orange-accent-4"
              density="compact"
              class="mr-1"
              style="font-size: 12px;"
            >
              Empanado
            </v-chip>

            <v-chip
              v-else-if="/especial/i.test(String(Object.keys(item.differences)[0]))"
              color="yellow-darken-3"
              density="compact"
              class="mr-1"
              style="font-size: 12px;"
            >
              Especial
            </v-chip>

            <v-chip
              v-else
              color="success"
              density="compact"
              class="mr-1"
              style="font-size: 12px;"
            >
              Natural
            </v-chip>

            <v-chip
              v-if="item.price.discount.status"
              color="pink-darken-1"
              density="compact"
              class="mr-1"
              style="font-size: 12px;"
            >
              -{{ item.price.discount.percentage }}%
            </v-chip>
          </v-col>

          <v-col
            cols="1"
          >
            <v-btn
              variant="text"
              color="error"
              block
            >
              <v-icon>
                delete
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        cols="12"
        class="py-1"
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
            cols="5"
          >
            <span
              class="font-weight-bold"
              style="font-size: 17px;"
            >
              {{ formatedPrice((item.total * item.quantity)) }}
            </span>
          </v-col>

          <v-col
            cols="6"
          >
            <v-row
              no-gutters
              align="center"
              justify="space-between"
            >
              <v-col
                cols="3"
              >
                <v-btn
                  density="compact"
                  variant="flat"
                  block
                  style="background: linear-gradient(135deg, #DC2626 0%, #F97316 50%, #FBBF24 100%)"
                >
                  <v-icon
                    size="xs"
                  >
                    remove
                  </v-icon>
                </v-btn>
              </v-col>

              <v-col
                cols="3"
                class="text-center"
              >
                <span
                  v-text="item.quantity || 0"
                />
              </v-col>

              <v-col
                cols="3"
              >
                <v-btn
                  density="compact"
                  variant="flat"
                  block
                  style="background: linear-gradient(135deg, #DC2626 0%, #F97316 50%, #FBBF24 100%)"
                >
                  <v-icon>
                    add
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        cols="12"
        class="py-1"
      />

      <v-col
        cols="12"
      >
        <v-btn
          block
          variant="flat"
          color="deep-orange-lighten-5"
          class="text-none d-block"
        >
          <v-row
            no-gutters
            align="center"
            justify="space-between"
          >
            <v-col
              cols="6"
              class="text-start"
            >
              Ver mais
            </v-col>

            <v-col
              cols="2"
            >
              <v-icon>
                keyboard_arrow_down
              </v-icon>
            </v-col>
          </v-row>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts" setup>
  import type { ITypesItemsCart } from '@/types/cartItem';
  import { formatedPrice } from '@/helpers/formatedPrice';

  const { item } = defineProps<{
    item: ITypesItemsCart
  }>()
</script>
