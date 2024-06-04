"use client";

import { CartItem, Product } from "@/types/Product";
import { atom, selector } from "recoil";

export const cartItemState = atom<CartItem[]>({
  key: "CartItem",
  default: [],
});

export const cartVisibleState = atom<boolean>({
  key: "CartVisible",
  default: false,
});