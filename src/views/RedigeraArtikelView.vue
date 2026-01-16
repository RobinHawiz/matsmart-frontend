<script setup lang="ts">
import Header from "@/components/Header.vue";
import PageTitle from "@/components/PageTitle.vue";
import RedigeraArtikelForm from "@/components/RedigeraArtikelForm.vue";

const title = "Redigera";
</script>

<template>
  <Header />
  <PageTitle :title="title" />
  <RedigeraArtikelForm />
</template>
