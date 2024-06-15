<template>
    <div>
        <div class="pt-[135px] pb-[95px]">
            <div class="w-fit relative mx-auto flex justify-center items-center">
                <img class="absolute left-[-150px] top-[-85px]" src="../static/left-vector.svg" alt="">
                <h1 class="text-7xl font-bold text-center">
                    AI based travel guide
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#FA7D7A] to-[#E7B303]">travel guide</span>
                </h1>
                <!-- <img class="absolute right-[-135px] top-[35px]" src="../static/right-vector.svg" alt=""> -->
            </div>
        </div>

        <div class="w-fit mx-auto pr-2 flex space-x-4">
            <div class="flex items-center relative">
                <img class="absolute pl-4" src="../static/destination.svg" alt="">
                <input class="input-shadow h-full text-[#CEC4BA] border rounded-2xl p-4 pl-12 border-[#CEC4BA] focus:outline-none focus:border-[#F29546] outline-none placeholder:text-[#CEC4BA]" type="text" name="destination" id="destination" placeholder="Destination">
            </div>
            <div class="flex items-center relative">
                <img class="absolute pl-4" src="../static/days.svg" alt="">
                <input class="h-full input-shadow border rounded-2xl p-4 pl-12 border-[#CEC4BA] text-xl focus:outline-none focus:border-[#F29546] outline-none placeholder:text-[#CEC4BA]" type="text" name="days" id="days" placeholder="Days">
                <img class="absolute right-0 pr-4" src="../static/calendar.svg" alt="">
            </div>
            <div class="flex items-center justify-center relative">
                <img class="absolute pl-4 left-0" src="../static/budget.svg" alt="">
                <input class="h-full input-shadow border rounded-2xl p-4 pl-12 border-[#CEC4BA] text-xl focus:outline-none focus:border-[#F29546] outline-none placeholder:text-[#CEC4BA]" type="text" name="budget" id="budget" placeholder="Budget">
                <button @click="isBudgetMenuShown = true" class="absolute right-0 pr-4">
                    <img src="../static/budget-menu.svg" alt="">
                </button>

                <transition name="slide-fade">
                    <div v-if="isBudgetMenuShown" v-click-away="toggleBudgetMenu" class="absolute bottom-[-225px] bg-white rounded-3xl" style="box-shadow: 0px 3px 8px rgba(34, 19, 5, 0.16);">
                        <div class="relative space-y-4 p-6  flex flex-col" >
                            <div class="flex justify-center">
                                <div class="absolute top-[-20px] triangle"></div>
                            </div>
                            <div class="flex space-x-2">
                                <div class="flex flex-col space-y-1">
                                    <label for="min-budget">Minimum budget</label>
                                    <input class="w-48 py-3 px-4 rounded-lg border border-[#CEC4BA] focus:outline-none focus:border-[#F29546]" id="min-budget" type="text" placeholder="50+">
                                </div>
                                <div class="flex mt-12 border border-[#847464] w-2 h-fit"></div>
                                <div class="flex flex-col space-y-1">
                                    <label for="max-budget">Maximum budget</label>
                                    <input class="w-48 py-3 px-4 rounded-lg border border-[#CEC4BA] focus:outline-none focus:border-[#F29546]" id="max-budget" type="text" placeholder="50+">
                                </div>
                            </div>

                            <button class="w-full flex justify-center rounded-lg items-center py-2 btn-gradient text-white">
                                <span>Save</span>
                            </button>
                        </div>
                    </div>
                </transition>
            </div>

            <button class="text-white btn-gradient text-xl font-bold rounded-2xl flex items-center justify-center p-5 space-x-2">
                <img src="../static/search.svg" alt="">
                <span>Set route</span>
            </button>
        </div>
    </div>
</template>
<script setup>
import {ref} from "vue";

const isBudgetMenuShown = ref(false)

const toggleBudgetMenu=()=>{
    isBudgetMenuShown.value = !isBudgetMenuShown.value
}

</script>
<style scoped>
    .input-shadow{
        box-shadow: 0px 4px 16px rgba(87, 57, 30, 0.08);
    }

    .triangle{
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 20px 20px 20px;
        border-color: transparent transparent #fff transparent;
        /* box-shadow: 0px 3px 8px rgba(34, 19, 5, 0.16); */
    }
</style>
