import { Module } from '@nestjs/common';
import { InvitationService } from './services';
import { InvitationController } from './controllers';
import { UserModule } from '@/modules/User/module';
import { ClassModule } from '@/modules/Class/module';
import { ClassUserModule } from '@/modules/ClassUser/module';
import { InvitationServiceToken } from '@/shares';

@Module({
  imports: [ClassUserModule, ClassModule, UserModule],
  controllers: [InvitationController],
  providers: [
    {
      provide: InvitationServiceToken,
      useClass: InvitationService,
    },
  ],
})
export class InvitationModule {}
