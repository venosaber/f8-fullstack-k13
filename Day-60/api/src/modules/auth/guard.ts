import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { type UserResI, type UserServiceI, UserServiceToken } from '@/shares';

interface RequestWithUser extends Request {
  user: UserResI;
}

interface TokenPayload {
  sub: number; // Standard JWT claim for the subject
  data: UserResI;
  iat: number; // Standard JWT claim: Issued At
  exp: number; // Standard JWT claim: Expiration Time
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @Inject(UserServiceToken)
    private userService: UserServiceI,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token: string | undefined = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Authorization token not found');
    }

    try {
      // jwtService.verifyAsync will authenticate token and return payload
      // if token is invalid or expired, throw error
      const payload = await this.jwtService.verifyAsync<TokenPayload>(token, {
        secret: process.env.PRIVATE_KEY,
      });

      // use payload to find user in DB
      const user: UserResI = await this.userService.findOne(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Assign the user to request so that the route handler can access
      request.user = user;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return true;
  }

  // extract token from 'Bearer <token>'
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
