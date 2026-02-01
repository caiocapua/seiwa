import { Injectable } from '@nestjs/common';
import { Producao } from '../../../domain/entities';
import { FindProducaoFilters, IProducaoRepository } from '../../../domain/repositories';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaProducaoRepository implements IProducaoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(producao: Producao): Promise<Producao> {
    const data = await this.prisma.producao.create({
      data: {
        id: producao.id,
        medicoId: producao.medicoId,
        hospital: producao.hospital,
        valor: producao.valor,
        data: producao.data,
        descricao: producao.descricao,
        createdAt: producao.createdAt,
      },
    });

    return this.toDomain(data);
  }

  async findById(id: string): Promise<Producao | null> {
    const data = await this.prisma.producao.findUnique({
      where: { id },
    });

    return data ? this.toDomain(data) : null;
  }

  async findAll(filters?: FindProducaoFilters): Promise<Producao[]> {
    const data = await this.prisma.producao.findMany({
      where: this.buildWhereClause(filters),
      orderBy: { data: 'desc' },
    });

    return data.map(this.toDomain);
  }

  async sumByMedicoAndPeriod(
    medicoId: string,
    dataInicio: Date,
    dataFim: Date,
    hospital?: string,
  ): Promise<number> {
    const result = await this.prisma.producao.aggregate({
      _sum: { valor: true },
      where: {
        medicoId,
        data: {
          gte: dataInicio,
          lte: dataFim,
        },
        ...(hospital && { hospital }),
      },
    });

    return result._sum.valor ?? 0;
  }

  private buildWhereClause(filters?: FindProducaoFilters) {
    if (!filters) return {};

    return {
      ...(filters.medicoId && { medicoId: filters.medicoId }),
      ...(filters.hospital && { hospital: filters.hospital }),
      ...(filters.dataInicio || filters.dataFim
        ? {
            data: {
              ...(filters.dataInicio && { gte: filters.dataInicio }),
              ...(filters.dataFim && { lte: filters.dataFim }),
            },
          }
        : {}),
    };
  }

  private toDomain(data: {
    id: string;
    medicoId: string;
    hospital: string;
    valor: number;
    data: Date;
    descricao: string | null;
    createdAt: Date;
  }): Producao {
    return new Producao({
      id: data.id,
      medicoId: data.medicoId,
      hospital: data.hospital,
      valor: data.valor,
      data: data.data,
      descricao: data.descricao ?? undefined,
      createdAt: data.createdAt,
    });
  }
}
