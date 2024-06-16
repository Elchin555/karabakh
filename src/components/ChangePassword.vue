<template>
  <div>
    <Header />
    <div class="flex justify-center">
      <div class="w-[90%] md:w-2/3 lg:w-1/3">
        <div
          @click="sendComponentName"
          class="flex justify-start cursor-pointer"
        >
          <button class="flex items-center">
            <svg
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.49012e-08 7.5C1.49012e-08 6.94772 0.447715 6.5 1 6.5H15C15.5523 6.5 16 6.94772 16 7.5C16 8.05228 15.5523 8.5 15 8.5H1C0.447715 8.5 1.49012e-08 8.05228 1.49012e-08 7.5Z"
                fill="#361F0A"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.292893 6.79289C0.683417 6.40237 1.31658 6.40237 1.70711 6.79289L7.70711 12.7929C8.09763 13.1834 8.09763 13.8166 7.70711 14.2071C7.31658 14.5976 6.68342 14.5976 6.29289 14.2071L0.292893 8.20711C-0.0976311 7.81658 -0.0976311 7.18342 0.292893 6.79289Z"
                fill="#361F0A"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.70711 0.792893C8.09763 1.18342 8.09763 1.81658 7.70711 2.20711L1.70711 8.20711C1.31658 8.59763 0.683417 8.59763 0.292893 8.20711C-0.0976311 7.81658 -0.0976311 7.18342 0.292893 6.79289L6.29289 0.792893C6.68342 0.402369 7.31658 0.402369 7.70711 0.792893Z"
                fill="#361F0A"
              />
            </svg>
          </button>
          <span class="ml-3 font-bold text-[#361F0A] text-xl"
            >Change Password</span
          >
        </div>
        <div>
          <div class="flex justify-center">
            <label for="fileInput" class="relative cursor-pointer">
              <div
                class="w-28 h-28 overflow-hidden relative rounded-full bg-gray-200 flex items-center justify-center"
              >
                <img
                  v-if="image"
                  :src="image"
                  alt="Profile Picture"
                  class="w-28 h-28 rounded-full object-cover"
                />
                <img
                  v-else
                  class="w-full h-full object-cover"
                  src="../static/default-profile.webp"
                  alt=""
                />
                <div
                  class="flex flex-col space-y-1 bg-black bg-opacity-30 absolute w-full h-full items-center justify-center"
                >
                  <img src="../static/upload.svg" alt="" />
                  <span class="text-white font-bold text-sm">Upload</span>
                </div>
              </div>
              <input
                id="fileInput"
                type="file"
                class="hidden"
                accept="image/*"
                @change="handleFileUpload"
              />
            </label>
          </div>
          <Form
            @submit="changePassword"
            :validation-schema="schema"
            v-slot="{ errors }"
            class="space-y-6"
          >
            <div
              class="relative mt-6 rounded-md shadow-sm h-[64px] items-center"
            >
              <div
                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
              >
                <img src="../static/password.svg" alt="" />
              </div>

              <Field
                @keyup="clearErrorMessage()"
                placeholder="Current Password"
                id="oldPassword"
                name="oldPassword"
                :type="showOldPassword ? 'text' : 'password'"
                class="w-full h-full rounded-2xl py-1.5 pl-10 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 p-4 border border-[#CEC4BA] focus:outline-none focus:border-[#F29546]"
                :class="{
                  'ring-[#FF5450] focus:outline-none': errors.oldPassword,
                }"
              />
              <div
                @click="showOldPassword = !showOldPassword"
                v-if="showOldPassword"
                class="absolute top-5 right-3 cursor-pointer"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="#847464"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
              </div>
              <div
                v-else
                @click="showOldPassword = !showOldPassword"
                class="absolute top-5 right-3 cursor-pointer"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="#847464"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  ></path>
                </svg>
              </div>
              <div class="text-[#FF5450] text-sm ml-2">
                {{ errors.oldPassword }}
              </div>
              <div
                v-if="incorrectOldPassword"
                class="text-[#FF5450] text-sm ml-2"
              >
                Your old password is incorrect
              </div>
            </div>
            <div
              class="relative mt-6 rounded-md shadow-sm h-[64px] items-center"
            >
              <div
                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
              >
                <img src="../static/password.svg" alt="" />
              </div>

              <Field
                id="password"
                placeholder="New Password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full h-full rounded-2xl py-1.5 pl-10 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 p-4 border border-[#CEC4BA] focus:outline-none focus:border-[#F29546]"
                :class="{
                  'ring-[#FF5450] focus:outline-none': errors.password,
                }"
              />
              <div
                @click="showPassword = !showPassword"
                v-if="showPassword"
                class="absolute top-5 right-3 cursor-pointer"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="#847464"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
              </div>
              <div
                v-else
                @click="showPassword = !showPassword"
                class="absolute top-5 right-3 cursor-pointer"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="#847464"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  ></path>
                </svg>
              </div>
              <div class="text-[#FF5450] text-sm ml-2">
                {{ errors.password }}
              </div>
            </div>
            <div
              class="relative mt-6 rounded-md shadow-sm h-[64px] items-center"
            >
              <div
                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
              >
                <img src="../static/password.svg" alt="" />
              </div>

              <Field
                id="passwordConfirm"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Repeat password"
                name="passwordConfirm"
                class="w-full h-full rounded-2xl py-1.5 pl-10 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 p-4 border border-[#CEC4BA] focus:outline-none focus:border-[#F29546]"
                :class="{
                  'ring-[#FF5450] focus:outline-none': errors.passwordConfirm,
                }"
              />
              <div
                @click="showPassword = !showPassword"
                v-if="showPassword"
                class="absolute top-5 right-3 cursor-pointer"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="#847464"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
              </div>
              <div
                v-else
                @click="showPassword = !showPassword"
                class="absolute top-5 right-3 cursor-pointer"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="#847464"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  ></path>
                </svg>
              </div>
              <div class="text-[#FF5450] text-sm ml-2">
                {{ errors.passwordConfirm }}
              </div>
            </div>

            <div>
              <button
                type="submit"
                :disabled="loading"
                class="flex w-full justify-center rounded-2xl px-3 py-2 text-sm font-semibold text-white shadow-sm btn-gradient h-[64px] items-center"
              >
                <svg
                  v-if="loading"
                  aria-hidden="true"
                  class="w-6 h-6 mr-2 text-gray-200 animate-spin fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span>Confirm Changes</span>
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- <script setup>

// import { useEmitter } from 'pinia';
// import { useStore } from 'pinia';
import {emit} from "vue"

// const store = useStore();

const sendComponentName = () => {
  const componentName = 'EditProfile';
  emit('changeComponent', componentName);
};
</script> -->

<script setup>
import * as Yup from "yup";
// import { ref,defineEmits } from 'vue';
import { ref } from "vue";
import { Form, Field } from "vee-validate";
// import{useUsersStore} from "../stores/users.store"
const userStore = useUsersStore();
const showOldPassword = ref(false);
const showPassword = ref(false);
const loading = ref(false);
const incorrectOldPassword = ref(false);
const password = ref({
  oldPassword: null,
  newPassword: null,
  confirmNewPassword: null,
});

const schema = Yup.object().shape({
  oldPassword: Yup.string().required("Old password is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

function changePassword(password) {
  if (loading.value == false) {
    // isSubmitting.value = false;
    loading.value = true;
    return userStore
      .changePassword(password)
      .then((res) => {
        console.log("ugurlu change password", res);
        loading.value = false;
        document.getElementById("oldPassword").value = null;
        document.getElementById("password").value = null;
        document.getElementById("passwordConfirm").value = null;
      })
      .catch((err) => {
        loading.value = false;
        incorrectOldPassword.value = true;
        console.log("ugursuz change password", err);
      });
  }
}
const clearErrorMessage = () => {
  incorrectOldPassword.value = false;
};

const emit = defineEmits(["changeComponent"]);
const sendComponentName = () => {
  const componentName = "EditProfile";
  emit("changeComponent", componentName);
};
</script>
