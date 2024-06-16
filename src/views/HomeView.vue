<script setup>
import TripForm from "../components/TripForm.vue";
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
