import { AuthService } from "@/service/auth";
import { Controller, Middleware } from "@tahminator/sapling";
import { Request, Response, NextFunction } from "express";

@Controller({
  deps: [AuthService],
})
export class AuthMiddleware {
  constructor(private readonly authService: AuthService) {}

  @Middleware()
  async validateSession(req: Request, res: Response, next: NextFunction) {
    const cookie = req.headers.cookie;
    const sessionId = this.authService.readSessionCookie(cookie ?? "");

    if (!sessionId) {
      res.locals.user = null;
      res.locals.session = null;
      next();
      return;
    }

    const { session, user } = await this.authService.validateSession(sessionId);

    if (session && session.fresh) {
      res.appendHeader(
        "Set-Cookie",
        this.authService.createSessionCookie(session.id).serialize(),
      );
    }
    if (!session) {
      res.appendHeader(
        "Set-Cookie",
        this.authService.createBlankSessionCookie().serialize(),
      );
    }
    res.locals.session = session;
    res.locals.user = user;
    next();
    return;
  }
}
