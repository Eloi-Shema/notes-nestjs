import { Module, Global } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Global() // available everywhere, no re-importing needed
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
