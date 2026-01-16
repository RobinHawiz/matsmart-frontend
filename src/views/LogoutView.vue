<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import useToast from "@/composables/useToast";

const router = useRouter();
const toast = useToast();

onMounted(() => {
  localStorage.removeItem("token");
  router.push({ name: "Login" });
  toast.info("Du är nu utloggad.");
});
</script>

<template></template>
