import { Injectable } from '@nestjs/common';
import { Repasse } from '../../../domain/entities';
import { RepasseStatus } from '../../../domain/enums';
import {
  FindRepasseFilters,
  IRepasseRepository,
  PaginatedResult,
  PaginationParams,
} from '../../../domain/repositories';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaRepasseRepository implements IRepasseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(repasse: Repasse): Promise<Repasse> {
    const data = await this.prisma.repasse.create({
      data: {
        id: repasse.id,
        medicoId: repasse.medicoId,
        hospital: repasse.hospital,
        valor: repasse.valor,
        data: repasse.data,
        status: repasse.status,
        descricao: repasse.descricao,
        createdAt: repasse.createdAt,
      },
    });

    return this.toDomain(data);
  }

  async findById(id: string): Promise<Repasse | null> {
    const data = await this.prisma.repasse.findUnique({
      where: { id },
    });

    return data ? this.toDomain(data) : null;
  }

  async findAll(
    filters?: FindRepasseFilters,
    pagination?: PaginationParams,
  ): Promise<PaginatedResult<Repasse>> {
    const page = pagination?.page ?? 1;
    const limit = pagination?.limit ?? 10;
    const skip = (page - 1) * limit;
    const where = this.buildWhereClause(filters);

    const [data, total] = await Promise.all([
      this.prisma.repasse.findMany({
        where,
        orderBy: { data: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.repasse.count({ where }),
    ]);

    return {
      data: data.map((d) => this.toDomain(d)),
      total,
    };
  }

  async update(repasse: Repasse): Promise<Repasse> {
    const data = await this.prisma.repasse.update({
      where: { id: repasse.id },
      data: {
        status: repasse.status,
      },
    });

    return this.toDomain(data);
  }

  async sumByMedicoAndPeriod(
    medicoId: string,
    dataInicio: Date,
    dataFim: Date,
    status: RepasseStatus,
    hospital?: string,
  ): Promise<number> {
    const result = await this.prisma.repasse.aggregate({
      _sum: { valor: true },
      where: {
        medicoId,
        status,
        data: {
          gte: dataInicio,
          lte: dataFim,
        },
        ...(hospital && { hospital }),
      },
    });

    return result._sum.valor ?? 0;
  }

  private buildWhereClause(filters?: FindRepasseFilters) {
    if (!filters) return {};

    return {
      ...(filters.medicoId && { medicoId: filters.medicoId }),
      ...(filters.hospital && { hospital: filters.hospital }),
      ...(filters.status && { status: filters.status }),
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
    status: string;
    descricao: string | null;
    createdAt: Date;
  }): Repasse {
    return new Repasse({
      id: data.id,
      medicoId: data.medicoId,
      hospital: data.hospital,
      valor: data.valor,
      data: data.data,
      status: data.status as RepasseStatus,
      descricao: data.descricao ?? undefined,
      createdAt: data.createdAt,
    });
  }
}
