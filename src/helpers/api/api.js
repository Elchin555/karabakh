import axios from "axios";

if (localStorage.getItem("user")) {
  var authStr = JSON.parse(localStorage.getItem("user"));
}

  //  authStr=authStr.access
  const TOKEN = authStr?.access;
  const BASEURL = "https://letsi-api.herokuapp.com/api/v1";
  // const ENDPOINT = "/auth/user";

  const instance=axios
    .create({
      baseURL: BASEURL,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + TOKEN,
      },
    })
   





export default instance;
