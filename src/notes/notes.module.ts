import { Module } from "@nestjs/common";
import { NotesService } from "./notes.service";
import { NotesResolver } from "./notes.resolver";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [AuthModule],
  providers: [NotesService, NotesResolver],
})
export class NotesModule {}
