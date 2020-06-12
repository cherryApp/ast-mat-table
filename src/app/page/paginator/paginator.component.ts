import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Unsub } from 'src/app/decorator/unsub.decorator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
@Unsub()
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
  sub;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.sub = this.userService.get().subscribe(
      users => {
        this.dataSource.data = (users as unknown as User[]);
      }
    );
    console.log(this.sub);
  }

}
