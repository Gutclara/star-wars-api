import {
    Entity, Column, PrimaryGeneratedColumn, ManyToMany, 
    BaseEntity, JoinTable
  } from 'typeorm';
  
  // import {Planet} from "./Planet"
  @Entity()
  export class Characters extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    height: string;

    @Column()
    weight: string;

    @Column()
    hair_color: string;
  
    @Column()
    skin_color: string;
  
    @Column()
    eye_color: string;
  
    @Column()
    date_of_birth: string;

    @Column()
    gender: string;

    @Column()
    description: string;

    @Column()
    img_url: string;
    
    // @ManyToMany(() => Planet)
    // @JoinTable()
    // planets: Planet[];
    
  }