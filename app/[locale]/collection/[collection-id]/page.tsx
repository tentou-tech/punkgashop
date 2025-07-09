import type { Metadata } from 'next'
import CollectionDetail from './components/collection-detail'
import { getSrcImage } from '@/utils/image'

type Props = {
  params: Promise<{ 'collection-id': string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const collectionId = (await params)['collection-id']

  const collection = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product-collections/${collectionId}`).then(
    (res) => res.json()
  )

  return {
    title: collection.data.product_collections_by_pk.name,
    description: collection.data.product_collections_by_pk.description,
    openGraph: {
      images: [
        {
          url: getSrcImage(collection.data.product_collections_by_pk.thumbnail),
        },
      ],
    },
  }
}

export default function Page() {
  return <CollectionDetail />
}
