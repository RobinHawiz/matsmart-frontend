<script setup lang="ts">
defineProps({
  title: {
    type: String,
  },
});
</script>
<template>
  <h1
    class="md:text-h1 text-h1-mobile text-primary-dark-1 font-unbounded mb-10"
  >
    {{ title }}
  </h1>
</template>
