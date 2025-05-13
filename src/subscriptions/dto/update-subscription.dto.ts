import { ApiProperty } from "@nestjs/swagger";

export class UpdateSubscriptionDto {
    @ApiProperty()
    subscriberId: string;

    @ApiProperty()
    targetUserId: string;
}