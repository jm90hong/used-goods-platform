import { create } from "zustand"
import { persist } from "zustand/middleware"

import Item from "../types/Item"
import ItemApi from "@/api/ItemApi"

type ItemStore = {
  itemsInHomePage: Item[]
  detailItem: Item | null
  getItemsInHomePage: (props: {page: number, limit: number, searchWord: string, order: 'asc' | 'desc'}) => Promise<void>
  resetItemsInHomePage: () => void
  getDetailItem: (idx: number) => Promise<void>
  resetDetailItem: () => void
}


export const useItemStore = create<ItemStore>()(
  persist(
    (set,get) => ({

        //data
        itemsInHomePage: [],

        detailItem:null,
      

        //action function

        //상품 상세 조회 요청
        getDetailItem: async (idx: number)=>{
            var data = await ItemApi.getItemByIdx(idx)
            if(data.success){
                set({detailItem: Item.fromJson(data.data)})
            }else{
              set({detailItem: null})
            }
        },

        //데이터 초기화
        resetItemsInHomePage: () => {
            set({itemsInHomePage: []})
        },

        resetDetailItem: () => {
            set({detailItem: null})
        },

        //상품 조회 요청 -> 홈페이지 상품 리스트에 셋업.
        getItemsInHomePage: async ({page=1, limit=10, searchWord='', order='desc'}: {page: number, limit: number, searchWord: string, order: 'asc' | 'desc'})=>{
            var data = await ItemApi.getItems({page, limit, searchWord, order})
            if(data.success){
                var items = Item.fromJsonList(data.data);

                if(page === 1){
                    // 첫 페이지는 교체 (중복 방지)
                    set({itemsInHomePage: items})
                }else{
                    // 더보기는 기존 idx 제외하고 추가
                    const existingIds = new Set(get().itemsInHomePage.map((item) => item.idx))
                    const uniqueItems = items.filter((item) => !existingIds.has(item.idx))
                    set({itemsInHomePage: [...get().itemsInHomePage, ...uniqueItems]})
                }
            }
        }

    }),
    {
      name: "item-storage",
    },
  ),
)
