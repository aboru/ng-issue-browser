import { User }        from './user.model';
import { Label }       from './label.model';
import { Milestone }   from './milestone.model';
import { PullRequest } from './pull-request.model';

export class Issue {
    id: number;
    title: string;
    body: string;
    number: number;
    state: string;
    comments: number;
    locked: boolean;
    closed_at: Date;
    created_at: Date;
    updated_at: Date;
    user: User;
    assignee: User;
    html_url: string;
    url: string;
    repository_url: string;
    labels_url: string;
    comments_url: string;
    events_url: string;
    labels: Label[];
    pull_request: PullRequest;
    milestone: Milestone;
}
