import axios from "axios";


interface CreateItemProps {
    userIdx: number;
    itemImgUrl: string;
    description: string;
    name: string;
    price: number;
}

interface GetItemsProps {
    page: number;
    limit: number;
    searchWord: string;
    order: 'asc' | 'desc';
}

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/item`;


const ItemApi = {


    //idx로 상품 조회
    getItemByIdx: async (idx: number)=>{
        var response = await axios.get(`${baseUrl}/${idx}`)
        return response.data;
    },


    //상품 조회 요청
    getItems : async ({page=1, limit=10, searchWord='', order='desc'}: GetItemsProps)=>{
        var response = await axios.get(`${baseUrl}/list?page=${page}&limit=${limit}&search_word=${searchWord}&order=${order}`)

        return response.data;
    },

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