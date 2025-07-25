import { Inject, Injectable } from '@nestjs/common';
import { InvitationServiceI, InvitationI } from '@/shares';
import { ClassUserService } from '@/modules/ClassUser/services';
import { UserService } from '@/modules/User/services';
import { ClassUserServiceToken, UserServiceToken } from '@/shares';

@Injectable()
export class InvitationService implements InvitationServiceI {
  constructor(
    @Inject(ClassUserServiceToken)
    private classUserService: ClassUserService,

    @Inject(UserServiceToken)
    private userService: UserService,
  ) {}

  async invite(invitation: InvitationI) {
    // invitation.code === cls.code
    // create record in user_class table
    await this.classUserService.create(invitation);
    // valid: check userid, classId is valid
    // const user = await this.userService.find({id: invitation.userId})
  }
}
