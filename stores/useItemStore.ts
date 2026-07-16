import { create } from "zustand"
import { persist } from "zustand/middleware"

import Item from "../types/Item"
import ItemApi from "@/api/ItemApi"

type ItemStore = {
  itemsInHomePage: Item[]
}


export const useItemStore = create<ItemStore>()(
  persist(
    (set,get) => ({

        //data
        itemsInHomePage: [],
      

        //action function


        //상품 조회 요청 -> 홈페이지 상품 리스트에 셋업.
        getItemsInHomePage: async ({page=1, limit=10}: {page: number, limit: number})=>{
            var data = await ItemApi.getItems({page, limit})
            if(data.success){
                var items = data.data;
                set({itemsInHomePage: Item.fromJsonList(items)})
            }
        }

    }),
    {
      name: "item-storage",
    },
  ),
)
