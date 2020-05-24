import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tarefas } from './tarefas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public taskForm: FormGroup;
  public lista: Array<Tarefas> = [];

  constructor(private formBuilder: FormBuilder) { }

  adicionar(): void {
    if (!this.taskForm.value.task) {
      return;
    }

    const novaTarefa = { checkbox: false, tarefa: this.taskForm.value.task };
    this.lista.push(novaTarefa);
    this.taskForm.reset();
  }

  itemConcluido(index): void {
    this.lista.splice(index, 1);
    console.log('lista', this.lista);
  }


  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      task: ['']
    });
  }

}
