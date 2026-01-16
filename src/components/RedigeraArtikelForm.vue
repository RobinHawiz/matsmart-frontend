<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { ItemPayload } from "@/models/item";
import Loader from "@/components/Loader.vue";
import { UserApi } from "@/composables/useUserApi";
import { ItemApi } from "@/composables/useItemApi";
import useDelay from "@/composables/useDelay";
import $toast from "@/composables/useToast";
import update from "@/assets/images/update.svg";
import trash from "@/assets/images/trash.svg";

const userApi = new UserApi();
const itemApi = new ItemApi();

const route = useRoute();
const router = useRouter();
const id = parseInt(route.params.id as string);
const form = ref({} as ItemPayload);
const isLoadingForm = ref(true);
const isLoadingRequest = ref(false);
const toast = $toast;

async function updateItem() {
  if (form.value.name.length < 1 || form.value.name.length > 100) {
    toast.error("Artikelnamnet måste vara mellan 1 och 100 tecken.");
    return;
  }

  if (
    form.value.description.length < 1 ||
    form.value.description.length > 200
  ) {
    toast.error("Beskrivningen måste vara mellan 1 och 200 tecken.");
    return;
  }

  if (form.value.price < 0) {
    toast.error("Priset måste vara 0 eller mer.");
    return;
  }

  if (form.value.amount < 0) {
    toast.error("Antalet måste vara 0 eller mer.");
    return;
  }

  try {
    isLoadingRequest.value = true;
    await useDelay(700);
    await itemApi.updateItem(id, form.value);
    toast.success(`Artikeln ${form.value.name} har uppdaterats.`);
    router.push({ name: "Artiklar" });
  } catch (err) {
    console.log(err);
    toast.error(
      "Ett oväntat fel inträffade. Försök igen eller kontakta support.",
    );
  } finally {
    isLoadingRequest.value = false;
  }
}

async function deleteItem() {
  try {
    if (!confirm("Är du säker på att du vill ta bort den här artikeln?")) {
      return;
    }
    isLoadingRequest.value = true;
    await useDelay(700);
    await itemApi.deleteItem(id);
    toast.success(`Artikeln ${form.value.name} har tagits bort.`);
    router.push({ name: "Artiklar" });
  } catch (err) {
    console.log(err);
    toast.error(
      "Ett oväntat fel inträffade. Försök igen eller kontakta support.",
    );
  } finally {
    isLoadingRequest.value = false;
  }
}

onMounted(async () => {
  try {
    await useDelay(700);
    await userApi.validateToken();
  } catch (err) {
    console.log(err);
    router.push({ name: "Login" });
    toast.error("Du är utloggad. Logga in för att fortsätta.");
  }
  try {
    const { id, ...payload } = await itemApi.getOneItem(
      parseInt(route.params.id as string),
    );
    form.value = payload;
    isLoadingForm.value = false;
  } catch (err) {
    console.log(err);
    toast.error(
      "Ett oväntat fel inträffade. Försök igen eller kontakta support.",
    );
    router.push({ name: "Artiklar" });
  }
});
</script>

<template>
  <!-- Show loading spinner while loading the form is true -->
  <Loader :is-loading="isLoadingForm" />
  <!-- Show item list when done loading the form -->
  <div v-if="!isLoadingForm" class="w-full px-3">
    <form
      @submit.prevent="updateItem"
      class="flex-center shadow-elevation-medium bg-primary-light-1 mx-auto w-full max-w-190 flex-col rounded-[0.625rem] py-4.5"
    >
      <div class="flex w-full max-w-135.25 flex-col gap-3.75 px-3">
        <div class="leading-body text-body text-primary-dark-1 flex flex-col">
          <label for="namn">Namn</label>
          <input
            class="border-primary-dark-3 text-primary-dark-2 rounded-lg border border-solid px-2.5 py-1.25"
            v-model="form.name"
            type="text"
            id="namn"
            name="namn"
            required
          />
        </div>
        <div class="flex flex-wrap gap-3.75">
          <div
            class="leading-body text-body text-primary-dark-1 flex min-w-50 flex-1 flex-col"
          >
            <label for="amount">Antal i lager</label>
            <input
              class="border-primary-dark-3 text-primary-dark-2 rounded-lg border border-solid px-2.5 py-1.25"
              v-model="form.amount"
              type="number"
              id="amount"
              name="amount"
              required
              min="0"
            />
          </div>
          <div
            class="leading-body text-body text-primary-dark-1 flex min-w-50 flex-1 flex-col"
          >
            <label for="price">Pris (SEK)</label>
            <input
              class="border-primary-dark-3 text-primary-dark-2 rounded-lg border border-solid px-2.5 py-1.25"
              v-model="form.price"
              type="number"
              id="price"
              name="price"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>
        <div class="flex flex-wrap gap-3.75">
          <div class="flex min-w-50 flex-1 flex-col">
            <img
              class="mx-auto h-38.75 w-38.75"
              :src="form.imageUrl"
              alt="Produktbild"
            />
            <div
              class="leading-body text-body text-primary-dark-1 flex flex-col"
            >
              <label for="imageUrl">Välj bild</label>
              <select
                class="border-primary-dark-3 leading-body text-primary-dark-2 h-[2.55rem] rounded-lg border border-solid px-2.5 py-1.25"
                v-model="form.imageUrl"
                id="imageUrl"
                name="imageUrl"
                required
              >
                <option value="/images/drink.png">Dryck</option>
                <option value="/images/dairy.png">Mejeri & kylvaror</option>
                <option value="/images/vegetable.png">Frukt & grönt</option>
                <option value="/images/pantry.png">Torrvaror</option>
                <option value="/images/frozen.png">Frysvaror</option>
                <option value="/images/dragon.jpg">Drake</option>
                <option value="/images/placeholder.png">Ingen bild</option>
              </select>
            </div>
          </div>
          <div
            class="leading-body text-body text-primary-dark-1 flex min-w-50 flex-1 flex-col"
          >
            <label for="description">Beskrivning</label>
            <textarea
              class="border-primary-dark-3 text-primary-dark-2 h-full rounded-lg border border-solid px-2.5 py-1.25"
              v-model="form.description"
              id="description"
              name="description"
              required
            ></textarea>
          </div>
        </div>
        <div class="flex justify-center gap-3.75">
          <button
            :disabled="isLoadingRequest"
            class="bg-primary-brand-1 text-primary-light-1 leading-body hover:bg-primary-brand-2 flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 transition-colors duration-200 ease-in-out"
            type="submit"
          >
            <img :src="update" aria-hidden="true" class="h-3.25 w-3.25" />
            Uppdatera
          </button>
          <button
            @click.prevent="deleteItem"
            :disabled="isLoadingRequest"
            class="text-primary-dark-1 leading-body border-primary-dark-1 bg-primary-light-1 hover:bg-primary-light-3 flex cursor-pointer items-center gap-2 rounded-full border border-solid px-3 py-1.5 transition-colors duration-200 ease-in-out"
          >
            <img :src="trash" aria-hidden="true" class="h-3.25 w-3.25" />
            Ta bort
          </button>
        </div>
      </div>
      <Loader class="mt-5" :is-loading="isLoadingRequest" />
    </form>
  </div>
</template>
