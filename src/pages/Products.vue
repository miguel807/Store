<template>
  <div style="position: relative; bottom: 75px">
    <div class="row justify-start" style="column-gap: 30px; margin-left: 5%">
      <q-card class="my-card" v-for="product in data" :key="product">
        <q-card-section>
          <div
            class="overflow-auto text-justify text-subtitle2 text-uppercase overflow-auto"
            style="height: 100px"
          >
            {{ product.title }}
          </div>
        </q-card-section>
        <q-img
          class="my-img"
          style="margin-left: 10%"
          :src="product.image"
          fit="scale - down"
          key="scale - down"
        >
        </q-img>
        <div class="q-mt-lg">
          <span style="margin-left: 35px; 40px; font-weight: bold">
            ${{ product.price }}
          </span>
        </div>
        <div class="row justify-around q-mb-xs">
          <q-btn-dropdown
            flat
            class="btn-dropdown"
            text-color="primary"
            style="height: 10px; margin-top: 10px"
            label="Description"
          >
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <div
                    style="
                      width: 150px;
                      height: 200px;
                      overflow: auto;
                      display: block;
                    "
                    class="text-justify"
                  >
                    <q-item-label
                      class="q-mr-md"
                      style="font-size: 12px height:min-content"
                      >{{ product.description }}</q-item-label
                    >
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>

          <q-btn
            flat
            class="q-mt-sm my-cart q-mb-sm"
            style="padding-left: 5px; padding-right: 5px; width: 20%"
            @click="store.addProuctList(product)"
          >
            <q-icon color="blue-9" name="shopping_cart"></q-icon>
            <q-tooltip class="bg-dark">Add to cart</q-tooltip>
          </q-btn>
        </div>
      </q-card>
    </div>
  </div>
  <defaultLayoutDialog>
    <template #title>
      <div class="text-h6">Aqui estoy editando el nombre</div>
    </template>

    <template #section>
      <q-input v-model="title" label="Title" />
      <q-input v-model="description" label="Description" />
      <q-input v-model="price" label="Price" />

      <q-btn flat label="Create" @click="ver" icon="add" v-close-popup />
    </template>
  </defaultLayoutDialog>
</template>

<script setup>
import {
  defineComponent,
  defineProps,
  onMounted,
  ref,
  resolveDirective,
} from "vue";
import { useQuasar } from "quasar";
import { api } from "boot/axios";
import paths from "../config/paths";
import { useCarStore } from "stores/car";
import { useRouter } from "vue-router";
import defaultLayoutDialog from "layouts/defaultLayoutDialog.vue";

const props = defineProps({
  category: String,
});
onMounted(() => {
  getProductsByCategory();
});

const store = useCarStore();
const $q = useQuasar();
let data = ref(null);
let router = useRouter();
let title = ref(null);
let description = ref(null);
let price = ref(null);

function ver() {
  console.log(title);
  console.log(description);
  console.log(price);
}
async function getProductsByCategory() {
  $q.loading.show({ spinnerColor: "primary", backgroundColor: "grey-10" });
  const path = `${paths.apis.getProductsByCategory}/${props.category}`;
  await api
    .get(path)
    .then((response) => {
      response = response;
      data.value = response.data;
    })
    .catch((reason) => {
      return {
        status: reason.response.status,
        message: reason.response.data.message,
      };
    })
    .finally(() => {
      $q.loading.hide();
    });
}
</script>

<style lang="scss" scoped>
.my-card {
  margin-top: 10%;
  width: 100%;
  max-width: 280px;
  transition-property: all;
  transition-duration: 0.3s;
  position: relative;
  box-shadow: 5px 5px 5px #0c0c32;
}

.my-img {
  width: 80%;
  object-fit: cover;
  height: 250px;
}
.my-card:hover {
  box-shadow: 6px 9px 11px rgb(1, 14, 60);
  bottom: 2px;
  cursor: pointer;
  background-color: #dfe9ee;
}

.my-cart:hover {
  cursor: pointer;
}

.btn-dropdown:hover {
  cursor: pointer;
  background-color: #d1dce3;
}
</style>
