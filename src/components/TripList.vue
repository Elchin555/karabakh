<template>
  <div class="space-y-6 w-[88%] md:w-3/4 lg:w-1/2 mx-auto">
    <div class="flex justify-between items-center">
      <h1 class="text-base md:text-xl font-bold">Recent Trips</h1>

      <div v-if="getAllTripResponse != null" class="flex items-center">
        <label for="sort" class="text-[#BAAEA2] text-xs">Sort by:</label>
        <select v-model="tripListSort" @change="getAllTripListSort(tripListSort)" class="bg-[#FCF9F7] text-xs md:text-sm rounded-lg" name="sort" id="sort">
          <option value="desc">Date Descending</option>
          <option value="asc">Date Ascending</option>
        </select>
      </div>
    </div>

    <div class="flex flex-col space-y-4"  v-if="!getAllTripResponse?.loading || getAllTripResponse.length">
      <router-link v-for="trip in getAllTripResponse" :key="trip.id" :to="{ name: 'tripinfo', params: { id: trip.id } }"
        class="flex cursor-pointer items-center justify-between py-3 px-4 md:px-6 bg-white rounded-2xl custom-shadow"
      >
        <div class="flex flex-col space-y-2 w-3/4">
          <span class="font-bold text-base md:text-lg">{{ trip?.destination }}</span>

          <div class="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2 text-[#BAAEA2] text-xs" >
            <div class="flex space-x-2">
              <div class="flex space-x-1 py-1 px-2 rounded-xl items-center bg-[#FCF9F7]" >
                <img src="../static/sun-icon.svg" alt="" />
                <span>{{ getDayDifference(trip?.start_date, trip?.end_date) }} days</span>
              </div>

              <div class="flex space-x-1 py-1 px-2 rounded-xl items-center bg-[#FCF9F7]" >
                <img src="../static/dollar-icon.svg" alt="" />
                <span class="capitalize">{{ trip?.budget }}</span>
              </div>
            </div>

            <div class="flex w-fit space-x-1 py-1 px-2 rounded-xl items-center bg-[#FCF9F7]" >
              <img src="../static/calendar-icon.svg" alt="" />
              <div class="flex items-center space-x-1">
                <span>{{ convertDate(trip?.start_date) }}</span>
                <span> - </span>
                <span>{{ convertDate(trip?.end_date) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="w-1/4 flex justify-end">
          <img class="" src="../static/arrow-right.svg" alt="" />
        </div>
      </router-link>
    </div>


    <div v-else>
      <div v-for="i in 6" :key="i" class="flex flex-col cursor-pointer items-start gap-4 justify-between py-3 px-6 bg-white  mt-4 rounded-xl shadow animate-pulse">
      <div class="h-4 bg-gray-300 rounded-full w-24"></div>
      <div class="flex justify-between gap-8  w-full">
       <div class="flex gap-4">
        <div class="h-4 bg-gray-300 rounded-full w-24 "></div>
        <div class="h-4 bg-gray-300 rounded-full w-24"></div>
       </div>
       <div class="h-4 bg-gray-300 rounded-full w-12"></div>
      </div>
      <div class="h-4 bg-gray-300 rounded-full w-48"></div>
      </div>


  </div>
  <div class="flex flex-col space-y-6 w-full h-full justify-center items-center" v-if="getAllTripResponse ===null">
    <img class="w-3/4 md:w-1/2" src="../static/empty.png" alt="">
    <p>No any recent trips.</p>
    <router-link to="/" class="py-4 px-8 w-fit text-white btn-gradient font-bold rounded-2xl" >
      Create Trip
    </router-link>
  </div>
  </div>
</template>
<style scoped>
.custom-shadow {
  box-shadow: 0px 3px 8px rgba(34, 19, 5, 0.16);
}
</style>
<script setup>
import { onMounted, ref, watch } from "vue";
import { useTripStore } from "../stores";
const tripStore = useTripStore();
const getAllTripResponse = ref();
const tripListSort = ref("desc");

getAllTripResponse.value = tripStore.getAllTripResponse;
watch(
  () => tripStore.getAllTripResponse,
  (newValue) => {
    getAllTripResponse.value = newValue;
  }
);

onMounted(() => {
  return tripStore
    .getAllTripList("desc")
    .then((res) => {
      console.log("getAllTripList ugurlu result");
    })
    .catch((err) => {
      console.log("getAllTripList ugursuz");
    });
});

  function convertDate (date) {
    if (date){
      let inputDate = new Date(date);
      let year = inputDate.getFullYear();
      let month = String(inputDate.getMonth() + 1).padStart(2, "0");
      let day = String(inputDate.getDate()).padStart(2, "0");

      let formattedDate = `${year}/${month}/${day}`;
      return formattedDate
    }
    return ""
  };

  function getDayDifference  (start, end) {
    const date1 = new Date(start);
    const date2 = new Date(end);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays
  };
function getAllTripListSort(sort) {
  console.log("sorta bax", sort);
  tripStore
    .getAllTripList(sort)
    .then((res) => {
      console.log("getAllTripList ugurlu result");
    })
    .catch((err) => {
      console.log("getAllTripList ugursuz");
    });
}
</script>
