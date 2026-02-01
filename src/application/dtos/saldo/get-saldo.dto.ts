import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetSaldoDto {
  @IsDateString({}, { message: 'dataInicio deve ser uma data válida' })
  @IsNotEmpty({ message: 'dataInicio é obrigatória' })
  dataInicio: string;

  @IsDateString({}, { message: 'dataFim deve ser uma data válida' })
  @IsNotEmpty({ message: 'dataFim é obrigatória' })
  dataFim: string;

  @IsString()
  @IsOptional()
  hospital?: string;
}
