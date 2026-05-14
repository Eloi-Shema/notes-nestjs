import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/Entities/user.entity';

@ObjectType()
export class AuthPayload {
  @Field()
  token!: string;

  @Field()
  user!: User;
}
