/** requestAnimationFrame */
export const nextRender = () => {
  return new Promise<void>(resolve => {
    requestAnimationFrame(() => {
      resolve()
    })
  })
}

/** setTimeout */
export const nextTime = (time = 0) => {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
