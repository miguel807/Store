<template>
  <div class="row justify-evenly">
    <q-card class="my-card" @click="redirect(electronic)">
      <q-img class="my-img" src="../assets/tecnologia.jpg">
        <div
          class="absolute-bottom text-h6 mayus"
          style="text-transform: uppercase"
        >
          {{ electronic }}
          <q-icon name="send" />
        </div>
      </q-img>
    </q-card>

    <q-card class="my-card" @click="redirect(jewelery)">
      <q-img class="my-img" src="../assets/joyeria.jpg">
        <div
          class="absolute-bottom text-h6 mayus"
          style="text-transform: uppercase"
        >
          {{ jewelery }}
          <q-icon name="send" />
        </div>
      </q-img>
    </q-card>
    <q-card class="my-card" @click="redirect(men)">
      <q-img class="my-img" src="../assets/ropaHombre.jpg">
        <div
          class="absolute-bottom text-h6 mayus"
          style="text-transform: uppercase"
        >
          {{ men }}
          <q-icon name="send" />
        </div>
      </q-img>
    </q-card>

    <q-card class="my-card" @click="redirect(women)">
      <q-img class="my-img" src="../assets/ropaMujer.jpg">
        <div
          class="absolute-bottom text-h6 mayus"
          style="text-transform: uppercase"
        >
          {{ women }}
          <q-icon name="send" />
        </div>
      </q-img>
    </q-card>
  </div>
</template>

<script setup>
import { defineComponent, onMounted, ref } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import paths from "../config/paths";
import { useRouter } from "vue-router";

onMounted(() => {
  getCategory();
});

const router = useRouter();
const $q = useQuasar();
let men = ref(null);
let women = ref(null);
let jewelery = ref(null);
let electronic = ref(null);

async function getCategory() {
  $q.loading.show({
    spinnerColor: "primary",
    backgroundColor: "white",
  });
  let path = paths.apis.getCategory;
  await api
    .get(path)
    .then((response) => {
      response = response;
      electronic.value = response.data[0];
      jewelery.value = response.data[1];
      men.value = response.data[2];
      women.value = response.data[3];
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

function redirect(category) {
  router.push({
    name: "products",
    params: { category: category },
  });
}
</script>

<style lang="sass" scoped>
.my-card
  margin-top:10%
  width: 100%
  height:250px
  max-width: 280px
  box-shadow: 2px 2px 2px #0c0c32
  transition-property:all
  transition-duration:0.3s
  position:relative

.my-img
  width:100%
  height:100%

.my-card:hover
  box-shadow: 11px 11px 11px black
  bottom:2px
  cursor: pointer


.mayus
  text-transform:uppercase
</style>
