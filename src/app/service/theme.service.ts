import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Option } from '../model/option';
import { StyleManagerService } from './style-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor(
    private http: HttpClient,
    private styleManager: StyleManagerService
  ) {}

  setTheme(themeToSet) {
    this.styleManager.setStyle(
      'theme',
      `assets/prebuilt-themes/${themeToSet}.css`
    );
  }
}
