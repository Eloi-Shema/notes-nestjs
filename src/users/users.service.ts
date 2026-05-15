import { ConflictException, Injectable } from "@nestjs/common";
import { CreateUserInput } from "src/dto/create-user.input";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(input: CreateUserInput) {
    // Check if email exists
    const existingEmail = await this.prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existingEmail) {
      throw new ConflictException("Email already exists");
    }

    // Check if username exists
    const existingUsername = await this.prisma.user.findUnique({
      where: {
        username: input.username,
      },
    });

    if (existingUsername) {
      throw new ConflictException("Username already taken");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(input.password, 10);

    // create user
    return this.prisma.user.create({
      data: {
        email: input.email,
        username: input.username,
        password: hashedPassword,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
