import { IsOptional, IsString } from 'class-validator';

export class UpdateMedicoDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  especialidade?: string;
}
