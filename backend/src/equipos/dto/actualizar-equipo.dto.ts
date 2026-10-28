
import { PartialType } from '@nestjs/mapped-types';
import { CrearEquipoDto } from './crear-equipo.dto.js';

export class ActualizarEquipoDto extends PartialType(CrearEquipoDto) {}
