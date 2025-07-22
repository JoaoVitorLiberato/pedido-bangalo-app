<template>
  <v-container
    class="pa-0"
    fluid
    style="background-color:#fff"
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
              color="#000"
              dark
              rounded="xl"
              size="large"
              variant="flat"
              width="150"
            >
              <v-badge
                color="success"
                content="3"
                floating
              >
                <v-icon
                  aria-label="Carrinho de produtos"
                  class="mr-2"
                  size="16"
                >
                  shopping_cart
                </v-icon>

                <span
                  style="font-size:14px"
                >
                  Carrinho
                </span>
              </v-badge>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        class="py-4 py-md-12"
        cols="12"
      />

      <v-col
        cols="12"
      >
        <v-row
          no-gutters
        >
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              label="teste"
              rounded="lg"
              variant="outlined"
            />
          </v-col>

          <v-col
            cols="12"
            md="8"
          >
            <slot />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>

</script>
