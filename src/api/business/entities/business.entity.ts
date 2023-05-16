import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Business {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  logo: string;
  @Column({ type: 'time' })
  open: string;
  @Column({ type: 'time' })
  close: string;
  @Column()
  whatsapp: number;
  @Column()
  phone: number;
  @Column({ default: null })
  instagram: string;
  @Column({ default: null })
  facebook: string;
  @Column({ default: null })
  twitter: string;
  @Column({ default: null })
  tiktok: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
