<script setup lang="ts">
import * as yup from "yup";
import { useAccountStore } from "@/stores/account";
import { ref, watch } from "vue";
import validateForm from "@/utils/validateForm";

const account = useAccountStore();

const schema = yup.object({
  email: yup
    .string()
    .email("Email invalid.")
    .required("The field is required."),
  password: yup
    .string()
    .required("The field is required.")
    .min(6, "Password must be at least 6 characters"),
});

const setDefaultForm = () => {
  return {
    email: "",
    password: "",
  };
};

const form = ref(setDefaultForm());
const errors = ref<{ [key: string]: string }>({});
const isLoading = ref(false);

watch(
  () => form.value,
  () => {
    errors.value = {};
  },
  { deep: true }
);

const onSubmit = async () => {
  errors.value = await validateForm(schema, form.value);

  if (Object.keys(errors.value).length) {
    return;
  }

  // { email: email ?? "", password: password ?? "" }
  isLoading.value = true;
  await account.login();
  isLoading.value = false;
};
</script>

<template>
  <div class="bg-white">
    <div
      class="flex justify-center login-bg bg-cover bg-no-repeat bg-center min-h-screen"
    >
      <div class="flex items-center w-full mx-5 my-8 justify-center">
        <!-- shadow -->
        <div class="flex-1 max-w-[446px] bg-white p-4 lg:p-10 rounded-2xl">
          <div class="text-center">
            <div class="flex items-center justify-center mb-5">
              <img
                class="w-10 max-h-[40px] lg:w-20 lg:max-h-[80px]"
                src="@/assets/images/logo.png"
                alt="Logo"
                loading="lazy"
              />
            </div>
            <h2 class="text-gray-900 font-extrabold text-xl lg:text-3xl">
              Log in to your account
            </h2>
            <p class="text-sm lg:text-base mt-2 text-gray-500">
              Unlock the magic – log in now!
            </p>
          </div>

          <div class="mt-4 lg:mt-8">
            <form @submit.prevent="onSubmit">
              <s-form-field
                for="email"
                label="Email"
                required
                :error="errors.email"
              >
                <s-input
                  id="email"
                  :variant="errors.email ? 'error' : 'primary'"
                  v-model="form.email"
                  class="w-full"
                  placeholder="Enter email"
                  autocomplete="email"
                >
                </s-input>
              </s-form-field>

              <s-form-field
                :class="{
                  'mt-2': errors.email,
                  'mt-5': !errors.email,
                }"
                for="password"
                label="Password"
                required
                :error="errors.password"
              >
                <s-input-password
                  id="password"
                  :variant="errors.password ? 'error' : 'primary'"
                  v-model="form.password"
                  class="w-full"
                  placeholder="Enter password"
                  autocomplete="password"
                >
                </s-input-password>
              </s-form-field>

              <div
                :class="{
                  'mt-4': errors.password,
                  'mt-8': !errors.password,
                }"
              >
                <s-button
                  :disabled="isLoading"
                  class="w-full"
                  type="submit"
                  :isLoading="isLoading"
                >
                  Sign in
                </s-button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// .login-bg {
//   background: #9333ea;
//   background: linear-gradient(66deg, #9333ea 10%, #fda4af 50%, #c084fc 90%);
// }
</style>
