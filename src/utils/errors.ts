import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export const errors = {
  UNAUTHORIZED: 0,
  NOT_FOUND: 1,
  BAD_REQUEST: 2,
  USER_ALREADY_EXISTS: 3,
  PASSWORD_NOT_MATCH: 4,
};

export class ErrorHandler {
  code: number;
  constructor(code: number) {
    this.code = code;
  }
  exceptionResponse() {
    switch (this.code) {
      case errors.NOT_FOUND:
        return new NotFoundException();
      case errors.UNAUTHORIZED:
        return new UnauthorizedException();
      case errors.BAD_REQUEST:
        return new BadRequestException(
          'Some params on the request are bad formed',
        );
      case errors.USER_ALREADY_EXISTS:
        return new BadRequestException('User already exists', {
          description: `User email already exists`,
        });
      case errors.PASSWORD_NOT_MATCH:
        return new BadRequestException('Passwords is not equal', {
          description: `Both passwords must be the same`,
        });
      default:
        return new BadRequestException('Not handled error');
    }
  }
}
