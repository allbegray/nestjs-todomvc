import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo';
import { TodoForm } from './form/TodoForm';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  list(): Array<Todo> {
    return this.todoService.findAll();
  }

  @Post()
  add(@Body() form: TodoForm): Todo {
    return this.todoService.add(form);
  }

  @Put(':id')
  edit(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() form: TodoForm,
  ): Todo {
    return this.todoService.update(id, form);
  }

  @Get(':id')
  get(@Param('id', new ParseIntPipe()) id: number): Todo {
    return this.todoService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    this.todoService.deleteById(id);
  }
}
