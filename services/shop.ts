import { ProductCollection, ProductCollectionDetail } from '@/models/shop'
import axiosInstance from './axios'

export const getCollections = async (): Promise<ProductCollection[]> => {
  const response = await axiosInstance.get('/product-collections')
  return response.data?.data?.product_collections || []
}
export const getCollectionById = async (id: number): Promise<ProductCollectionDetail> => {
  const response = await axiosInstance.get(`/product-collections/${id}`)
  return response.data?.data?.product_collections_by_pk || null
}
