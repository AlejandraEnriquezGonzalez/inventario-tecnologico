
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

export enum EstadoEquipo {
  DISPONIBLE = 'Disponible',
  EN_USO = 'En uso',
  MANTENCION = 'Mantención',
  BAJA = 'Baja',
}

@Entity('equipos')
export class Equipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50 })
  codigoInventario: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 80 })
  tipo: string;

  @Column({ length: 80 })
  marca: string;

  @Column({ length: 80 })
  modelo: string;

  @Column({ length: 100 })
  ubicacion: string;

  @Column({
    type: 'enum',
    enum: EstadoEquipo,
    default: EstadoEquipo.DISPONIBLE,
  })
  estado: EstadoEquipo;

  @Column({ type: 'date' })
  fechaAdquisicion: string;

  @Column({ type: 'text', nullable: true })
  observaciones: string | null;
}
