import { HttpException, HttpStatus, ValidationError } from '@nestjs/common';

export type ExceptionInformation = {
  statusCode: number;
  message: string;
  data?: unknown;
};

export type ExceptionResponse = ExceptionInformation & {
  traceId?: string;
};

export class Exception extends HttpException {
  private readonly customInformation: ExceptionInformation;

  constructor(statusCode: HttpStatus, message: string, data?: unknown) {
    super(message, statusCode);
    this.customInformation = {
      statusCode,
      message,
      data,
    };
  }

  prepareResponse(traceId?: string): ExceptionResponse {
    return {
      ...this.customInformation,
      traceId,
    };
  }
}

type DataError = {
  [key: string]: { [key: string]: string } | null;
};

export class EcommerceBadRequestException extends Exception {
  constructor(message: string, data?: unknown) {
    super(HttpStatus.BAD_REQUEST, message, data);
  }

  static fromValidationErrors(
    errors: ValidationError[],
  ): EcommerceBadRequestException {
    const data: DataError = {};
    const parseErrors = (
      errs: ValidationError[],
      result: DataError,
      parentProperty?: string,
    ): void => {
      errs.forEach((error) => {
        const property = parentProperty
          ? `${parentProperty}.${error.property}`
          : error.property;
        if (error.constraints) {
          // eslint-disable-next-line no-param-reassign
          result[property] = error.constraints;
        } else if (error.children?.length) {
          parseErrors(error.children, result, property);
        }
      });
    };
    parseErrors(errors, data);

    return new EcommerceBadRequestException('Validation failed', data);
  }
}

export class EcommerceUnauthorizedException extends Exception {
  constructor(message: string, data?: unknown) {
    super(HttpStatus.UNAUTHORIZED, message, data);
  }
}

export class EcommerceForbiddenException extends Exception {
  constructor(message: string, data?: unknown) {
    super(HttpStatus.FORBIDDEN, message, data);
  }
}

export class EcommerceNotFoundException extends Exception {
  constructor(message: string, data?: unknown) {
    super(HttpStatus.NOT_FOUND, message, data);
  }
}

export class EcommerceNotAcceptableException extends Exception {
  constructor(message: string, data?: unknown) {
    super(HttpStatus.NOT_ACCEPTABLE, message, data);
  }
}

export class EcommerceConflictException extends Exception {
  constructor(message: string, data?: unknown) {
    super(HttpStatus.CONFLICT, message, data);
  }
}

export class InternalServerError extends Exception {
  constructor() {
    super(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error');
  }
}
