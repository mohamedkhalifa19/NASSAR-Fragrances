import { cache } from "react";
import { getNews } from "../actions/news.actions";
import { getOffers } from "../actions/offer.actions";
import { getProducts } from "../actions/product.actions";
import { ActionResult, ILogin, INews, IOffer, IProduct } from "../libs/types";

export const getPerfumes = cache(async () => {
  const result: ActionResult<IProduct[]> = await getProducts();
  if (result.success) return result.data;
  return [];
});
export const getOffersData = cache(async () => {
  const result: ActionResult<IOffer[]> = await getOffers();
  if (result.success) return result.data;
  return [];
});
export const getNewsData = cache(async () => {
  const result: ActionResult<INews[]> = await getNews();
  if (result.success) return result.data;
  return [];
});

export const OfferEMPTY_FORM = {
  description: "",
  category: "",
  badge: "",
  imageFile: null as File | null,
  imagePreview: "",
  rate: 1,
  availability: true,
};

export const NewsEMPTY_FORM = {
  description: "",
  imageFile: null as File | null,
  imagePreview: "",
  title: "",
};
export const PerfumeEMPTY_FORM = {
  name: "",
  description: "",
  price: "",
  discountPrice: "",
  category: "",
  badge: "",
  stockQuantity: "",
  imageFile: null as File | null,
  imagePreview: "",
  rate: "",
};

export const intialLoginForm: ILogin = { email: "", password: "" };
