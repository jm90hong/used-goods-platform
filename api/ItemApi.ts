import axios from "axios";


interface CreateItemProps {
    userIdx: number;
    itemImgUrl: string;
    description: string;
    name: string;
    price: number;
}

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/item`;


const ItemApi = {

    //상품 등록 요청
    createItem: async (props: CreateItemProps)=>{
        var response = await axios.post(
            `${baseUrl}/create`, 
            {
                user_idx:props.userIdx,
                item_img_url:props.itemImgUrl,
                description:props.description,
                name:props.name,
                price:props.price
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )

        return response.data;
    }
}

export default ItemApi;