import { Component, OnInit, DoCheck, AfterViewChecked } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user';
import { Observable, interval } from 'rxjs';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit, DoCheck, AfterViewChecked {

  dataSource$: Observable<User | User[]> = this.userService.get();
  displayedColumns: string[] = [
    'id',
    'first_name',
    'last_name',
    'gender',
    'email',
    'address'
  ];
  filter = '';

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {}

  ngDoCheck() {
    // tslint:disable-next-line: no-console
    console.time('check');
  }

  ngAfterViewChecked() {
    // tslint:disable-next-line: no-console
    console.timeEnd('check');
  }

}
