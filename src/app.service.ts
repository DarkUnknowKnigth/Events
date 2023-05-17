import { Injectable } from '@nestjs/common';
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
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './guards/auth/dto/auth.dto';
import { errors } from './utils/errors';
import { constants } from './guards/auth/auth.constants';
import { ResetDto } from './guards/auth/dto/reset.dto';

@Injectable()
export class AppService {
  iv: Buffer = randomBytes(16);
  masterPassword: string;
  algorithm = 'aes-256-ctr';
  key: Buffer;
  cipher: Cipher;
  decipher: Decipher;
  constructor(
    @InjectRepository(User) private user: Repository<User>,
    private jwtService: JwtService,
  ) {
    this.masterPassword = constants.master;
  }
  version(): any {
    return {
      version: '1.0.0',
      author: 'Daniel Morales',
      contact: 'jose-daniel-97@hotmail.com',
      project: 'Automatización de eventos',
    };
  }
  async signUp(createUserDto: CreateUserDto): Promise<User | number> {
    const user = await this.user.findOneBy({ email: createUserDto.email });
    if (user) {
      return errors.USER_ALREADY_EXISTS;
    }
    createUserDto.password = await this.encrypt(createUserDto.password);
    return this.user.save(createUserDto);
  }
  private async encrypt(password): Promise<string> {
    this.key = (await promisify(scrypt)(
      this.masterPassword,
      'salt',
      32,
    )) as Buffer;
    this.cipher = createCipheriv(this.algorithm, this.key, this.iv);
    const encryptedPassword = Buffer.concat([
      this.cipher.update(password, 'utf-8'),
      this.cipher.final(),
    ]);
    return this.iv.toString('hex') + ':' + encryptedPassword.toString('hex');
  }
  async login(authDto: AuthDto): Promise<{ token: string } | number> {
    const user = await this.user.findOneBy({ email: authDto.email });
    if (!user) {
      return errors.NOT_FOUND;
    }
    this.key = (await promisify(scrypt)(
      this.masterPassword,
      'salt',
      32,
    )) as Buffer;
    const passwordParts = user.password.split(':');
    const savedIv = Buffer.from(passwordParts.shift(), 'hex');
    const encryptedPassword = Buffer.from(passwordParts.join(':'), 'hex');
    this.decipher = createDecipheriv(this.algorithm, this.key, savedIv);
    const decryptedPassword = Buffer.concat([
      this.decipher.update(Buffer.from(encryptedPassword)),
      this.decipher.final(),
    ]);
    if (decryptedPassword.toString() !== authDto.password) {
      return errors.UNAUTHORIZED;
    }
    const payload = { user };
    return { token: await this.jwtService.signAsync(payload) };
  }
  async reset(resetDto: ResetDto) {
    let user = await this.user.findOneBy({ email: resetDto.email });
    if (!user) {
      return errors.NOT_FOUND;
    }
    if (resetDto.password !== resetDto.confirmation) {
      return errors.PASSWORD_NOT_MATCH;
    }
    this.user.update(
      { id: user.id },
      { password: await this.encrypt(resetDto.password) },
    );
    user = await this.user.findOneBy({ id: user.id });
    const payload = { user };
    return { token: await this.jwtService.signAsync(payload) };
  }
}
