import { Component, Input } from '@angular/core';

import { Issue }           from './model/issue.model';
import { MarkdownService } from './markdown.service';

@Component({
    selector: 'my-issue-card',
    template: `
        <div class="issue-card">
            <small class="issue-number">{{issue.number}}</small>
            <a href="#" target="_blank"><h3 class="issue-title">{{issue.title}}</h3></a>
            <hr />
            <div class="issue-body" [innerHTML]="parse(issue.body)"></div>
            <hr />
            <div class="issue-footer">
                <div class="issue-users">
                    <span>
                        <label>Reporter: </label>
                        <a href="{{issue.user.html_url}}" target="_blank">{{issue.user.login}}</a>
                    </span>
                    <br/>
                    <span>
                        <label>Assignee: </label>
                        <span *ngIf="issue.assignee">
                            <a href="{{issue.assignee.html_url}}" target="_blank">{{issue.assignee.login}}</a>
                        </span>
                        <span *ngIf="!issue.assignee">None</span>
                    </span>
                </div>
                <div class="issue-label-attachments">
                    <small class="issue-label"
                        *ngFor="let label of issue.labels"
                        [style.backgroundColor]="'#' + label.color">
                        {{label.name}}
                    </small>
                </div>
            </div>
        </div>
    `,
    styles: [`
        a {
            text-decoration: none;
        }
        .issue-card {
            position: relative;
            top: 0;
            font-family: "Trebuchet MS", Helvetica, sans-serif;
        }
        .issue-body {
            font-size: 14px;
            word-wrap: normal;
            white-space: normal;
            margin-bottom: 15px;
            cursor: default !important;
        }
        .issue-body /deep/ pre {
            display: block;
            overflow: auto;
            padding: 10px;
            margin-left: 15px;
            margin-right: 15px;
            background-color: #eee;
            border-radius: 3px;
        }
        .issue-number {
            padding: 3px;
            background-color: #eee;
            color: #555;
            border-radius: 10px;
            font-weight: bold;
            font-family: Arial, Helvetica, sans-serif;
            cursor: default;
        }
        .issue-title {
            cursor: pointer;
            color: #333;
            text-decoration: none;
        }
        .issue-title:hover {
            color: #124679;
        }
        .issue-card > hr {
            border: 1px solid #ddd;
        }
        .issue-footer {
            min-height: 2.5em;
        }
        .issue-users {
            float: left;

        }
        .issue-users > span {
            font-size: 14px;
            color: #222;
        }
        .issue-users > span a {
            cursor: pointer;
            color: #222;
        }
        .issue-users > span a:hover {
            color: #124679;
        }
        .issue-label-attachments {
            float: right;
        }
        .issue-label {
            margin-right: 3px;
            padding: 2px 5px;
            cursor: default;
            border-radius: 1px;
        }
    `],
    providers: [MarkdownService]
})
export class IssueCardComponent {
    @Input()
    issue: Issue;

    constructor(private markdownService: MarkdownService)
    {}

    parse(): string {
        return this.markdownService.parse(this.issue.body);
    }
}
