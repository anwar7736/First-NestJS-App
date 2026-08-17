import { User } from "src/auth/entities/user.entity";
import { Column, CreateDateColumn, Entity, ForeignKey, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('posts')
export class Post{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column({ default: true })
    status: boolean;

    @CreateDateColumn() // Automatically captures when the user record is created
    created_at: Date;

    @UpdateDateColumn() // Automatically tracks when the user record is updated
    updated_at: Date;

    // 2. Define the relational Object
    // @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
    // @JoinColumn({ name: 'user_id' }) // Maps the relation to the explicit column above
    // user: User;
}