import { TFollower } from "@/types/follower.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: {
  following: TFollower[];
  followers: TFollower[];
} = {
  following: [],
  followers: [],
};

const followersSlice = createSlice({
  name: "followers",
  initialState,
  reducers: {
    setFollowers(state, action: PayloadAction<TFollower[] | []>) {
      state.followers = action.payload;
    },

    setFollowing(state, action: PayloadAction<TFollower[] | []>) {
      state.following = action.payload;
    },
  },
});

export const { setFollowers, setFollowing } = followersSlice.actions;
export default followersSlice.reducer;
