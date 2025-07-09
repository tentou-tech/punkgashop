import type { Metadata } from 'next'
import ProductDetailPage from './components/product-detail'
import { getSrcImage } from '@/utils/image'
type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const productId = (await params).id

  const product = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${productId}`).then((res) => res.json())
  return {
    title: product.data.name,
    description: product.data.description,
    openGraph: {
      images: [
        {
          url: getSrcImage(product.data.thumbnail),
        },
      ],
    },
  }
}

export default function Page() {
  return <ProductDetailPage />
}
