import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    client: null,
}

const CurrentClientSlice = createSlice({
    name: 'currentClient',
    initialState,
    reducers: {
        setClient(state, action) {
            state.client = action.payload;
        },

        clearClient(state ) {
            state.client = null;
        }


    },
    
 
});

export const {setClient, clearClient} = CurrentClientSlice.actions;
export default CurrentClientSlice.reducer;