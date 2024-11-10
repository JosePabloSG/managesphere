// src/common/repositories/base.abstract.repository.ts

import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { BaseInterfaceRepository } from '@repositories/interface/base.interface';

/**
 * Interfaz que garantiza que la entidad tenga un identificador.
 */
interface HasId {
  id: number | string;
}

/**
 * Clase abstracta que implementa métodos CRUD básicos utilizando TypeORM.
 * Sigue los principios de SOLID y Clean Architecture.
 * @template T - Tipo de la entidad.
 */
export abstract class BaseAbstractRepository<T extends HasId>
  implements BaseInterfaceRepository<T>
{
  protected repository: Repository<T>;

  /**
   * Constructor que recibe la instancia de TypeORM Repository.
   * @param repository - Instancia de TypeORM Repository.
   */
  protected constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  /**
   * Crea una nueva instancia de la entidad sin guardarla en la base de datos.
   * @param data - Datos parciales de la entidad.
   * @returns La nueva instancia de la entidad.
   */
  public create(data: DeepPartial<T>): T {
    return this.repository.create(data);
  }

  /**
   * Crea múltiples instancias de la entidad sin guardarlas en la base de datos.
   * @param data - Array de datos parciales de la entidad.
   * @returns Array de nuevas instancias de la entidad.
   */
  public createMany(data: DeepPartial<T>[]): T[] {
    return this.repository.create(data);
  }

  /**
   * Guarda una entidad en la base de datos. Si la entidad ya existe, la actualiza.
   * @param data - Datos parciales de la entidad.
   * @returns La entidad guardada.
   */
  public async save(data: DeepPartial<T>): Promise<T> {
    return await this.repository.save(data);
  }

  /**
   * Guarda múltiples entidades en la base de datos.
   * @param data - Array de datos parciales de la entidad.
   * @returns Array de entidades guardadas.
   */
  public async saveMany(data: DeepPartial<T>[]): Promise<T[]> {
    return await this.repository.save(data);
  }

  /**
   * Encuentra una entidad por su ID.
   * @param id - Identificador de la entidad.
   * @returns La entidad encontrada.
   * @throws NotFoundException si la entidad no se encuentra.
   */
  public async findOneById(id: number | string): Promise<T> {
    const options = { id: id } as FindOptionsWhere<T>;
    const entity = await this.repository.findOneBy(options);
    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return entity;
  }

  /**
   * Encuentra una entidad basada en condiciones específicas.
   * @param filterCondition - Condiciones de búsqueda.
   * @returns La entidad encontrada.
   * @throws NotFoundException si la entidad no se encuentra.
   */
  public async findByCondition(filterCondition: FindOneOptions<T>): Promise<T> {
    const entity = await this.repository.findOne(filterCondition);
    if (!entity) {
      throw new NotFoundException(`Entity not found with the given condition`);
    }
    return entity;
  }

  /**
   * Encuentra todas las entidades que cumplen con las opciones de búsqueda proporcionadas.
   * @param options - Opciones de búsqueda.
   * @returns Array de entidades encontradas.
   */
  public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

  /**
   * Elimina una entidad de la base de datos.
   * @param data - Entidad a eliminar.
   * @returns La entidad eliminada.
   */
  public async remove(data: T): Promise<T> {
    return await this.repository.remove(data);
  }

  /**
   * Encuentra entidades incluyendo sus relaciones especificadas.
   * @param options - Opciones de búsqueda con relaciones.
   * @returns Array de entidades encontradas con sus relaciones.
   */
  public async findWithRelations(options: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

  /**
   * Pre-carga una entidad basada en datos parciales, útil para actualizaciones.
   * @param entityLike - Datos parciales de la entidad.
   * @returns La entidad pre-cargada.
   * @throws NotFoundException si la entidad no se encuentra para pre-carga.
   */
  public async preload(entityLike: DeepPartial<T>): Promise<T> {
    const entity = await this.repository.preload(entityLike);
    if (!entity) {
      throw new NotFoundException(`Entity to preload not found`);
    }
    return entity;
  }

  /**
   * Encuentra una entidad basada en opciones de búsqueda específicas.
   * @param options - Opciones de búsqueda.
   * @returns La entidad encontrada.
   * @throws NotFoundException si la entidad no se encuentra.
   */
  public async findOne(options: FindOneOptions<T>): Promise<T> {
    const entity = await this.repository.findOne(options);
    if (!entity) {
      throw new NotFoundException(`Entity not found with the given options`);
    }
    return entity;
  }

  /**
   * Cuenta el número de entidades que cumplen con ciertas condiciones.
   * @param options - Opciones de búsqueda.
   * @returns Número de entidades que cumplen con las condiciones.
   */
  public async count(options?: FindManyOptions<T>): Promise<number> {
    return await this.repository.count(options);
  }

  /**
   * Actualiza una entidad parcialmente por su ID.
   * @param id - Identificador de la entidad.
   * @param partialEntity - Datos parciales para la actualización.
   * @throws NotFoundException si la entidad no se encuentra.
   */
  public async update(
    id: number | string,
    partialEntity: DeepPartial<T>,
  ): Promise<void> {
    const result = await this.repository.update(id, partialEntity as any);
    if (result.affected === 0) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
  }
}
