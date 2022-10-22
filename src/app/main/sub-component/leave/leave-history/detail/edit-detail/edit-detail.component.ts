import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-detail',
    templateUrl: './edit-detail.component.html',
    styleUrls: ['./edit-detail.component.css']
})
export class EditDetailComponent implements OnInit {

    constructor(private router: ActivatedRoute) { }

    id: string = ""

    ngOnInit() {
        this.id = this.router.snapshot.params['id'];
    }

}
