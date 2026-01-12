<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import type { UserPayload } from "@/models/user";
import { UserApi } from "@/composables/useUserApi";
import useDelay from "@/composables/useDelay";
import Loader from "@/components/Loader.vue";
import Error from "@/components/Error.vue";
import user from "@/assets/images/user.svg";

const userApi = new UserApi();
const router = useRouter();

const state = reactive({
  isLoading: false,
});

const form: UserPayload = reactive({
  username: "",
  password: "",
});

const error = ref("");

async function handleSubmit() {
  error.value = "";

  if (form.username.length < 1 || form.username.length > 50) {
    error.value = "Användarnamnet måste vara mellan 1 och 50 tecken";
    return;
  }

  if (form.password.length < 1 || form.password.length > 100) {
    error.value = "Lösenordet måste vara mellan 1 och 100 tecken";
    return;
  }

  try {
    state.isLoading = true;
    await useDelay(700);
    localStorage.setItem("token", await userApi.loginUser(form));
    router.push({ name: "Lager" });
  } catch (err) {
    state.isLoading = false;
    console.log(err);
    error.value = "Felaktigt användarnamn eller lösenord";
  }
}
</script>
<template>
  <div class="w-full px-3">
    <form
      class="flex-center shadow-elevation-medium bg-primary-light-1 mx-auto w-full max-w-123.75 flex-col gap-3.75 rounded-[0.625rem] py-13"
      @submit.prevent="handleSubmit"
    >
      <h3 class="font-unbounded text-h3 text-primary-dark-1 text-center">
        Logga in
      </h3>
      <div class="leading-body text-body flex w-62.5 flex-col">
        <label for="username">Användarnamn</label>
        <input
          class="border-primary-dark-3 text-primary-dark-2 rounded-lg border border-solid px-2.5 py-1.25"
          v-model="form.username"
          type="text"
          id="username"
          name="username"
          required
        />
      </div>
      <div class="leading-body text-body flex w-62.5 flex-col">
        <label for="password">Lösenord</label>
        <input
          class="border-primary-dark-3 text-primary-dark-2 rounded-lg border border-solid px-2.5 py-1.25"
          v-model="form.password"
          type="password"
          id="password"
          name="password"
          required
        />
      </div>
      <div>
        <button
          :aria-disabled="state.isLoading"
          :disabled="state.isLoading"
          class="bg-primary-brand-1 text-primary-light-1 leading-body hover:bg-primary-brand-2 flex cursor-pointer gap-2 rounded-full px-3 py-1.5 transition-colors duration-200 ease-in-out"
          type="submit"
        >
          <img :src="user" aria-hidden="true" />
          Logga in
        </button>
      </div>
      <Loader :is-loading="state.isLoading" />
      <Error :error="error" />
    </form>
  </div>
</template>
