<template>
  <div>
    <div
      @click="loginWithFacebook()"
      class="flex items-center cursor-pointer bg-white px-4 py-3 btn-shadow hover:bg-gray-50 rounded-2xl"
    >
      <div class="ml-4">
        <svg
          width="13"
          height="24"
          viewBox="0 0 13 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.1482 13.3981L12.8219 9.08738H8.60731V6.29001C8.60731 5.11069 9.19602 3.96117 11.0838 3.96117H13V0.291262C13 0.291262 11.2609 0 9.59833 0C6.12716 0 3.85845 2.06447 3.85845 5.80194V9.08738H0V13.3981H3.85845V23.8188C4.63213 23.938 5.4251 24 6.23288 24C7.04066 24 7.83363 23.938 8.60731 23.8188V13.3981H12.1482Z"
            fill="#1877F2"
          />
        </svg>
      </div>
      <button
        class="flex justify-center w-full bg-transparent"
      >
        <span class="">Facebook</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "../stores";
import { useRoute } from "vue-router";
import { router } from "@/helpers";

const route = useRoute();
const authStore = useAuthStore();

// const sendAccessToken = (accessToken) => {
//   console.log("accessToken : ", accessToken);
//   return authStore
//     .facebookLogin(accessToken)
//     .then(() => {
//       // loading.value = false;
//       // redirect to previous url or default to home page
//       console.log("facebook ugurlu");
//       router.push(route.query.returnUrl || "/");
//     })
//     .catch((err) => {
//       // loading.value = false;
//       // inEmailOrPasswordIncorrect.value = true;
//       // router.push(route.query.returnUrl || "/");
//       console.log("facebook login error", err);
//     });
// };
function sendAccessToken(accessToken){
   console.log("tokene bax77",accessToken)
      authStore
    .facebookLogin(accessToken)
    .then(() => {
      // loading.value = false;
      // redirect to previous url or default to home page
      console.log("facebook ugurlu");
      router.push(route.query.returnUrl || "/");
    })
    .catch((err) => {
      // loading.value = false;
      // inEmailOrPasswordIncorrect.value = true;
      // router.push(route.query.returnUrl || "/");
      console.log("facebook login error", err);
    });
}

const loginWithFacebook = () => {
  FB.login(
    (response) => {
      if (response.authResponse) {
        const { accessToken } = response.authResponse;
        sendAccessToken(accessToken);
      }
    },
    { scope: "email" }
  );
};

onMounted(() => {
  // Load the Facebook SDK asynchronously
  // window.fbAsyncInit = function () {
  //   FB.init({
  //     appId: "121393790997830",
  //     cookie: true,
  //     xfbml: true,
  //     version: "v17.0",
  //   });
  // };
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1400123667449785',
      xfbml      : true,
      version    : 'v17.0'
    });
    FB.AppEvents.logPageView();
  };
  // (function (d, s, id) {
  //   var js,
  //     fjs = d.getElementsByTagName(s)[0];
  //   if (d.getElementById(id)) return;
  //   js = d.createElement(s);
  //   js.id = id;
  //   js.src = "https://connect.facebook.net/en_US/sdk.js";
  //   fjs.parentNode.insertBefore(js, fjs);
  // })(document, "script", "facebook-jssdk");
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
});
</script>
<style scoped>
.btn-shadow{
  box-shadow: 0px 4px 16px 0px rgba(87, 57, 30, 0.08);
}

</style>