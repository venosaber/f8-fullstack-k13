import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getMethod} from "../../utils";

export const getProducts = createAsyncThunk('products/getProducts', async ()=>{
    return await getMethod('/products');
})

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        isLoading: false,
        data: []
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getProducts.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(getProducts.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload;
        })
    }
})

export default productsSlice.reducer;

export const {...actions} = productsSlice