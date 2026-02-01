import { IsDateString, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { RepasseStatus } from '../../../domain/enums';

export class ListRepasseDto {
  @IsUUID('4', { message: 'medicoId deve ser um UUID válido' })
  @IsOptional()
  medicoId?: string;

  @IsString()
  @IsOptional()
  hospital?: string;

  @IsEnum(RepasseStatus, { message: 'Status inválido' })
  @IsOptional()
  status?: RepasseStatus;

  @IsDateString({}, { message: 'dataInicio deve ser uma data válida' })
  @IsOptional()
  dataInicio?: string;

  @IsDateString({}, { message: 'dataFim deve ser uma data válida' })
  @IsOptional()
  dataFim?: string;
}
