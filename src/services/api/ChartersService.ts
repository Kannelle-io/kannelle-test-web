import { CancelTokenSource } from 'axios';
import { APIManager } from './APIManager';
import { APICharterResponse, MediaCroppedArea } from './types/ChartersServiceTypes';

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

const fetchAnimationByCharterIdAndParams = (
  charterId: number,
  params: any,
  cancelSource?: CancelTokenSource
): Promise<any> => {
  const apiManager = APIManager.getInstance();

  return apiManager.post(`/charters/${charterId}/animations`, params, {
    cancelToken: cancelSource?.token || undefined,
  });
};

const getCharterMediaCroppedUrlById = (
  charterId: number,
  mediaId: number,
  croppedArea: MediaCroppedArea,
  cancelSource?: CancelTokenSource
): Promise<any> => {
  const apiManager = APIManager.getInstance();

  return apiManager
    .get(
      `/charters/${charterId}/media/${mediaId}/crop?x=${croppedArea.x}&y=${croppedArea.y}&height=${croppedArea.height}&width=${croppedArea.width}`,
      {
        cancelToken: cancelSource?.token || undefined,
      }
    )
    .then((response) => {
      return response.data as any;
    });
};

export { getCharterById, fetchAnimationByCharterIdAndParams, getCharterMediaCroppedUrlById };
