<script setup lang="ts">
import { ref, type PropType } from "vue";
import type { ItemEntity } from "@/models/item";
import { ItemApi } from "@/composables/useItemApi";
import useDelay from "@/composables/useDelay";
import useToast from "@/composables/useToast";
import Loader from "@/components/Loader.vue";
import update from "@/assets/images/update.svg";
import minus from "@/assets/images/minus.svg";
import plus from "@/assets/images/plus.svg";

const emit = defineEmits(["updateItemAmount"]);
const toast = useToast();
const isLoading = ref(false);
let counter = ref(0);

const itemApi = new ItemApi();
defineProps({
  item: {
    type: Object as PropType<ItemEntity>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

async function updateItemAmount(
  id: number,
  index: number,
  currentAmount: number,
  amountToChange: number,
) {
  if (currentAmount + amountToChange < 0) {
    toast.error(`Otillräckligt lagersaldo. Tillgängligt: ${currentAmount} st.`);
    return;
  }

  if (amountToChange === 0) {
    toast.error("Ange ett antal att lägga till eller ta bort.");
    return;
  }

  try {
    isLoading.value = true;
    await useDelay(700);
    await itemApi.updateItemAmount(id, amountToChange);
    counter = ref(0);
    emit("updateItemAmount", index, amountToChange);
  } catch (err) {
    console.log(err);
    toast.error(
      "Ett oväntat fel inträffade. Försök igen eller kontakta support.",
    );
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <li>
    <article
      class="bg-primary-light-1 border-primary-light-3 hover:shadow-elevation-low flex-center mx-auto w-full flex-col gap-3 rounded-lg border border-solid p-5 transition-all duration-200 lg:max-w-77.25"
    >
      <p
        class="text-body-small bg-primary-light-3 text-primary-dark-1 leading-body mr-auto rounded-full px-2.5 py-1.25"
      >
        <span class="text-primary-dark-2">Saldo</span>{{ ` ${item.amount} `
        }}<span class="text-primary-dark-2">st</span>
      </p>
      <img
        v-bind:src="item.imageUrl"
        alt="Produktbild"
        class="h-38.75 w-38.75"
      />
      <div class="w-full">
        <h4 class="text-h4 font-unbounded text-primary-dark-1 truncate">
          {{ `${item.name}` }}
        </h4>
        <p class="leading-body text-body text-primary-dark-2 truncate">
          {{ `${item.description}` }}
        </p>
      </div>
      <div class="flex w-43.5 items-center justify-between">
        <button
          class="bg-primary-light-3 hover:bg-primary-light-4 relative h-10 w-10 cursor-pointer rounded-full transition-all duration-200"
          @click="counter--"
        >
          <img
            :src="minus"
            aria-disabled="true"
            class="absolute top-1/2 left-1/2 -translate-1/2"
          />
        </button>
        <p class="text-body-big leading-body text-primary-dark-1">
          {{ `${counter} st` }}
        </p>
        <button
          :src="plus"
          class="bg-primary-light-3 hover:bg-primary-light-4 relative h-10 w-10 cursor-pointer rounded-full transition-all duration-200"
          @click="counter++"
        >
          <img
            :src="plus"
            aria-disabled="true"
            class="absolute top-1/2 left-1/2 -translate-1/2"
          />
        </button>
      </div>
      <button
        @click="updateItemAmount(item.id, index, item.amount, counter)"
        class="bg-primary-brand-1 text-primary-light-1 leading-body hover:bg-primary-brand-2 flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 transition-colors duration-200 ease-in-out"
      >
        <img :src="update" aria-hidden="true" class="h-3.25 w-3.25" />
        Uppdatera saldo
      </button>
      <Loader class="mt-4" :is-loading="isLoading" />
    </article>
  </li>
</template>
