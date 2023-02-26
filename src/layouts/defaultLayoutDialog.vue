<template>
  <div>
    <q-btn label="Create new Product" color="primary" @click="small = true" />
  </div>
  <q-dialog v-model="small">
    <q-card style="width: 300px">
      <q-card-section>
        <slot name="title">
          <div class="text-h6">Create</div>
        </slot>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <slot name="section"> </slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
const small = ref(false);
</script>
