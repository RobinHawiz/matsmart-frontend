<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <header class="flex-center fixed top-0 z-10 w-full px-3">
    <nav
      class="border-primary-light-3 hover:shadow-elevation-low w-full max-w-105 rounded-b-lg border border-solid bg-white/90 px-6 py-4 backdrop-blur-sm transition-all duration-200"
    >
      <ul class="flex gap-4">
        <li>
          <RouterLink
            activeClass="after:opacity-100 after:-bottom-1"
            class="after:bg-primary-dark-3 text-primary-dark-2 relative after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-[99%] after:opacity-0 after:transition-all after:duration-200 hover:after:translate-y-0.5 hover:after:opacity-100"
            to="/lager"
            >Lager</RouterLink
          >
        </li>
        <li>
          <RouterLink
            activeClass="after:opacity-100 after:-bottom-1"
            class="after:bg-primary-dark-3 text-primary-dark-2 relative after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:opacity-0 after:transition-all after:duration-200 hover:after:translate-y-0.5 hover:after:opacity-100"
            to="/artiklar"
            >Artiklar</RouterLink
          >
        </li>
        <li class="ml-auto">
          <RouterLink
            activeClass="after:opacity-100 after:-bottom-1"
            class="after:bg-primary-dark-3 text-primary-dark-2 relative after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:opacity-0 after:transition-all after:duration-200 hover:after:translate-y-0.5 hover:after:opacity-100"
            to="/logout"
            >Logga ut</RouterLink
          >
        </li>
      </ul>
    </nav>
  </header>
</template>
