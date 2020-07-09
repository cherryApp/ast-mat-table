import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ThemeService } from 'src/app/service/theme.service';
import { Option } from 'src/app/model/option';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input() options: Array<Option> = this.config.themeOptions;

  constructor(
    private config: ConfigService,
    private themeService: ThemeService,
  ) {}

  ngOnInit() {
    this.themeService.setTheme(this.options[0].value);
  }

  changeTheme(themeToSet: string) {
    this.themeService.setTheme(themeToSet);
  }

}
