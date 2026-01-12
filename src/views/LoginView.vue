<script setup lang="ts">
import LoginUserForm from "@/components/LoginUserForm.vue";
import PageTitle from "@/components/PageTitle.vue";

const title = "Matsmart";
</script>

<template>
  <PageTitle :title="title" />
  <LoginUserForm />
</template>
