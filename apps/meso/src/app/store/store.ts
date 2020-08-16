import { useDispatch } from 'react-redux';
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';

import { createBrowserHistory, History } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import accountReducer from './account/account.slice';
import authReducer from './auth/auth.slice';
import langReducer from './lang/lang.slice';
import postsReducer from './posts/posts.slice';
import usersReducer from './users/users.slice';

export const history = createBrowserHistory();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'lang', 'account'],
};

const createRootReducer = (history: History) =>
  combineReducers({
    account: accountReducer,
    auth: authReducer,
    lang: langReducer,
    router: connectRouter(history),
    posts: postsReducer,
    users: usersReducer,
  });

const rootReducer = createRootReducer(history);

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [
    routerMiddleware(history),
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ],
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
