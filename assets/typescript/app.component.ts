import {Component} from 'angular2/core';

interface Artists {
    name: string;
    age: number;
    school: string;
}

@Component({
    selector: 'my-app',
    styleUrls: [],
    directives: [],
    template: `
        <h1>Hello {{name}}</h1>
    `
})

export class AppComponent {
    name = 'royboy789';

}