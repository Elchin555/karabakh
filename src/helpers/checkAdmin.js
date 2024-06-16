
import { useUsersStore } from "@/stores"

export function isAdmin() {
    let userStore=useUsersStore()
    
    if(userStore.isAdmin==true){
        return true
    }else{
        return false
    }
  }