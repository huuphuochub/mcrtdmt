// store.ts
import { create } from "zustand";
import { Category } from "@/interface/category.interface";
import { Getallcategory } from "@/service/categoryservice";



interface CategoryState {
  categorys: Category[];
  loading: boolean;
  error: string | null;
  fetchCategorys: () => Promise<void>;
}

const useCategoryyroStore = create<CategoryState>((set) => ({
  categorys: [],
  loading: false,
  error: null,
  fetchCategorys: async () => {
    set({ loading: true, error: null });
    try {
      const res = await Getallcategory();
      console.log(res);
      
      const data: Category[] = res.data.data
    //   console.log(data);
      
      set({ categorys: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  }
}));

export default useCategoryyroStore;
