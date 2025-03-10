import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface userState {
  user: any;
  token: string | null;
  reset_password_email: string | null;
}

const initialState: userState = {
  user: null,
  token: null,
  reset_password_email: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    saveUserInfo: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    storeToken(state, action: PayloadAction<any>) {
      state.token = action.payload;
    },
    storeResetEmail(
      state,
      action: PayloadAction<{ email: userState["reset_password_email"] }>
    ) {
      state.reset_password_email = action.payload.email;
    },
  },
});

export const { saveUserInfo, storeToken, storeResetEmail } = userSlice.actions;
export default userSlice.reducer;
