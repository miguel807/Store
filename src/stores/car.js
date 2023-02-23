import { defineStore } from "pinia";
import { reactive } from "vue";
import { Notify } from "quasar";

export const useCarStore = defineStore("car", {
  state: () => {
    return {
      carList: [],
    };
  },
  getters: {
    getProducts: (state) => {
      return state.carList;
    },
    lenCarList: (state) => {
      let cant = state.carList.length;
      if (cant == 0) {
        return true;
      } else {
        return false;
      }
    },
    cantProducts: (state) => {
      let total = 0;
      for (let i = 0; i < state.carList.length; i++) {
        total += state.carList[i].amount;
      }
      return total;
    },
    getTotalPrice: (state) => {
      let total = 0;
      for (let i = 0; i < state.carList.length; i++) {
        total += state.carList[i].totalPrice;
      }
      var rounded = Math.round((total + Number.EPSILON) * 100) / 100;
      return rounded;
    },
  },
  actions: {
    addProuctList(product) {
      const found = this.carList.find((element) => element == product);
      if (found) {
        Notify.create({
          color: "blue-grey-14",
          message: "This product has been added already",
        });
        return false;
      }
      let copia = product;
      copia.amount = 1;
      copia.totalPrice = product.price;
      this.carList.push(copia);
      Notify.create({
        message: "Product added",
        color: "indigo-14",
      });
    },

    deleteProduct(index) {
      this.carList.splice(index, 1);
    },
    sumProduct(index) {
      let product = this.carList[index];
      let totalAmount = (product.amount += 1);
      product.totalPrice = totalAmount * product.price;
      var rounded =
        Math.round((product.totalPrice + Number.EPSILON) * 100) / 100;
      product.totalPrice = rounded;
    },
    restProduct(index) {
      let product = this.carList[index];
      let totalAmount = (product.amount -= 1);
      product.totalPrice = totalAmount * product.price;
    },
  },
});
