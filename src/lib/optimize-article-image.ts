import { getImageProps } from 'next/image';

export function optimizeArticleImage(image: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return getImageProps({
    src: image.src,
    alt: image.alt,
    width: image.width,
    height: image.height,
    sizes: '(max-width: 760px) calc(100vw - 80px), 700px',
  }).props;
}
