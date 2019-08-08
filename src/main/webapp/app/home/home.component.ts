import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { Item } from './../model/item';
import { LoginModalService, AccountService, Account } from 'app/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
  disabled = false;
  compact = true;
  invertX = false;
  invertY = false;
  newItem: Item = new Item();
  account: Account;
  nameCard: string;
  modalRef: NgbModalRef;
  new = [];
  id: number = 4;
  lists: Item[] = [];
  connectedTo = [];
  formActive: boolean;
  form: FormGroup;
  divs: number[] = [];
  createDiv(): void {
    this.newItem = new Item();
    this.divs.push(this.divs.length);
    this.newItem.id = 'list-' + this.id;
    this.newItem.list.length = 0;
    //this.lists.push('id','list-4');
    this.lists.push(this.newItem);
    this.connectedTo.push('list-' + this.id);
    this.id = this.id + 1;
    console.log(this.lists);
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
  constructor(
    private _formBuilder: FormBuilder,
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private eventManager: JhiEventManager
  ) {
    this.lists = [
      {
        id: 'list-1',
        list: ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep']
      },
      {
        id: 'list-2',
        list: ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog']
      },
      {
        id: 'list-3',
        list: ['Take bath', 'Wash car']
      }
    ];
    for (let list of this.lists) {
      this.connectedTo.push(list.id);
    }
  }
  ngOnInit() {
    this.accountService.identity().then((account: Account) => {
      this.account = account;
    });
    this.registerAuthenticationSuccess();
  }
  registerAuthenticationSuccess() {
    this.eventManager.subscribe('authenticationSuccess', message => {
      this.accountService.identity().then(account => {
        this.account = account;
      });
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }
  openForm(index): void {
    console.log(index);
    this.form = this._formBuilder.group({
      name: ['']
    });
    this.formActive = true;
    this.focusNameField();
  }

  /**
   * Close form
   */
  closeForm(): void {
    this.formActive = false;
  }
  focusNameField(): void {
    setTimeout(() => {});
  }
  addCard(index) {
    console.log(index);
    for (let list of this.lists) {
      if (list.id == index) {
        list.list.push(this.nameCard);
        this.nameCard = '';
      }
    }
  }
}
