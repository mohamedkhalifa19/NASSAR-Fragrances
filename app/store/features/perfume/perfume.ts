// app/store/features/perfume/perfume.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "@/app/libs/types";

export interface IInitialStatePerfume {
  isShowPerfume: boolean;
  isEditPerfume: boolean;
  isDeletePerfume: boolean;
  isNewPerfume: boolean;
  selectedPerfume: IProduct | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: IInitialStatePerfume = {
  isDeletePerfume: false,
  isEditPerfume: false,
  isNewPerfume: false,
  isShowPerfume: false,
  selectedPerfume: null,
  isLoading: false,
  error: null,
};

export const PerfumeSlice = createSlice({
  name: "perfume",
  initialState,
  reducers: {
    setIsNewPerfume: (state, action: PayloadAction<boolean>) => {
      state.isNewPerfume = action.payload;
    },
    setIsShowPerfume: (state, action: PayloadAction<boolean>) => {
      state.isShowPerfume = action.payload;
    },
    setIsEditPerfume: (state, action: PayloadAction<boolean>) => {
      state.isEditPerfume = action.payload;
    },
    setIsDeletePerfume: (state, action: PayloadAction<boolean>) => {
      state.isDeletePerfume = action.payload;
    },
    setSelectedPerfume: (state, action: PayloadAction<IProduct>) => {
      state.selectedPerfume = action.payload;
    },
  },
});

export default PerfumeSlice.reducer;

export const {
  setIsDeletePerfume,
  setIsEditPerfume,
  setIsShowPerfume,
  setIsNewPerfume,
  setSelectedPerfume,
} = PerfumeSlice.actions;
