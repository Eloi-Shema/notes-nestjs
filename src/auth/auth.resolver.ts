import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AuthResolver {
  @Query(() => String)
  authHealthCheck(): string {
    return 'Auth module is healthy!';
  }
}
