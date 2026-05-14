import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginInput } from './dto/login.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(input: LoginInput) {
    // Find user by email
    const user = await this.usersService.findByEmail(input.email);

    if (!user) throw new UnauthorizedException('Ivalid credentials');

    // Compare password with hashed one in DB
    const isPasswordValid = await bcrypt.compare(input.password, user.password);

    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    // Sign the JWT token
    const token = await this.jwtService.sign({
      sub: user.id, // subject, standard JWT claim for user id
      email: user.email,
    });

    return { token, user };
  }
}
