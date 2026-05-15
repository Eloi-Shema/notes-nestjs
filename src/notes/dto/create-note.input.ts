import { Field, InputType } from "@nestjs/graphql";
import { IsString, MaxLength, MinLength } from "class-validator";

@InputType()
export class CreateNoteInput {
  @Field()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  title!: string;

  @Field()
  @IsString()
  @MinLength(1)
  content!: string;
}
