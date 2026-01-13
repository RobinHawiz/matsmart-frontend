<script setup lang="ts">
import { type PropType } from "vue";
import type { ItemEntity } from "@/models/item";
import rightArrow from "@/assets/images/right-arrow.svg";

const emit = defineEmits(["updateItem"]);

defineProps({
  item: {
    type: Object as PropType<ItemEntity>,
    required: true,
  },
});
</script>

<template>
  <li>
    <RouterLink :to="{ name: '' }" aria-label="Redigera artikel">
      <article
        class="bg-primary-light-1 border-primary-light-3 hover:shadow-elevation-low flex-center mx-auto max-w-163.5 gap-2.5 rounded-lg border border-solid px-3 py-4 transition-all duration-200 sm:px-2"
      >
        <div class="flex w-full flex-wrap gap-2.5">
          <img
            v-bind:src="item.imageUrl"
            alt="Produktbild"
            class="h-18.75 w-18.75 select-none"
          />
          <div class="flex max-w-125 min-w-40 flex-1 flex-col gap-2">
            <div class="flex flex-wrap gap-x-5">
              <h4 class="text-h4 font-unbounded text-primary-dark-1">
                {{ `${item.name}` }}
              </h4>
              <p class="leading-body text-body text-primary-dark-2">
                {{ `${item.description}` }}
              </p>
            </div>
            <div class="flex flex-wrap gap-2.5">
              <p
                class="text-body-small bg-primary-light-3 text-primary-dark-1 leading-body rounded-full px-2.5 py-1.25"
              >
                <span class="text-primary-dark-2">Saldo</span
                >{{ ` ${item.amount} `
                }}<span class="text-primary-dark-2">st</span>
              </p>
              <p
                class="text-body-small bg-primary-light-3 text-primary-dark-1 leading-body rounded-full px-2.5 py-1.25"
              >
                <span class="text-primary-dark-2">Pris</span
                >{{ ` ${item.price} `
                }}<span class="text-primary-dark-2">SEK</span>
              </p>
            </div>
          </div>
        </div>
        <button
          class="bg-primary-light-3 hover:bg-primary-light-4 relative h-10 min-w-10 cursor-pointer rounded-full transition-all duration-200"
        >
          <img
            :src="rightArrow"
            aria-disabled="true"
            class="pointer-events-none absolute top-1/2 left-1/2 -translate-1/2 select-none"
          />
        </button>
      </article>
    </RouterLink>
  </li>
</template>
