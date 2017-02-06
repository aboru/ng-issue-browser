import { Injectable } from '@angular/core';
import * as marked    from 'marked';

@Injectable()
export class MarkdownService {

    private parser: MarkedStatic;

    constructor()
    {
        this.parser = marked;
    }

    parse(markdown: string): string {
        return this.parser.parse(markdown);
    }

}
