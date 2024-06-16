import api from "./api";
import TokenService from "./token.service";
import axios from "axios"
import router from "../router"

class AuthService {
  // login({ email, password }) 
  login({email,password}) 
  {
    console.log("gelen email AuthServisde",email)
    console.log("gelen password AuthServisde",password)
  // console.log("logindeyem")

    // return api
    axios.post("https://letsi-api.herokuapp.com/api/v1/auth/login/",
       {
        email,
        password
                // email:"admin@example.com",
                // password:"admin123"
      })
      .then((response) => {
        console.log("ugurlu3",response.data)
        if (response.data.access) {
          TokenService.setUser(response.data);
          router.push({name:"Home"})
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  register({ username, email, password }) {
    return api.post("/auth/signup", {
      username,
      email,
      password
    });
  }
}

export default new AuthService();
