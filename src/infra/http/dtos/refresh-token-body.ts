import { IsNotEmpty, IsUUID } from 'class-validator';

export class RefreshTokenBody {
  @IsNotEmpty()
  @IsUUID()
  refresh_token: string;
}
