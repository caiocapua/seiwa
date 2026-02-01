export class DomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainException';
  }
}

export class EntityNotFoundException extends DomainException {
  constructor(entity: string, id: string) {
    super(`${entity} com id ${id} não encontrado`);
    this.name = 'EntityNotFoundException';
  }
}

export class DuplicateEntityException extends DomainException {
  constructor(entity: string, field: string, value: string) {
    super(`${entity} com ${field} ${value} já existe`);
    this.name = 'DuplicateEntityException';
  }
}

export class InvalidValueException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidValueException';
  }
}
