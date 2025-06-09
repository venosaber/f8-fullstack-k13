import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getMethod, postMethod, putMethod, deleteMethod} from "../../utils";
import type {Customer} from '../../utils'

export const getCustomers = createAsyncThunk('customers/getCustomers', async ()=>{
    return await getMethod('/customers');
})

export const createCustomer = createAsyncThunk('customers/createCustomer', async (customer: Customer)=>{
    return await postMethod('/customers', customer);
})

export const updateCustomer = createAsyncThunk('customers/updateCustomer', async (customer: Customer)=>{
    return await putMethod(`/customers/${customer.id}`, customer);
})

export const deleteCustomer = createAsyncThunk('customers/deleteCustomer', async (id: number)=>{
    await deleteMethod(`/customers/${id}`);
    return {id};
})

interface CustomerState {
    isLoading: boolean,
    data: Customer[],
    error: string,
}

const customersSlice = createSlice({
    name: 'customers',
    initialState: {
        isLoading: false,
        data: [],
        error: ''
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getCustomers.pending, (state: CustomerState)=>{
            state.isLoading = true;
            state.error = '';
        })
        builder.addCase(getCustomers.fulfilled, (state: CustomerState, action)=>{
            state.isLoading = false;
            state.data = action.payload;
            state.error = '';
        })
        builder.addCase(getCustomers.rejected, (state: CustomerState, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Failed to fetch customers data!';
        })

        builder.addCase(createCustomer.pending, (state: CustomerState)=>{
            state.isLoading = true;
            state.error = '';
        })
        builder.addCase(createCustomer.fulfilled, (state: CustomerState,action)=>{
            state.isLoading = false;
            state.data = [...state.data, action.payload];
            state.error = ''
        })
        builder.addCase(createCustomer.rejected, (state: CustomerState, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Failed to add a new customer!';
        })

        builder.addCase(updateCustomer.pending, (state: CustomerState)=>{
            state.isLoading = true;
            state.error = '';
        })
        builder.addCase(updateCustomer.fulfilled, (state: CustomerState, action)=>{
            const index = state.data.findIndex(customer => customer.id === action.payload.id);
            if(index !== -1){
                state.data[index] = action.payload;
            }
            state.isLoading = false;
            state.error = '';
        })
        builder.addCase(updateCustomer.rejected, (state: CustomerState, action)=>{
            state.isLoading = false;
            state.error = action.error.message || "Failed to edit a customer's information !";
        })

        builder.addCase(deleteCustomer.pending, (state: CustomerState)=>{
            state.isLoading = true;
            state.error = '';
        })
        builder.addCase(deleteCustomer.fulfilled, (state: CustomerState, action)=>{
            state.isLoading = false;
            state.data = state.data.filter(customer => customer.id !== action.payload.id);
            state.error = '';
        })
        builder.addCase(deleteCustomer.rejected, (state: CustomerState, action)=>{
            state.isLoading = false;
            state.error = action.error.message || 'Failed to delete a customer!';
        })
    }
})

export default customersSlice.reducer;

export const {...actions} = customersSlice