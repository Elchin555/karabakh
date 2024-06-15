<template>
    <div class="flex flex-col justify-between h-screen bg-[#FEFDFD] mt-20 md:mt-4">
        <div>
            <TripDetailSkeleton v-if="isLoading" />
            <TripDetail v-else :responseData="responseData" />
            <!-- <TripDetail v-else :responseData="responseData" @refechResponseData="refechResponseData"/> -->
        </div>
        <div class="md:block hidden">
            <img class="w-full mt-4" src="@/static/footer-waves.svg" alt="">
        </div>
    </div>
</template>

<script setup>
import { useAuthStore, useUsersStore,useTripStore } from "@/stores";
import {ref,onMounted,watch} from "vue"
import { useRoute } from "vue-router";

import TripDetail from '@/components/TripDetail.vue'
import TripDetailSkeleton from '@/components/TripDetailSkeleton.vue'

const tripData=ref("")
const responseData = ref('');
const isLoading = ref(true);
const route = useRoute();

const tripStore=useTripStore()
console.log("tripStoreeee",tripStore)

watch(() => tripStore.getTripResponseData, (newValue) => {
    console.log("newValue getTripResponseData",newValue)
    responseData.value = newValue;
});

onMounted(() => {
    console.log("route.params.id",route.params.id)

    const tripId=route.params.id
    return tripStore.getTripDetailResponse(tripId).then(res=>{

        responseData.value = tripStore.newgetTripDetal;
        isLoading.value = false
        console.log("son netice responseData",responseData)

    console.log("get trip detail success")
    }).catch(err=>{
        console.log("get trip detail error")
    })
});

</script>
