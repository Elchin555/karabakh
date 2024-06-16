import axios from "axios";
import axiosInstance from "./api";
import TokenService from "./token.service";
import {authStore} from "../stores/auth.js"
import router from "../router"
const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      // console.log("tokennnnn",token)
      if (token) {

        // baseURL: BASEURL,
        // headers: {
        //   "Content-Type": "application/json",
        //   Authorization: "Bearer " + TOKEN,
        // },



        config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
        config.headers["Content-Type"] = "application/json"
        // config.headers["x-access-token"] = token; // for Node.js Express back-end
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      // console.log("err.response.status",err.response.status)
      const originalConfig = err.config;
console.log("originalConfig.url",originalConfig.url)
      if (originalConfig.url !== "https://letsi-api.herokuapp.com/api/v1/auth/token/refresh/" && err.response) {
        // console.log("ecpired olduuu",err.response.status)
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
        // console.log("ecpired olduuu2",err.response.status)

          originalConfig._retry = true;

          try {
            // console.log("trya girdiii");
            var authStr = JSON.parse(localStorage.getItem("user"));
            //  authStr=authStr.access
            const TOKEN = authStr.refresh;
            axiosInstance.post("https://letsi-api.herokuapp.com/api/v1/auth/token/refresh/", {
              refresh: TOKEN
            })
            .then(res=>{
              // console.log("musebet",res.data.access);
              console.log("musebet data",res.data);
              var token=res.data
              // const authS = authStore()
              // authS.refreshToken(accessToken)
              //   // store.dispatch('auth/refreshToken', accessToken);
              // var token=response.data
              TokenService.updateLocalAccessToken(token);
                // TokenService.setUser(res.data);
              
            }).catch(err=>{
              console.log("menfi",err);
              alert("logout vaxtidii")
              // router.push({name:"Login"})
            })
            //  console.log("rse bax",rs)
            // const { accessToken } = rs.data;
        // console.log("accesstokei goster",accessToken)
       

            return axiosInstance(originalConfig);
          } catch (_error) {
            console.log("_errorrr",_error);
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;