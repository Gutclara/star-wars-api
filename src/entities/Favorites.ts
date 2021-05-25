import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, 
    BaseEntity, JoinTable
  } from 'typeorm';

  import {Users} from "./Users"
  import {Characters} from "./Characters"
  import {Planets} from "./Planets"
  
  // import {Planet} from "./Planet"
  @Entity()
  export class Favorites extends BaseEntity{
  
    @PrimaryGeneratedColumn()
    id: number;
  
   @ManyToOne(() => Users, user => user.id)
   userid: Users;

   @OneToOne(() => Characters)
   @JoinColumn()
   character: Characters;

   @OneToOne(() => Planets)
   @JoinColumn()
   planet: Planets;

    
    // @ManyToMany(() => Planet)
    // @JoinTable()
    // planets: Planet[];
    
  }