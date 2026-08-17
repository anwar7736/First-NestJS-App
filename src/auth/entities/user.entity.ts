import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    phone: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    photo: string;

    @Column({ default: true })
    status: boolean;


    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;


}