import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';

export class CreateRepasseDto {
  @IsUUID('4', { message: 'medicoId deve ser um UUID válido' })
  @IsNotEmpty({ message: 'medicoId é obrigatório' })
  medicoId: string;

  @IsString()
  @IsNotEmpty({ message: 'Hospital é obrigatório' })
  hospital: string;

  @IsNumber({}, { message: 'Valor deve ser um número' })
  @IsPositive({ message: 'Valor deve ser maior que zero' })
  valor: number;

  @IsDateString({}, { message: 'Data deve ser uma data válida' })
  @IsNotEmpty({ message: 'Data é obrigatória' })
  data: string;

  @IsString()
  @IsOptional()
  descricao?: string;
}
