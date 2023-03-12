import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoForm } from './form/TodoForm';
import { Todo } from '@prisma/client';
import { PageForm } from '../common/PageForm';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  list(@Query() pageForm: PageForm): Promise<Todo[]> {
    const page = pageForm.page ? pageForm.page : 1;
    const limit = pageForm.limit ? pageForm.limit : 5;
    return this.todoService.findAll({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  @Post()
  add(@Body() form: TodoForm): Promise<Todo> {
    return this.todoService.add(form);
  }

  @Post(':id/done')
  done(@Param('id', new ParseIntPipe()) id: number): Promise<Todo> {
    return this.todoService.update({
      where: { id },
      data: { isDone: true },
    });
  }

  @Post(':id/undone')
  undone(@Param('id', new ParseIntPipe()) id: number): Promise<Todo> {
    return this.todoService.update({
      where: { id },
      data: { isDone: false },
    });
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
