import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as restController from '../../api/rest/restController';

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

const changeEvent = createAsyncThunk(
  `${SLICE_NAME}/changeEvent`,
  async (arg, thunkAPI) => {
    try {
      const { data } = await restController.changeEvent(arg);
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
    clearUserStore: (state) => {
      state.error = null;
      state.data = null;
    },
    setIsDone: (state, action) => {
      const event = state.data[action.payload];
      event.isDone = !event.isDone;
    },
    remove: (state, action) => {
      state.data = state.data.filter((event) => event.id !== action.payload);
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
      state.data.push(action.payload);
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
      state.error = null;
    });
    builder.addCase(removeEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(changeEvent.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(changeEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(changeEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const {
  reducer,
  actions: { setIsDone, remove },
} = eventSlice;

export { getEvents, setIsDone, remove, addEvent, changeEvent, removeEvent };
export default reducer;
