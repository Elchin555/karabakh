<script setup>
// import Header from '../components/Header.vue'
import TripList from '../components/TripList.vue'

</script>

<template>
    <div class="flex flex-col justify-between h-screen bg-[#FEFDFD] mt-24 md:mt-4">
        <div>
            <!-- <Header/> -->
            <TripList  class="mb-6"/>
        </div>
        <div class="hidden lg:block">
            <img class="w-full" src="../static/footer-waves.svg" alt="">
        </div>
    </div>
</template>
