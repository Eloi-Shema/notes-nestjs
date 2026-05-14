import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string;

  @Field()
  email!: string;

  @Field()
  username!: string;

  // No field decorator for password to avoid exposing it in GraphQL schema
  password!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
