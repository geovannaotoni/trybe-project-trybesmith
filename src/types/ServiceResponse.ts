export type ServiceResponseError = {
  status: 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND', 
  data: { message: string }
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL' | 'CREATED', 
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;