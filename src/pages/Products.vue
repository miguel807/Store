<template>
  <div>
    <div>
      <q-btn
        label="categories"
        size="sm"
        class="q-pa-xs q-ma-md"
        style="background-color: #254099; color: white"
        @click="Back()"
      >
        <q-icon name="reply" size="sm" padding="none"></q-icon>
      </q-btn>
    </div>
    <div style="position: relative; bottom: 75px">
      <div class="row justify-start" style="column-gap: 30px; margin-left: 5%">
        <q-card class="my-card" v-for="product in data" :key="product">
          <q-img
            class="my-img"
            :src="product.image"
            fit="scale - down"
            key="scale - down"
          >
          </q-img>
          <q-card-section>
            <div class="overflow-auto" style="height: 70px; font-size: 15px">
              {{ product.title }}
            </div>
          </q-card-section>

          <q-btn
            class="q-mt-sm"
            style="
              padding-left: 5px;
              padding-right: 5px;
              margin-left: 35%;
              width: 30%;
            "
            square
            color="primary"
            :label="'$' + product.price"
          />
          <div class="row justify-around q-mb-xs">
            <q-btn-dropdown
              color="primary"
              label="Description"
              style="height: 10px; margin-top: 10px"
              dropdown-icon="change_history"
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
                    >
                      <q-item-label>{{ product.description }}</q-item-label>
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>

            <q-btn
              class="q-mt-sm my-cart"
              style="padding-left: 5px; padding-right: 5px; width: 20%"
              color="primary"
              icon="shopping_cart"
              @click="store.addProuctList(product)"
            >
              <q-tooltip class="bg-dark">Add to cart</q-tooltip>
            </q-btn>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { api } from "boot/axios";
import paths from "../config/paths";
import { useCarStore } from "stores/car";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Products-p",
  props: {
    category: String,
  },
  mounted() {
    this.getProductsByCategory();
  },
  setup() {
    const store = useCarStore();
    const $q = useQuasar();
    let data = ref(null);
    let router = useRouter();
    function Back() {
      router.push({ name: "home" });
      console.log("prueba");
    }
    async function getProductsByCategory() {
      $q.loading.show({ spinnerColor: "primary", backgroundColor: "grey-8" });
      const path = `${paths.apis.getProductsByCategory}/${this.category}`;
      await api.get(path).then((response) => {
        this.response = response.data;
        $q.loading.hide();
        this.data = this.response;
      });
    }

    return {
      store,
      getProductsByCategory,
      data,
      Back,
      alert: ref(false),
    };
  },
});
</script>

<style lang="sass" scoped>
.my-card
  margin-top:10%
  width: 100%
  max-width: 250px
  transition-property:all
  transition-duration:0.3s
  position:relative
  box-shadow: 5px 5px 5px #0c0c32


.my-img
  width:100%
  object-fit:cover
  height:250px


.my-card:hover
  box-shadow: 15px 15px 15px black
  bottom:2px
  cursor: pointer

.mayus
  text-transform:uppercase

.my-cart:hover
  cursor: pointer
</style>
