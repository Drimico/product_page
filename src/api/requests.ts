import api from "./index.ts";
import type {
  FileUploadResponse,
  LoginData,
  LoginResponse,
  PaginationParams,
  ProductsCreate,
  ProductsResponse,
  ProductsUpdate,
  RefreshResponse,
  RegisterData,
  RegisterResponse,
} from "./types.ts";

export const register = async (data: RegisterData): Promise<RegisterResponse> => {
  const response = await api.post("/api/v1/users", data);
  return response.data;
};

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await api.post("/api/v1/auth/login", data);
  return response.data;
};
export const refresh = async (token: string): Promise<RefreshResponse> => {
  const response = await api.post("/api/v1/auth/refresh-token", {
    refreshToken: token,
  });
  return response.data;
};

export const getAllProducts = async (params: PaginationParams): Promise<ProductsResponse[]> => {
  const response = await api.get("/api/v1/products", { params });
  return response.data;
};

export const createProduct = async (data: ProductsCreate): Promise<ProductsResponse> => {
  const response = await api.post("/api/v1/products", data);
  return response.data;
};

export const deleteProduct = async (productId: string): Promise<void> => {
  const response = await api.delete(`/api/v1/products/${productId}`);
  return response.data;
};

export const updateProduct = async (data: ProductsUpdate, productId: string): Promise<void> => {
  const response = await api.put(`/api/v1/products/${productId}`, data);
  return response.data;
};

export const fileUpload = async (file: File): Promise<FileUploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("api/v1/files/upload", formData);
  return response.data;
};
