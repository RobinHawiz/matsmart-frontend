<script setup lang="ts">
import Header from "@/components/Header.vue";
import PageTitle from "@/components/PageTitle.vue";
import ArtiklarItemList from "@/components/ArtiklarItemList.vue";
import plus from "@/assets/images/plus-2.svg";

const title = "Artiklar";
</script>

<template>
  <Header />
  <PageTitle :title="title" />
  <ArtiklarItemList />
  <RouterLink
    :to="{ name: 'NyArtikel' }"
    aria-label="Skapa en ny artikel"
    class="bg-primary-brand-1 text-primary-light-1 hover:shadow-elevation-low leading-body hover:bg-primary-brand-2 fixed right-5.75 bottom-4.5 flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 transition-all duration-200 ease-in-out md:right-11.5 md:bottom-9.25"
  >
    <img :src="plus" aria-hidden="true" class="h-3.25 w-3.25" />
    Ny artikel
  </RouterLink>
</template>
