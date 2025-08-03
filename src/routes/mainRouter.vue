<template>
  <v-container
    class="pa-0"
    fluid
    icon
  >
    <router-view
      name="ViewProducts"
    />

    <button-cart-component />
    <drawer-cart-component />
  </v-container>
</template>
