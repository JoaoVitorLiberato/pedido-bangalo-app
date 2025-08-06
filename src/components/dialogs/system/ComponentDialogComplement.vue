<template>
  <v-dialog
    v-model="dialogComplement"
    transition="dialog-bottom-transition"
    max-width="500"
  >
    <v-card>
      <v-row
        no-gutters
      >
        <v-col
          cols="12"
        >
        <v-toolbar>
          <template v-slot:title>
            <div
              style="line-height: 1;"
            >
              <span
                style="font-size: 22px;"
                class="font-weight-bold"
              >
                Complementos
              </span>

              <span
                style="font-size: 13px;"
                :class="$vuetify.display.smAndDown ? 'hidden-sm-and-down' : 'font-weight-light d-block'"
              >
                Selecione os melhores acompanhamentos para você
              </span>
            </div>
          </template>

          <v-btn
            variant="plain"
            rounded="xl"
            width="25"
            height="25"
            @click="dialogComplement = false"
          >
            <v-icon
              size="lg"
            >
              close
            </v-icon>
          </v-btn>
        </v-toolbar>
        </v-col>

        <v-col
          cols="12"
          class="pa-4"
        >
          <span
            v-if="loadingComplements"
          >
            Carregando...
          </span>

          <v-row
            v-else
            no-gutters
          >
            <v-col
              cols="12"
            >
              <span
                class="font-weight-normal"
                style="color: red;font-size: 14px;"
              >
                *Você pode levar até dois acompanhamentos de graça
              </span>
            </v-col>

            <v-col
              cols="12"
              class="py-2"
            />

            <v-col
              cols="12"
            >
              <v-card
                v-for="(complement) in getCacheComplements"
                :key="`card-complement-${complement.id}`"
                class="pa-2 my-1"
                elevation="0"
                :color="cardComplementActive[complement.id] ? 'green-lighten-4' : 'grey-lighten-4'"
                @click.stop="addComplement(complement), cardComplementActive[complement.id] = !cardComplementActive[complement.id]"

              >
                <v-row
                  no-gutters
                  justify="space-between"
                  align="center"
                >
                  <v-col
                    cols="10"
                  >
                    <v-row
                      no-gutters
                    >
                      <v-col
                        cols="12"
                      >
                        <span
                          class="font-weight-bold mr-3"
                        >
                          {{ complement.name }}
                        </span>

                        <span
                          style="font-size: 14px;color: red;"
                          class="font-weight-black"
                        >
                          {{ formatedPrice(complement.price) }}
                        </span>
                      </v-col>

                      <v-col
                        cols="12"
                        style="line-height: 1;"
                      >
                        <span
                          style="font-size: 14px;"
                        >
                          {{ complement.description }}
                        </span>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col
                    cols="1"
                  >
                    <v-checkbox
                      v-model="cardComplementActive[complement.id]"
                      hide-details
                      density="compact"
                      color="success"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>

            <v-col
              cols="12"
              class="py-2"
            />

            <v-col
              cols="12"
            >
              <v-btn
                color="success"
                class="text-none"
                variant="flat"
                block
                size="large"
                @click.stop="addItemToCart()"
              >
                <v-icon>add</v-icon> Addicionar
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
  import { storeToRefs } from "pinia";
  import { useDialogStore } from "@/plugins/stores/modules/dialogStoreModule"
  import { useCacheStore } from "@/plugins/stores/modules/cacheStoreModule";
  import type { ITypesComplements } from "@/types/complement";
  import { useComplementsComposeble } from "@/composebles/integrations/useComplementsComposeble";
  import { formatedPrice } from "@/helpers/formatedPrice";

  const complementsComposeble = new useComplementsComposeble()

  const cacheStoreStore = useCacheStore()
  const {
    getCacheComplements
  } = storeToRefs(cacheStoreStore)

  const dialogStore = useDialogStore()
  const {
    getDialogComplement
  } = storeToRefs(dialogStore)

  const loadingComplements = ref(false)
  const complementSelected = ref<ITypesComplements[]>([])
  const cardComplementActive = ref<Record<string, boolean>>({})

  const dialogComplement = computed({
    get: () => getDialogComplement.value,
    set: (val:boolean) => dialogStore.setDialogComplement(val)
  })

  const addComplement = (complement: ITypesComplements) => {
    const TEST_COMPLEMENT_ALREADY_EXIST = complementSelected
      .value
      .find((item) => {
        if (item.id === complement.id) return item
      })

    const COMPLEMENT_UPDATED = {
      ...complement,
      quantity: 1,
      total: complement.price
    }

    if (!!TEST_COMPLEMENT_ALREADY_EXIST) {
      const ITEM_REMOVED = complementSelected
        .value
        .filter((item) => item.id !== complement.id)

      complementSelected.value = ITEM_REMOVED
    } else complementSelected.value.push(COMPLEMENT_UPDATED)
  }

  const addItemToCart = (): void => {
    cacheStoreStore.setCacheAddItemCart({
      status: "add",
      complements: complementSelected.value
    })
    dialogComplement.value = false
  }

  onBeforeUpdate(async() => {
    if (getDialogComplement.value === false) return

    try {
      loadingComplements.value = true
      const activeCard = new Set()
      const complements = await complementsComposeble.view() as unknown as ITypesComplements[]

      for (const { id } of complements) {
        activeCard.add({
          [id]: false
        })
      }

      cacheStoreStore.setCacheComplements(complements)
      Object.assign(cardComplementActive.value, ...activeCard)
    } catch {/* EMPTY */}
    finally {
      loadingComplements.value = false
    }
  })
</script>
