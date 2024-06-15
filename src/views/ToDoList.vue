<template>

  <div class="flex space-x-6 overflow-x-auto ">
            <!-- <div v-for="(day, index) in days" :key="index" class="w-fit flex flex-col space-y-6 bg-[#F4F3F2] rounded-[32px] py-6 px-4">
                <div>
                    <span>{{ day.title }}</span>
                </div>
                <draggable v-model="day.items" tag="ul" group="meals" :animation="300" >
                <template #item="{ element, index }">
                  <li v-if="element" class="w-[380px] flex rounded-2xl overflow-hidden bg-white btn-shadow mt-4" :key="index"> <div class="flex items-center bg-[#F9F9F9] px-1">
                        <img src="../static/cursor.svg" alt="">
                    </div>
                    <p class="text-[#847464] px-3 py-4">{{ element.content }}</p>
                  </li>
                  <li v-else class="bg-white rounded-lg shadow p-4 mb-2">Drag item here</li>
                </template>
              </draggable>
             
            </div> -->
        </div>
  
  </template>
  
  <script>
  // import draggable from 'vuedraggable';
  
  // export default {
  //   data() {
  //     return {
     
  //       days: [
  //       {
  //         "title": "Day 1 (June 01):",
  //         "index": 1,
  //         "items": [
  //           {
  //             "index": 1,
  //             "content": "- Visit the Nakhchivan State Art Museum to explore the local art and culture scene."
  //           },
  //           {
  //             "index": 2,
  //             "content": "- Take a stroll through the Heydar Aliyev Park to enjoy the nature and greenery."
  //           },
  //           {
  //             "index": 3,
  //             "content": "- Go shopping at the Nakhchivan Mall for some retail therapy."
  //           },
  //           {
  //             "index": 4,
  //             "content": "- Relax in the evening with a cup of tea at a local tea house."
  //           }
  //         ]
  //       },
  //       {
  //         "title": "Day 2 (June 02):",
  //         "index": 2,
  //         "items": [
  //           {
  //             "index": 1,
  //             "content": "- Visit the Yusif Kuseyirli House Museum to learn more about Nakhchivan's history and culture."
  //           },
  //           {
  //             "index": 2,
  //             "content": "- Explore the Nakhchivan Open-Air Museum to see ancient rock carvings and monuments."
  //           },
  //           {
  //             "index": 3,
  //             "content": "- Go shopping at the Nakhchivan Grand Bazaar for some souvenirs and local handicrafts."
  //           },
  //           {
  //             "index": 4,
  //             "content": "- Relax in the evening with a traditional Azerbaijani dinner at a local restaurant."
  //           }
  //         ]
  //       }
  //     ]
  //     }
  //   },
  //   components: {
  //     draggable
  //   }
  // }
  </script>
  
  <!-- <style>
  html {
    font-size: 1.5rem;
  }
  
  h1 {
    margin-bottom: 0;
  }
  
  ul {
    margin-top: 0;
  }
  </style> -->
  