const STORAGE_KEY = `$storage.${$APP_NAME}.`

export const setCache = (key: string, value: string) => {
  sessionStorage.setItem(STORAGE_KEY + key, value)
}

export const getCache = (key: string) => {
  return sessionStorage.getItem(STORAGE_KEY + key)
}

export const removeCache = (key: string) => {
  sessionStorage.removeItem(STORAGE_KEY + key)
}

export const setValue = (key: string, value: string) => {
  localStorage.setItem(STORAGE_KEY + key, value)
}

export const getValue = (key: string) => {
  return localStorage.getItem(STORAGE_KEY + key)
}

export const removeValue = (key: string) => {
  localStorage.removeItem(STORAGE_KEY + key)
}

export const isAndroid = /android/i.test(navigator.userAgent)

export const isIPhone = /iphone|ipad/i.test(navigator.userAgent)
