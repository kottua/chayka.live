import { createImageUrlBuilder } from '@sanity/image-url';
import { sanityClient } from './client';

const builder = createImageUrlBuilder(sanityClient);

export function sanityImageUrl(source: unknown) {
  if (!source) return null;
  return builder.image(source);
}
