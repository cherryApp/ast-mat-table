import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Material modules.
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './common/nav/nav.component';
import { HomeComponent } from './page/home/home.component';
import { BasicComponent } from './page/basic/basic.component';
import { PaginatorComponent } from './page/paginator/paginator.component';
import { FilterComponent } from './page/filter/filter.component';
import { EditableComponent } from './page/editable/editable.component';
import { InlineEditorComponent } from './page/inline-editor/inline-editor.component';
import { CellEditorComponent } from './common/cell-editor/cell-editor.component';
import { UserEditorComponent } from './page/user-editor/user-editor.component';
import { Async2Pipe } from './pipe/async2.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    BasicComponent,
    PaginatorComponent,
    FilterComponent,
    EditableComponent,
    InlineEditorComponent,
    CellEditorComponent,
    UserEditorComponent,
    Async2Pipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
