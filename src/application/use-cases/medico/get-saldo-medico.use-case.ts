import { Inject, Injectable } from '@nestjs/common';
import { RepasseStatus } from '../../../domain/enums';
import { EntityNotFoundException } from '../../../domain/exceptions';
import {
  IMedicoRepository,
  IProducaoRepository,
  IRepasseRepository,
  MEDICO_REPOSITORY,
  PRODUCAO_REPOSITORY,
  REPASSE_REPOSITORY,
} from '../../../domain/repositories';
import { GetSaldoDto, SaldoOutputDto } from '../../dtos/saldo';

@Injectable()
export class GetSaldoMedicoUseCase {
  constructor(
    @Inject(MEDICO_REPOSITORY)
    private readonly medicoRepository: IMedicoRepository,
    @Inject(PRODUCAO_REPOSITORY)
    private readonly producaoRepository: IProducaoRepository,
    @Inject(REPASSE_REPOSITORY)
    private readonly repasseRepository: IRepasseRepository,
  ) {}

  async execute(medicoId: string, dto: GetSaldoDto): Promise<SaldoOutputDto> {
    const medico = await this.medicoRepository.findById(medicoId);
    if (!medico) {
      throw new EntityNotFoundException('Médico', medicoId);
    }

    const dataInicio = new Date(dto.dataInicio);
    const dataFim = new Date(dto.dataFim);

    const totalProducoes = await this.producaoRepository.sumByMedicoAndPeriod(
      medicoId,
      dataInicio,
      dataFim,
      dto.hospital,
    );

    const totalRepasses = await this.repasseRepository.sumByMedicoAndPeriod(
      medicoId,
      dataInicio,
      dataFim,
      RepasseStatus.PROCESSADO,
      dto.hospital,
    );

    return SaldoOutputDto.create({
      medicoId,
      medicoNome: medico.nome,
      dataInicio,
      dataFim,
      hospital: dto.hospital,
      totalProducoes,
      totalRepasses,
    });
  }
}
