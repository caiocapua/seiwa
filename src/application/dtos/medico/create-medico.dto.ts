import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMedicoDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'CRM é obrigatório' })
  crm: string;

  @IsString()
  @IsOptional()
  especialidade?: string;
}
