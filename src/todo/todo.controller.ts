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
import { TodoForm } from './form/TodoForm';
import { Todo } from '@prisma/client';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {
  }

  @Get()
  list(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Post()
  add(@Body() form: TodoForm): Promise<Todo> {
    return this.todoService.add(form);
  }

  @Put(':id')
  edit(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() form: TodoForm,
  ): Promise<Todo> {
    return this.todoService.update({
      where: { id },
      data: { ...form },
    });
  }

  @Get(':id')
  get(@Param('id', new ParseIntPipe()) id: number): Promise<Todo> {
    return this.todoService.todo({ id });
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number): Promise<Todo> {
    return this.todoService.delete({ id });
  }
}
