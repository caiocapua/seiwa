import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import {
  DomainException,
  DuplicateEntityException,
  EntityNotFoundException,
  InvalidValueException,
} from '../../../domain/exceptions';

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    let status = HttpStatus.BAD_REQUEST;

    if (exception instanceof EntityNotFoundException) {
      status = HttpStatus.NOT_FOUND;
    } else if (exception instanceof DuplicateEntityException) {
      status = HttpStatus.CONFLICT;
    } else if (exception instanceof InvalidValueException) {
      status = HttpStatus.BAD_REQUEST;
    }

    response.status(status).send({
      statusCode: status,
      error: exception.name,
      message: exception.message,
    });
  }
}
