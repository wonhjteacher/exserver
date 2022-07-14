import axios from "axios";
import { createSlice ,  createAsyncThunk } from '@reduxjs/toolkit'
// createAsyncThunk : Thunk 비동기 작업
export const getList = createAsyncThunk(
   "GET_LIST",
   async () => {
    try {
      const res = await axios.get("https://my-json-server.typicode.com/wonhjteacher/exserver");
      return res.data;
    } catch (err) {
      console.log(err)
    }
  });
 export const addList = createAsyncThunk(
  "ADD_LIST", 
    async (newList) => {
    try {
    const res = await axios.post("https://my-json-server.typicode.com/wonhjteacher/exserver", newList);
    return res.data;
    }catch (err){
      console.log(err)
    }
  });

  export const deleteList = createAsyncThunk(
    "DELETE_LIST", 
      async (id) => {
      try {
      const res = await axios.delete(`https://my-json-server.typicode.com/wonhjteacher/exserver/${id}`);
      return id;
      }catch (err){
        console.log(err)
      }
    });

    export const updateList  = createAsyncThunk(
      "UPDATE_LIST",
        async ({ id, content }) => {
        try {
        const res = await axios.put(`https://my-json-server.typicode.com/wonhjteacher/exserver/${id}`, {
          content: content,
        })
        return {id,content}
      
        }catch (err){
          console.log(err)
        }
      });


 const listSlice = createSlice({
  name: 'list',
  initialState:{
    data: [],
    message:'default'
  },
  reducers: {

  },
  extraReducers: (builder) => { //extraReducers 외부/비동기 action을 넣는 공간으
    builder.addCase(getList.fulfilled, (state,action)=>{
      state.message = '리스트업 완료';
      state.data = action.payload;
    })
    builder.addCase(addList.fulfilled, (state,action)=>{
      state.message = '추가 완료';
      state.data.push(action.payload);
    })
    builder.addCase(deleteList.fulfilled, (state,action)=>{
      //state.message = '삭제완료';
      state.data=state.data.filter((list) => list.id !== action.payload)
    })
    builder.addCase(updateList.fulfilled, (state,action)=>{
      state.message = '수정완료';
      const num=state.data.findIndex(item => item.id === action.payload.id)
      state.data.splice(num,1,action.payload); 
    }) 

  },

 })
/* export const {  } = listSlice.actions */

export default listSlice.reducer

/* 
extraReducers: slice에서 만들어진 reducers에 의한 action, reducer가 아닌 외부에서 만들어진 action을 통해 현재 slice에서 사용하는 initialState에 변경을 가하는 경우 처리받는 reducer임 (비동기 작업 함수 처리 등에 사용됨)


*/