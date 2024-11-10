import { DeepPartial, FindManyOptions, FindOneOptions } from 'typeorm';

/**
 * Interfaz genérica para repositorios, definiendo métodos CRUD básicos y algunos métodos adicionales.
 * @template T - Tipo de la entidad.
 */
export interface BaseInterfaceRepository<T> {
  /**
   * Crea una nueva instancia de la entidad sin guardarla en la base de datos.
   * @param data - Datos parciales de la entidad.
   * @returns La nueva instancia de la entidad.
   */
  create(data: DeepPartial<T>): T;

  /**
   * Crea múltiples instancias de la entidad sin guardarlas en la base de datos.
   * @param data - Array de datos parciales de la entidad.
   * @returns Array de nuevas instancias de la entidad.
   */
  createMany(data: DeepPartial<T>[]): T[];

  /**
   * Guarda una entidad en la base de datos. Si la entidad ya existe, la actualiza.
   * @param data - Datos parciales de la entidad.
   * @returns La entidad guardada.
   */
  save(data: DeepPartial<T>): Promise<T>;

  /**
   * Guarda múltiples entidades en la base de datos.
   * @param data - Array de datos parciales de la entidad.
   * @returns Array de entidades guardadas.
   */
  saveMany(data: DeepPartial<T>[]): Promise<T[]>;

  /**
   * Encuentra una entidad por su ID.
   * @param id - Identificador de la entidad.
   * @returns La entidad encontrada.
   */
  findOneById(id: number | string): Promise<T>;

  /**
   * Encuentra una entidad basada en condiciones específicas.
   * @param filterCondition - Condiciones de búsqueda.
   * @returns La entidad encontrada.
   */
  findByCondition(filterCondition: FindOneOptions<T>): Promise<T>;

  /**
   * Encuentra todas las entidades que cumplen con las opciones de búsqueda proporcionadas.
   * @param options - Opciones de búsqueda.
   * @returns Array de entidades encontradas.
   */
  findAll(options?: FindManyOptions<T>): Promise<T[]>;

  /**
   * Elimina una entidad de la base de datos.
   * @param data - Entidad a eliminar.
   * @returns La entidad eliminada.
   */
  remove(data: T): Promise<T>;

  /**
   * Encuentra entidades incluyendo sus relaciones especificadas.
   * @param options - Opciones de búsqueda con relaciones.
   * @returns Array de entidades encontradas con sus relaciones.
   */
  findWithRelations(options: FindManyOptions<T>): Promise<T[]>;

  /**
   * Pre-carga una entidad basada en datos parciales, útil para actualizaciones.
   * @param entityLike - Datos parciales de la entidad.
   * @returns La entidad pre-cargada.
   */
  preload(entityLike: DeepPartial<T>): Promise<T>;

  /**
   * Encuentra una entidad basada en opciones de búsqueda específicas.
   * @param options - Opciones de búsqueda.
   * @returns La entidad encontrada.
   */
  findOne(options: FindOneOptions<T>): Promise<T>;

  /**
   * Cuenta el número de entidades que cumplen con ciertas condiciones.
   * @param options - Opciones de búsqueda.
   * @returns Número de entidades que cumplen con las condiciones.
   */
  count(options?: FindManyOptions<T>): Promise<number>;

  /**
   * Actualiza una entidad parcialmente por su ID.
   * @param id - Identificador de la entidad.
   * @param partialEntity - Datos parciales para la actualización.
   */
  update(id: number | string, partialEntity: DeepPartial<T>): Promise<void>;
}
