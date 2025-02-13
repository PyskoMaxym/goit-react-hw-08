import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global";

const setAuthToken = (token) =>{
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;        
}

const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
  };

export const register = createAsyncThunk(
    "auth/register",
    async (credentials, thunkApi) =>{
        try{
            const response = await axios.post("/users/signup", credentials);
            setAuthToken(response.data.token);
            return response.data;
        }catch(error){
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const login = createAsyncThunk(
    "auth/login",
    async (credentials, thunkApi) =>{
        try{
            const response = await axios.post("/users/login", credentials);
            setAuthToken(response.data.token);
            return response.data;
        }catch(error){
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, thunkApi) =>{
        try{
            await axios.post("/users/logout");
            clearAuthHeader();  
        }catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const refreshUser  = createAsyncThunk(
    "auth/refreshr",
    async (_, thunkApi) =>{
        const state = thunkApi.getState();
        const token = state.auth.token ;

        if(token === null)
            return thunkAPI.rejectWithValue("No token found");
        
        try{
            setAuthToken(token);
            const response = await axios.get("/users/current");
            return response.data;
        }catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)