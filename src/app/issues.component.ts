import { Component, OnInit } from '@angular/core';

import { Issue }        from './model/issue.model';
import { IssueService } from './issues.service';

import { PullRequest } from './model/pull-request.model';
import { User }        from './model/user.model';
import { Label }       from './model/label.model';
import { Milestone }   from './model/milestone.model';

@Component({
  selector: 'my-issues',
  template: `
    <h1>{{title}}</h1>
    <ul class="issues">
        <li *ngFor="let issue of issues"
            (click)="onSelect(issue)">
            <my-issue-card [issue]="issue"></my-issue-card>
        </li>
    </ul>
    `,
    styles: [`
        .issues {
            list-style-type: none;
        }
        .issues li {
            max-width: 90vw;
            padding: 10px;
            padding-left: 10px;
            margin-bottom: 15px;
            background-color: #fafafa;
            border-left: solid 4px #00bcd4;
            box-shadow: 2px 2px 1px #999;
            border-top: 1px solid #eee;
        }
    `],
    providers: [IssueService]
})
export class IssuesComponent implements OnInit {
    title = 'AngularJS Issues';
    issues: Issue[] = [];
    selectedIssue: Issue;

    constructor(private issueService: IssueService)
    {}

    onSelect(issue: Issue): void {
        this.selectedIssue = issue;
    }

    getIssues(page: number = 1): void {
        this.issueService.getIssues(page)
            .then(response => {
                if (response.length) {
                    this.getIssues(++page);
                }
                this.issues = this.issues.concat(response);
            });
    }

    ngOnInit(): void {
        // this.getMockIssues();
        this.getIssues();
    }

    getMockIssues(): void {
        this.issues = [
            this.getMockIssue(),
            this.getMockIssue(),
            this.getMockIssue(),
            this.getMockIssue(),
            this.getMockIssue(),
            this.getMockIssue(),
            this.getMockIssue(),
            this.getMockIssue(),
            this.getMockIssue(),
            this.getMockIssue()
        ];
    }

    getMockIssue(): Issue {
        let data: Issue = {
            id: 1,
            url: "https://api.github.com/repos/octocat/Hello-World/issues/1347",
            repository_url: "https://api.github.com/repos/octocat/Hello-World",
            labels_url: "https://api.github.com/repos/octocat/Hello-World/issues/1347/labels{/name}",
            comments_url: "https://api.github.com/repos/octocat/Hello-World/issues/1347/comments",
            events_url: "https://api.github.com/repos/octocat/Hello-World/issues/1347/events",
            html_url: "https://github.com/octocat/Hello-World/issues/1347",
            number: 1347,
            state: "open",
            title: "Found a bug",
            body: "**I'm submitting a ...**  (check one with \"x\")\n\n```\n[ ] bug report\n[X] feature request\n[ ] support request => Please do not submit support request here, instead see https://github.com/angular/angular/blob/master/CONTRIBUTING.md#question\n```\n\n**Current behavior**\n\nIf I define a module fully, with it's own routes and components and then apply that module as a child of a module intended to be the parent module, the routes still act independently.\n\nExample\n\nAdminModule\n     Admin Component (has router-outlet)\n     SetupComponent\n     UserModule \n         UserComponent (has router-outlet)\n         NewUserComponent\n\nSetup URL is /admin/setup and outputs in the admin component router-outlet (good) \nNew User URL is /user/new-user and it outputs in the User components router-outlet which ends up the main app-component router-outlet instead of the admin component. (bad)\n\n**Expected/desired behavior**\nIn the example above, the desire would be that my route would be /admin/user/new-user and that the user component would load in the router-outlet of the  admin component, rather than on it's own.\n\nBasically, I want to be able to navigate to components of child modules as though they were defined as child routes of the parent modules routing configuration.  Prior to moving my app to modules, I would just stack route definitions and import the child routes (with children of their own) in the higher level route configs. I realize I could expand my definition of modules, making the user components part of the admin module, but for separation I'd rather not do that.\n\n**Reproduction of the problem**\nIf the current behavior is a bug or you can illustrate your feature request better with an example, please provide the steps to reproduce and if possible a minimal demo of the problem via https://plnkr.co or similar (you can use this template as a starting point: http://plnkr.co/edit/tpl:AvJOMERrnz94ekVua0u5).\n\n**What is the expected behavior?**\nI'm not sure what the expected behavior is, I'm assuming that the way it acts is correct according to the current design of the routing and module systems.\n\n**What is the motivation / use case for changing the behavior?**\n\nMy application is intended to be a composition of multiple modules. Each of those modules is intended to be able to stand on it's own, as they are re-used in other sibling applications in different ways. That said, once composed, the routes and outlets should make reasonably good sense to both the end users and developers. I shouldn't have to change the definitions of my modules to get them to stack appropriately.\n\n**Please tell us about your environment:**\n- **Angular version:** 2.0.0-rc.5 (Router 3.0.0-RC.1)\n- **Browser:** [Chrome XX | Firefox XX | IE XX ] \n- **Language:** [TypeScript 1.8.10] \n",
            user: {
                login: "octocat",
                id: 1,
                avatar_url: "https://github.com/images/error/octocat_happy.gif",
                gravatar_id: "",
                url: "https://api.github.com/users/octocat",
                html_url: "https://github.com/octocat",
                followers_url: "https://api.github.com/users/octocat/followers",
                following_url: "https://api.github.com/users/octocat/following{/other_user}",
                gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
                starred_url: "https://api.github.com/users/octocat/starred{/owner}{/repo}",
                subscriptions_url: "https://api.github.com/users/octocat/subscriptions",
                organizations_url: "https://api.github.com/users/octocat/orgs",
                repos_url: "https://api.github.com/users/octocat/repos",
                events_url: "https://api.github.com/users/octocat/events{/privacy}",
                received_events_url: "https://api.github.com/users/octocat/received_events",
                type: "User",
                site_admin: false
            },
            labels: [
                {
                    id: 208045946,
                    url: "https://api.github.com/repos/octocat/Hello-World/labels/bug",
                    name: "bug",
                    color: "f29513",
                    default: true
                }
            ],
            assignee: {
                login: "octocat",
                id: 1,
                avatar_url: "https://github.com/images/error/octocat_happy.gif",
                gravatar_id: "",
                url: "https://api.github.com/users/octocat",
                html_url: "https://github.com/octocat",
                followers_url: "https://api.github.com/users/octocat/followers",
                following_url: "https://api.github.com/users/octocat/following{/other_user}",
                gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
                starred_url: "https://api.github.com/users/octocat/starred{/owner}{/repo}",
                subscriptions_url: "https://api.github.com/users/octocat/subscriptions",
                organizations_url: "https://api.github.com/users/octocat/orgs",
                repos_url: "https://api.github.com/users/octocat/repos",
                events_url: "https://api.github.com/users/octocat/events{/privacy}",
                received_events_url: "https://api.github.com/users/octocat/received_events",
                type: "User",
                site_admin: false
            },
            milestone: {
                url: "https://api.github.com/repos/octocat/Hello-World/milestones/1",
                html_url: "https://github.com/octocat/Hello-World/milestones/v1.0",
                labels_url: "https://api.github.com/repos/octocat/Hello-World/milestones/1/labels",
                id: 1002604,
                number: 1,
                state: "open",
                title: "v1.0",
                description: "Tracking milestone for version 1.0",
                creator: {
                    login: "octocat",
                    id: 1,
                    avatar_url: "https://github.com/images/error/octocat_happy.gif",
                    gravatar_id: "",
                    url: "https://api.github.com/users/octocat",
                    html_url: "https://github.com/octocat",
                    followers_url: "https://api.github.com/users/octocat/followers",
                    following_url: "https://api.github.com/users/octocat/following{/other_user}",
                    gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
                    starred_url: "https://api.github.com/users/octocat/starred{/owner}{/repo}",
                    subscriptions_url: "https://api.github.com/users/octocat/subscriptions",
                    organizations_url: "https://api.github.com/users/octocat/orgs",
                    repos_url: "https://api.github.com/users/octocat/repos",
                    events_url: "https://api.github.com/users/octocat/events{/privacy}",
                    received_events_url: "https://api.github.com/users/octocat/received_events",
                    type: "User",
                    site_admin: false
                },
                open_issues: 4,
                closed_issues: 8,
                created_at: new Date(),
                updated_at: new Date(),
                closed_at: new Date(),
                due_on: new Date()
            } as Milestone,
            locked: false,
            comments: 0,
            pull_request: {
                url: "https://api.github.com/repos/octocat/Hello-World/pulls/1347",
                html_url: "https://github.com/octocat/Hello-World/pull/1347",
                diff_url: "https://github.com/octocat/Hello-World/pull/1347.diff",
                patch_url: "https://github.com/octocat/Hello-World/pull/1347.patch"
            } as PullRequest,
            closed_at: null,
            created_at: new Date(),
            updated_at: new Date()
        } as Issue;
        return data;
    }

}

// display title, body, user login, and assignee login
