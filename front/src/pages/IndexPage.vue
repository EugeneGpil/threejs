<template>
  <q-page
      class="flex flex-center bg-white-10"
      :style-fn="setMinHeightZero"
  >
    HELLO
  </q-page>
</template>

<script>
export default {
  methods: {
    setMinHeightZero: () => ({
      minHeight: 0,
    }),
  },
}
</script>
