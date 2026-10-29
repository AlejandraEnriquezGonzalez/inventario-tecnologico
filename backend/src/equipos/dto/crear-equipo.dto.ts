
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EstadoEquipo } from '../entities/equipo.entity.js';


@ValidatorConstraint({ name: 'fechaNoFutura', async: false })
class FechaNoFutura implements ValidatorConstraintInterface {
  validate(valor: unknown): boolean {
    if (typeof valor !== 'string') {
      return false;
    }

    const fecha = new Date(`${valor}T00:00:00`);

    if (Number.isNaN(fecha.getTime())) {
      return false;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return fecha <= hoy;
  }

  defaultMessage(): string {
    return 'La fecha de adquisición no puede ser posterior a hoy.';
  }
}


export class CrearEquipoDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsNotEmpty()
  codigoInventario: string;
  
  @IsString({ message: 'El nombre debe ser un texto.' })
  @MinLength(3, {
    message: 'El nombre debe tener al menos 3 caracteres.',
  })
  @MaxLength(100, {
    message: 'El nombre no puede superar los 100 caracteres.',
  })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
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

  
  @IsDateString({}, {
    message: 'La fecha de adquisición debe ser válida.',
  })
  @Validate(FechaNoFutura)
  fechaAdquisicion: string;


  @IsOptional()
  @IsString()
  observaciones?: string;
}
