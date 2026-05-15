import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "./Entities/user.entity";
import { UsersService } from "./users.service";
import { CreateUserInput } from "src/dto/create-user.input";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args("input") input: CreateUserInput): Promise<User> {
    return this.usersService.createUser(input);
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: User): Promise<User | null> {
    return this.usersService.findById(user.id);
  }
}
