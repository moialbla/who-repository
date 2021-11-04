import axios from 'axios';
import { HttpResponse, HttpRequestConfig, HttpInstance } from './httpObjects';
const ENV = require('../../environments');
var instance: HttpInstance = axios.create({ baseURL: ENV.HOST });

function create(config?: HttpRequestConfig): HttpInstance {
  instance = axios.create(config);
  return instance;
}
function setDefaultHeader(key: string, value: any): any {
  return instance.defaults.headers.common[key] = value;
}
function request(config: HttpRequestConfig) {
  return instance.request(config);
}
function get<T = any, R = HttpResponse<T>>(url: string, config?: HttpRequestConfig): Promise<R> {
  return instance.get(url, config);
}
function patch<T = any, R = HttpResponse<T>>(url: string, data?: any, config?: HttpRequestConfig): Promise<R> {
  return instance.patch(url, data, config);
}
function requestInterceptor(onFulfilled?: any, onRejected?: (error: any) => any): number {
  return instance.interceptors.request.use(onFulfilled, onRejected);
}
function responseInterceptor(onFulfilled?: any, onRejected?: (error: any) => any): number {
  return instance.interceptors.response.use(onFulfilled, onRejected);
}
export const Http = {setDefaultHeader, create,  request, get, patch, requestInterceptor, responseInterceptor, CancelToken: axios.CancelToken };
