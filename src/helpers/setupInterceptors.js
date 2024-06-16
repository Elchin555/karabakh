
// import axios from 'axios';

// export default {
//   install: (app) => {
//     const api = axios.create({
//       baseURL: 'https://slight-api-86967ce77eee.herokuapp.com/api',
//     });

//     api.interceptors.request.use((config) => {
//       const accessToken = localStorage.getItem('a_token');
//       if (accessToken) {
//         config.headers.Authorization = `Bearer ${accessToken}`;
//       }
//       return config;
//     });

//     api.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         const originalRequest = error.config;

//         if (error.response.status === 401 && !originalRequest._retry) {
//           console.log("access vaxti bitdi",error.response.status)
//           originalRequest._retry = true;

//           const refreshToken = localStorage.getItem('r_token');

//           if (refreshToken) {
//             try {
//               const response = await api.post('/api/refresh', { refreshToken });
//               const { accessToken } = response.data;
//               console.log("accessTokenaccessToken",accessToken)
//               localStorage.setItem('accessToken', accessToken);

//               return api(originalRequest);
//             } catch (error) {
//               console.error("refreshde error oldu",error);
//             }
//           }

//           router.push('/login');
//         }else{
//           console.log("go ahead")
//         }

//         return Promise.reject(error);
//       },
//     );

//     // Axios örneğini tüm bileşenlere erişilebilir hale getirin
//     app.config.globalProperties.$api = api;
//   },
// };
