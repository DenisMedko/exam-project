import { createAsyncThunk } from '@reduxjs/toolkit';

export const pendingReducer = (state) => {
  state.isFetching = true;
  state.error = null;
};

export const fulfilledReducer = (state) => {
  state.isFetching = false;
};

export const rejectedReducer = (state, { payload }) => {
  state.isFetching = false;
  state.error = payload;
};

export const decorateAsyncThunk = ({ key, thunk }) => {
  const asyncThunk = createAsyncThunk(key, async (payload, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      return await thunk(payload, thunkAPI);
    } catch (err) {
      return rejectWithValue({
        data: err?.response?.data ?? 'Gateway Timeout',
        status: err?.response?.status ?? 504,
      });
    }
  });
  return asyncThunk;
};

export const createExtraReducers =
  ({ thunk, pendingReducer, fulfilledReducer, rejectedReducer }) =>
  (builder) => {
    pendingReducer && builder.addCase(thunk.pending, pendingReducer);
    fulfilledReducer && builder.addCase(thunk.fulfilled, fulfilledReducer);
    rejectedReducer && builder.addCase(thunk.rejected, rejectedReducer);
  };
