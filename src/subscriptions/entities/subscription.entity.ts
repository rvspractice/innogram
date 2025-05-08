import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User, user => user.subscriptions)
  @JoinColumn({ name: 'subscriber_id' })
  subscriber: User;

  @ManyToOne(() => User, user => user.subscribers)
  @JoinColumn({ name: 'target_user_id' })
  targetUser: User;
}