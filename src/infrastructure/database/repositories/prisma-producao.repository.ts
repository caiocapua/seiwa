import { Injectable } from '@nestjs/common';
import { Producao } from '../../../domain/entities';
import {
  FindProducaoFilters,
  IProducaoRepository,
  PaginatedResult,
  PaginationParams,
} from '../../../domain/repositories';
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

  async findAll(
    filters?: FindProducaoFilters,
    pagination?: PaginationParams,
  ): Promise<PaginatedResult<Producao>> {
    const page = pagination?.page ?? 1;
    const limit = pagination?.limit ?? 10;
    const skip = (page - 1) * limit;
    const where = this.buildWhereClause(filters);

    const [data, total] = await Promise.all([
      this.prisma.producao.findMany({
        where,
        orderBy: { data: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.producao.count({ where }),
    ]);

    return {
      data: data.map((d) => this.toDomain(d)),
      total,
    };
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
