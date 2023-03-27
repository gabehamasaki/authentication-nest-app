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
    const token = sign(
      {
        userId: userId,
      },
      process.env.PRIVATE_KEY,
      {
        subject: userId,
        audience: process.env.API_URL,
        expiresIn: '1h',
      },
    );

    return {
      token,
    };
  }
}
