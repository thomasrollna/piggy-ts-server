interface KVPair {
    [key: string]: any
  }
  
  const isIterable = (item: unknown): item is KVPair =>
    typeof item === 'object' && item !== null && !Array.isArray(item) && !Buffer.isBuffer(item);
  
  export const mergeDeep = (dest: KVPair, ...srcs: KVPair[]): KVPair => {
    const result = dest
    if (!isIterable(result)) {
      return result
    }
    for (const src of srcs) {
      for (const key in src) {
        if (isIterable(src[key])) {
          if (!result[key]) {
            result[key] = {}
          }
          mergeDeep(result[key], src[key])
        } else if (src[key] !== undefined && src[key] !== null) {
          result[key] = src[key]
        }
      }
    }
    return result
  }