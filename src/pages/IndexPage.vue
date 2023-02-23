<template>
  <router-view></router-view>
  <Category />
</template>

<script>
import { defineComponent } from "vue";
import Category from "components/Category.vue";
export default defineComponent({
  name: "IndexPage",
  components: {
    Category,
  },
});
</script>
