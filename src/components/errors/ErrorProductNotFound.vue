<template>
  <div>
    <v-row
      no-gutters
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        class="text-center"
      >
        <v-icon
          :size="$vuetify.display.smAndDown ? 180 : 250"
          color="red"
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
        class="text-center"
      >
        <span
          class="font-weight-medium"
          style="font-size: 35px;"
        >
          Nenhum produto encontrado
        </span>
      </v-col>
    </v-row>
  </div>
</template>
