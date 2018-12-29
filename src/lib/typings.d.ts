declare type FC<T> = React.FC<React.PropsWithChildren<T>>
declare type ReactNode = React.ReactNode
declare type CSSProperties = React.CSSProperties

declare namespace RemoteContainer {
  type UserInfo = {
    id?: number | null
    role?: number | null
    username?: string | null
  }
  type RouteEntry = Array<{
    path: string
    element?: ReactNode
    children?: RouteEntry
    roles?: number[]
    menu?: ReactNode
    icon?: ReactNode
  }>
}

/**
 * 类似Promise
 * 可约束Promise.catch的类型
 * 不能对async/await的返回值类型约束
 */
declare type AsPromise<T, R> = {
  readonly [Symbol.toStringTag]: string
  finally(onfinally?: (() => void) | undefined | null): AsPromise<T, R>
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: R) => TResult2 | PromiseLike<TResult2>) | undefined | null): AsPromise<TResult1 | TResult2, R>
  catch<TResult = never>(onrejected?: ((reason: R) => TResult | PromiseLike<TResult>) | undefined | null): AsPromise<T | TResult, R>
}

/** 多层级处理Partial */
declare type DeepPartial<Obj> = {
  [Key in keyof Obj]?: {} extends Pick<Obj, Key> ? DeepPartial<Obj[Key]> : Obj[Key]
}
