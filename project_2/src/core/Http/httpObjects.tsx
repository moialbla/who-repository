export interface HttpTransformer {
    (data: any, headers?: any): any;
  }
  
  export interface HttpAdapter {
    (config: HttpRequestConfig): HttpPromise<any>;
  }
  
  export interface HttpBasicCredentials {
    username: string;
    password: string;
  }
  
  export interface HttpProxyConfig {
    host: string;
    port: number;
    auth?: {
      username: string;
      password:string;
    };
    protocol?: string;
  }
  
  export type Method =
    | 'get' | 'GET'
    | 'delete' | 'DELETE'
    | 'head' | 'HEAD'
    | 'options' | 'OPTIONS'
    | 'post' | 'POST'
    | 'put' | 'PUT'
    | 'patch' | 'PATCH'
    | 'purge' | 'PURGE'
    | 'link' | 'LINK'
    | 'unlink' | 'UNLINK'
  
  export type ResponseType =
    | 'arraybuffer'
    | 'blob'
    | 'document'
    | 'json'
    | 'text'
    | 'stream'
  
  export interface HttpRequestConfig {
    url?: string;
    method?: Method;
    baseURL?: string;
    transformRequest?: HttpTransformer | HttpTransformer[];
    transformResponse?: HttpTransformer | HttpTransformer[];
    headers?: any;
    params?: any;
    paramsSerializer?: (params: any) => string;
    data?: any;
    timeout?: number;
    timeoutErrorMessage?: string;
    withCredentials?: boolean;
    adapter?: HttpAdapter;
    auth?: HttpBasicCredentials;
    responseType?: ResponseType;
    xsrfCookieName?: string;
    xsrfHeaderName?: string;
    onUploadProgress?: (progressEvent: any) => void;
    onDownloadProgress?: (progressEvent: any) => void;
    maxContentLength?: number;
    validateStatus?: ((status: number) => boolean) | null;
    maxBodyLength?: number;
    maxRedirects?: number;
    socketPath?: string | null;
    httpAgent?: any;
    httpsAgent?: any;
    proxy?: HttpProxyConfig | false;
    cancelToken?: CancelToken;
    decompress?: boolean;
  }
  
  export interface HttpResponse<T = any>  {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: HttpRequestConfig;
    request?: any;
  }
  
  export interface HttpError<T = any> extends Error {
    config: HttpRequestConfig;
    code?: string;
    request?: any;
    response?: HttpResponse<T>;
    isAxiosError: boolean;
    toJSON: () => object;
  }
  
  export interface HttpPromise<T = any> extends Promise<HttpResponse<T>> {
  }
  
  export interface CancelStatic {
    new (message?: string): Cancel;
  }
  
  export interface Cancel {
    message: string;
  }
  
  export interface Canceler {
    (message?: string): void;
  }
  
  export interface CancelTokenStatic {
    new (executor: (cancel: Canceler) => void): CancelToken;
    source(): CancelTokenSource;
  }
  
  export interface CancelToken {
    promise: Promise<Cancel>;
    reason?: Cancel;
    throwIfRequested(): void;
  }
  
  export interface CancelTokenSource {
    token: CancelToken;
    cancel: Canceler;
  }
  
  export interface HttpInterceptorManager<V> {
    use(onFulfilled?: (value: V) => V | Promise<V>, onRejected?: (error: any) => any): number;
    eject(id: number): void;
  }
  
  export interface HttpInstance {
    (config: HttpRequestConfig): HttpPromise;
    (url: string, config?: HttpRequestConfig): HttpPromise;
    defaults: HttpRequestConfig;
    interceptors: {
      request: HttpInterceptorManager<HttpRequestConfig>;
      response: HttpInterceptorManager<HttpResponse>;
    };
    getUri(config?: HttpRequestConfig): string;
    request<T = any, R = HttpResponse<T>> (config: HttpRequestConfig): Promise<R>;
    get<T = any, R = HttpResponse<T>>(url: string, config?: HttpRequestConfig): Promise<R>;
    delete<T = any, R = HttpResponse<T>>(url: string, config?: HttpRequestConfig): Promise<R>;
    head<T = any, R = HttpResponse<T>>(url: string, config?: HttpRequestConfig): Promise<R>;
    options<T = any, R = HttpResponse<T>>(url: string, config?: HttpRequestConfig): Promise<R>;
    post<T = any, R = HttpResponse<T>>(url: string, data?: any, config?: HttpRequestConfig): Promise<R>;
    put<T = any, R = HttpResponse<T>>(url: string, data?: any, config?: HttpRequestConfig): Promise<R>;
    patch<T = any, R = HttpResponse<T>>(url: string, data?: any, config?: HttpRequestConfig): Promise<R>;
  }
  
  export interface HttpStatic extends HttpInstance {
    create(config?: HttpRequestConfig): HttpInstance;
    Cancel: CancelStatic;
    CancelToken: CancelTokenStatic;
    isCancel(value: any): boolean;
    all<T>(values: (T | Promise<T>)[]): Promise<T[]>;
    spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;
    isAxiosError(payload: any): payload is HttpError;
  }
  
  declare const axios: HttpStatic;
  
  export default axios;
  