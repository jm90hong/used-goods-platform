import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface SignupProps {
    email: string
    password: string
    nickname: string
    address: string
    addressDetail: string
}

interface LoginProps {
    id: string
    password: string
}


const UserApi = {

    //로그인 요청
    login: async (props: LoginProps) : Promise<any> =>{
        var response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, 
            {
                id:props.id,
                pw:props.password
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )

        return response.data;
    },

    //회원 가입 요청
    signup: async (props: SignupProps) : Promise<any> =>{
        var response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/user/create`, 
            {
                id:props.email,
                pw:props.password,
                nick:props.nickname,
                address1:props.address,
                address2:props.addressDetail
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )

        return response.data;
    },


    
}





export default UserApi