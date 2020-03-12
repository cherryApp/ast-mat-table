import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/user';
import { Subscription, BehaviorSubject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from 'src/app/service/user.service';

interface IColumn {
  key: string;
  title: string;
  disabled?: boolean;
  controlType?: 'input' | 'select' | 'textarea';
  type?: string;
  options?: {value: any, text: string}[];
  editable?: boolean;
}

@Component({
  selector: 'app-inline-editor',
  templateUrl: './inline-editor.component.html',
  styleUrls: ['./inline-editor.component.scss']
})
export class InlineEditorComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  columnList: IColumn[] = [
    {key: 'id', title: 'Id', disabled: true},
    {key: 'first_name', title: 'First name'},
    {key: 'last_name', title: 'Last name'},
    {key: 'gender', title: 'Gender', controlType: 'select',
      options: [{value: 'Male', text: 'Male'}, {value: 'Female', text: 'Female'}]},
    {key: 'email', title: 'Email'},
    {key: 'address', title: 'Address'},
    {key: 'actions', title: 'Actions'},
  ];
  displayedColumns: string[] = this.columnList.map( col => col.key );
  pageSizes: number[] = [5, 10, 25, 100];
  dataSubscription: Subscription;

  currentFilterKey: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private userService: UserService,
  ) { }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSubscription = this.userService.watcher$.subscribe(
      users => {
        this.dataSource.data = (users as unknown as User[]);
      }
    );
    this.userService.refresh();

    this.dataSource.filterPredicate = (data: User, filter: string) => {
      const key = this.currentFilterKey || '';
      const source = key ? String(data[key]) : JSON.stringify(data);
      return source.toLowerCase().includes(filter.toLowerCase());
    };
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  onEdit(user: User): void {
    if (user.editable) {
      delete user.editable;
      this.userService.update(user.id, user).toPromise().then(
        response => console.log(response),
        err => console.error(err)
      );
    } else {
      user.editable = true;
    }
  }

  onDelete(user: User): void {
    this.userService.delete(user.id).toPromise().then(
      response => console.log(response),
      err => console.error(err)
    );
  }

}
