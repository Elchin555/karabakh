<template>
  <div class="flex flex-col justify-end md:mt-10">
    <div class="mt-20 lg:static lg:max-w-4xl mx-auto  h-full w-full p-2 lg:p-0 left-0" >
      <Loading v-if="isLoadingTripData" />

      <!-- loading end.. -->

      <div v-if="currentStep === 'searchDestination'">
        <div class="">
          <div class="pt-16 lg:pt-[135px] pb-10 md:pb-[95px]">
            <div class="w-fit relative mx-auto flex justify-center items-center">
              <!-- <img class="hidden lg:block absolute left-[-150px] top-[-85px]" src="../static/left-vector.svg" alt="" /> -->
              <h1 class="text-5xl lg:text-7xl lg:whitespace-nowrap font-bold text-center" >
                AI based
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#233fcd] to-[#41381e75]" >travel guide</span >
              </h1>
              <!-- <img class="hidden lg:block absolute right-[-135px] top-[35px]" src="../static/right-vector.svg" alt="" /> -->
            </div>
          </div>

          <div class="p-4 max-w-3xl flex flex-col rounded-[32px] border border-[#CEC4BA] relative mx-auto" >
            <div class="flex-col lg:flex-row flex gap-3">
              <label class="flex items-center relative w-full">
                <img class="absolute pl-4" src="../static/destination.svg" alt="" />
                <input @input="searchMap" v-model="form.destination" class="input-shadow w-full p-4 text-[#CEC4BA] border rounded-2xl pl-12 border-[#CEC4BA] focus:outline-none focus:border-[#F29546] outline-none placeholder:text-[#CEC4BA]"
                  type="text"
                  name="destination"
                  id="destination"
                  placeholder="Destination"
                />
              </label>

              <button @click="changeStep" class="p-4 lg:w-64 w-full text-white btn-gradient lg:text-xl font-bold rounded-2xl flex items-center justify-center space-x-2" >
                <img src="../static/search.svg" alt="" />
                <span>Get started</span>
              </button>
            </div>
            <i class="text-red-500 ml-4" v-if="validateMessage !== null">{{
              validateMessage
            }}</i>

            <!-- <ul class=" w-60 h-20 bg-white overflow-y-auto ml-10 rounded-sm p-4">
              <li v-for="item in mapData.predictions" :key="item.id" class=" cursor-pointer hover:bg-sky-700" @click="selectDestinationFromMap(item)">{{ item.description }}</li>
            </ul> -->

            <div
              v-if="form.destination && !isSelectDestination"
              class="absolute pt-2 px-2 pb-2 no-scrollbar bg-white rounded-3xl shadow-lg top-24 z-20 border left-0 w-full h-40 overflow-scroll"
            >
              <div v-if="form.destination" class="pt-2">
                <div class="relative space-y-1">
                  <div v-for="item in mapData?.predictions" :key="item.id" class="flex flex-col" >
                    <span @click="selectDestinationFromMap(item)" class="mb-1 pl-2 py-2 rounded-md shadow flex w-full hover:bg-gray-100" >
                      {{ item.description }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- <div v-else class="pt-2 flex justify-center">
          <p class="py-4">"no_recent_searches"</p>
        </div> -->
            </div>
          </div>
        </div>

        <div class="block h-[150px] md:hidden absolute bottom-0 left-0">
          <img class="w-full h-full object-cover" src="@/static/footer-waves.svg" alt="" />
        </div>
      </div>

      <div v-else class="m-2 h-full flex flex-col gap-4">
        <!-- NAVBAR -->
        <ul class="flex md:gap-4 font-bold text-xs lg:text-base border-b lg:border-none justify-between lg:justify-start" >
          <li v-for="step in tripSteps.slice(1)" :key="step.id" class="flex items-center gap-1 lg:gap-2 justify-between" >
            <button @click="defineStep(step.name)" class="px-1 py-2 bg-transparent flex flex-col lg:flex-row gap-2 items-center" >
              <p class="w-8 h-8 hidden lg:grid place-content-center rounded-full border border-[#233fcd]" >
                <span v-if="step.isCompleted">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" >
                    <rect width="32" height="32" rx="16" fill="#F29546" />
                    <path d="M9 16L14 21L24 11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
                <span v-else> {{ step.id }}</span>
              </p>
              <p class="whitespace-nowrap" >
                {{ step.title }}
              </p>
            </button>
            <span v-if="step.id !== 3" class="">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.146447 0.646447C0.341709 0.451184 0.658291 0.451184 0.853553 0.646447L3.85355 3.64645C4.04882 3.84171 4.04882 4.15829 3.85355 4.35355L0.853553 7.35355C0.658291 7.54882 0.341709 7.54882 0.146447 7.35355C-0.0488155 7.15829 -0.0488155 6.84171 0.146447 6.64645L2.79289 4L0.146447 1.35355C-0.0488155 1.15829 -0.0488155 0.841709 0.146447 0.646447Z" fill="#CEC4BA"/>
              </svg>
            </span>
          </li>
        </ul>
        <div class="overflow-auto relative lg:max-h-[29rem] no-scrollbar lg:rounded-3xl lg:p-4 lg:border-[#CEC4BA] lg:bg-white lg:drop-shadow-[0_0px_4px_rgba(87,57,30,0.08)]" >
          <div class="hidden lg:block sticky -top-4 h-4 z-10 bg-white"></div>
          <!-- MAIN PART -->
          <div class="pb-20 lg:pb-3 overflow-auto no-scrollbar">
            <!-- SET DATES -->
            <div v-if="currentStep === 'setDates'" class="flex flex-col lg:flex-row gap-4 lg:gap-6" >
              <!-- :rows="2" -->
              <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Select Dates</p>
                <DatePicker
                  v-model="range"
                  is-range
                  :min-date="minDateForCalendar"
                  :first-day-of-week="2"
                  :masks="{ weekdays: 'WWW' }"
                  transparent
                  borderless
                  color="orange"
                  class="w-full border p-2 rounded-2xl shadow-lg"
                />

              </div>
            </div>
            <!-- TRAVEL WITH -->
            <div v-if="currentStep === 'travelWith'" class="space-y-4">
              <div id="travelWith" class="space-y-2">
                <p class="text-sm text-[#361F0A] font-bold">Travel With</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2">
                  <div v-for="option in travelOptions" :key="option"
                    @click="form.travelWith = option"
                    class="p-3 flex justify-center items-center cursor-pointer gap-1 border border-[#F4F3F2] font-medium text-[#361F0A] rounded-2xl bg-[#F4F3F2]"
                    :class="[
                      form.travelWith === option
                        ? 'text-[#233fcd] border border-blue-200 bg-[#FEF7EE]'
                        : '',
                    ]"
                  >
                    <TravelWithIcon :option="option" />
                    <p class="capitalize text-xs md:text-base">{{ option }}</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- BUDGET -->
            <div v-if="currentStep === 'setBudget'" class="space-y-4">
              <div id="budget" class="space-y-2">
                <p class="text-sm text-[#361F0A] font-bold">Budget</p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-2">
                  <div
                    v-for="option in budgetOptions"
                    :key="option"
                    @click="form.budget = option"
                    class="p-3 flex justify-center items-center cursor-pointer gap-1 border border-[#F4F3F2] font-medium text-[#361F0A] rounded-2xl bg-[#F4F3F2]"
                    :class="[
                      form.budget === option
                        ? 'text-[#233fcd] border border-blue-200 bg-[#FEF7EE]'
                        : '',
                    ]"
                  >
                    <BudgetIcon :option="option" />
                    <p class="capitalize text-xs md:text-base">{{ option }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- BUTTONS -->
          <div class="w-full fixed md:sticky bottom-0 left-0 right-0 py-2 bg-white z-10" >
            <i class="text-red-500 ml-4" v-if="validateMessage !== null">
              {{validateMessage}}
            </i>
            <!-- <i class="text-red-500 ml-4" >jjfrfnjrfnjrf</i> -->
            <div class="flex space-x-2 mt-4 px-2">
              <button @click="backStep" class="p-3 md:p-4 w-fit md:w-full bg-[#F4F3F2] font-bold rounded-2xl" >
                <span class="hidden md:block">Back</span>
                <svg width="24" height="24" class="rotate-180 block md:hidden" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.172 11L10.808 5.63598L12.222 4.22198L20 12L12.222 19.778L10.808 18.364L16.172 13H4V11H16.172Z" fill="#BAAEA2"/>
                </svg>
              </button>
              <button :disabled="disabledButton" @click="changeStep" class="p-3 md:p-4 w-full text-white btn-gradient font-bold rounded-2xl" >
                Next
              </button>
            </div>
            <div class="hidden lg:block absolute w-full h-6 bg-white"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Loading from '../components/Loading.vue'
import dayjs from "dayjs";
import { onMounted, ref, watch, toRaw } from "vue";
import { DatePicker } from "v-calendar";
import "v-calendar/style.css";
import Slider from "@vueform/slider";
import { useTripStore } from "@/stores";
import TravelWithIcon from "../components/TravelWithIcon.vue"
import BudgetIcon from "../components/BudgetIcon.vue"

const range = ref({
  start: new Date(),
  end: null,
})

const tripStore = useTripStore();
const minDateForCalendar= new Date().toISOString().split('T')[0]
const isSelectDestination = ref(false);
const mapData = ref([]);
const currentStep = ref("searchDestination");
const isLoadingTripData = ref("");
const disabledButton = ref(false);
const validateMessage = ref(null);

const travelOptions = ref(["single", "family", "couple", "friends"]);
const budgetOptions = ref(["economy", "normal", "luxury"]);
const tripSteps = ref([
  {
    id: 0,
    name: "searchDestination",
    title: "Search",
    isCompleted: false,
    isCurrent: false,
  },
  {
    id: 1,
    name: "setDates",
    title: "Set Dates",
    isCompleted: false,
    isCurrent: false,
  },
  {
    id: 2,
    name: "travelWith",
    title: "Travel With",
    isCompleted: false,
    isCurrent: false,
  },
  {
    id: 3,
    name: "setBudget",
    title: "Budget",
    isCompleted: false,
    isCurrent: false,
  }
]);
const form = ref({
  destination: null,
  startDate: null,
  endDate: null,
  travelWith: null,
  budget: null,
  place_id:null
});

watch(
  () => tripStore.isLoadingTripData,
  (newValue) => {
    isLoadingTripData.value = newValue;
  }
);
onMounted(() => {
  isLoadingTripData.value = tripStore.isLoadingTripData;
});

function defineStep(step) {
  console.log("currentStep", currentStep);
  console.log("step", step);

  if (step == "setDates") {
    if (tripSteps._rawValue[1].isCompleted == true) {
      currentStep.value = "setDates";
    }
  } else if (step == "travelWith") {
    if (
      tripSteps._rawValue[2].isCompleted == true ||
      tripSteps._rawValue[1].isCompleted == true
    ) {
      currentStep.value = "travelWith";
    }
  }else if (step == "setBudget") {
    if (
      tripSteps._rawValue[3].isCompleted == true ||
      tripSteps._rawValue[2].isCompleted == true
    ) {
      currentStep.value = "setBudget";
    }
  }else {
    return false
  }

}

function changeStep() {
  if (form.value.destination !== null && form.value.destination !== "") {
    // currentStep.value = tripSteps.value.
    const index = tripSteps.value.findIndex(
      (step) => step.name === currentStep.value
    );
    console.log("currentStep", currentStep.value);

    if (currentStep.value === "setDates") {
      console.log("range.value.start : ",range.value.start);
      if (range.value.end) {
        tripSteps._rawValue[1].isCompleted = true;
        form.value.startDate = range.value.start
        form.value.endDate = range.value.end
      } else {
        validateMessage.value = "Pick start and end date from the calendar";
        clearMessage();
        return false;
      }
    }

    if (currentStep.value === "travelWith") {
      if (form.value.travelWith) {
        tripSteps._rawValue[2].isCompleted = true;
      } else {
        validateMessage.value = "Please, select one of the options.";
        clearMessage();
        return false;
      }
    }

    if (currentStep.value === "setBudget") {

      if (form.value.budget) {
        tripSteps._rawValue[3].isCompleted = true;
        generateFinalData();
      } else {
        validateMessage.value = "Please, select one of the options.";
        clearMessage();
        return false;
      }
      return;
    }

    currentStep.value = tripSteps.value[index + 1]?.name;

    console.log(form.value);
    // console.log("tripSteps[0].value",tripSteps._rawValue[1].isCompleted)
  } else {
    console.log("destination yoxdu");
    validateMessage.value = "Destination required";
    clearMessage();
  }
}
function backStep(){
  const index = tripSteps.value.findIndex(
      (step) => step.name === currentStep.value
    );
    currentStep.value = tripSteps.value[index - 1]?.name;
}
function clearMessage() {
  setTimeout(() => {
    validateMessage.value = null;
  }, 2000);
}

function generateFinalData() {
  const data = toRaw(form.value);
  console.log("data : ", data);
  createTripRequest(data);
}
function createTripRequest(tripData) {
  disabledButton.value = true;
  // clearTripResponse()
  tripStore.resetTripResponse();
  return tripStore
    .waitBody(tripData)
    .then((res) => {
      console.log("ugruli createTripRequest");
      disabledButton.value = false;
    })
    .catch((err) => {
      disabledButton.value = false;
      console.log("ugursuz createTripRequest");
    });
}
const searchMap = async (event) => {
  isSelectDestination.value = false;
  const input = event.target.value;
  if (input.length > 0) {
    await tripStore.getMap(input);
    mapData.value = tripStore.getMapData;
  } else {
    mapData.value = [];
  }
};
const selectDestinationFromMap = (item) => {
  isSelectDestination.value = true;
  form.value.place_id = item.place_id
  form.value.destination = item.description;
  mapData.value = [];
};
// const clearTripResponse = () =>{
//   return tripStore.clearTripResponse()

// }
</script>

<style src="@vueform/slider/themes/default.css"></style>
<style scoped>
.main-box-shadow {
  filter: drop-shadow(0px, 4px rgba(87, 57, 30, 0.08));
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.input-shadow {
  box-shadow: 0px 4px 16px rgba(87, 57, 30, 0.08);
}

.triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 20px 20px 20px;
  border-color: transparent transparent #fff transparent;
  /* box-shadow: 0px 3px 8px rgba(34, 19, 5, 0.16); */
}

/* .slider-horizontal {
    height: 6px;
  } */
.slider-handle {
  background-color: #f29546 !important;
}

.slider-custom {
  --slider-bg: #cec4ba;
  --slider-connect-bg: #f29546;
  --slider-height: 4px;

  --slider-handle-bg: #f29546;
  --slider-handle-width: 12px;
  --slider-handle-height: 12px;
  --slider-handle-shadow: 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0);
  --slider-handle-shadow-active: 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.25);

  --slider-tooltip-font-size: 11px;
  --slider-tooltip-line-height: 20px;
  --slider-tooltip-font-weight: 600;
  --slider-tooltip-min-width: 20px;
  --slider-tooltip-bg: #fff;
  --slider-tooltip-bg-disabled: #9ca3af;
  --slider-tooltip-color: #361f0a;
  --slider-tooltip-radius: 5px;
  --slider-tooltip-py: 0px;
  --slider-tooltip-px: 6px;
  --slider-tooltip-arrow-size: 0px;
  --slider-tooltip-distance: 4px;
}
</style>
