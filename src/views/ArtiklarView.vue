<script setup lang="ts">
import Header from "@/components/Header.vue";
import PageTitle from "@/components/PageTitle.vue";
import ArtiklarItemList from "@/components/ArtiklarItemList.vue";

const title = "Artiklar";
</script>

<template>
  <Header />
  <PageTitle :title="title" />
  <ArtiklarItemList />
</template>
