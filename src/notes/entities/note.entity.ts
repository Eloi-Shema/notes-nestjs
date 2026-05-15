import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/Entities/user.entity";

@ObjectType()
export class Note {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field()
  content!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field()
  userId!: string;

  @Field(() => User, { nullable: true })
  user?: User;
}
