import FamilyMember from "@modules/FamilyMember/typeorm/entities/FamilyMember";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("spents")
export default class Spent{
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column()
    family_member_id:string;

    @ManyToOne(()=>FamilyMember)
    @JoinColumn({name:"family_member_id"})
    family_member:FamilyMember
    @Column()
    title:string
    @Column()
    category:string
    @Column()
    value:number
    @Column()
    date:Date
    @Column()
    description:string
    @CreateDateColumn()
    created_at:Date
    @UpdateDateColumn()
    updated_at:Date
}