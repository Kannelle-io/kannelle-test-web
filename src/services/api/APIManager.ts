import axios, { AxiosInstance, CancelTokenSource } from 'axios';
import { AXIOS_PARAMS } from '../../Constants';

export class APIManager {
  private static instance?: AxiosInstance;

  static accessToken?: string;

  static setAccessToken = (accessToken: string): void => {
    APIManager.accessToken = accessToken;
  };

  static clearAccessToken = (): void => {
    APIManager.accessToken = undefined;
  };

  static getInstance = (): AxiosInstance => {
    if (!APIManager.instance) {
      const APIBaseURL = process.env.REACT_APP_API_BASE_URL!;

      APIManager.instance = axios.create({
        baseURL: `${APIBaseURL}`,
        timeout: AXIOS_PARAMS.TIMEOUT_IN_MS,
        headers: {
          Authorization: `Bearer ${APIManager.accessToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
    }

    return APIManager.instance!;
  };

  static getCancelToken = (): CancelTokenSource => {
    const { CancelToken } = axios;
    return CancelToken.source();
  };
}
