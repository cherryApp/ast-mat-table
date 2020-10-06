import { AfterViewChecked, Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit, DoCheck, AfterViewChecked {

  dataSource$: User[] = (this.userService.get() as unknown as User[]);
  displayedColumns: string[] = [
    'id',
    'first_name',
    'last_name',
    'gender',
    'email',
    'address'
  ];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
  }

  ngDoCheck(): void {
    // tslint:disable: no-console
    console.time('check');
  }

  ngAfterViewChecked(): void {
    console.timeEnd('check');
  }

}
