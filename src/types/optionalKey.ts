export type OptKey<T extends object> = Exclude<{
    [K in keyof T]: T extends Record<K, T[K]>
    ? never
    : K
}[keyof T], undefined>

export type ReqKey<T extends object> = Exclude<{
    [K in keyof T]: T extends Record<K, T[K]>
    ? K
    : never
}[keyof T], undefined>

export type FieldsMap<T extends Object> = { [P in OptKey<T>]?: boolean };