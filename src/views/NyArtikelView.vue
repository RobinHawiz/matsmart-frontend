<script setup lang="ts">
import Header from "@/components/Header.vue";
import PageTitle from "@/components/PageTitle.vue";
import NyArtikelForm from "@/components/NyArtikelForm.vue";

const title = "Ny artikel";
</script>

<template>
  <Header />
  <PageTitle :title="title" />
  <NyArtikelForm />
</template>
