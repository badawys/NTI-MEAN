/**
 * Repository<T> previews the data-access pattern used later with MongoDB.
 *
 * The generic constraint requires every stored item to have a string `id`.
 */
export interface Repository<T extends { readonly id: string }> {
  findAll(): readonly T[];
  findById(id: string): T | undefined;
  save(item: T): T;
}

/**
 * This in-memory implementation is deliberately small. It teaches the generic
 * contract without introducing a database before the relevant course days.
 */
export class InMemoryRepository<
  T extends { readonly id: string },
> implements Repository<T> {
  /**
   * `private` prevents code outside this class from modifying storage directly.
   */
  private readonly items = new Map<string, T>();

  /**
   * Constructor parameters can receive an initial data set.
   */
  constructor(initialItems: readonly T[] = []) {
    for (const item of initialItems) {
      this.items.set(item.id, item);
    }
  }

  /**
   * A readonly array tells callers not to mutate the returned collection.
   */
  findAll(): readonly T[] {
    return [...this.items.values()];
  }

  /**
   * `undefined` explicitly represents a missing record.
   */
  findById(id: string): T | undefined {
    return this.items.get(id);
  }

  /**
   * Saving an existing ID replaces that value, while a new ID is inserted.
   */
  save(item: T): T {
    this.items.set(item.id, item);
    return item;
  }
}
