export type ProductCollection = {
  id: number
  name: string
  thumbnail: string
  description: string
  creator: {
    id: number
    slug: string
    name: string
    pen_name: string
  }
}
export type ProductCollectionDetail = {
  id: number
  name: string
  description: string
  detail_image: string
  thumbnail: string
  created_at: string
  updated_at: string
  creator: {
    id: number
    name: string
    pen_name: string
    email: null
    gender: string
    bio: string
    avatar_url: string
    slug: string
    socials?: {
      web?: string
      tiktok?: string
      behance?: string
      discord?: string
      twitter?: string
      youtube?: string
      facebook?: string
      instagram?: string
    }
  }
  products: ProductDetail[]
  paragraphs: {
    image: string
    sort: number
    text: string
    title: string
  }[]
}

export type ProductDetail = {
  id: number
  name: string
  description: string
  status: string
  thumbnail: string
  lowest_price: number
  product_options: {
    id: number
    price: number
    option: {
      size: string[]
      color: string
    }
    status: string
    product_images: {
      image: string
      sort: null
    }[]
  }[]
  product_images: {
    image: string
    product_option_id: null
    sort: number | null
  }[]
}
export type CartItem = {
  internalId?: string
  product: ProductDetail
  quantity: number
  option: ProductDetail['product_options'][number] & {
    subOptions: {
      key: string
      value: string
    }[]
  }
}

export interface CreateOrderPayload {
  total_price: number
  order_products: {
    product_id: number
    price: number
    quantity: number
    size: string
  }[]
  contacts: {
    name: string
    phone: string
    email: string
    address: string
  }
}

export interface CreateOrderResponse {
  order: {
    id: number
    code: string
    total_price: number
    order_products: {
      product: {
        id: number
        name: string
      }
      price: number
      quantity: number
      size: null
    }[]
    contacts: {
      name: string
      email: string
      phone: string
      address: string
    }
    status: string
    email: string
    created_at: string
    updated_at: string
  }
  payment: {
    partnerCode: string
    orderId: string
    requestId: string
    amount: number
    responseTime: number
    message: string
    resultCode: number
    payUrl: string
  }
}
