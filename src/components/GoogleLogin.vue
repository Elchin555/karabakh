<template>
  <div>
    <div @click="loginWithGoogle()" class="flex items-center cursor-pointer bg-white px-4 py-3 btn-shadow hover:bg-gray-50 rounded-2xl" >
      <div class="ml-4">
        <svg
          width="23"
          height="24"
          viewBox="0 0 23 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23 12.27C23 11.48 22.9315 10.73 22.814 10H11.7497V14.51H18.0847C17.8008 15.99 16.9685 17.24 15.7348 18.09V21.09H19.5143C21.7271 19 23 15.92 23 12.27Z"
            fill="#4285F4"
          />
          <path
            d="M11.7497 24C14.9221 24 17.5756 22.92 19.5143 21.09L15.7348 18.09C14.6773 18.81 13.3359 19.25 11.7497 19.25C8.68497 19.25 6.09025 17.14 5.16007 14.29H1.26309V17.38C3.192 21.3 7.15751 24 11.7497 24Z"
            fill="#34A853"
          />
          <path
            d="M5.16007 14.29C4.91528 13.57 4.788 12.8 4.788 12C4.788 11.2 4.92507 10.43 5.16007 9.71V6.62H1.26309C0.460196 8.24 0 10.06 0 12C0 13.94 0.460196 15.76 1.26309 17.38L5.16007 14.29Z"
            fill="#FBBC05"
          />
          <path
            d="M11.7497 4.75C13.4828 4.75 15.0298 5.36 16.2537 6.55L19.6024 3.13C17.5756 1.19 14.9221 0 11.7497 0C7.15751 0 3.192 2.7 1.26309 6.62L5.16007 9.71C6.09025 6.86 8.68497 4.75 11.7497 4.75Z"
            fill="#EA4335"
          />
        </svg>
      </div>
      <button class="flex font-medium justify-center w-full bg-transparent">
        <span>Gmail</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from "../stores";
import { useRoute } from "vue-router";
import { router } from "@/helpers";

const route = useRoute();
const authStore = useAuthStore();

const loginWithGoogle = () => {
  const googleClientId =
    "747852101252-b2i6a18df7d0m4vpp8vavpb5oqr95erm.apps.googleusercontent.com";

  const auth2 = gapi.auth2.getAuthInstance();
  auth2
    .signIn()
    .then((googleUser) => {
      const idToken = googleUser.getAuthResponse();
      // console.log("id token : ", idToken.id_token);

      return authStore
        .googleLogin(idToken.id_token)
        .then(() => {
          // loading.value = false;
          // redirect to previous url or default to home page
          console.log("google ugurlu")
          router.push(route.query.returnUrl || "/");
        })
        .catch((err) => {
          // loading.value = false;
          // inEmailOrPasswordIncorrect.value = true;
          // router.push(route.query.returnUrl || "/");
          console.log("google login error", err);
        });

      // Send the ID token to the backend for verification
      // ...
    })
    .catch((error) => {
      console.error(error);
    });
};

onMounted(() => {
  gapi.load("auth2", () => {
    gapi.auth2.init({
      client_id:

        "747852101252-b2i6a18df7d0m4vpp8vavpb5oqr95erm.apps.googleusercontent.com",
        // "433036247265-f4av048ekqeme6tbkrt1m23ksskamihm.apps.googleusercontent.com",
      plugin_name: "chat",
    });
  });
});
</script>

<style scoped>
.btn-shadow{
  box-shadow: 0px 4px 16px 0px rgba(87, 57, 30, 0.08);
}

</style>

<!-- <script>
export default {
  methods: {
    loginWithGoogle() {
      const googleClientId =
        "747852101252-b2i6a18df7d0m4vpp8vavpb5oqr95erm.apps.googleusercontent.com";

      const auth2 = gapi.auth2.getAuthInstance();
      auth2
        .signIn()
        .then((googleUser) => {
          const idToken = googleUser.getAuthResponse();
          console.log("id token : ", idToken.id_token);
          // Send the ID token to the backend for verification
          // ...
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    gapi.load("auth2", () => {
      gapi.auth2.init({
        client_id:
          "747852101252-b2i6a18df7d0m4vpp8vavpb5oqr95erm.apps.googleusercontent.com",
        plugin_name: "chat",
      });
    });
  },
};
</script> -->
