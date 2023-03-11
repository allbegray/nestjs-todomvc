import { Injectable } from '@nestjs/common';
import { Todo } from './todo';

@Injectable()
export class TodoService {
  findAll(): Array<Todo> {
    return [new Todo('제목1'), new Todo('제목2')];
  }
}
