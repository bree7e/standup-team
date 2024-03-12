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
        [cdkDropListData]="todo"
        [cdkDropListConnectedTo]="[doneList]"
        class="list"
        (cdkDropListDropped)="drop($event)"
      >
        @for (item of todo; track item) {
        <div class="box" cdkDrag>
          <div>{{ item.name }}</div>
          <div class="position">{{ item.position }}</div>
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
        <div class="box" cdkDrag>
          <div>{{ item.name }}</div>
          <div class="position">{{ item.position }}</div>
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

      .box {
        padding: 10px 10px;
        border-bottom: solid 1px #ccc;
        color: rgba(0, 0, 0, 0.87);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        box-sizing: border-box;
        cursor: move;
        background: white;
        font-size: 14px;
      }

      .position {
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
    { position: 'Product owner', name: 'Иван Запольский' },
    { position: 'Delivery Manager', name: 'Ника Решанова' },
    { position: 'Системный аналитик', name: 'Алексей Кулёв' },
    { position: 'Продуктовый аналитик', name: 'Вадим Ус' },
    { position: 'Tech Lead', name: 'Александр Денщиков' },
    { position: 'Backend Developer', name: 'Александр Кравчук' },
    { position: 'Backend Developer', name: 'Захар Алёшкин' },
    { position: 'Backend Developer', name: 'Никита Шивинский' },
    { position: 'Frontend Lead', name: 'Александр Ветров' },
    { position: 'Frontend Developer', name: 'Владимир Ермолин' },
    { position: 'Frontend Developer', name: 'Денис Ситдиков' },
    { position: 'Frontend Developer', name: 'Сергей Тихонов' },
    { position: 'QA-лид', name: 'Евгений Питрук' },
    { position: 'QA-инженер', name: 'Виктория Гилль' },
    { position: 'QA-инженер', name: 'Юлия Мартынова' },
    { position: 'QA-инженер', name: 'Павел Парфёнов' },
    { position: 'DevOps инженер', name: 'Рустам Галимов' },
    { position: 'Математик', name: 'Алексей Кручинин' },
    { position: 'Технический писатель', name: 'Ксения Непомнящая' },
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
