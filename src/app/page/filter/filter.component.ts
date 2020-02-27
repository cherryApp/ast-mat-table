import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/user';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  displayedColumns: string[] = [
    'id',
    'first_name',
    'last_name',
    'gender',
    'email',
    'address'
  ];
  pageSizes: number[] = [5, 10, 25, 100];
  dataSubscription: Subscription;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSubscription = this.userService.get().subscribe(
      users => {
        this.dataSource.data = (users as unknown as User[]);
      }
    );
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

}
