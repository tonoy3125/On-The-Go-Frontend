import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import groupReducer from "./features/group/groupSlice";
import userFollowersFollowingsReducer from "./features/follower/followerSlice";
import reactionReducer from "./features/reaction/reactionSlice";
import { baseApi } from "./api/baseApi";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Configuration for persisting both auth and wishlist slices
const authPersistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const reactionPersistConfig = {
  key: "reaction",
  storage,
};

const persistedReactionReducer = persistReducer(
  reactionPersistConfig,
  reactionReducer
);

const userFollowersFollowingsPersistConfig = {
  key: "user-followers-followings",
  storage,
};

const persistedUserFollowersFollowingsReducer = persistReducer(
  userFollowersFollowingsPersistConfig,
  userFollowersFollowingsReducer,
);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer, // Persisted auth reducer
    group: groupReducer,
    followers: persistedUserFollowersFollowingsReducer,
    reaction: persistedReactionReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
