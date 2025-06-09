import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getMethod, postMethod, putMethod, deleteMethod} from "../../utils";
import type {Color} from '../../utils'

export const getColors = createAsyncThunk('colors/getColors', async ()=>{
    return await getMethod('/colors');
})

export const createColor = createAsyncThunk('colors/createColor', async (color: Color)=>{
    return await postMethod('/colors', color);
})

export const updateColor = createAsyncThunk('colors/updateColor', async (color: Color)=>{
    return await putMethod(`/colors/${color.id}`, color);
})

export const deleteColor = createAsyncThunk('colors/deleteColor', async (id: number)=>{
    await deleteMethod(`/colors/${id}`);
    return {id};
})

interface ColorState {
    isLoading: boolean,
    data: Color[],
    error: string,
}

const colorsSlice = createSlice({
    name: 'colors',
    initialState: {
        isLoading: false,
        data: [],
        error: ''
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getColors.pending, (state: ColorState)=>{
            state.isLoading = true;
            state.error = '';
        })
        builder.addCase(getColors.fulfilled, (state: ColorState, action)=>{
            state.isLoading = false;
            state.data = action.payload;
            state.error = '';
        })
        builder.addCase(getColors.rejected, (state: ColorState, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Failed to fetch colors data';
        })

        builder.addCase(createColor.pending, (state: ColorState)=>{
            state.isLoading = true;
            state.error = '';
        })
        builder.addCase(createColor.fulfilled, (state: ColorState,action)=>{
            state.isLoading = false;
            state.data = [...state.data, action.payload];
            state.error = ''
        })
        builder.addCase(createColor.rejected, (state: ColorState, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Failed to add a new color!';
        })

        builder.addCase(updateColor.pending, (state: ColorState)=>{
            state.isLoading = true;
            state.error = '';
        })
        builder.addCase(updateColor.fulfilled, (state: ColorState, action)=>{
            const index = state.data.findIndex(color => color.id === action.payload.id);
            if(index !== -1){
                state.data[index] = action.payload;
            }
            state.isLoading = false;
            state.error = '';
        })
        builder.addCase(updateColor.rejected, (state: ColorState, action)=>{
            state.isLoading = false;
            state.error = action.error.message || "Failed to edit a color's information!";
        })

        builder.addCase(deleteColor.pending, (state: ColorState)=>{
            state.isLoading = true;
            state.error = '';
        })
        builder.addCase(deleteColor.fulfilled, (state: ColorState, action)=>{
            state.isLoading = false;
            state.data = state.data.filter(color => color.id !== action.payload.id);
            state.error = '';
        })
        builder.addCase(deleteColor.rejected, (state: ColorState, action)=>{
            state.isLoading = false;
            state.error = action.error.message || 'Failed to delete a color!';
        })
    }
})

export default colorsSlice.reducer;

export const {...actions} = colorsSlice