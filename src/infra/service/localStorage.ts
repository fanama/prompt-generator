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

  save(values: T[]) {
    localStorage.setItem(this.key, JSON.stringify(values));
  }

  getAll(): T[] {
    return this.values;
  }

  add(value: T): T[] {
    const values = [...this.values, value];
    localStorage.setItem(this.key, JSON.stringify(values));
    this.values = values;
    alert(`${this.key} added`);

    return values;
  }
  remove(value: T): T[] {
    const values = this.values.filter((v) => v != value);
    localStorage.setItem(this.key, JSON.stringify(values));
    this.values = values;
    return values;
  }

  removeAll(): T[] {
    const values: T[] = [];
    localStorage.clear();
    this.values = values;
    return values;
  }
}
