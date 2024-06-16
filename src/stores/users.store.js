import { defineStore } from "pinia";
import axios from "axios";
// axios.defaults.baseURL = 'https://slight-api-77b9233d558c.herokuapp.com/api/';
import { fetchWrapper } from "../helpers";

const baseUrl = `${import.meta.env.VITE_API_URL}/user`;

export const useUsersStore = defineStore({
  id: "users",
  state: () => ({
    users: null,
    name: "elmeddin",
    isLoadingUserData:false,
    isAdmin:null
  }),
  actions: {
    async getUserInfo() {
      this.users = { loading: true };
      this.isLoadingUserData = true;
      try {
        // const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI2NDRmZTcxMmIyNzc0ZWIzNDZhNmMwNWYiLCJpYXQiOjE2ODMyMTIwMDYsIm5iZiI6MTY4MzIxMjAwNiwianRpIjoiZmJmYjBiODYtMzk3Yi00ZjgwLWExZDEtZGVmZjQzYTU5YzI4IiwiZXhwIjoxNjgzMjEyMDY2LCJ0eXBlIjoiYWNjZXNzIiwiZnJlc2giOmZhbHNlfQ.cN-9NehNkJtdff_EoPo33GiuPuUK2ZqrJbsyC4CogLQG58ZGmxHgGyljcIlNeFLeJteL-ITGrWwDRKftPGsHhA`
        const token = localStorage.getItem("a_token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(
          `https://slight-api-77b9233d558c.herokuapp.com/api/user/me`,
          config
        );
        // this.userInfo = response.data
        this.users = response;
        console.log("response.data users", response);
        console.log("response.data users isAdmin", response.data.data.role);
        if(response.data.data.role=="admin"){
          this.isAdmin=true
        }else{
          this.isAdmin=false
        }

      } catch (e) {
        this.users = null;
        localStorage.clear();
        console.log("eroor var users", e);
      }finally {
        this.isLoadingUserData = false;
      }

    },
    async updateUser(user) {
      console.log("user.role",user.role)
      console.log("user.is_active",user.is_active)
      const token = localStorage.getItem("a_token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const info = {
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        is_active: user.is_active,
      };
      const { status, data } = await axios.put(
        `https://slight-api-77b9233d558c.herokuapp.com/api/auth/update/${user.id}`,
        info,
        { headers }
      );
      console.log("update oldu yoxsa yox", status, data);
    },
    async uploadProfilePhoto(user, image) {
      const token = localStorage.getItem("a_token");

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };
      const formData = new FormData();
      formData.append("image", image);
      const info = {
        image: null,
      };

      const { status, data } = await axios.post(
        `https://slight-api-77b9233d558c.herokuapp.com/api/auth/upload-photo/${user.id}`,
        formData,
        { headers }

      );
      console.log("data for update photo",data.data)
      this.updateProfilePhoto(data?.data?.profile_photo);
    },
    async updateProfilePhoto(newPhoto) {
      console.log("newPhoto",newPhoto)
      console.log("burdaki this user",this.users?.data?.data)
      this.users.data.data.profile_photo = newPhoto;
    },
    async changePassword(user) {
      console.log("user password",user)
      const token = localStorage.getItem("a_token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const info = {
        old_password: user?.oldPassword,
        new_password: user?.password,
        confirm_new_password: user?.passwordConfirm
      };
      const { status, data } = await axios.put(
        `https://slight-api-77b9233d558c.herokuapp.com/api/auth/change-password`,
        info,
        { headers }
      );
      console.log("password ugurla degisti  yoxsa yox", status, data);
    },
    // async resetPasswordRequest(user) {
    //   console.log("user password",user)
    //   const token = localStorage.getItem("a_token");
    //   // const headers = {
    //   //   Authorization: `Bearer ${token}`,
    //   //   "Content-Type": "application/json",
    //   // };
    //   const info = {
    //     email: user.email,
    //     url: "http://127.0.0.1:5173"
    //   };
    //   const { status, data } = await axios.post(
    //     `https://slight-api-77b9233d558c.herokuapp.com/api/auth/reset-password-request`,
    //     info,
    //     // { headers }
    //   );
    //   console.log("password ugurla degisti  yoxsa yox", status, data);
    // },
    
  },
  getters: {
    isLoggedin: (state) => {
      return state.users !== null;
    },
  },
});


