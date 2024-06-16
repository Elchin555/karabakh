export function isAuthenticated() {
    const a_token=localStorage.getItem("a_token")
    const r_token=localStorage.getItem("r_token")
    if(a_token && r_token){
        return true
    }else{
        return false
    }
  }