import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userState {
  id: string;
  fullName: string;
  avatar?: string;
  forVolunteer: boolean;
  address: string;
  email: string;
  phoneNumber: Number;
  role: string;
}

const initialState: userState = {
  id: "",
  fullName: "",
  avatar: "",
  phoneNumber: 0,
  email: "",
  address: "",
  role: "",
  forVolunteer: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<userState>) => {
      state.id = action.payload.id;
      state.fullName = action.payload.fullName;
      state.avatar = action.payload.avatar;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.forVolunteer = action.payload.forVolunteer;
      state.role = action.payload.role;
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
