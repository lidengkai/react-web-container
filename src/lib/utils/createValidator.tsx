export const has = () => {
  return /^.+$/
}

export const pwd = () => {
  return /^\S+$/
}

export const mobile = () => {
  return /^1[0-9]{10}$/
}

export const string = (min = 0, max: number | '' = '') => {
  return new RegExp(`^.{${min},${max}}$`)
}

export const number = (min = 0, max: number | '' = '') => {
  return new RegExp(`^[0-9]{${min},${max}}$`)
}

export const code = (min = 0, max: number | '' = '', other: string = '') => {
  return new RegExp(`^[a-zA-Z0-9${other}]{${min},${max}}$`)
}
