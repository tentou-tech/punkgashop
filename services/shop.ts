import {
  CreateOrderPayload,
  CreateOrderResponse,
  ProductCollection,
  ProductCollectionDetail,
  ProductDetail,
} from '@/models/shop'
import axiosInstance from './axios'

export const createOrder = async (payload: CreateOrderPayload): Promise<CreateOrderResponse> => {
  const response = await axiosInstance.post('/orders', payload)
  return response.data?.data
}

export const getCollections = async (): Promise<ProductCollection[]> => {
  const response = await axiosInstance.get('/product-collections')
  return response.data?.data?.product_collections || []
}
export const getCollectionById = async (id: number): Promise<ProductCollectionDetail> => {
  const response = await axiosInstance.get(`/product-collections/${id}`)
  return response.data?.data?.product_collections_by_pk || null
}
export const getProductById = async (id: number): Promise<ProductDetail> => {
  const response = await axiosInstance.get(`/products/${id}`)
  return response.data?.data || null
}
export const getOrderById = async (id: string): Promise<CreateOrderResponse> => {
  const response = await axiosInstance.get(`/orders/${id}`)
  return { order: response.data, payment: undefined as any }
}
