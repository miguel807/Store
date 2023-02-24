<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-dark q-pa-sm">
      <q-toolbar>
        <q-toolbar-title class="q-ml-xl text-7 text-white">
          EVERYTHING <q-icon color="primary" name="store" size="sm"
        /></q-toolbar-title>

        <q-input
          dark
          dense
          standout
          v-model="text"
          placeholder="Search"
          input-class="text-right"
          class="q-ml-md q-mr-xl"
          style="width: 12%"
        >
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" class="q-ml-lg" />
            <q-icon
              v-else
              name="clear"
              class="cursor-pointer"
              @click="text = ''"
            />
          </template>
        </q-input>
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
            <q-list style="background-color: #181848">
              <q-item>
                <q-item-section>
                  <q-card
                    v-for="(product, index) in store.getProducts"
                    :key="product"
                    style="
                      box-shadow: 5px 5px 1px black;
                      padding: 3px;
                      margin-bottom: 5px;
                      background: whitesmoke;
                      position: relative;
                    "
                    class="card"
                  >
                    <q-section horizontal class="row">
                      <q-btn
                        style="margin-left: 90%"
                        size="xs"
                        icon="close"
                        @click="store.deleteProduct(index)"
                        flat
                        round
                        dense
                        v-close-popup
                      />
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
                          class="label bg-primary text-white q-pl-xs"
                          style="font-size: 12px; width: 22%"
                          >${{ product.price }}</span
                        >
                        <div class="row q-mt-sm" style="margin-left: 10px">
                          <div>
                            <q-btn
                              padding="none"
                              color="primary"
                              @click="store.sumProduct(index)"
                            >
                              <q-icon name="add" size="23px"></q-icon>
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
                              color="primary"
                              icon="remove"
                              v-if="product.amount <= 1"
                              disable
                              @click="store.restProduct(index)"
                            >
                            </q-btn>
                            <q-btn
                              padding="none"
                              color="primary"
                              v-else
                              @click="store.restProduct(index)"
                            >
                              <q-icon name="remove" size="23px" />
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
            class="q-mr-xl q-mt-sm"
            style="color: #0f0c3c; margin-right: 5.5%"
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

<style lang="sass" scoped>
.card:hover
  box-shadow: 10px 10px 10px black
  bottom:2px
</style>
