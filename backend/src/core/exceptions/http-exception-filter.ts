import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Filtro de excepciones que captura exclusivamente las excepciones de tipo HttpException.
 * Proporciona respuestas detalladas y personalizadas para errores HTTP específicos.
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * Método que maneja las excepciones de tipo HttpException.
   * @param exception - La excepción capturada.
   * @param host - Contexto de ejecución.
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message =
      typeof exceptionResponse === 'object' && exceptionResponse !== null
        ? (exceptionResponse as any).message
        : exceptionResponse;

    if (!message) {
      message = 'Ocurrió un error inesperado';
    }

    // Estructura de la respuesta de error
    const errorResponse = {
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    // Opcional: Puedes agregar más información al responseBody si es necesario.
    // Por ejemplo, detalles de validación, errores específicos, etc.

    response.status(status).json(errorResponse);
  }
}
