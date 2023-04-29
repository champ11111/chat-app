import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';

interface CustomRequest extends Request {
  uid?: number;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: CustomRequest, _: Response, next: () => void) {
    const token = (req.headers.authorization ?? '').split('Bearer ')[1];
    try {
      //TODO: Should not be necessary to verify the token twice
      if (token) {
        const { uid } = await this.authService.verifyToken(token);
        if (uid) {
          req.uid = uid;
        }
      }
    } catch (err) {
      req.uid = undefined;
      console.log(err);
    }
    next();
  }
}
