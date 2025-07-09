export const getSrcImage = (image: string | undefined) => {
  if (image?.startsWith('http')) return image
  if (!image) return ''
  return `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${image}`
}
