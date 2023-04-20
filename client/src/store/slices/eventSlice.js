import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as restController from '../../api/rest/restController';

const SLICE_NAME = 'events';

const getEvents = createAsyncThunk(
  `${SLICE_NAME}/getEvents`,
  async (arg, thunkAPI) => {
    try {
      const { data } = await restController.getEvents(arg);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const addEvent = createAsyncThunk(
  `${SLICE_NAME}/addEvent`,
  async (arg, thunkAPI) => {
    try {
      const { data } = await restController.addEvent(arg);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

const removeEvent = createAsyncThunk(
  `${SLICE_NAME}/removeEvent`,
  async (arg, thunkAPI) => {
    try {
      const { data } = await restController.removeEvent(arg);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

const changeEvent = createAsyncThunk(
  `${SLICE_NAME}/changeEvent`,
  async (arg, thunkAPI) => {
    try {
      const { data } = await restController.changeEvent(arg);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

const initialState = {
  eventsArr: [],
  isLoading: false,
  error: null,
};
const eventSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setIsDone: (state, action) => {
      const event = state.eventsArr[action.payload];
      event.isDone = !event.isDone;
    },
    remove: (state, action) => {
      state.eventsArr = state.eventsArr.filter(
        (event) => event.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEvents.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getEvents.fulfilled, (state, action) => {
      state.isLoading = false;
      state.eventsArr = action.payload;
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
      state.eventsArr.push(action.payload);
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
