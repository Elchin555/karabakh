<!-- <script setup>
import Header from '../components/Header.vue'
import CreateTripRequest from '../components/CreateTripRequest.vue'

import { storeToRefs } from 'pinia';

import { useAuthStore, useUsersStore } from '../stores';

const authStore = useAuthStore();
// const { user: authUser } = storeToRefs(authStore);

const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);

usersStore.getUserInfo();
</script>

<template>
    <div class="flex flex-col justify-between h-screen bg-[#FEFDFD]">
        <div>
            <Header />
            <CreateTripRequest />
        </div>
        <div>
            <img class="w-full" src="../static/footer-waves.svg" alt="">
        </div>
    </div>
</template> -->
<script setup>
// import Header from '../components/Header.vue'
import TripForm from "../components/TripForm.vue";
// import { useUsersStore } from '../stores';

// const usersStore = useUsersStore();
// usersStore.getUserInfo();
</script>

<template>
  <div class="flex flex-col h-screen justify-between bg-[#FEFDFD]">
    <TripForm />
    <img
      class="hidden md:block mt-20 w-full"
      src="@/static/footer-waves.svg"
      alt=""
    />
  </div>
</template>
