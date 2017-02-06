import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Issue }  from './model/issue.model';

@Injectable()
export class IssueService {

    private angularIssuesUrl = 'https://api.github.com/repos/angular/angular/issues';

    constructor(private http: Http)
    {}

    getIssues(page: number): Promise<Issue[]> {
        let url = this.angularIssuesUrl + '?since=' + this.getPastDate(7);
        let content = this.getPage(url, page);

        console.log(content);

        return Promise.resolve(content);
    }

    private getPastDate(daysAgo: number): string {
        let today = new Date();
        let target = new Date(today.getTime() - (daysAgo * 24 * 60 * 60 * 1000));

        let result = '';
        result += target.getFullYear();
        result += '-' + (target.getMonth() < 9 ? '0' : '') + (target.getMonth() + 1);
        result += '-' + (target.getDate() < 9 ? '0' : '') + (target.getDate() + 1);
        result += 'T00:00:00Z';

        return result;
    }

    private getPage(url: string, page: number): Promise<Issue[]> {
        return this.http.get(url + '&page=' + page)
            .toPromise()
            .then(response => response.json() as Issue[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('an error occurred', error);
        return Promise.reject(error.message || error);
    }
}
