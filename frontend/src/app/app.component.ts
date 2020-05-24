import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Tarefas } from './tarefas';
import { MatDialog } from '@angular/material/dialog';
import { ExcluirComponent } from './excluir/excluir.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public taskForm: FormGroup;
  public lista: Array<Tarefas> = [];
  public tarefas = true;
  public tarefasFeitas: Array<Tarefas> = [];

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) { }

  adicionar(): void {
    if (!this.taskForm.value.task) {
      return;
    }

    const novaTarefa = { checkbox: false, tarefa: this.taskForm.value.task };
    this.lista.push(novaTarefa);
    this.taskForm.reset();
  }

  itemConcluido(index): void {

    const finalizada = { checkbox: true, tarefa: this.lista[index].tarefa };
    this.tarefasFeitas.push(finalizada);
    this.lista.splice(index, 1);

    // console.log('lista', this.lista);
  }

  aba(): void {
    this.tarefas = !this.tarefas;
  }

  openDialog(index): void {
    console.log('entrou', index);

    const dialogRef = this.dialog.open(ExcluirComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.tarefasFeitas.splice(index, 1);
      }
      console.log('Resultado', this.tarefasFeitas);
    });

  }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      task: ['']
    });
  }
}
