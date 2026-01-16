<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import type { ItemEntity } from "@/models/item";
import { UserApi } from "@/composables/useUserApi";
import { ItemApi } from "@/composables/useItemApi";
import useDelay from "@/composables/useDelay";
import Loader from "@/components/Loader.vue";
import $toast from "@/composables/useToast";
import ArtikelItem from "@/components/ArtikelItem.vue";

const userApi = new UserApi();
const itemApi = new ItemApi();
const router = useRouter();
const toast = $toast;

export type State = {
  items: Array<ItemEntity>;
  isLoading: boolean;
};

const state = reactive<State>({
  items: [],
  isLoading: true,
});

async function getAllItems() {
  try {
    state.items = await itemApi.getAllItems();
  } catch (err) {
    console.log(err);
    toast.error(
      "Ett oväntat fel inträffade. Försök igen eller kontakta support.",
    );
  } finally {
    state.isLoading = false;
  }
}

onMounted(async () => {
  try {
    state.isLoading = true;
    await useDelay(700);
    await userApi.validateToken();
  } catch (err) {
    console.log(err);
    router.push({ name: "Login" });
    toast.error("Du är utloggad. Logga in för att fortsätta.");
  }
  await getAllItems();
});
</script>

<template>
  <!-- Show loading spinner while loading is true -->
  <Loader :is-loading="state.isLoading" />
  <!-- Show item list when done loading -->
  <div class="w-full px-6">
    <ul v-if="!state.isLoading" class="flex flex-col gap-3">
      <ArtikelItem v-for="item in state.items" :key="item.id" :item="item" />
    </ul>
  </div>
</template>
