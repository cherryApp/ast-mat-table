import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/user';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-editable',
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.scss']
})
export class EditableComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  displayedColumns: string[] = [
    'id',
    'first_name',
    'last_name',
    'gender',
    'email',
    'address',
    'actions',
  ];
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
    console.log(user);
  }

  onDelete(user: User): void {
    this.userService.delete(user.id).toPromise().then(
      response => console.log(response),
      err => console.error(err)
    );
  }

}
