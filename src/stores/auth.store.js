import { defineStore } from 'pinia';

import { fetchWrapper, router } from '../helpers';
import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: null,
        // access_token:null,
        userInfo:null,
        refreshTokenTimeout: null
    }),
    actions: {
        // async getUserInfo() {
        //     this.userInfo = await fetchWrapper.get(`${baseUrl}/user/me`, {}, { credentials: 'include' });
            
        // },
        // async login(email, password) {
        //     this.user = await fetchWrapper.post(`${baseUrl}/login`, { email, password });
        //     // console.log("auth store icersindeki user",this.user?.token.access_token)
        //     if(this.user?.token.access_token){

        //         localStorage.setItem('a_token',this.user?.token.access_token)
        //         localStorage.setItem('r_token',this.user?.token.refresh_token)
        //     }
        //     this.startRefreshTokenTimer();
        // },
        async login(email,password) {
          
            console.log("sss",email,password)
            const info = {
               email:email,
               password:password
            };
            const { status, data } = await axios.post(
              `https://slight-api-77b9233d558c.herokuapp.com/api/auth/login`,
              info,
            )
            console.log("login status", status);
            console.log("dataaaaaaa", data.data.access_token);
            console.log("dataaaaaaa", data.data.refresh_token);
            // console.log("login data", data.token.access_token);
            // console.log("login data", data.token.refresh_token);

                     if(data.data.access_token){

                localStorage.setItem('a_token',data?.data?.access_token)
                localStorage.setItem('r_token',data?.data?.refresh_token)
            }
            this.startRefreshTokenTimer();
          },
          async googleLogin(token) {
          
            // console.log("sss",email,password)
            // const info = {
            //    email:email,
            //    password:password
            // };
            const { status, data } = await axios.post(
              `https://slight-api-77b9233d558c.herokuapp.com/api/auth/google-login?token=${token}`,
              // info,
            )
            console.log("login status", status);
            console.log("dataaaaaaa", data.data.access_token);
            console.log("dataaaaaaa", data.data.refresh_token);
            // console.log("login data", data.token.access_token);
            // console.log("login data", data.token.refresh_token);

                     if(data.data.access_token){

                localStorage.setItem('a_token',data?.data?.access_token)
                localStorage.setItem('r_token',data?.data?.refresh_token)
            }
            this.startRefreshTokenTimer();
          },
          async facebookLogin(token) {
          
          console.log("facebook logine geldim ",token)
            const { status, data } = await axios.post(
              `https://slight-api-77b9233d558c.herokuapp.com/api/auth/facebook-login?access_token=${token}`,
              // info,
            )
            console.log("login status facebook", status);
            console.log("dataaaaaaa facebook", data.data.access_token);
            console.log("dataaaaaaa facebook", data.data.refresh_token);
            // console.log("login data", data.token.access_token);
            // console.log("login data", data.token.refresh_token);

                     if(data.data.access_token){

                localStorage.setItem('a_token',data?.data?.access_token)
                localStorage.setItem('r_token',data?.data?.refresh_token)
            }
            this.startRefreshTokenTimer();
          },
        async register(user) {
            console.log("regiser ucun gonderilen user",user)
          
            const info = {
                // user_data: {
                    fullname: user.fullname,
                    email: user.email,
                    password: user.password,
                    passwordConfirm: user.passwordConfirm,
                  // },
                  // verification_url: 'http://127.0.0.1:5173',
                  // verification_url: 'https://slight-api-77b9233d558c.herokuapp.com',
                  
            };
            const { status, data } = await axios.post(
              `https://slight-api-77b9233d558c.herokuapp.com/api/auth/register`,
              info,
            );
            console.log("register", status, data);
          },

        async logout() {
            // fetchWrapper.post(`${baseUrl}/revoke-token`, {}, { credentials: 'include' });
            // this.stopRefreshTokenTimer();
            localStorage.clear()
            this.user = null;
            router.push('/login');
        },
        async refreshToken() {
            const r_token = localStorage.getItem("r_token");
            const config = {
                headers: { Authorization: `Bearer ${r_token}` }
            };
            const { status, data } = await axios.get('https://slight-api-77b9233d558c.herokuapp.com/api/auth/refresh', config)
            // console.log("user neticesine bax refresh token ise dusur",status,data.data.access_token)
            localStorage.setItem('a_token',data.data.access_token)
            // this.startRefreshTokenTimer();
        },
        async verifyEmailWithToken(token) {
        
            const { status, data } = await axios.get(`https://slight-api-77b9233d558c.herokuapp.com/api/auth/verifyemail/${token}`)
            console.log("verify oldu yoxsa yox",status,data)
        },
        startRefreshTokenTimer() {
            // // access_token
            // // refresh_token
            // console.log("this.user",this.user.token)
            // // parse json object from base64 encoded jwt token
            // // const jwtBase64 = this.user.token.split('.')[1];
            // const jwtToken = this.user.token
            // // const jwtToken = JSON.parse(atob(jwtBase64));
            // // const jwtToken = JSON.parse(atob(jwtBase64));
    
            // // set a timeout to refresh the token a minute before it expires
            // const expires = new Date(jwtToken.exp * 1000);
            // const timeout = expires.getTime() - Date.now() - (60 * 1000);
            // this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
            // const jwtBase64 = this.user.jwtToken.split('.')[1];
            const access_token = this.user?.token?.access_token
            // console.log("access_token baxx",this.user?.token)
    let exp=1683292113
            // set a timeout to refresh the token a minute before it expires
            const expires = new Date(exp * 1000);
            const timeout = expires.getTime() - Date.now() - (60 * 1000);
            this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
        },    
        stopRefreshTokenTimer() {
            clearTimeout(this.refreshTokenTimeout);
        },
        async resetPasswordRequest(email) {
            console.log("user reset password",email)
            const token = localStorage.getItem("a_token");
            // const headers = {
            //   Authorization: `Bearer ${token}`,
            //   "Content-Type": "application/json",
            // };
            const info = {
              email: email,
              // url: "http://127.0.0.1:5173/resetpassword"
              // url: "https://slight-api-77b9233d558c.herokuapp.com/resetpassword"
            };
            const { status, data } = await axios.post(
              `https://slight-api-77b9233d558c.herokuapp.com/api/auth/reset-password-request`,
              info,
              // { headers }
            );
            console.log("password ugurla degisti  yoxsa yox", status, data);
          },
          async checkPasswordToken(token) {
            console.log("check token",token)
            // const token = localStorage.getItem("a_token");
            // const headers = {
            //   Authorization: `Bearer ${token}`,
            //   "Content-Type": "application/json",
            // };
            const info = {
              token:token
              // email: email,
              // url: "http://127.0.0.1:5173/resetpassword"
            };
            const { status, data } = await axios.get(
              `https://slight-api-77b9233d558c.herokuapp.com/api/admin/dashboard`,
              info,
              // { headers }
            );
            console.log("check token", status, data);
          },
          async resetPassword(user) {
            console.log("resetpassword user",user)
            // const token = localStorage.getItem("a_token");
            // const headers = {
            //   Authorization: `Bearer ${token}`,
            //   "Content-Type": "application/json",
            // };
            const info = {
              token: user.value.token,
              new_password: user.value.password
            };
            const { status, data } = await axios.put(
              `https://slight-api-77b9233d558c.herokuapp.com/api/auth/reset-password`,
              info,
              // { headers }
            );
            console.log("check token", status, data);
          },
          

    }
});
