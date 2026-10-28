
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { EstadoEquipo } from '../entities/equipo.entity.js';

export class CrearEquipoDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsNotEmpty()
  codigoInventario: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  tipo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  marca: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  modelo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  ubicacion: string;

  @IsEnum(EstadoEquipo)
  estado: EstadoEquipo;

  @IsDateString()
  fechaAdquisicion: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
