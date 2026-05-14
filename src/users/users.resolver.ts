import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './Entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserInput } from 'src/dto/create-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.usersService.createUser(input);
  }

  @Query(() => String)
  usersHealthCheck(): string {
    return 'Users module is alive';
  }
}
