<template>
    <div class="flex justify-center">
      <div class="w-[90%] md:w-2/3 lg:w-1/3">
        <p class="flex justify-start">
          <span class="font-bold text-[#361F0A] text-xl">Profile Settings</span>
        </p>
        <div>
          <div class="flex justify-center">
            <label for="fileInput" class="relative cursor-pointer">
              <div class="w-28 h-28 overflow-hidden relative rounded-full bg-gray-200 flex items-center justify-center" >
                <img v-if="image" :src="image" alt="Profile Picture" class="w-28 h-28 rounded-full object-cover" />
                <img v-else class="w-full h-full  object-cover" src="../static/default-profile.webp" alt="">
                <div class="flex flex-col space-y-1 bg-black bg-opacity-30 absolute w-full h-full items-center justify-center">
                  <img src="../static/upload.svg" alt="">
                  <span class="text-white font-bold text-sm">Upload</span>
                </div>
              </div>
              <input id="fileInput" type="file" class="hidden" accept="image/*" @change="handleFileUpload" />
            </label>
          </div>
          <form @submit.prevent="updateUser()" class="space-y-6">
            <div class="relative mt-4 rounded-md shadow-sm h-[64px] items-center" >
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" >
                <svg svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7C17 8.32608 16.4732 9.59785 15.5355 10.5355C14.5979 11.4732 13.3261 12 12 12C10.6739 12 9.40215 11.4732 8.46447 10.5355C7.52678 9.59785 7 8.32608 7 7C7 5.67392 7.52678 4.40215 8.46447 3.46447ZM12 4C11.2044 4 10.4413 4.31607 9.87868 4.87868C9.31607 5.44129 9 6.20435 9 7C9 7.79565 9.31607 8.55871 9.87868 9.12132C10.4413 9.68393 11.2044 10 12 10C12.7956 10 13.5587 9.68393 14.1213 9.12132C14.6839 8.55871 15 7.79565 15 7C15 6.20435 14.6839 5.44129 14.1213 4.87868C13.5587 4.31607 12.7956 4 12 4Z" fill="#F29546" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 16C9.20435 16 8.44129 16.3161 7.87868 16.8787C7.31607 17.4413 7 18.2043 7 19V21C7 21.5523 6.55228 22 6 22C5.44772 22 5 21.5523 5 21V19C5 17.6739 5.52678 16.4021 6.46447 15.4645C7.40215 14.5268 8.67392 14 10 14H14C15.3261 14 16.5979 14.5268 17.5355 15.4645C18.4732 16.4021 19 17.6739 19 19V21C19 21.5523 18.5523 22 18 22C17.4477 22 17 21.5523 17 21V19C17 18.2044 16.6839 17.4413 16.1213 16.8787C15.5587 16.3161 14.7956 16 14 16H10Z" fill="#F29546" />
                </svg>
              </div>
              <input v-if="user" v-model="user.fullname" type="text" name="fullname" id="fullname" class="capitalize block w-full h-full rounded-2xl py-1.5 pl-10 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 p-4 border border-[#CEC4BA] focus:outline-none focus:border-[#F29546]" placeholder="Full name" />
            </div>

            <div class="relative mt-6 rounded-md shadow-sm h-[64px] items-center" >
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" >
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" >
                  <path d="M3 7.5C3 6.96957 3.21071 6.46086 3.58579 6.08579C3.96086 5.71071 4.46957 5.5 5 5.5H19C19.5304 5.5 20.0391 5.71071 20.4142 6.08579C20.7893 6.46086 21 6.96957 21 7.5V17.5C21 18.0304 20.7893 18.5391 20.4142 18.9142C20.0391 19.2893 19.5304 19.5 19 19.5H5C4.46957 19.5 3.96086 19.2893 3.58579 18.9142C3.21071 18.5391 3 18.0304 3 17.5V7.5Z" stroke="#F29546" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M3 7.5L12 13.5L21 7.5" stroke="#F29546" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <input v-if="user" v-model="user.email" type="email" name="email" id="email" class="block w-full h-full rounded-2xl py-1.5 pl-10 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 p-4 border border-[#CEC4BA] focus:outline-none focus:border-[#F29546]" placeholder="Mail address" />
            </div>

            <div class="flex justify-between mt-4 rounded-2xl shadow-sm h-[64px] border border-[#CEC4BA]" >

              <div class="pointer-events-none  inset-y-0  flex items-center pl-3 border-red-600" >
                <img src="../static/password.svg" alt="">
                ********************
              </div>

              <div class="flex items-center mr-4">
                <u class="text-[#F29546] cursor-pointer" @click="sendComponentName">
                    Change password
                </u>
              </div>
            </div>

            <div>
              <button type="submit" class="flex w-full justify-center rounded-2xl px-3 py-2 text-sm font-semibold text-white shadow-sm btn-gradient h-[64px] items-center" >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    
    </div>
</template>

<script setup>
import { useAuthStore, useUsersStore } from "../stores";
// import { ref, onMounted, onBeforeMount, watch, computed,defineEmits } from "vue";
import { ref, onMounted, onBeforeMount, watch, computed,watchEffect } from "vue";
import { storeToRefs } from "pinia";
const authStore = useAuthStore();
const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);
const user = ref(null);
const isUploadPhoto=ref(false)
const isEditProfile=ref(false)
const isComponent=ref("ChangePassword")

watch(users, (newUsers) => {
  if (newUsers) {
    user.value = newUsers?.data?.data;
  }
});
onMounted(()=>{
    user.value=users?._object?.users?.data?.data
})
function isValidEmail(email) {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
}
function updateUser() {

  if(user.value.fullname.length > 0 && isValidEmail(user.value.email)){
    if(isUploadPhoto){
console.log("sekil yuklenib")
        uploadProfilePhoto();
    }

  console.log("userrrr", user.value);

  return usersStore
    .updateUser(user.value)
    .then(() => {
      console.log("succeess");
      alert("success")
    })
    .catch((err) => {
      console.log("err", err);
    })
    .catch((error) => setErrors({ apiError: error }));
  }
}

const image = ref(null);
let sendImage=ref(null)
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if(event){
    isUploadPhoto.value=ref(true)
  }
  sendImage=event.target.files[0]
  const reader = new FileReader();

  reader.onload = () => {
    image.value = reader.result;
  };

  reader.readAsDataURL(file);
};
function uploadProfilePhoto() {
    console.log("image",sendImage)
  if (isUploadPhoto.value) {
    console.log("userrrr", user.value);

    return usersStore
      .uploadProfilePhoto(user.value, sendImage)
      .then(() => {
        console.log("succeess");
      })
      .catch((err) => {
        console.log("err upload photo", err);
      })
      .catch((error) => setErrors({ apiError: error }));
  }
}
// const { emit } = defineEmits();
const emit = defineEmits(['changeComponent']);

const sendComponentName = () => {
  const componentName = 'ChangePassword';
  emit('changeComponent', componentName);
};
</script>
