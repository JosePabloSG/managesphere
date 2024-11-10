import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

/**
 * Filtro global de excepciones que captura todas las excepciones no manejadas.
 * Implementa una respuesta uniforme para todas las excepciones.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  /**
   * Método que maneja las excepciones capturadas.
   * @param exception - La excepción capturada.
   * @param host - Contexto de ejecución.
   */
  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    if (!httpAdapter) {
      // Si no se puede acceder al adaptador HTTP, lanzar una excepción.
      throw new Error('HttpAdapterHost not found');
    }

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      // Agregar más detalles si es necesario, por ejemplo, mensajes de error personalizados.
      message:
        exception instanceof HttpException
          ? exception.message || null
          : 'Internal server error',
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
