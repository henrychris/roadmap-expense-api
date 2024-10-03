export class JwtPayload {
  constructor(userId: string) {
    this.sub = userId;
  }
  sub: string;
}
