<script setup>
// import Header from '../components/Header.vue'
import TripForm from '../components/TripForm.vue'
// import { useUsersStore } from '../stores';

// const usersStore = useUsersStore();
// usersStore.getUserInfo();
</script>

<template>
    <div class="flex flex-col justify-between h-screen bg-[#FEFDFD]">
        <div>
            <!-- <Header /> -->
            <TripForm/>
        </div>
        <div>
            <img class="w-full" src="../static/footer-waves.svg" alt="">
        </div>
    </div>
</template>
