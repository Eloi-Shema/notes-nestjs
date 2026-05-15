import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Note } from "./entities/note.entity";
import { NotesService } from "./notes.service";
import { CreateNoteInput } from "./dto/create-note.input";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { User } from "src/users/Entities/user.entity";
import { UpdateNoteInput } from "./dto/update-note.input";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Resolver(() => Note)
@UseGuards(JwtAuthGuard)
export class NotesResolver {
  constructor(private notesService: NotesService) {}

  @Mutation(() => Note)
  async createNote(
    @Args("input") input: CreateNoteInput,
    @CurrentUser() user: User,
  ): Promise<Note> {
    return this.notesService.createNote(input, user.id);
  }

  @Query(() => [Note])
  async myNotes(@CurrentUser() user: User): Promise<Note[]> {
    return this.notesService.myNotes(user.id);
  }

  @Query(() => Note)
  async note(@Args("id") id: string, @CurrentUser() user: User): Promise<Note> {
    return this.notesService.note(id, user.id);
  }

  @Mutation(() => Note)
  async updateNote(
    @Args("input") input: UpdateNoteInput,
    @CurrentUser() user: User,
  ): Promise<Note> {
    return this.notesService.updateNote(input, user.id);
  }

  @Mutation(() => Boolean)
  async deleteNote(
    @Args("id") id: string,
    @CurrentUser() user: User,
  ): Promise<Boolean> {
    return this.notesService.deleteNote(id, user.id);
  }
}
