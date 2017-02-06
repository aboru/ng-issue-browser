import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule }    from '@angular/http';

import { AppComponent }       from './app.component';
import { IssueCardComponent } from './issue-card.component'
import { IssuesComponent }    from './issues.component';
import { IssueService }       from './issues.service';
import { MarkdownService }    from './markdown.service';

@NgModule({
  imports:      [
      BrowserModule,
      FormsModule,
      HttpModule,
      RouterModule.forRoot([
          {
              path: 'issues',
              component: IssuesComponent
          },
          {
              path: '',
              redirectTo: '/issues',
              pathMatch: 'full'
          }
      ])
  ],
  declarations: [
      AppComponent,
      IssueCardComponent,
      IssuesComponent
  ],
  providers: [
      IssueService,
      MarkdownService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
