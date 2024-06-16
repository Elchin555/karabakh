import { defineStore } from "pinia";
import axios from "axios";
import { router } from "@/helpers";
// axios.defaults.baseURL = 'https://slight-api-77b9233d558c.herokuapp.com/api/';
// import { fetchWrapper } from "../helpers";

// const baseUrl = `${import.meta.env.VITE_API_URL}/user`;

export const useTripStore = defineStore({
  id: "trip",
  state: () => ({
    // users: {},
    // name: "elmeddin",
    isCompletedRequest:false,
    getMapData:null,
    tripResponse: null,
    getTripResponseData: "",
    newgetTripDetal:"",
    getAllTripResponse: [],
    getAllSavedTripResponse: [],
    isLoadingTripData: false,
    delay: 1000,
    error: "",
    isSavedTrip:null
  }),
  actions: {
    resetTripResponse() {
      this.tripResponse = null;
    },
    async getTripDetail() {
      console.log("getTripDetail iwe duwdu");
      // const tripId = localStorage.getItem("tripId");

      // const headers = {
      //   Authorization: `Bearer ${token}`,
      //   "Content-Type": "multipart/form-data",
      // };

      const { status, data } = await axios.get(
        `https://slight-api-77b9233d558c.herokuapp.com/api/trip/${tripId}`
        // formData,
        // { headers }
      );
    },
    async waitBody(tripData) {

      const body = {
        destination: tripData?.destination,
        budget: tripData?.budget,
        travel_with: tripData?.travelWith,
        start_date:tripData?.startDate,
        end_date:tripData?.endDate,
      };
      await this.createTripRequest(body, tripData?.place_id);
    },
    async createTripRequest(body, place_id) {
      console.log("create oldu 1 trip boduyee bax", body);
      console.log("store create place id : ", place_id);
      const headers = {};
      const token = localStorage.getItem("a_token");

      if (token) {
        headers.Authorization = `Bearer ${token}`;
        headers["Content-Type"] = "application/json";
      }

      const { status, data } = await axios.post(
        `https://slight-api-77b9233d558c.herokuapp.com/api/trip/create-request?place_id=${place_id}`,
        body,
        { headers }
      );

      console.log("trip response", data.data.trip.response);
      // localStorage.setItem("tripId", data.data.trip.id);

      const tripId = data.data.trip.id;

      if (tripId) {
        console.log("trip id var isdir check response -a kecsin")
        await this.checkTripResponse(tripId);
      } else {
        console.log("trip id yoxdu");
      }
    },
    async checkTripResponse(tripId) {
      // const tripId ="6490be46475ca774b7cc9e62"
      console.log("checkTripResponse kecdi", tripId);
      let attempts = 0;
      const maxAttempts = 7;
      const delay = 2000;
      this.isLoadingTripData = true;

      while (this.tripResponse === null && attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, this.delay));

        let { status, data } = await axios.get(
          `https://slight-api-77b9233d558c.herokuapp.com/api/trip/${tripId}`
        );
        this.delay = 10000;
        this.tripResponse = data.data.trip_response;
        this.getTripResponseData = data.data;
        this.isCompletedRequest=true
        console.log("tripResponse baxxxxx", data.data.trip_response);

        attempts++;
      }

      if (this.tripResponse !== null ) {
        this.isLoadingTripData = false;
        router.push(`/tripInfo/${tripId}`);
        // this.tripResponse=null
      } else {
        console.log("cavab gelmirr");
        this.isLoadingTripData = false;
        // İstenilen cevap alınamadı, hata işlemleri yapın
        this.error = "Cevap alınamadı";
      }
    },
    async getTripDetailResponse(tripId) {
      // const tripId ="6490be46475ca774b7cc9e62"


        let { status, data } = await axios.get(
          `https://slight-api-77b9233d558c.herokuapp.com/api/trip/${tripId}`
        );
        this.delay = 10000;
        // this.tripResponse = data.data.trip_response;
        this.newgetTripDetal = data.data;

        console.log("detail response",data.data.trip.is_saved)
        this.isSavedTrip=data?.data?.trip?.is_saved



    },
    async getAllTripList(sort) {
      this.getAllTripResponse = { loading: true };
      const token = localStorage.getItem("a_token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      let { status, data } = await axios.get(
        `https://slight-api-77b9233d558c.herokuapp.com/api/trip/list?sort=${sort}`,
        { headers }
      );
      console.log("status all trip list", status);
      console.log("data all trip list", data.data);
      this.getAllTripResponse = data.data;
    },
    async getAllSavedTripList(sort) {
      this.getAllSavedTripResponse = { loading: true };
      const token = localStorage.getItem("a_token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      let { status, data } = await axios.get(
        `https://slight-api-77b9233d558c.herokuapp.com/api/trip/saved-list?sort=${sort}`,
        { headers }
      );
      console.log("status all trip list", status);
      console.log("data all trip list", data.data);
      this.getAllSavedTripResponse = data.data;
    },

    async changeTripDayDetail(tripId,body) {
      console.log("tripstorea gelen body",JSON.parse(JSON.stringify(body)))
      // console.log("changeTripDayDetail iwe duwdu", body);
      const token = localStorage.getItem("a_token");
      // const tripId = "64a2c1b02bf74b6fe15d8985";

      // const headers = {
      //   Authorization: `Bearer ${token}`,
      //   "Content-Type": "multipart/form-data",
      // };
      // const body={
      //   "days": [
      //     {
      //       "title": "string",
      //       "items": [
      //         {
      //           "content": "string"
      //         }
      //       ]
      //     }
      //   ]
      // }
      const days=body.days

      const { status, data } = await axios.put(
        `https://slight-api-77b9233d558c.herokuapp.com/api/trip/${tripId}`,
        {days},
        // { headers }
      );
      console.log("changeTripDayDetail status", status);
      console.log("changeTripDayDetail data", data);
    },
    async addSavedTrip(tripId) {
      // let trip_id = tripId;
      const token = localStorage.getItem("a_token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };


console.log("headerse baxxx",headers)


      let { status, data } = await axios.post(

        `https://slight-api-77b9233d558c.herokuapp.com/api/trip/${tripId}/save`,{},
        {headers}
      );
      console.log("saved trip status", status);
      console.log("saved trip data", data.data.is_saved);
      this.isSavedTrip=data?.data?.is_saved

    },
    async unSavedTrip(tripId) {
      // let trip_id = tripId;
      const token = localStorage.getItem("a_token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };


         console.log("headerse baxxx",headers)


      let { status, data } = await axios.post(
        `https://slight-api-77b9233d558c.herokuapp.com/api/trip/${tripId}/unsave`,{},
        {headers}
      );
      console.log("unsave trip status", status);
      console.log("unsave trip data", data.data.is_saved);
      this.isSavedTrip=data?.data?.is_saved
    },
    async getMap(input) {
      console.log('inp', input);
        let { status, data } = await axios.get(
          `https://slight-api-77b9233d558c.herokuapp.com/api/map/autocomplete?input=${input}`
        );
        console.log('da', data);
        this.getMapData = data.data;

    },

    //     async checkTripResponse(tripId) {
    //       let attempts = 0;
    //       const maxAttempts = 7;
    //       const delay = 100;

    //       while (this.tripResponse === null && attempts < maxAttempts) {
    //         await new Promise(resolve => setTimeout(resolve, delay));

    //         let { status, data } = await axios.get(
    //           `https://slight-api-77b9233d558c.herokuapp.com/api/trip/${tripId}`,

    //         );

    // this.tripResponse=data.data.trip_response

    // console.log("tripResponse baxxxxx",tripResponse)
    //         attempts++;
    //       }

    //       if (this.tripResponse !== null) {
    //         // İstenilen cevap alındı, işlemleri gerçekleştirin
    //         console.log("this.tripResponse cavab geldi",this.tripResponse)
    //       } else {
    //         console.log("cavab gelmirr")
    //         // İstenilen cevap alınamadı, hata işlemleri yapın
    //         this.error = 'Cevap alınamadı';
    //       }
    //   },
    // async updateProfilePhoto(newPhoto) {
    //   this.users.data.user.profile_photo = newPhoto;
    // },
    // async changePassword(user) {
    //   console.log("user password",user)
    //   const token = localStorage.getItem("a_token");
    //   const headers = {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "application/json",
    //   };
    //   const info = {
    //     old_password: user?.oldPassword,
    //     new_password: user?.password,
    //     confirm_new_password: user?.passwordConfirm
    //   };
    //   const { status, data } = await axios.put(
    //     `https://slight-api-77b9233d558c.herokuapp.com/api/auth/change-password`,
    //     info,
    //     { headers }
    //   );
    //   console.log("password ugurla degisti  yoxsa yox", status, data);
    // },
  },
});
