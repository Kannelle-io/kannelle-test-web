import { createReducer } from '@reduxjs/toolkit';
import log from 'loglevel';
import Company from '../../model/Company';
import { APICompanyUsers, APIModelCompany } from '../../services/api/types/CompaniesServiceTypes';
import { APP_ACTION_TYPE } from '../action/AppAction';
import { COMPANIES_ACTION_TYPE } from '../action/CompaniesAction';

export type CompaniesState = {
  list?: Company[];
  current?: Company;
  users?: APICompanyUsers[];
};

export type CompanySerializedState = {
  list: APIModelCompany[];
  current: APIModelCompany;
};

const initialState: CompaniesState = {
  list: undefined,
  current: undefined,
  users: [],
};

export const CompaniesReducer = createReducer(initialState, {
  [APP_ACTION_TYPE.RESET_STORE_STATE]: () => {
    log.info('Store Hard reset Companies');
    return { ...initialState };
  },
  [COMPANIES_ACTION_TYPE.INITIALIZE_COMPANIES]: (draftState, action) => {
    log.info('We fetched the current companies successfully: ', action.payload);
    draftState.list = [...action.payload];
    const firstCompany = action.payload[0];
    if (!draftState.current) {
      draftState.current = firstCompany;
    }
  },
  [COMPANIES_ACTION_TYPE.SELECT_COMPANY]: (draftState, action) => {
    log.info('Selected company: ', action.payload);
    draftState.current = action.payload;
  },
});
