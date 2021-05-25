import {
    Entity, Column, PrimaryGeneratedColumn, ManyToMany, 
    BaseEntity, JoinTable
  } from 'typeorm';
  
  // import {Planet} from "./Planet"
  @Entity()
  export class Planets extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    diameter: string;

    @Column()
    rotation_period: string;

    @Column()
    orbital_period: string;
  
    @Column()
    gravity: string;
  
    @Column()
    weather: string;
  
    @Column()
    land: string;

    @Column()
    water_on_surface: string;

    @Column()
    img_url: string;
    
    // @ManyToMany(() => Planet)
    // @JoinTable()
    // planets: Planet[];
    
  }