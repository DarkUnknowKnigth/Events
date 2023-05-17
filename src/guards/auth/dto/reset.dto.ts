import { IsNotEmpty } from 'class-validator';
export class ResetDto {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  confirmation: string;
  @IsNotEmpty()
  code: number;
}
