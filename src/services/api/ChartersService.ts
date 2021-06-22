import { CancelTokenSource } from 'axios';
import { APIManager } from './APIManager';
import { APICharterResponse } from './types/ChartersServiceTypes';

const getCharterById = (
  charterId: number,
  cancelSource?: CancelTokenSource,
  filterAll = false,
  statusAll = false
): Promise<APICharterResponse> => {
  const apiManager = APIManager.getInstance();

  const filter = filterAll ? 'filter=all' : undefined;
  const status = statusAll ? 'status=all' : undefined;
  const query = [filter, status].filter((param) => !!param).join('&');
  const queryParams = query ? `?${query}` : '';

  return apiManager.get(`/charters/${charterId}${queryParams}`, {
    cancelToken: cancelSource?.token || undefined,
  });
};

export { getCharterById };
