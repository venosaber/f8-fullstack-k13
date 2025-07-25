import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InvitationReq } from './dtos';
import { InvitationServiceI, InvitationServiceToken } from '@/shares';
// import { TeacherResI } from '@/shares';

@ApiTags('Invitation')
@Controller('/invitation')
export class InvitationController {
  // dependency injection
  constructor(
    @Inject(InvitationServiceToken)
    private invitationService: InvitationServiceI,
  ) {}

  @Post()
  invite(@Body() invitation: InvitationReq) {
    return this.invitationService.invite(invitation);
  }
}
