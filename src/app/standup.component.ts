import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

interface StandupPerson {
  color: string;
  name: string;
  position: string;
}

@Component({
  selector: 'standup-team-welcome',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag],
  template: `
    <div class="container">
      <h2>To do</h2>

      <div
        cdkDropList
        #todoList="cdkDropList"
        class="list"
        [cdkDropListData]="todo"
        [cdkDropListConnectedTo]="[doneList]"
        (cdkDropListDropped)="drop($event)"
      >
        @for (item of todo; track item) {
        <div class="person" cdkDrag>
          <div class="person__side" [style.background-color]="item.color"></div>
          <div class="person__name">{{ item.name }}</div>
          <div class="person__position">{{ item.position }}</div>
        </div>
        }
      </div>
    </div>

    <div class="container">
      <h2>Done</h2>

      <div
        cdkDropList
        #doneList="cdkDropList"
        [cdkDropListData]="done"
        [cdkDropListConnectedTo]="[todoList]"
        class="list"
        (cdkDropListDropped)="drop($event)"
      >
        @for (item of done; track item) {
        <div class="person" cdkDrag>
          <div class="person__side" [style.background-color]="item.color"></div>
          <div class="person__name">{{ item.name }}</div>
        </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        width: 400px;
        max-width: 100%;
        margin: 0 25px 25px 0;
        display: inline-block;
        vertical-align: top;
      }

      .list {
        border: solid 1px #ccc;
        min-height: 60px;
        background: white;
        border-radius: 4px;
        overflow: hidden;
        display: block;
      }

      .person {
        padding: 10px 10px;
        border-bottom: solid 1px #ccc;
        color: rgba(0, 0, 0, 0.87);

        display: grid;
        column-gap: 8px;
        grid-template-columns: 8px auto;
        grid-template-rows: auto auto;

        box-sizing: border-box;
        cursor: move;
        background: white;
        font-size: 14px;
      }

      .person__side {
        display: block;
        width: 8px;
        border-radius: 4px;
        grid-row: span 2;
        margin-right: 16px;
      }

      .person__position {
        color: grey;
      }

      .cdk-drag-preview {
        box-sizing: border-box;
        border-radius: 4px;
        box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
          0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
      }

      .cdk-drag-placeholder {
        opacity: 0;
      }

      .cdk-drag-animating {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }

      .box:last-child {
        border: none;
      }

      .list.cdk-drop-list-dragging .box:not(.cdk-drag-placeholder) {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
})
export class StandupComponent {
  todo: StandupPerson[] = [
    { color: '#c13f2f', position: 'Product owner', name: 'Иван Запольский' },
    { color: '#c13f2f', position: 'Delivery Manager', name: 'Ника Решанова' },
    { color: '#6e778c', position: 'Системный аналитик', name: 'Алексей Кулёв' },
    {
      color: '#6e778c',
      position: 'Системный аналитик',
      name: 'Олег Колношенко',
    },
    { color: '#6e778c', position: 'Продуктовый аналитик', name: 'Вадим Ус' },
    { color: '#436cee', position: 'Tech Lead', name: 'Александр Денщиков' },
    {
      color: '#436cee',
      position: 'Backend Developer',
      name: 'Александр Кравчук',
    },
    { color: '#436cee', position: 'Backend Developer', name: 'Захар Алёшкин' },
    {
      color: '#436cee',
      position: 'Backend Developer',
      name: 'Никита Шивинский',
    },
    { color: '#498714', position: 'Frontend Lead', name: 'Александр Ветров' },
    {
      color: '#498714',
      position: 'Frontend Developer',
      name: 'Владимир Ермолин',
    },
    {
      color: '#498714',
      position: 'Frontend Developer',
      name: 'Денис Ситдиков',
    },
    {
      color: '#498714',
      position: 'Frontend Developer',
      name: 'Сергей Тихонов',
    },
    { color: '#ec9827', position: 'QA-лид', name: 'Евгений Питрук' },
    { color: '#ec9827', position: 'QA-инженер', name: 'Виктория Гилль' },
    { color: '#ec9827', position: 'QA-инженер', name: 'Юлия Мартынова' },
    { color: '#ec9827', position: 'QA-инженер', name: 'Павел Парфёнов' },
    { color: '#f3f4f5', position: 'DevOps инженер', name: 'Рустам Галимов' },
    { color: '#f3f4f5', position: 'Математик', name: 'Алексей Кручинин' },
    {
      color: '#f3f4f5',
      position: 'Технический писатель',
      name: 'Ксения Непомнящая',
    },
  ];

  done: StandupPerson[] = [];

  drop(event: CdkDragDrop<StandupPerson[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
