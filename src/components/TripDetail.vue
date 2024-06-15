<template>
  <div class="lg:px-10 px-0">
    <div
      class="backdrop-blur-md p-2 w-full items-center flex justify-between space-x-4 fixed bottom-0 md:hidden"
    >
      <button
        class="px-4 py-2 rounded-md bg-[#FFECDA] text-black"
        @click="scrollLeft"
      >
        <svg
          class="rotate-180"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.172 11L10.808 5.63598L12.222 4.22198L20 12L12.222 19.778L10.808 18.364L16.172 13H4V11H16.172Z"
            fill="#F49740"
          />
        </svg>
      </button>

      <button
        class="px-4 py-2 rounded-md bg-[#FFECDA] text-black"
        @click="scrollRight"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.172 11L10.808 5.63598L12.222 4.22198L20 12L12.222 19.778L10.808 18.364L16.172 13H4V11H16.172Z"
            fill="#F49740"
          />
        </svg>
      </button>
    </div>
    <div class="px-4 mb-6 lg:px-0 justify-between md:items-center space-y-4 md:space-y-0 flex flex-col md:flex-row mt-4" >
      <!-- Destination / budget / dates -->
      <div
        class="flex flex-col xl:flex-row xl:items-center xl:space-x-6 space-y-4 xl:space-y-0"
      >
        <div class="flex items-center space-x-2">
          <img class="" src="../static/destination.svg" alt="" />
          <span class="text-xl md:text-2xl font-bold capitalize">{{
            responseData?.trip?.destination
          }}</span>
        </div>

        <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 text-xs">
          <div class="flex items-center space-x-2">
            <div
              class="border border-[#CEC4BA] flex space-x-1 py-1 px-2 rounded-xl items-center bg-[#FCF9F7]"
            >
              <img src="../static/sun-yellow.svg" alt="" />
              <span>{{ getDayDifference(responseData?.trip?.start_date, responseData?.trip?.end_date) }} days</span>
            </div>
            <div
              class="border border-[#CEC4BA] flex space-x-1 py-1 px-2 rounded-xl items-center bg-[#FCF9F7]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.78105 4.11438C5.28115 3.61428 5.95942 3.33333 6.66667 3.33333H9.33333C9.34292 3.33333 9.35251 3.33353 9.36209 3.33395C9.89387 3.35691 10.4066 3.53849 10.8343 3.85531C11.262 4.17214 11.5852 4.60972 11.7621 5.11173C11.8845 5.45898 11.7022 5.8397 11.3549 5.96209C11.0077 6.08447 10.627 5.90218 10.5046 5.55493C10.4161 5.30392 10.2546 5.08514 10.0407 4.92672C9.8303 4.77088 9.57876 4.68048 9.31749 4.66666H6.66667C6.31304 4.66666 5.97391 4.80714 5.72386 5.05719C5.47381 5.30723 5.33333 5.64637 5.33333 5.99999C5.33333 6.35362 5.47381 6.69276 5.72386 6.9428C5.97391 7.19285 6.31304 7.33333 6.66667 7.33333H9.33333C10.0406 7.33333 10.7189 7.61428 11.219 8.11438C11.719 8.61447 12 9.29275 12 9.99999C12 10.7072 11.719 11.3855 11.219 11.8856C10.7189 12.3857 10.0406 12.6667 9.33333 12.6667H6.66667C6.65708 12.6667 6.64749 12.6665 6.63791 12.666C6.10613 12.6431 5.59338 12.4615 5.16567 12.1447C4.73795 11.8278 4.41484 11.3903 4.23791 10.8883C4.11552 10.541 4.29781 10.1603 4.64507 10.0379C4.99232 9.91551 5.37304 10.0978 5.49543 10.4451C5.58389 10.6961 5.74545 10.9149 5.95931 11.0733C6.1697 11.2291 6.42124 11.3195 6.68251 11.3333H9.33333C9.68696 11.3333 10.0261 11.1929 10.2761 10.9428C10.5262 10.6928 10.6667 10.3536 10.6667 9.99999C10.6667 9.64637 10.5262 9.30723 10.2761 9.05719C10.0261 8.80714 9.68696 8.66666 9.33333 8.66666H6.66667C5.95942 8.66666 5.28115 8.38571 4.78105 7.88561C4.28095 7.38552 4 6.70724 4 5.99999C4 5.29275 4.28095 4.61447 4.78105 4.11438Z"
                  fill="#F49740"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 1.33333C8.36819 1.33333 8.66667 1.63181 8.66667 1.99999V3.99999C8.66667 4.36818 8.36819 4.66666 8 4.66666C7.63181 4.66666 7.33333 4.36818 7.33333 3.99999V1.99999C7.33333 1.63181 7.63181 1.33333 8 1.33333ZM8 11.3333C8.36819 11.3333 8.66667 11.6318 8.66667 12V14C8.66667 14.3682 8.36819 14.6667 8 14.6667C7.63181 14.6667 7.33333 14.3682 7.33333 14V12C7.33333 11.6318 7.63181 11.3333 8 11.3333Z"
                  fill="#F49740"
                />
              </svg>
              <span class="capitalize">Budget: {{ responseData?.trip?.budget }}</span>
            </div>
          </div>

          <div
            class="border border-[#CEC4BA] w-fit flex space-x-1 py-1 px-2 rounded-xl items-center bg-[#FCF9F7]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.33333 9.33333C4.96514 9.33333 4.66667 9.6318 4.66667 9.99999V11.3333C4.66667 11.7015 4.96514 12 5.33333 12H6.66667C7.03486 12 7.33333 11.7015 7.33333 11.3333V9.99999C7.33333 9.6318 7.03486 9.33333 6.66667 9.33333H5.33333Z"
                fill="#F49740"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.6667 1.33333C11.0349 1.33333 11.3333 1.63181 11.3333 1.99999V2.66666H12C12.5304 2.66666 13.0391 2.87738 13.4142 3.25245C13.7893 3.62752 14 4.13623 14 4.66666V12.6667C14 13.1971 13.7893 13.7058 13.4142 14.0809C13.0391 14.4559 12.5304 14.6667 12 14.6667H4C3.46957 14.6667 2.96086 14.4559 2.58579 14.0809C2.21071 13.7058 2 13.1971 2 12.6667V4.66666C2 4.13623 2.21071 3.62752 2.58579 3.25245C2.96086 2.87738 3.46957 2.66666 4 2.66666H4.66667V1.99999C4.66667 1.63181 4.96514 1.33333 5.33333 1.33333C5.70152 1.33333 6 1.63181 6 1.99999V2.66666H10V1.99999C10 1.63181 10.2985 1.33333 10.6667 1.33333ZM12.6667 4.66666V6.66666H3.33333V4.66666C3.33333 4.48985 3.40357 4.32028 3.5286 4.19526C3.65362 4.07023 3.82319 3.99999 4 3.99999H4.66667V4.66666C4.66667 5.03485 4.96514 5.33333 5.33333 5.33333C5.70152 5.33333 6 5.03485 6 4.66666V3.99999H10V4.66666C10 5.03485 10.2985 5.33333 10.6667 5.33333C11.0349 5.33333 11.3333 5.03485 11.3333 4.66666V3.99999H12C12.1768 3.99999 12.3464 4.07023 12.4714 4.19526C12.5964 4.32028 12.6667 4.48985 12.6667 4.66666ZM12.6667 7.99999H3.33333V12.6667C3.33333 12.8435 3.40357 13.013 3.5286 13.1381C3.65362 13.2631 3.82319 13.3333 4 13.3333H12C12.1768 13.3333 12.3464 13.2631 12.4714 13.1381C12.5964 13.013 12.6667 12.8435 12.6667 12.6667V7.99999Z"
                fill="#F49740"
              />
            </svg>
            <div class="flex items-center space-x-1">
              <span>{{ convertDate(responseData?.trip?.start_date) }}</span>
              <span> - </span>
              <span>{{ convertDate(responseData?.trip?.end_date) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Save and  Copy buttons -->
      <div class="flex space-x-2">
        <div v-if="isLoadingUserData">
          <!-- loading... -->
        </div>
        <div v-else>
          <div v-if="isLoggedin">
            <button
              v-if="isSavedTrip"
              @click="unSaveTrip(responseData?.trip?.id)"
              class="flex py-2 text-xs md:text-base px-3 rounded-3xl items-center space-x-2 btn-shadow"
            >
              <!-- <img class="w-4 h-4" src="../static/whiteTick.png" alt="" /> -->
              <svg
                width="15"
                height="10"
                viewBox="0 0 15 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.2556 0.244078C14.581 0.569515 14.581 1.09715 14.2556 1.42259L5.92226 9.75592C5.59683 10.0814 5.06919 10.0814 4.74375 9.75592L0.577085 5.58926C0.251649 5.26382 0.251649 4.73618 0.577085 4.41074C0.902522 4.08531 1.43016 4.08531 1.7556 4.41074L5.33301 7.98816L13.0771 0.244078C13.4025 -0.0813592 13.9302 -0.0813592 14.2556 0.244078Z"
                  fill="#847464"
                />
              </svg>
              <span class="font-bold text-[#847464]">Saved</span>
            </button>
            <button
              v-else
              @click="saveTrip(responseData?.trip?.id)"
              class="flex items-center py-2 px-3 rounded-3xl text-xs md:text-base space-x-2 btn-shadow"
            >
              <img src="../static/saved-icon.svg" alt="" />
              <span class="font-bold">Save trip</span>
            </button>
          </div>
        </div>

        <!-- @click="unSaveTrip(responseData?.trip?.id)" -->

        <button
          @click="copyUrl"
          class="flex py-2 px-3 rounded-3xl text-xs md:text-base items-center space-x-2 text-white btn-gradient btn-shadow"
        >
          <!-- <img class="w-4" src="../static/whiteTick.png" alt=""> -->
          <div v-if="showTick" class="flex gap-2 items-center">
            <svg
              width="15"
              height="10"
              viewBox="0 0 15 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.2556 0.244078C14.581 0.569515 14.581 1.09715 14.2556 1.42259L5.92226 9.75592C5.59683 10.0814 5.06919 10.0814 4.74375 9.75592L0.577085 5.58926C0.251649 5.26382 0.251649 4.73618 0.577085 4.41074C0.902522 4.08531 1.43016 4.08531 1.7556 4.41074L5.33301 7.98816L13.0771 0.244078C13.4025 -0.0813592 13.9302 -0.0813592 14.2556 0.244078Z"
                fill="white"
              />
            </svg>
            <span class="font-bold">Link Copied</span>
          </div>
          <div v-else class="flex gap-2">
            <img src="../static/copy-link.svg" alt="" />
            <span class="font-bold">Copy link</span>
          </div>
        </button>
      </div>
    </div>

    <div class="flex space-x-6 overflow-x-auto mb-10">
      <div
        v-for="(day, index) in responseData?.trip_response?.days"
        :key="index"
        class="flex flex-col border border-[#F49740] space-y-6 bg-[#F4F3F2] rounded-[32px] py-6 px-4 w-[380px] ml-4"
      >
        <div>
          <span class="font-bold">{{ day.title }}</span>
        </div>
        <draggable
          @change="checkElement(day)"
          v-model="day.items"
          tag="ul"
          group="meals"
          :animation="300"
          class="w-96 draggable h-full cursor-grab"
          ref="draggable"
        >
          <template #item="{ element, index }">
            <li
              v-if="element.content"
              class="w-[330px] flex rounded-2xl overflow-hidden bg-white btn-shadow mt-4"
              :key="index"
              @dragenter="showDragText = true"
              @dragleave="showDragText = true"
            >
              <div class="flex items-center bg-[#F9F9F9] px-1 flex-shrink-0">
                <img src="../static/cursor.svg" alt="" />
              </div>
              <p class="text-[#847464] px-3 py-4 text-sm md:text-base">
                {{ element.content }}
              </p>
            </li>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive, defineEmits, computed, onMounted } from "vue";
import draggable from "vuedraggable";
import { useTripStore, useAuthStore, useUsersStore } from "@/stores";

export default {
  props: ["responseData"],
  setup(props) {
    const scrollContainer = ref(null);
    const isSaved = ref(false);
    const showTick = ref(false);
    const showDragText = ref(false);
    const draggableRef = ref(null);
    const bool = ref(false);
    const pageUrl = ref("");
    const tripStore = useTripStore();
    // const authStore = useAuthStore();
    const usersStore = useUsersStore();
    const isLoggedinMain = ref(null);

    onMounted(() => {
      scrollContainer.value = document.querySelector(".overflow-x-auto");
      isSavedTrip.value=tripStore.isSavedTrip
    });

    const isLoggedin = computed(() => usersStore.isLoggedin);
    const isSavedTrip=computed(()=>tripStore.isSavedTrip)
    const isLoadingUserData = computed(() => usersStore.isLoadingUserData);

    const convertDate = (date) => {

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

    const getDayDifference = (start, end) => {
      const date1 = new Date(start);
      const date2 = new Date(end);
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays
    };

    const copyUrl = () => {
      pageUrl.value = window.location.href;

      const tempInput = document.createElement("input");
      tempInput.style.position = "absolute";
      tempInput.style.left = "-1000px";
      tempInput.value = pageUrl.value;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);

      hideTick();
    };

    const hideTick = () => {
      showTick.value = true;
      setTimeout(() => {
        showTick.value = false;
      }, 2000);
    };

    const checkElement = (element) => {
      console.log("elemente baxxx",element)
      console.log("truppppstoorreee",tripStore?.changeTripDayDetail)
      // console.log("element", element);
      // console.log(
      //   "drag drop son netice ",
      //   JSON.parse(JSON.stringify(props.responseData?.trip_response?.days))
      // );
      const tripId = props?.responseData?.trip?.id;
      const body = props.responseData?.trip_response;
      console.log("tripide baxx",tripId)
      console.log("body baxx",body)
      // console.log("tripStore baxx",tripStore.changeTripDayDetail)

      tripStore
        .changeTripDayDetail(tripId, body)
        .then((res) => {
          console.log("ugruli changeTripDayDetail");
        })
        .catch((err) => {
          console.log("ugursuz changeTripDayDetail");
        });
    };
    const saveTrip = (tripId) => {
      console.log("tripIdtripIdtripIdtripIdtripId", tripId);

      tripStore
        .addSavedTrip(tripId)
        .then((res) => {
          console.log("ugurlu addSavedTrip addSavedTrip");
          isSaved.value = !isSaved.value;
        })
        .catch((err) => {
          console.log("ugursuz addSavedTrip");
        });
    };
    const unSaveTrip = (tripId) => {
      console.log("tripIdtripIdtripIdtripIdtripId", tripId);

      tripStore
        .unSavedTrip(tripId)
        .then((res) => {
          console.log("ugurlu unSavedTrip addSavedTrip");
          isSaved.value = !isSaved.value;
        })
        .catch((err) => {
          console.log("ugursuz unSavedTrip");
        });
    };
    function scrollLeft() {
      console.log("scrollLeft iwdedi");
      this.scrollContainer.scrollBy({ left: -400, behavior: "smooth" });
    }
    function scrollRight() {
      console.log("scrollright iwdedi");

      this.scrollContainer.scrollBy({ left: 400, behavior: "smooth" });
    }

    return {
      showTick,
      showDragText,
      draggableRef,
      bool,
      pageUrl,
      isSaved,
      isLoggedin,
      isLoadingUserData,
      scrollContainer,
      isSavedTrip,
      convertDate,
      getDayDifference,
      copyUrl,
      hideTick,
      checkElement,
      saveTrip,
      unSaveTrip,
      scrollLeft,
      scrollRight,
    };
  },
  components: {
    draggable,
  },
};
</script>

<style scoped>
.btn-shadow {
  box-shadow: 0px 3px 8px rgba(34, 19, 5, 0.16);
}
.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: gray transparent;
}

.overflow-x-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: gray;
  border-radius: 4px;
}
</style>
