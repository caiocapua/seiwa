import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class ListProducaoDto {
  @IsUUID('4', { message: 'medicoId deve ser um UUID válido' })
  @IsOptional()
  medicoId?: string;

  @IsString()
  @IsOptional()
  hospital?: string;

  @IsDateString({}, { message: 'dataInicio deve ser uma data válida' })
  @IsOptional()
  dataInicio?: string;

  @IsDateString({}, { message: 'dataFim deve ser uma data válida' })
  @IsOptional()
  dataFim?: string;
}
