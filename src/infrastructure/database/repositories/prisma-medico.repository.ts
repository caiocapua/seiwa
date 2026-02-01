import { Injectable } from '@nestjs/common';
import { Medico } from '../../../domain/entities';
import { IMedicoRepository } from '../../../domain/repositories';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaMedicoRepository implements IMedicoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(medico: Medico): Promise<Medico> {
    const data = await this.prisma.medico.create({
      data: {
        id: medico.id,
        nome: medico.nome,
        crm: medico.crm,
        especialidade: medico.especialidade,
        createdAt: medico.createdAt,
        updatedAt: medico.updatedAt,
      },
    });

    return this.toDomain(data);
  }

  async findById(id: string): Promise<Medico | null> {
    const data = await this.prisma.medico.findUnique({
      where: { id },
    });

    return data ? this.toDomain(data) : null;
  }

  async findByCrm(crm: string): Promise<Medico | null> {
    const data = await this.prisma.medico.findUnique({
      where: { crm },
    });

    return data ? this.toDomain(data) : null;
  }

  async findAll(): Promise<Medico[]> {
    const data = await this.prisma.medico.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return data.map(this.toDomain);
  }

  async update(medico: Medico): Promise<Medico> {
    const data = await this.prisma.medico.update({
      where: { id: medico.id },
      data: {
        nome: medico.nome,
        especialidade: medico.especialidade,
        updatedAt: medico.updatedAt,
      },
    });

    return this.toDomain(data);
  }

  private toDomain(data: {
    id: string;
    nome: string;
    crm: string;
    especialidade: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): Medico {
    return new Medico({
      id: data.id,
      nome: data.nome,
      crm: data.crm,
      especialidade: data.especialidade ?? undefined,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
