import { User } from './user.model';

export class Milestone {
    id: number;
    number: number;
    title: string;
    state: string;
    description: string;
    open_issues: number;
    closed_issues: number;
    created_at: Date;
    updated_at: Date;
    closed_at: Date;
    due_on: Date;
    labels_url: string;
    html_url: string;
    url: string;
    creator: User;
}
