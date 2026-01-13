<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import type { ItemEntity } from "@/models/item";
import { UserApi } from "@/composables/useUserApi";
import { ItemApi } from "@/composables/useItemApi";
import useDelay from "@/composables/useDelay";
import LagerItem from "@/components/LagerItem.vue";
import Loader from "@/components/Loader.vue";
import $toast from "@/composables/useToast";

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
  } catch (error) {
    console.log(error);
  } finally {
    state.isLoading = false;
  }
}

async function updateItemAmount(index: number, amountToChange: number) {
  state.items[index].amount += amountToChange;
  toast.success(
    `Klart! Lagersaldo för ${state.items[index].name} har uppdaterats.`,
  );
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
  <!-- Show book list when done loading -->
  <div class="w-full px-6">
    <ul
      v-if="!state.isLoading"
      class="mx-auto grid w-full max-w-240 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-4"
    >
      <LagerItem
        @update-item-amount="updateItemAmount"
        v-for="(item, index) in state.items"
        :key="item.id"
        :item="item"
        :index="index"
      />
    </ul>
  </div>
</template>
