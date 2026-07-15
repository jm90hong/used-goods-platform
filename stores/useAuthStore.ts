import { create } from "zustand"
import { persist } from "zustand/middleware"
import User from "../types/User"

type AuthStore = {
  currentUser: User | null  //현재 사용자 정보
  setCurrentUser: (user:User) => void
  logout: () => void
}


export const useAuthStore = create<AuthStore>()(
  persist(
    (set,get) => ({

      //data
      currentUser: null,

      

      //action function
      setCurrentUser: (user:User)=>{
        set({currentUser:user})
      },

      logout: ()=>{
        set({currentUser:null})
      }

    }),
    {
      name: "auth-storage",
    },
  ),
)
