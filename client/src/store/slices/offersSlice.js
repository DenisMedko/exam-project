import { createSlice } from '@reduxjs/toolkit';
import * as restController from '../../api/rest/restController';
import CONSTANTS from '../../constants';
import { decorateAsyncThunk, pendingReducer } from '../../utils/store';

const OFFERS_SLICE_NAME = 'offers';

const initialState = {
  isFetching: true,
  error: null,
  offers: [],
  moderatorFilter: CONSTANTS.OFFER_STATUS_MODERATOR_PENDING,
  count: 0,
};

export const getModeratorOffers = decorateAsyncThunk({
  key: `${OFFERS_SLICE_NAME}/getModeratorOffers`,
  thunk: async ({ requestData, role }) => {
    const { data } =
      role === CONSTANTS.MODERATOR
        ? await restController.getModeratorOffers(requestData, role)
        : null;
    return data;
  },
});

const reducers = {
  clearOffersList: (state) => {
    state.error = null;
    state.offers = [];
  },
  setNewModeratorFilter: (state, { payload }) => ({
    ...initialState,
    isFetching: false,
    moderatorFilter: payload,
  }),
};

const extraReducers = (builder) => {
  builder.addCase(getModeratorOffers.pending, pendingReducer);
  builder.addCase(getModeratorOffers.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.offers = [...state.offers, ...payload.offers];
    state.count = payload.count;
    state.error = null;
  });
  builder.addCase(getModeratorOffers.rejected, (state, { payload }) => {
    state.isFetching = false;
    state.error = payload;
    state.offers = [];
  });
};

const contestsSlice = createSlice({
  name: OFFERS_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = contestsSlice;

export const { clearOffersList, setNewModeratorFilter } = actions;

export default reducer;
