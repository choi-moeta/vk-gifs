export default abstract class Storage {
  private static storage = localStorage

  private static getItem(key: string): string {
    const item = this.storage.getItem(key)
    if (item === null) {
      throw Error
    }
    return item
  }

  static getString(key: string): string | null {
    return this.storage.getItem(key)
  }
  static getNumber(key: string): number | null {
    return Number(this.storage.getItem(key))
  }
  static getBoolean(key: string): boolean | null {
    return Boolean(Number(this.storage.getItem(key)))
  }
  static getArray(key: string): any[] | null {
    return JSON.parse(this.storage.getItem(key) || '[]')
  }
  static getObject(key: string): object | null {
    return JSON.parse(this.storage.getItem(key) || '{}')
  }

  static set(key: string, value: string | number | boolean | object) {
    if (typeof value === 'string') {
      this.storage.setItem(key, value)
    } else if (typeof value === 'number') {
      this.storage.setItem(key, String(value))
    } else if (typeof value === 'boolean') {
      this.storage.setItem(key, String(Number(value)))
    } else if (typeof value === 'object') {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  static remove(key: string) {
    this.storage.removeItem(key)
  }

  static clear() {
    this.storage.clear()
  }
}
