import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

export const User = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const user = getUserFromRequest(context);

    if (filter) {
      return getUserProperty(user, filter);
    }

    return user;
  },
);

function getUserFromRequest(context: ExecutionContext) {
  const request = context.switchToHttp().getRequest();

  if (!request.user) {
    throw new NotFoundException(
      'Usuário não encontrado no request, use o authGuard',
    );
  }

  return request.user;
}

function getUserProperty(user: any, filter: string) {
  if (!(filter in user)) {
    throw new NotFoundException(
      `Propriedade "${filter}" não encontrada no usuário`,
    );
  }

  return user[filter];
}
