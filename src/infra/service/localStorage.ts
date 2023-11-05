export class LocalStorage<T> {
  key: string;
  values: T[];

  constructor(key: string, defaultValues: T[]) {
    this.key = key;

    const localString = localStorage.getItem(key) || "[]";

    const localValues = JSON.parse(localString) as T[];

    if (localValues.length <= 0) {
      this.values = defaultValues;
      localStorage.setItem(this.key, JSON.stringify(this.values));
      return;
    }

    this.values = localValues;
  }

  getAll(): T[] {
    return this.values;
  }

  add(value: T): T[] {
    this.values = [...this.values, value];
    localStorage.setItem(this.key, JSON.stringify(this.values));
    return this.values;
  }
  remove(value: T): T[] {
    this.values = this.values.filter((v) => v != value);
    localStorage.setItem(this.key, JSON.stringify(this.values));
    return this.values;
  }
}
