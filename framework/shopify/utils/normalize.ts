import { Image, ImageEdge, Product as ShopifyProduct } from "../schema";
import { Product } from '@common/types/product'

function normalizeProductImages({edges}:{edges:Array<ImageEdge>}):any {
  return edges.map(({node}:{node:Image}) => {
    const {originalSrc:url, ...rest} = node
    return {
      url: `images/${url}`,
      ...rest
    }
  })
}

export function normalizeProduct(productNode:ShopifyProduct):Product{
  const {
    id,
    title: name,
    handle,
    vendor,
    description,
    images: imageConnection,
    ...rest
  } = productNode

  const product = {
    id,
    name,
    vendor,
    description,
    images: normalizeProductImages(imageConnection),
    path: `/${handle}`,
    slug: handle.replace(/^\/+|\/+$/g, "")
  }
  return product
}