import { Component, OnInit } from '@angular/core';
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

const localStorageKey = 'zmeb-standup-team-holiday';

@Component({
  selector: 'standup-team-welcome',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag],
  template: `
    <div class="container">
      <div
        cdkDropList
        #todoList="cdkDropList"
        class="list"
        [cdkDropListData]="todo"
        [cdkDropListConnectedTo]="[doneList]"
        (cdkDropListDropped)="drop($event)"
      >
        @for (item of todo; track item.name; let index = $index) {
        <div class="person" cdkDrag>
          <div class="person__side" [style.background-color]="item.color"></div>
          <div class="person__name" (dblclick)="moveToDone(index)">
            {{ item.name }}
            <span class="person__index">{{ index + 1 }}</span>
          </div>
        </div>
        }
      </div>
    </div>

    <div class="container">
      <div
        cdkDropList
        #doneList="cdkDropList"
        [cdkDropListData]="done"
        [cdkDropListConnectedTo]="[todoList]"
        class="list"
        (cdkDropListDropped)="drop($event)"
      >
        @for (item of done; track item.name) {
        <div class="person" cdkDrag>
          <div class="person__side" [style.background-color]="item.color"></div>
          <div class="person__name" (dblclick)="toggleHoliday(item)">
            {{ item.name }}
            <span *ngIf="holidayNameList.has(item.name)" class="person__holiday"
              >🌴</span
            >
          </div>
        </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        width: 300px;
        max-width: 100%;
        margin: 0 25px 25px 0;
        display: inline-block;
        vertical-align: top;
      }

      .list {
        border: solid 1px #ccc;
        min-height: 80px;
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

      .person__name {
        display: flex;
      }

      .person__position {
        color: grey;
        margin-left: 4px;
      }

      .person__holiday {
        margin-left: auto;
      }

      .person__index {
        color: grey;
        margin-left: auto;
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
export class StandupComponent implements OnInit {
  todo: StandupPerson[] = [
    { color: '#c13f2f', position: 'Manager', name: 'Александр Анисимов' },
    { color: '#ec9827', position: 'QA Lead', name: 'Владислав Образцов' },
    { color: '#ec9827', position: 'QA Engineer', name: 'Александр Ястребов' },
    { color: '#ec9827', position: 'QA Engineer', name: 'Валентин Елезов' },
    { color: '#ec9827', position: 'QA Engineer', name: 'Евгений Кульков' },
    { color: '#ec9827', position: 'QA Engineer', name: 'Кирилл Тихомиров' },
    { color: '#ec9827', position: 'QA Engineer', name: 'Сергей Скроботов' },
    { color: '#ec9827', position: 'QA Engineer', name: 'Владимир Митиенко' },
    {
      color: '#436cee',
      position: 'Backend Lead',
      name: 'Андрей Федотов',
    },
    {
      color: '#436cee',
      position: 'Backend Developer',
      name: 'Александр Кравчук',
    },
    {
      color: '#436cee',
      position: 'Backend Developer',
      name: 'Станислав Найденый',
    },
    {
      color: '#436cee',
      position: 'Backend Developer',
      name: 'Никита Шивинский',
    },
    {
      color: '#436cee',
      position: 'Backend Developer',
      name: 'Евгений Исаев',
    },
    {
      color: '#436cee',
      position: 'Backend Developer',
      name: 'Андрей Пучков',
    },
    {
      color: '#436cee',
      position: 'Backend Developer',
      name: 'Михаил Шаховалов',
    },
    { color: '#498714', position: 'Frontend Lead', name: 'Александр Ветров' },
    {
      color: '#498714',
      position: 'Frontend Developer',
      name: 'Денис Ситдиков',
    },
    {
      color: '#498714',
      position: 'Frontend Developer',
      name: 'Дмитрий Пичугин',
    },
    {
      color: '#498714',
      position: 'Frontend Developer',
      name: 'Александр Фёдоров',
    },
    { color: '#a56eff', position: 'Математик', name: 'Алексей Кручинин' },
    {
      color: '#6e778c',
      position: 'Функциональный архитектор',
      name: 'Светлана Гареева',
    },
    {
      color: '#6e778c',
      position: 'Системный аналитик ',
      name: 'Алексей Кулёв',
    },
    {
      color: '#6e778c',
      position: 'Бизнес аналитик ',
      name: 'Максим Небера',
    },
    {
      color: '#6e778c',
      position: 'Системный аналитик',
      name: 'Артём Митенев',
    },
    {
      color: '#6e778c',
      position: 'Системный аналитик',
      name: 'Дмитрий Мельников',
    },
    {
      color: '#6e778c',
      position: 'Системный аналитик',
      name: 'Алексей Рузанов',
    },
    { color: '#6e778c', position: 'UX дизайнер', name: 'Алина Мерушкина' },
    {
      color: '#a56eff',
      position: 'Технический писатель',
      name: 'Татьяна Колоколова',
    },
    { color: '#a56eff', position: 'DevOps инженер', name: 'Рустам Галимов' },
    { color: '#c13f2f', position: 'Product Owner', name: 'Сергей Балашов' },
  ];

  done: StandupPerson[] = [];

  holidayNameList = new Set<string>();

  ngOnInit(): void {
    this.loadFromStorage();
    this.moveFromHolidayToDone();
  }

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

  toggleHoliday(person: StandupPerson): void {
    if (this.holidayNameList.has(person.name)) {
      this.holidayNameList.delete(person.name);
    } else {
      this.holidayNameList.add(person.name);
    }
    this.saveToStorage();
  }

  moveToDone(index: number): void {
    transferArrayItem(this.todo, this.done, index, 0);
  }

  moveFromHolidayToDone(): void {
    this.todo.slice().forEach((person) => {
      if (this.holidayNameList.has(person.name)) {
        const index = this.todo.findIndex((p) => p.name === person.name);
        transferArrayItem(this.todo, this.done, index, 0);
      }
    });
  }

  saveToStorage(): void {
    localStorage.setItem(
      localStorageKey,
      JSON.stringify(Array.from(this.holidayNameList))
    );
  }

  loadFromStorage(): void {
    const savedHoliday = localStorage.getItem(localStorageKey);
    if (savedHoliday !== null)
      try {
        const list = JSON.parse(savedHoliday) as string[];
        this.holidayNameList = new Set(list);
      } catch (error) {
        console.warn(savedHoliday);
      }
  }
}
