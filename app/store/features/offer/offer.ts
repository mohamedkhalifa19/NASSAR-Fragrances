import { IOffer, IProduct } from "@/app/libs/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define state type
interface IInitialState {
  isShowOffer: boolean;
  isEditOffer: boolean;
  isDeleteOffer: boolean;
  isNewOffer: boolean;
  selectedOffer: IOffer | null;
}

// Initial state
const initialState: IInitialState = {
  isShowOffer: false,
  isEditOffer: false,
  isDeleteOffer: false,
  isNewOffer: false,
  selectedOffer: null,
};

export const OfferSlice = createSlice({
  name: "offer",
  initialState,
  reducers: {
    setIsNewOffer: (state, action: PayloadAction<boolean>) => {
      state.isNewOffer = action.payload;
    },
    setIsShowOffer: (state, action: PayloadAction<boolean>) => {
      state.isShowOffer = action.payload;
    },
    setIsEditOffer: (state, action: PayloadAction<boolean>) => {
      state.isEditOffer = action.payload;
    },
    setIsDeleteOffer: (state, action: PayloadAction<boolean>) => {
      state.isDeleteOffer = action.payload;
    },
    setSelectedOffer: (state, action: PayloadAction<IOffer>) => {
      state.selectedOffer = action.payload;
    },
  },
});

export default OfferSlice.reducer;

export const {
  setIsDeleteOffer,
  setIsEditOffer,
  setIsShowOffer,
  setIsNewOffer,
  setSelectedOffer,
} = OfferSlice.actions;
