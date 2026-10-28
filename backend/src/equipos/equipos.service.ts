
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipo } from './entities/equipo.entity.js';

@Injectable()
export class EquiposService {
  constructor(
    @InjectRepository(Equipo)
    private readonly equiposRepository: Repository<Equipo>,
  ) {}

  async findAll(): Promise<Equipo[]> {
    return this.equiposRepository.find({
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Equipo> {
    const equipo = await this.equiposRepository.findOneBy({ id });

    if (!equipo) {
      throw new NotFoundException(
        `No se encontró el equipo con ID ${id}`,
      );
    }

    return equipo;
  }

  async create(datos: Partial<Equipo>): Promise<Equipo> {
    const existente = await this.equiposRepository.findOneBy({
      codigoInventario: datos.codigoInventario,
    });

    if (existente) {
      throw new ConflictException(
        'Ya existe un equipo con ese código de inventario',
      );
    }

    const equipo = this.equiposRepository.create(datos);
    return this.equiposRepository.save(equipo);
  }

  async update(
    id: number,
    datos: Partial<Equipo>,
  ): Promise<Equipo> {
    const equipo = await this.findOne(id);

    if (
      datos.codigoInventario &&
      datos.codigoInventario !== equipo.codigoInventario
    ) {
      const existente = await this.equiposRepository.findOneBy({
        codigoInventario: datos.codigoInventario,
      });

      if (existente) {
        throw new ConflictException(
          'Ya existe un equipo con ese código de inventario',
        );
      }
    }

    Object.assign(equipo, datos);
    return this.equiposRepository.save(equipo);
  }

  async remove(id: number): Promise<{ mensaje: string }> {
    const equipo = await this.findOne(id);

    await this.equiposRepository.remove(equipo);

    return { mensaje: 'Equipo eliminado correctamente' };
  }
}
