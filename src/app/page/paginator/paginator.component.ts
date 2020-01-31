import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

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

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.userService.get().subscribe(
      users => {
        this.dataSource.data = (users as unknown as User[]);
      }
    );
  }

}
