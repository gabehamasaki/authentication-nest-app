import { Token } from './Token';

describe('Token Entity', () => {
  it('should be able create a user', () => {
    const token = new Token({
      userId: 'userId',
      expiresIn: 300,
    });
    expect(token).toBeTruthy();
  });
});
