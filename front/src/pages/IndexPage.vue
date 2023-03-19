<template>
  <q-page class="flex flex-center bg-white-10" :style-fn="setMinHeightZero">
    <div ref="container"></div>
  </q-page>
</template>

<script>
import init from "src/app/init.js";

export default {
  mounted() {
    init(this.$refs.container);
  },
  methods: {
    setMinHeightZero: () => ({
      minHeight: 0,
    }),
  },
};
</script>
