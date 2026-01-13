<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import $toast from "@/composables/useToast";

const router = useRouter();
const toast = $toast;

onMounted(() => {
  localStorage.removeItem("token");
  router.push({ name: "Login" });
  toast.info("Du är nu utloggad.");
});
</script>

<template></template>
