import { IsNotEmpty } from 'class-validator';

export class TodoForm {
  @IsNotEmpty()
  title: string;
}
