import { sign } from 'jsonwebtoken';

interface GenerateTokenRequest {
  userId: string;
}

interface GenerateTokenResponse {
  token: string;
}

export class GenerateToken {
  static async execute({
    userId,
  }: GenerateTokenRequest): Promise<GenerateTokenResponse> {
    const token = sign({}, process.env.PRIVATE_KEY, {
      subject: userId,
      expiresIn: '20s',
    });

    return {
      token,
    };
  }
}
