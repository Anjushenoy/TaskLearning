import {configureStore} from '@reduxjs/toolkit';
import {reducers} from './reducers/reducers';

export const store = configureStore({
  reducer: reducers,
});
