<script setup lang="ts">
import SyncLoader from "vue-spinner/src/SyncLoader.vue";
defineProps({
  isLoading: {
    type: Boolean,
  },
});
</script>

<template>
  <SyncLoader v-if="isLoading" class="[&>.v-sync]:bg-primary-brand-1!" />
</template>
