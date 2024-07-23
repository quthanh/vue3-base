import http from './http';

export interface AuthParams {
  email: string;
  password: string;
}

export function login(params: AuthParams) {
  return http.post(`auth`, params);
}

export function me() {
  return http.get(`me`);
}
