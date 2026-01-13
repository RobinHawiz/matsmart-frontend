<script setup lang="ts">
import Header from "@/components/Header.vue";
import PageTitle from "@/components/PageTitle.vue";
import LagerItemList from "@/components/LagerItemList.vue";

const title = "Lager";
</script>

<template>
  <Header />
  <PageTitle :title="title" />
  <LagerItemList />
</template>
