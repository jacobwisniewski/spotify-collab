export class ImmutableMap<K, V> {
  private readonly internalMap: Map<K, V>

  constructor(map: Map<K, V> = new Map<K, V>()) {
    this.internalMap = map
  }

  static from<K, V>(previous: ImmutableMap<K, V>): ImmutableMap<K, V> {
    return new ImmutableMap(previous.toMap())
  }

  private toMap = (): Map<K, V> => {
    const copy = new Map(this.internalMap)

    return copy
  }

  set = (key: K, value: V): ImmutableMap<K, V> => {
    const copy = new Map(this.internalMap)
    copy.set(key, value)

    return new ImmutableMap<K, V>(copy)
  }

  delete = (key: K): ImmutableMap<K, V> => {
    const copy = new Map(this.internalMap)
    copy.delete(key)

    return new ImmutableMap<K, V>(copy)
  }

  getOrDefault = (key: K, defaultValue: V): V => {
    return this.internalMap.get(key) || defaultValue
  }

  get = (key: K): V | undefined => {
    return this.internalMap.get(key)
  }

  has = (key: K): boolean => {
    return this.internalMap.has(key)
  }

  values = (): IterableIterator<V> => {
    return this.internalMap.values()
  }

  getValues = (): V[] => {
    return Array.from(this.values())
  }

  keys = (): IterableIterator<K> => {
    return this.internalMap.keys()
  }

  getKeys = (): K[] => {
    return Array.from(this.keys())
  }

  size = () => {
    return this.internalMap.size
  }
}
