export interface AuthLoginFormData {
  email: string;
  password: string;
}

export interface AuthSignupFormData {
  username: string;
  email: string;
  password: string;
}

export interface AuthState {
  error: boolean;
  loading: boolean;
  token: string | null;
}

export interface AuthToken {
  token: string;
}
