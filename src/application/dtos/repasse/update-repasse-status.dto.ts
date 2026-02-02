import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { RepasseStatus } from '../../../domain/enums';

export class UpdateRepasseStatusDto {
  @ApiProperty({
    description: 'Novo status do repasse',
    enum: RepasseStatus,
    example: 'processado',
  })
  @IsEnum(RepasseStatus, { message: 'Status inválido' })
  status: RepasseStatus;
}
