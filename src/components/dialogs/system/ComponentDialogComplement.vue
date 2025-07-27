<template>
  <v-dialog
    v-model="dialogComplement"
    transition="dialog-bottom-transition"
    width="auto"
  >
    <v-card>
      <v-row
        no-gutters
      >
        complement
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
  import { storeToRefs } from "pinia";
  import { useDialogStore } from "@/plugins/stores/modules/dialogStoreModule"

  const dialogStore = useDialogStore()
  const {
    getDialogComplement
  } = storeToRefs(dialogStore)

  const dialogComplement = computed({
    get: () => getDialogComplement.value,
    set: (val:boolean) => dialogStore.setDialogComplement(val)
  })
</script>
