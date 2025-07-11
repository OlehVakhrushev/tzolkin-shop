// src/store/productsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  weight?: string;
  ingredients?: string;
  country?: string;
}

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  total: number; // для пагинации
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  total: 0,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page = 1, limit = 6 }: { page: number; limit: number }) => {
    const response = await axios.get(`http://localhost:4000/products?page=${page}&limit=${limit}`);
    return response.data; // ожидается { products: [], page: 1, total: N }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products; // ✅ используем поле products
        state.total = action.payload.total;    // ✅ сохраняем общее число
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load products";
      });
  },
});

export default productsSlice.reducer;
