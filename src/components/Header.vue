<template>
  <!-- <div class="flex items-center justify-between p-4 fixed left-0 top-0"> -->
  <div class="w-full flex">
    <div class="w-full mx-auto fixed left-0 top-0 z-20 bg-white" >
      <div class="mx-auto p-4 flex justify-between items-center">
        <div>
          <router-link to="/">
            <img class="w-20 h-20" src="@/static/slight-logo.png" alt="Slight Logo" />
          </router-link>
        </div>

        <div v-if="false" class="flex">
          <div class="hidden md:block">
            <!-- profile -->
            <!-- isLoadingUserData{{ isLoadingUserData }} -->
            <div v-if="isLoadingUserData">
              <!-- loading... -->
            </div>
          <div v-else>
            <div
              v-if="isLoggedin"
              @click="profileToggle"
              class="hidden lg:flex items-center gap-5 cursor-pointer"
            >
              <span class="font-medium capitalize">
                {{ users?.data?.data?.fullname }}
              </span>
              <img
                v-if="users?.data?.data?.profile_photo"
                class="w-10 h-10 border rounded-full object-cover"
                :src="users?.data?.data?.profile_photo"
                alt=""
              />
              <img
                v-else
                class="w-10 h-10 border rounded-full"
                src="../static/profilePic.png"
                alt=""
              />
              <div>
                <div class="relative">
                  <div class="flex items-center">
                    <button>
                      <svg
                        width="14"
                        height="8"
                        viewBox="0 0 14 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
                          fill="#847464"
                        />
                      </svg>
                    </button>
                  </div>
                  <transition
                    enter-active-class="transition ease-out duration-400"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <div
                      v-if="profileDrop"
                      v-click-away="profileToggle"
                      class="origin-top-right absolute z-20 right-0 mt-6 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none w-[343px]"
                    >
                      <div class="mx-4">
                        <div>
                          <p class="text-[#7A614A] font-satoshi">Application</p>

                          <!-- Saved trips -->
                          <router-link
                            to="/savedTrips"
                            class="group/item cursor-pointer flex justify-between mt-2 items-center rounded-2xl hover:bg-[#FCF9F7] py-[15px] pl-[10px] pr-[8px]"
                          >
                            <div class="flex justify-start items-center gap-3">
                              <svg
                                width="22"
                                height="21"
                                viewBox="0 0 22 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M10.9929 0.0019989C11.3735 0.0019989 11.7211 0.2181 11.8896 0.559438L14.7428 6.34078L21.1223 7.26534C21.4992 7.31996 21.8123 7.58392 21.93 7.94614C22.0476 8.30835 21.9493 8.70593 21.6764 8.97157L17.0534 13.4715L18.1435 19.8259C18.2079 20.2013 18.0535 20.5806 17.7453 20.8043C17.4371 21.028 17.0286 21.0572 16.6917 20.8797L10.9993 17.8801L5.29323 20.8801C4.95631 21.0573 4.54803 21.0278 4.24008 20.804C3.93213 20.5803 3.7779 20.2011 3.84226 19.8259L4.9323 13.4715L0.309353 8.97157C0.0364568 8.70593 -0.0618673 8.30835 0.0557586 7.94614C0.173384 7.58392 0.486538 7.31996 0.863436 7.26534L7.2429 6.34078L10.0961 0.559438C10.2646 0.2181 10.6122 0.0019989 10.9929 0.0019989ZM10.9929 3.26157L8.8036 7.69756C8.65788 7.99282 8.37615 8.19743 8.05029 8.24466L3.15827 8.95365L6.70438 12.4054C6.94041 12.6352 7.04816 12.9664 6.99247 13.2911L6.15607 18.1669L10.5345 15.8649C10.8261 15.7116 11.1746 15.7117 11.4661 15.8653L15.8293 18.1645L14.9933 13.2911C14.9376 12.9664 15.0453 12.6352 15.2814 12.4054L18.8275 8.95365L13.9354 8.24466C13.6096 8.19743 13.3278 7.99282 13.1821 7.69756L10.9929 3.26157Z"
                                  fill="#F49740"
                                />
                              </svg>
                              <span class="font-medium text-[14px]"
                                >Saved Trips</span
                              >
                              <span class="text-[#BAAEA2] text-[12px]"
                                >Favorites</span
                              >
                            </div>

                            <!-- chevron right -->
                            <div
                              class="group/show invisible hover:bg-[#FFECDA] group-hover/item:visible p-2 rounded-lg block group-hover:bg-red-900"
                            >
                              <svg
                                class=""
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.172 7L6.808 1.636L8.222 0.222L16 8L8.222 15.778L6.808 14.364L12.172 9H0V7H12.172Z"
                                  fill="#F49740"
                                />
                              </svg>
                            </div>
                          </router-link>

                          <!-- Recent trips -->
                          <router-link
                            to="/trips"
                            class="group/item cursor-pointer flex justify-between items-center rounded-2xl hover:bg-[#FCF9F7] py-[15px] pl-[10px] pr-[8px]"
                          >
                            <div class="flex justify-start items-center gap-3">
                              <svg
                                width="21"
                                height="21"
                                viewBox="0 0 21 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M9.99988 5.99999C10.5522 5.99999 10.9999 6.44771 10.9999 6.99999V10.5858L12.707 12.2929C13.0975 12.6834 13.0975 13.3166 12.707 13.7071C12.3165 14.0976 11.6833 14.0976 11.2928 13.7071L9.29278 11.7071C9.10524 11.5196 8.99988 11.2652 8.99988 11V6.99999C8.99988 6.44771 9.4476 5.99999 9.99988 5.99999Z"
                                  fill="#F49740"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M15.2636 4.88447C13.7826 3.59205 11.8777 2.89011 9.91218 2.91256C7.94669 2.93501 6.05825 3.68028 4.60716 5.00619C3.15608 6.3321 2.24393 8.14583 2.04473 10.1013C1.98877 10.6508 1.49799 11.0508 0.948544 10.9948C0.399102 10.9389 -0.000937801 10.4481 0.0550296 9.89865C0.30402 7.45427 1.44421 5.18711 3.25807 3.52973C5.07192 1.87234 7.43247 0.940748 9.88934 0.912686C12.3462 0.884624 14.7274 1.76206 16.5787 3.37758C18.4299 4.9931 19.6216 7.23363 19.9263 9.67169C20.2311 12.1097 19.6276 14.5747 18.231 16.5962C16.8344 18.6177 14.7424 20.0543 12.3542 20.6318C9.96605 21.2094 7.44882 20.8875 5.2828 19.7276C4.0101 19.0461 2.91101 18.1033 2.04988 16.9733V19C2.04988 19.5523 1.60217 20 1.04988 20C0.497597 20 0.0498817 19.5523 0.0498817 19V14C0.0498817 13.4477 0.497597 13 1.04988 13H1.52655C1.54208 12.9996 1.55758 12.9996 1.57304 13H6.04988C6.60217 13 7.04988 13.4477 7.04988 14C7.04988 14.5523 6.60217 15 6.04988 15H3.12686C3.86637 16.244 4.93482 17.2726 6.22695 17.9645C7.95977 18.8924 9.97355 19.1499 11.8841 18.6879C13.7946 18.2258 15.4682 17.0765 16.5855 15.4593C17.7028 13.8421 18.1856 11.8702 17.9418 9.91976C17.698 7.96931 16.7446 6.17689 15.2636 4.88447Z"
                                  fill="#F49740"
                                />
                              </svg>
                              <span class="font-medium text-[14px]"
                                >Recent Trips</span
                              >
                              <span class="text-[#BAAEA2] text-[12px]"
                                >History</span
                              >
                            </div>

                            <!-- chevron right -->
                            <div
                              class="group/show invisible hover:bg-[#FFECDA] group-hover/item:visible p-2 rounded-lg block group-hover:bg-red-900"
                            >
                              <svg
                                class=""
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.172 7L6.808 1.636L8.222 0.222L16 8L8.222 15.778L6.808 14.364L12.172 9H0V7H12.172Z"
                                  fill="#F49740"
                                />
                              </svg>
                            </div>
                          </router-link>

                          <p class="text-[#7A614A] font-satoshi">User</p>

                          <!-- Profile Settings -->
                          <router-link
                            to="/editprofile"
                            class="group/item cursor-pointer flex justify-between mt-2 items-center rounded-2xl hover:bg-[#FCF9F7] py-[15px] pl-[10px] pr-[8px]"
                          >
                            <div class="flex justify-start items-center gap-3">
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M0 5C0 4.44772 0.447715 4 1 4H5C5.55228 4 6 4.44772 6 5V9C6 9.55228 5.55228 10 5 10H1C0.447715 10 0 9.55228 0 9V5ZM2 6V8H4V6H2Z"
                                  fill="#F49740"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M3 0C3.55228 0 4 0.447715 4 1V5C4 5.55228 3.55228 6 3 6C2.44772 6 2 5.55228 2 5V1C2 0.447715 2.44772 0 3 0Z"
                                  fill="#F49740"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M3 8C3.55228 8 4 8.44771 4 9V17C4 17.5523 3.55228 18 3 18C2.44772 18 2 17.5523 2 17V9C2 8.44771 2.44772 8 3 8Z"
                                  fill="#F49740"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M6 11C6 10.4477 6.44772 10 7 10H11C11.5523 10 12 10.4477 12 11V15C12 15.5523 11.5523 16 11 16H7C6.44772 16 6 15.5523 6 15V11ZM8 12V14H10V12H8Z"
                                  fill="#F49740"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M9 0C9.55229 0 10 0.447715 10 1V11C10 11.5523 9.55229 12 9 12C8.44771 12 8 11.5523 8 11V1C8 0.447715 8.44771 0 9 0Z"
                                  fill="#F49740"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M9 14C9.55229 14 10 14.4477 10 15V17C10 17.5523 9.55229 18 9 18C8.44771 18 8 17.5523 8 17V15C8 14.4477 8.44771 14 9 14Z"
                                  fill="#F49740"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M12 2C12 1.44772 12.4477 1 13 1H17C17.5523 1 18 1.44772 18 2V6C18 6.55228 17.5523 7 17 7H13C12.4477 7 12 6.55228 12 6V2ZM14 3V5H16V3H14Z"
                                  fill="#F49740"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M15 0C15.5523 0 16 0.447715 16 1V2C16 2.55228 15.5523 3 15 3C14.4477 3 14 2.55228 14 2V1C14 0.447715 14.4477 0 15 0Z"
                                  fill="#F49740"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M15 5C15.5523 5 16 5.44772 16 6V17C16 17.5523 15.5523 18 15 18C14.4477 18 14 17.5523 14 17V6C14 5.44772 14.4477 5 15 5Z"
                                  fill="#F49740"
                                />
                              </svg>
                              <span class="font-medium text-[14px] text-black"
                                >Profile Settings</span
                              >
                            </div>

                            <!-- chevron right -->
                            <div
                              class="group/show invisible hover:bg-[#FFECDA] group-hover/item:visible p-2 rounded-lg block group-hover:bg-red-900"
                            >
                              <svg
                                class=""
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.172 7L6.808 1.636L8.222 0.222L16 8L8.222 15.778L6.808 14.364L12.172 9H0V7H12.172Z"
                                  fill="#F49740"
                                />
                              </svg>
                            </div>
                          </router-link>

                          <!-- Log out -->
                          <div
                            @click="logout"
                            class="group/item cursor-pointer flex justify-between items-center rounded-2xl hover:bg-[#FCF9F7] py-[15px] pl-[10px] pr-[8px]"
                          >
                            <div class="flex justify-start items-center gap-3">
                              <svg
                                width="20"
                                height="18"
                                viewBox="0 0 20 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M0.87868 0.87868C1.44129 0.31607 2.20435 0 3 0H10C10.7956 0 11.5587 0.31607 12.1213 0.87868C12.6839 1.44129 13 2.20435 13 3V5C13 5.55228 12.5523 6 12 6C11.4477 6 11 5.55228 11 5V3C11 2.73478 10.8946 2.48043 10.7071 2.29289C10.5196 2.10536 10.2652 2 10 2H3C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V15C2 15.2652 2.10536 15.5196 2.29289 15.7071C2.48043 15.8946 2.73478 16 3 16H10C10.2652 16 10.5196 15.8946 10.7071 15.7071C10.8946 15.5196 11 15.2652 11 15V13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13V15C13 15.7957 12.6839 16.5587 12.1213 17.1213C11.5587 17.6839 10.7957 18 10 18H3C2.20435 18 1.44129 17.6839 0.87868 17.1213C0.31607 16.5587 0 15.7956 0 15V3C0 2.20435 0.31607 1.44129 0.87868 0.87868Z"
                                  fill="#F49740"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M15.2929 5.29289C15.6834 4.90237 16.3166 4.90237 16.7071 5.29289L19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L16.7071 12.7071C16.3166 13.0976 15.6834 13.0976 15.2929 12.7071C14.9024 12.3166 14.9024 11.6834 15.2929 11.2929L16.5858 10H5C4.44772 10 4 9.55228 4 9C4 8.44772 4.44772 8 5 8H16.5858L15.2929 6.70711C14.9024 6.31658 14.9024 5.68342 15.2929 5.29289Z"
                                  fill="#F49740"
                                />
                              </svg>
                              <span class="font-medium text-[14px]">Log out</span>
                            </div>

                            <!-- chevron right -->
                            <div
                              class="group/show invisible hover:bg-[#FFECDA] group-hover/item:visible p-2 rounded-lg block group-hover:bg-red-900"
                            >
                              <svg
                                class=""
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.172 7L6.808 1.636L8.222 0.222L16 8L8.222 15.778L6.808 14.364L12.172 9H0V7H12.172Z"
                                  fill="#F49740"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
            </div>

            <!-- login and register button -->
            <div v-else class="loginRegister flex gap-10">
              <router-link
                class="flex items-center hover:text-black cursor-pointer"
                to="/"
              >
                <span class="font-bold">Login</span>
              </router-link>
              <router-link
                to="/"
                class="w-[109px] h-[46px] flex justify-center items-center rounded-2xl px-3 py-2 text-sm font-semibold text-white shadow-sm btn-gradient"
              >
                <span>Register</span>
              </router-link>
            </div>
          </div>
          </div>
          <!-- <div class="block lg:hidden">
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447715 0.447715 0 1 0H17C17.5523 0 18 0.447715 18 1C18 1.55228 17.5523 2 17 2H1C0.447715 2 0 1.55228 0 1Z" fill="#361F0A"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M0 7C0 6.44772 0.447715 6 1 6H17C17.5523 6 18 6.44772 18 7C18 7.55228 17.5523 8 17 8H1C0.447715 8 0 7.55228 0 7Z" fill="#361F0A"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M0 13C0 12.4477 0.447715 12 1 12H17C17.5523 12 18 12.4477 18 13C18 13.5523 17.5523 14 17 14H1C0.447715 14 0 13.5523 0 13Z" fill="#361F0A"/>
  </svg>

  </div> -->
          <div class="block md:hidden">
            <button
              v-if="!isMobileMenuOpen"
              @click="openMobileMenu()"
              class="bg-[#F4F3F2] p-2 rounded-md cursor-pointer z-auto"
            >
              <svg
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 1C0 0.447715 0.447715 0 1 0H17C17.5523 0 18 0.447715 18 1C18 1.55228 17.5523 2 17 2H1C0.447715 2 0 1.55228 0 1Z"
                  fill="#361F0A"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 7C0 6.44772 0.447715 6 1 6H17C17.5523 6 18 6.44772 18 7C18 7.55228 17.5523 8 17 8H1C0.447715 8 0 7.55228 0 7Z"
                  fill="#361F0A"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 13C0 12.4477 0.447715 12 1 12H17C17.5523 12 18 12.4477 18 13C18 13.5523 17.5523 14 17 14H1C0.447715 14 0 13.5523 0 13Z"
                  fill="#361F0A"
                />
              </svg>
            </button>
            <button
              v-else
              @click="closeMobileMenu()"
              class="bg-[#F4F3F2] p-2 rounded-md cursor-pointer z-auto"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893Z"
                  fill="#361F0A"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
                  fill="#361F0A"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <transition
      enter-active-class="transition ease-out duration-400"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div v-if="isMobileMenuOpen" class="flex md:hidden border border-red-500">
        <HeaderMobileMenu :users="users" @closeMobileMenu="closeMobileMenu" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, watch,computed } from "vue";
import { useRoute } from "vue-router";
import HeaderMobileMenu from "@/components/HeaderMobileMenu.vue";

import { useAuthStore, useUsersStore } from "@/stores";


const authStore = useAuthStore();
// const { user: authUser } = storeToRefs(authStore);
const route = useRoute();

const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);
const isLoggedin = computed(() => usersStore.isLoggedin);
const isLoadingUserData=computed(() => usersStore.isLoadingUserData);

// const isLoggedin = ref(false);
const profileDrop=ref(false)

const profileToggle=()=>{
    profileDrop.value=!profileDrop.value
}
const isMobileMenuOpen = ref(false);
function openMobileMenu() {
  // alert("close iwdiyr")

  // alert("open iwdiyr")

  isMobileMenuOpen.value = true;
}
function closeMobileMenu() {
  // alert("close iwdiyr")
  isMobileMenuOpen.value = false;
}
console.log("routee bax", route.fullPath);

watch(
  () => route.fullPath,
  (newValue) => {
    isMobileMenuOpen.value = false;
  }
);

function openDropdown() {
  isDropdownOpen.value = true;
}

function logout() {
  // const { email, password } = values;
  // console.log("valuess",values)

  return authStore.logout().then(() => {
    console.log("success logout");
    // redirect to previous url or default to home page
    // router.push(route.query.returnUrl || '/');
  });
  // .catch(error => setErrors({ apiError: error }));
}
usersStore.getUserInfo();
</script>
