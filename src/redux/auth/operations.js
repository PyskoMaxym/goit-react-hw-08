import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global";

const setAuthToken = (token) =>{
    if (token){
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        localStorage.setItem("token", token);
    } else{
        delete axios.defaults.headers.common.Authorization;
        localStorage.removeItem("token");
    }
}


export const register = createAsyncThunk(
    "auth/register",
    async (credentials, thunkApi) =>{
        try{
            const {data} = await axios.post("/users/signup", credentials);
            setAuthToken(data.token);
            return data;
        }catch(error){
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const login = createAsyncThunk(
    "auth/login",
    async (credentials, thunkApi) =>{
        try{
            const {data} = await axios.post("/users/login", credentials);
            setAuthToken(data.token);
            return data;
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
            setAuthToken(null);
            return;
        }catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const refreshUser  = createAsyncThunk(
    "auth/refreshr",
    async (_, thunkApi) =>{
        const state = thunkApi.getState();
        let token = state.auth.token || localStorage.getItem("token");

        if(!token)
            return thunkAPI.rejectWithValue("No token found");
        
        try{
            setAuthToken(token);
            const {data} = await axios.get("/users/current");
            return data;
        }catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)