import { CategoryType } from "@/difinitions/types/components-type/CategoryType";
import { RootState } from "@/store/store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type categoryState = {
    catagories: CategoryType[];
    isLoading: boolean;
    error: string | null;
}

const initialState: categoryState = {
    catagories: [],
    isLoading: false,
    error: null,
}

const categoeySlice = createSlice({
    name: "categoeySlice",
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<CategoryType[]>) => {
            state.catagories = action.payload;
            state.isLoading = false;
            state.error = null;
        }
    }
})

export const {setCategories} = categoeySlice.actions;
// export const selectCategory = (state: RootState) => state.category.Categories;
// export const selectLoading = (state: RootState) => state.faculty.isLoading;
// export const selectError = (state: RootState) => state.faculty.error;


export default categoeySlice.reducer;