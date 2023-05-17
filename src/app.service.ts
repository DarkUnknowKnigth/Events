import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './api/user/entities/user.entity';
import { Repository } from 'typeorm';
import {
  Cipher,
  Decipher,
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scrypt,
} from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from './api/user/dto/create-user.dto';

@Injectable()
export class AppService {
  iv: Buffer = randomBytes(16);
  masterPassword = 'KNIGHT-97';
  algorithm = 'aes-256-ctr';
  key: Buffer;
  cipher: Cipher;
  decipher: Decipher;
  constructor(@InjectRepository(User) private user: Repository<User>) {}
  version(): any {
    return {
      version: '1.0.0',
      author: 'Daniel Morales',
      contacto: 'jose-daniel-97@hotmail.com',
      project: 'Automatización de eventos',
    };
  }
  async signUp(createUserDto: CreateUserDto): Promise<User | undefined> {
    const user = await this.user.findOneBy({ email: createUserDto.email });
    if (user) {
      throw new NotFoundException({
        message: 'User already exists',
        email: createUserDto.email,
      });
    }
    this.key = (await promisify(scrypt)(
      this.masterPassword,
      'salt',
      32,
    )) as Buffer;
    this.cipher = createCipheriv(this.algorithm, this.key, this.iv);
    const encryptedPassword = Buffer.concat([
      this.cipher.update(createUserDto.password),
      this.cipher.final(),
    ]).toString();
    createUserDto.password = encryptedPassword;
    return this.user.save(createUserDto);
  }
  async login(email: string, password: string) {
    const user = await this.user.findOneBy({ email });
    if (!user) {
      throw new NotFoundException({
        message: 'User dosen´t exists',
        email: email,
      });
    }
    this.decipher = createDecipheriv(this.algorithm, this.key, this.iv);
    const decryptedPassword = Buffer.concat([
      this.decipher.update(Buffer.from(user.password)),
      this.decipher.final(),
    ]).toString();
    if (decryptedPassword !== password) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
