import moment, { Moment } from 'moment'

/** 字符串 */
export const toString: {
  (value: any): string
  (value: any, canUndefined: true): string | undefined
} = (value: any, canUndefined?: boolean) => {
  const result = value || value === 0 ? value.toString().trim() : ''
  if (canUndefined) {
    if (!result && typeof value !== 'string') {
      return undefined
    }
  }
  return result
}

/** 数字 */
export const toNumber: {
  (value: any): number
  (value: any, canUndefined: true): number | undefined
} = (value: any, canUndefined?: boolean) => {
  const result = Number(value)
  if (canUndefined) {
    if (isNaN(result) || (typeof value === 'string' && !value.trim())) {
      return undefined as any
    }
  }
  return result || 0
}

/** 数组 */
export const toArray = <T extends any[] = any[]>(value: any): T => {
  return value instanceof Array ? value : [] as any
}

/** moment */
export const toMoment = (value: any): Moment | null => {
  if (value) {
    try {
      return moment(value)
    } catch {
    }
  }
  return null
}

/** 字符串转数组 */
export const stringToArray = (value: any, splitCode = ','): string[] => {
  return typeof value === 'string' && value ? value.split(splitCode) : []
}

/** 数组转字符串 */
export const arrayToString = (value: any, splitCode = ','): string => {
  return value instanceof Array ? value.join(splitCode) : ''
}

/** 字符串转json */
export const stringToJson = <T extends any = any>(value: any): T | null => {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

/** json转字符串 */
export const jsonToString = (value: any): string => {
  try {
    return JSON.stringify(value)
  } catch {
    return ''
  }
}

/** URLSearch转object */
export const urlSearchToObject = <T extends { [x: string]: string }>(value: string): Partial<T> | null => {
  if (value) {
    try {
      const data: any = {}
      const info = new URLSearchParams(value)
      for (const key of info.keys()) {
        const value = info.get(key)
        data[key] = value
      }
      return data
    } catch {
    }
  }
  return null
}

/** object转URLSearch */
export const objectToUrlSearch = (value: any, hasQuestion: boolean = true): string => {
  if (value) {
    try {
      const data = new URLSearchParams()
      for (const key in value) {
        const info = value[key]
        if (info !== undefined) {
          data.append(key, info)
        }
      }
      const text = data.toString()
      if (hasQuestion && text) {
        return '?' + text
      }
      return text
    } catch {
    }
  }
  return ''
}

/** object转FormData */
export const objectToFormData = (value: any): FormData => {
  const data = new FormData()
  if (value) {
    try {
      for (const key in value) {
        const info = value[key]
        if (info !== undefined) {
          data.append(key, info)
        }
      }
    } catch {
    }
  }
  return data
}

/** FormData转object */
export const formDataToObject = <T extends { [x: string]: string }>(form: FormData): Partial<T> | null => {
  try {
    const data: any = {}
    for (const key of form.keys()) {
      const value = form.get(key)
      data[key] = value
    }
    return data
  } catch {
    return null
  }
}

/** 千分位格式 */
export const toThousand = (value: any, decimal = 2): string => {
  const number = parseFloat(typeof value === 'string' ? value.replace(/,/g, '') : value)
  if (!isNaN(number)) {
    return (number || 0).toLocaleString(undefined, {
      minimumFractionDigits: decimal > 0 ? decimal : 0,
      maximumFractionDigits: decimal > 0 ? decimal : 0
    })
  }
  return ''
}
