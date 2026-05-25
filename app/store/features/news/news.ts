import { INews } from "@/app/libs/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define state type
interface IInitialState {
  isShowNews: boolean;
  isEditNews: boolean;
  isDeleteNews: boolean;
  isNewNews: boolean;
  selectedNews: INews | null;
}

// Initial state
const initialState: IInitialState = {
  isShowNews: false,
  isEditNews: false,
  isDeleteNews: false,
  isNewNews: false,
  selectedNews: null,
};

export const NewsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setIsNewNews: (state, action: PayloadAction<boolean>) => {
      state.isNewNews = action.payload;
    },
    setIsShowNews: (state, action: PayloadAction<boolean>) => {
      state.isShowNews = action.payload;
    },
    setIsEditNews: (state, action: PayloadAction<boolean>) => {
      state.isEditNews = action.payload;
    },
    setIsDeleteNews: (state, action: PayloadAction<boolean>) => {
      state.isDeleteNews = action.payload;
    },
    setSelectedNews: (state, action: PayloadAction<INews>) => {
      state.selectedNews = action.payload;
    },
  },
});

export default NewsSlice.reducer;

export const {
  setIsDeleteNews,
  setIsEditNews,
  setIsNewNews,
  setIsShowNews,
  setSelectedNews,
} = NewsSlice.actions;
