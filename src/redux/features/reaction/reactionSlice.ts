import { TReactionType } from "@/types/reaction.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TReactionState = {
  userReactions: Record<string, Record<string, TReactionType | undefined>>;
};

const initialState: TReactionState = {
  userReactions: {}, // { userId: { postId: reaction } }
};

const reactionSlice = createSlice({
  name: "reaction",
  initialState,
  reducers: {
    toggleReaction: (
      state,
      action: PayloadAction<{
        userId: string;
        postId: string;
        reaction: TReactionType;
      }>
    ) => {
      const { userId, postId, reaction } = action.payload;

      if (!state.userReactions[userId]) {
        state.userReactions[userId] = {};
      }

      // Toggle logic: if the same reaction exists, remove it; otherwise, update it
      if (state.userReactions[userId][postId] === reaction) {
        state.userReactions[userId][postId] = undefined;
      } else {
        state.userReactions[userId][postId] = reaction;
      }
    },
  },
});

export const { toggleReaction } = reactionSlice.actions;
export default reactionSlice.reducer;
