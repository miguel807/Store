<template>
  <router-view></router-view>
  <Category />
</template>

<script setup>
import { defineComponent } from "vue";
import Category from "components/Category.vue";
</script>
