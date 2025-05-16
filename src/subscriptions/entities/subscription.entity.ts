import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { BaseEntity } from 'src/shared/base.entity';

@Entity({ name: 'subscription' })
export class SubscriptionEntity extends BaseEntity {
  @Column({
    name: 'subscriber_id',
    type: 'uuid'
  })
  subscriberId: string;

  @ManyToOne(() => UserEntity, user => user.subscriptions)
  @JoinColumn({ name: 'subscriber_id' })
  subscriber: UserEntity;

  @Column({
    name: 'target_user_id',
    type: 'uuid'
  })
  targetUserId: string;

  @ManyToOne(() => UserEntity, user => user.subscribers)
  @JoinColumn({ name: 'target_user_id' })
  targetUser: UserEntity;
}