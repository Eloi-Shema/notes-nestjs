import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateNoteInput } from "./dto/create-note.input";
import { title } from "process";
import { UpdateNoteInput } from "./dto/update-note.input";
import { not } from "supertest/lib/cookies";

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async createNote(input: CreateNoteInput, userId: string) {
    return this.prisma.note.create({
      data: {
        title: input.title,
        content: input.content,
        userId,
      },
    });
  }

  async myNotes(userId: string) {
    return this.prisma.note.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async note(id: string, userId: string) {
    const note = await this.prisma.note.findUnique({
      where: { id },
    });

    if (!note) throw new NotFoundException("Note not found");

    // User can only access their own notes
    if (note.userId !== userId) throw new ForbiddenException("Access denied");

    return note;
  }

  async updateNote(input: UpdateNoteInput, userId: string) {
    await this.note(input.id, userId);

    return this.prisma.note.update({
      where: { id: input.id },
      data: {
        ...(input.title && { title: input.title }),
        ...(input.content && { title: input.content }),
      },
    });
  }

  async deleteNote(id: string, userId: string) {
    await this.note(id, userId);

    await this.prisma.note.delete({
      where: { id },
    });

    return true;
  }
}
