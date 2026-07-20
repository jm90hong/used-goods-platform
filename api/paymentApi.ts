import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/payment`;


type CreatePaymentProps = {
    userIdx: number
    itemIdx: number
}

const PaymentApi = {


    //결제 요청.
    createPayment: async (payment:CreatePaymentProps) => {
        const response = await axios.post(
            `${baseUrl}/create`, 
            {
                user_idx:payment.userIdx,
                item_idx:payment.itemIdx
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        return response.data
    }
    
}

export default PaymentApi;