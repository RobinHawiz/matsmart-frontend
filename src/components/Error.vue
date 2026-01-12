<script setup lang="ts">
defineProps({
  error: {
    type: String,
  },
});
</script>

<template>
  <div v-if="error" class="rounded-[0.625rem] bg-red-500 p-3">
    <p class="text-primary-light-1">{{ error }}</p>
  </div>
</template>
