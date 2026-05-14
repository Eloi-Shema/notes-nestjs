import { Query, Resolver } from '@nestjs/graphql';
import { Note } from './entities/note.entity';

@Resolver(() => Note)
export class NotesResolver {
  @Query(() => String)
  notesHealthCheck(): string {
    return 'Notes module is healthy!';
  }
}
