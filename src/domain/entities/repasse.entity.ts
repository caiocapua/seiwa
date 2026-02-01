import { InvalidValueException } from '../exceptions/domain.exception';
import { RepasseStatus } from '../enums/repasse-status.enum';

export interface RepasseProps {
  id?: string;
  medicoId: string;
  hospital: string;
  valor: number;
  data: Date;
  status?: RepasseStatus;
  descricao?: string;
  createdAt?: Date;
}

export class Repasse {
  private readonly _id: string;
  private readonly _medicoId: string;
  private readonly _hospital: string;
  private readonly _valor: number;
  private readonly _data: Date;
  private _status: RepasseStatus;
  private readonly _descricao?: string;
  private readonly _createdAt: Date;

  constructor(props: RepasseProps) {
    this.validateMedicoId(props.medicoId);
    this.validateHospital(props.hospital);
    this.validateValor(props.valor);
    this.validateData(props.data);

    this._id = props.id ?? crypto.randomUUID();
    this._medicoId = props.medicoId;
    this._hospital = props.hospital;
    this._valor = this.roundToTwoDecimals(props.valor);
    this._data = props.data;
    this._status = props.status ?? RepasseStatus.PENDENTE;
    this._descricao = props.descricao;
    this._createdAt = props.createdAt ?? new Date();
  }

  get id(): string {
    return this._id;
  }

  get medicoId(): string {
    return this._medicoId;
  }

  get hospital(): string {
    return this._hospital;
  }

  get valor(): number {
    return this._valor;
  }

  get data(): Date {
    return this._data;
  }

  get status(): RepasseStatus {
    return this._status;
  }

  get descricao(): string | undefined {
    return this._descricao;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  processar(): void {
    if (this._status === RepasseStatus.CANCELADO) {
      throw new InvalidValueException('Não é possível processar um repasse cancelado');
    }
    this._status = RepasseStatus.PROCESSADO;
  }

  cancelar(): void {
    if (this._status === RepasseStatus.PROCESSADO) {
      throw new InvalidValueException('Não é possível cancelar um repasse já processado');
    }
    this._status = RepasseStatus.CANCELADO;
  }

  private validateMedicoId(medicoId: string): void {
    if (!medicoId || medicoId.trim().length === 0) {
      throw new InvalidValueException('MedicoId é obrigatório');
    }
  }

  private validateHospital(hospital: string): void {
    if (!hospital || hospital.trim().length === 0) {
      throw new InvalidValueException('Hospital é obrigatório');
    }
  }

  private validateValor(valor: number): void {
    if (valor === undefined || valor === null) {
      throw new InvalidValueException('Valor é obrigatório');
    }
    if (valor <= 0) {
      throw new InvalidValueException('Valor deve ser maior que zero');
    }
  }

  private validateData(data: Date): void {
    if (!data) {
      throw new InvalidValueException('Data é obrigatória');
    }
  }

  private roundToTwoDecimals(value: number): number {
    return Math.round(value * 100) / 100;
  }

  toJSON() {
    return {
      id: this._id,
      medicoId: this._medicoId,
      hospital: this._hospital,
      valor: this._valor,
      data: this._data,
      status: this._status,
      descricao: this._descricao,
      createdAt: this._createdAt,
    };
  }
}
