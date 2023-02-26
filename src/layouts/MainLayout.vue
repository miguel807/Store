<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-indigo-10 q-pa-sm">
      <q-toolbar>
        <q-toolbar-title class="q-ml-xl text-7 text-white">
          EVERYTHING
          <q-icon color="grey-4" name="store" size="sm"
        /></q-toolbar-title>

        <div class="q-mr-lg">
          <q-btn-dropdown
            v-if="store.lenCarList"
            disable
            icon="shopping_cart"
            class="q-mr-lg q-pt-sm"
            round
            dense
            flat
            color="light"
            @click="alert = false"
          />
          <q-btn-dropdown
            v-else
            icon="shopping_cart"
            class="q-mr-lg q-pt-sm"
            round
            dense
            flat
            color="light"
            @click="alert = false"
          >
            <q-list style="background-color: rgb(42, 42, 42)">
              <q-item>
                <q-item-section>
                  <q-card
                    v-for="(product, index) in store.getProducts"
                    :key="product"
                    style="
                      box-shadow: 2px 2px 1px rgb(1, 8, 34);
                      padding: 3px;
                      margin-bottom: 5px;
                      position: relative;
                    "
                    class="card"
                  >
                    <q-section horizontal class="row">
                      <q-btn
                        style="margin-left: 90%"
                        size="xs"
                        @click="store.deleteProduct(index)"
                        flat
                        round
                        dense
                        v-close-popup
                      >
                        <q-tooltip>Remove product</q-tooltip>
                        <q-icon name="delete" color="primary"></q-icon>
                      </q-btn>
                      <br />
                      <q-img
                        class="my-img q-ml-xs"
                        :src="product.image"
                        style="width: 6rem; max-height: 6rem"
                        :fit="scale - down"
                        :key="scale - down"
                      />
                      <div
                        style="width: 200px; margin-left: 10px"
                        class="overflow-auto column"
                      >
                        <span
                          class="label bg-white text-black"
                          style="font-size: 13px; width: 100%"
                          >{{ product.title }}</span
                        >
                        <span
                          class="label bg-primary text-white q-pl-xs q-pr-xs"
                          style="font-size: 12px; width: max-content"
                          >${{ product.price }}</span
                        >
                        <div class="row q-mt-sm" style="margin-left: 10px">
                          <div>
                            <q-btn
                              padding="none"
                              color=""
                              @click="store.sumProduct(index)"
                            >
                              <q-icon
                                name="add"
                                color="primary"
                                size="23px"
                              ></q-icon>
                              <q-tooltip>Increase</q-tooltip>
                            </q-btn>
                          </div>
                          <div
                            class="column q-ml-sm q-mr-sm"
                            style="font-size: 13px"
                          >
                            <span class="label bg-white text-black"
                              >Total: ${{ product.totalPrice }}</span
                            >
                            <span class="label bg-white text-black"
                              >Amount: {{ product.amount }}</span
                            >
                          </div>
                          <div>
                            <q-btn
                              padding="none"
                              v-if="product.amount <= 1"
                              disable
                              @click="store.restProduct(index)"
                            >
                              <q-icon name="remove"></q-icon>
                              <q-tooltip>Decrease</q-tooltip>
                            </q-btn>
                            <q-btn
                              padding="none"
                              v-else
                              @click="store.restProduct(index)"
                            >
                              <q-tooltip>Decrease</q-tooltip>
                              <q-icon
                                name="remove"
                                color="primary"
                                size="23px"
                              />
                            </q-btn>
                          </div>
                        </div>
                      </div>
                    </q-section>
                  </q-card>
                </q-item-section>
              </q-item>
              <div style="width: 100%">
                <q-btn
                  color="dark"
                  style="width: 100%"
                  :label="'Total : $ ' + store.getTotalPrice"
                >
                </q-btn>
              </div>
            </q-list>
          </q-btn-dropdown>
          <q-badge
            class="q-mr-xl q-mt-sm bg-primary"
            style="color: white; margin-right: 5.5%"
            size="lg"
            floating
            :label="store.cantProducts"
          />
        </div>
        <div></div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useCarStore } from "stores/car";
const store = useCarStore();
</script>

<style lang="scss" scoped>
.card {
  transition-property: all;
  transition-duration: 0.3s;
}
.card:hover {
  box-shadow: 10px 10px 10px black;
  bottom: 2px;
}
</style>
