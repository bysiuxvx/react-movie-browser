const urlPattern: RegExp = /^\/|^(http|https):\/\//

export const isValidImageUrl = (url: string | undefined): boolean => {
  if (!url) return false
  return urlPattern.test(url)
}
