import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as restController from '../../api/rest/restController';
import { pushAndSortArr } from '../../utils/functions';

const SLICE_NAME = 'events';

const getEvents = createAsyncThunk(
  `${SLICE_NAME}/getEvents`,
  async (arg, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await restController.getEvents(arg);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({
        data: err?.response?.data ?? 'Gateway Timeout',
        status: err?.response?.status ?? 504,
      });
    }
  }
);

const addEvent = createAsyncThunk(
  `${SLICE_NAME}/addEvent`,
  async (arg, thunkAPI) => {
    try {
      const { data } = await restController.addEvent(arg);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({
        data: err?.response?.data ?? 'Gateway Timeout',
        status: err?.response?.status ?? 504,
      });
    }
  }
);

const removeEvent = createAsyncThunk(
  `${SLICE_NAME}/removeEvent`,
  async (arg, thunkAPI) => {
    try {
      const { data } = await restController.removeEvent(arg);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({
        data: err?.response?.data ?? 'Gateway Timeout',
        status: err?.response?.status ?? 504,
      });
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const eventSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    clearEventStore: (state) => {
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEvents.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getEvents.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getEvents.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(addEvent.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = pushAndSortArr(state.data, action.payload.data, [
        'remainingDate',
        'eventDate',
      ]);
      state.error = null;
    });
    builder.addCase(addEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(removeEvent.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter(
        (event) => event.id !== +action.payload.data
      );
      state.error = null;
    });
    builder.addCase(removeEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const { actions, reducer } = eventSlice;

export const { clearEventStore } = actions;

export { getEvents, addEvent, removeEvent };
export default reducer;
