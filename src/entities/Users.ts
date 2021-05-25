import {
    Entity, Column, PrimaryGeneratedColumn, OneToMany, 
    BaseEntity, JoinTable
  } from 'typeorm';
import { Favorites } from './Favorites';
  
  // import {Planet} from "./Planet"
  @Entity()
  export class Users extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({unique: true})
    username: string;
  
    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    last_name: string;
  
    @Column({unique: true})
    email: string;
  
    @OneToMany(() => Favorites, favorites => favorites.id)
    favorites: Favorites[];
    
  
    // @ManyToMany(() => Planet)
    // @JoinTable()
    // planets: Planet[];
    
  }