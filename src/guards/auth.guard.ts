import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractToken(request.headers.authorization);
    if (!token) return false;

    try {
      const tokenPayload = await this.validateToken(token);
      request.tokenPayload = tokenPayload;

      const user = await this.loadUser(tokenPayload.id);
      if (!user) return false;

      request.user = user;
      return true;
    } catch (error) {
      return false;
    }
  }

  private extractToken(authorizationHeader: string | undefined): string | null {
    if (!authorizationHeader) return null;
    const [bearer, token] = authorizationHeader.split(' ');
    return bearer === 'Bearer' && token ? token : null;
  }

  private async validateToken(token: string) {
    return this.authService.checkToken(token);
  }

  private async loadUser(userId: number) {
    return this.userService.findOne(userId);
  }
}
