import { defineStore } from "pinia";
import axios from "axios";
// import { router } from "@/helpers";


export const useAdminStore = defineStore({
  id: "trip",
  state: () => ({
      testAdmin:"Abdulla gul",
      adminDashboard:"test",
      userList:null,
      userInfo:null,
      popularDestination:null,
      allTripList:null,
      tripDetail:null,
      allSavedTripList:null
  
  }),
actions:{
  async getAdminDashboard() {
    const a_token = localStorage.getItem("a_token");
    const config = {
        headers: { Authorization: `Bearer ${a_token}` }
    };
    const { status, data } = await axios.get('https://slight-api-77b9233d558c.herokuapp.com/api/admin/dashboard', config)
    console.log("getAdminDashboard status111111",status)
    console.log("getAdminDashboard data",data.data)
    this.adminDashboard=data.data
    console.log("adminDashboardadminDashboard",this.adminDashboard)
}, 
async getUserList() {
  const a_token = localStorage.getItem("a_token");
  const config = {
      headers: { Authorization: `Bearer ${a_token}` }
  };
  const { status, data } = await axios.get('https://slight-api-77b9233d558c.herokuapp.com/api/user/list', config)
  this.userList=data.data
}, 
async getUserInfo(user_id){
  const userId="645f89abd498848ba16f4824"
  console.log("getUserInfo iwe dusdu",user_id)
  const a_token = localStorage.getItem("a_token");
  const config = {
      headers: { Authorization: `Bearer ${a_token}` }
  };
  const { status, data } = await axios.get(`https://slight-api-77b9233d558c.herokuapp.com/api/user/${user_id}`, config)
  console.log("getUserInfo status",status)
  console.log("getUserInfo data",data)
  this.userInfo=data.data
  
},
async getPopularDestination(){
 
  const { status, data } = await axios.get(`https://slight-api-77b9233d558c.herokuapp.com/api/map/popular-destinations`)
  this.popularDestination=data.data
  
},
async deletePopularDestination(destination_id){
  const a_token = localStorage.getItem("a_token");
  const config = {
      headers: { Authorization: `Bearer ${a_token}` }
  };
  const { status, data } = await axios.delete(`https://slight-api-77b9233d558c.herokuapp.com/api/map/delete-destination/${destination_id}`,config)
  console.log("deletePopularDestination status1111111",status)
  console.log("deletePopularDestination data11111",data)
  // this.popularDestination=data.data
  
},
async getAllTripList() {
  const a_token = localStorage.getItem("a_token");
  const config = {
      headers: { Authorization: `Bearer ${a_token}` }
  };
  const { status, data } = await axios.get('https://slight-api-77b9233d558c.herokuapp.com/api/admin/trip-list', config)
  console.log("getAllTripList",data.data)
  this.allTripList=data.data
  console.log("allTripList",this.allTripList)
}, 
async getTripDetail(tripId) {
  const a_token = localStorage.getItem("a_token");
  const config = {
      headers: { Authorization: `Bearer ${a_token}` }
  };
  const { status, data } = await axios.get(`https://slight-api-77b9233d558c.herokuapp.com/api/admin/trip/${tripId}`, config)
  console.log("getTripDetail88888",data)
  this.tripDetail=data.data
  console.log("tripDetailtripDetailtripDetailtripDetail",this.tripDetail)
}, 
async changeTripDayDetail(tripId,body) {
  const days=body.days
  const { status, data } = await axios.put(
    `https://slight-api-77b9233d558c.herokuapp.com/api/trip/${tripId}`,
    {days},
    // { headers }
  );
  console.log("changeTripDayDetail status", status);
  console.log("changeTripDayDetail data", data);
},
async getAllSavedTripList() {
  const a_token = localStorage.getItem("a_token");
  const config = {
      headers: { Authorization: `Bearer ${a_token}` }
  };
  const { status, data } = await axios.get('https://slight-api-77b9233d558c.herokuapp.com/api/admin/saved-trip-list', config)
  console.log("allSavedTripList333",data)
  this.allSavedTripList=data.data
  console.log("allSavedTripList",this.allSavedTripList)
}, 


}
});
