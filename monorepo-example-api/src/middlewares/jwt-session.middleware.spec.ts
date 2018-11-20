import { JwtSessionMiddleware } from './jwt-session.middleware';

describe('JwtSessionMiddleware', () => {
  it('should be defined', () => {
    expect(new JwtSessionMiddleware()).toBeTruthy();
  });
});
