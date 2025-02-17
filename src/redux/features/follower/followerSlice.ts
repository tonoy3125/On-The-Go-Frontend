import { TFollower } from "@/types/follower.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FollowersState {
  users: {
    [userId: string]: {
      following: TFollower[];
      followers: TFollower[];
    };
  };
}

const initialState: FollowersState = {
  users: {},
};

const followersSlice = createSlice({
  name: "userFollowersFollowings",
  initialState,
  reducers: {
    setFollowers(
      state,
      action: PayloadAction<{ userId: string; followers: TFollower[] }>
    ) {
      const { userId, followers } = action.payload;
      if (!state.users[userId]) {
        state.users[userId] = { following: [], followers: [] };
      }
      state.users[userId].followers = followers;
    },

    setFollowing(
      state,
      action: PayloadAction<{ userId: string; following: TFollower[] }>
    ) {
      const { userId, following } = action.payload;
      if (!state.users[userId]) {
        state.users[userId] = { following: [], followers: [] };
      }
      state.users[userId].following = following;
    },

    followUser(
      state,
      action: PayloadAction<{ authUserId: string; targetUser: TFollower }>
    ) {
      const { authUserId, targetUser } = action.payload;
      if (!state.users[authUserId]) {
        state.users[authUserId] = { following: [], followers: [] };
      }

      const isAlreadyFollowing = state.users[authUserId].following.some(
        (user) => user._id === targetUser._id
      );

      if (!isAlreadyFollowing) {
        state.users[authUserId].following.push(targetUser);
      }
    },

    unfollowUser(
      state,
      action: PayloadAction<{ authUserId: string; targetUserId: string }>
    ) {
      const { authUserId, targetUserId } = action.payload;
      if (state.users[authUserId]) {
        state.users[authUserId].following = state.users[
          authUserId
        ].following.filter((user) => user._id !== targetUserId);
      }
    },
  },
});

export const { setFollowers, setFollowing, followUser, unfollowUser } =
  followersSlice.actions;
export default followersSlice.reducer;
