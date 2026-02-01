import { InvalidValueException } from '../exceptions/domain.exception';

export interface MedicoProps {
  id?: string;
  nome: string;
  crm: string;
  especialidade?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Medico {
  private readonly _id: string;
  private _nome: string;
  private _crm: string;
  private _especialidade?: string;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: MedicoProps) {
    this.validateNome(props.nome);
    this.validateCrm(props.crm);

    this._id = props.id ?? crypto.randomUUID();
    this._nome = props.nome;
    this._crm = props.crm;
    this._especialidade = props.especialidade;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  get id(): string {
    return this._id;
  }

  get nome(): string {
    return this._nome;
  }

  get crm(): string {
    return this._crm;
  }

  get especialidade(): string | undefined {
    return this._especialidade;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  update(props: Partial<Pick<MedicoProps, 'nome' | 'especialidade'>>): void {
    if (props.nome !== undefined) {
      this.validateNome(props.nome);
      this._nome = props.nome;
    }
    if (props.especialidade !== undefined) {
      this._especialidade = props.especialidade;
    }
    this._updatedAt = new Date();
  }

  private validateNome(nome: string): void {
    if (!nome || nome.trim().length === 0) {
      throw new InvalidValueException('Nome é obrigatório');
    }
  }

  private validateCrm(crm: string): void {
    if (!crm || crm.trim().length === 0) {
      throw new InvalidValueException('CRM é obrigatório');
    }
  }

  toJSON() {
    return {
      id: this._id,
      nome: this._nome,
      crm: this._crm,
      especialidade: this._especialidade,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
