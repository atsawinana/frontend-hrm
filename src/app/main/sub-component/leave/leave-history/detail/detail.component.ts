import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

    constructor(private route: ActivatedRoute,private router: Router) { }

    id: string = ""
    textLeave: string = ""
    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
    }

    async Modalinput() {
        Swal.fire({
            title: 'กรุณากรอกเหตุผลยกเลิกการลา',
            text: 'เหตุผลยกเลิกการลา',
            input: 'textarea',
            showCancelButton: true,
            preConfirm: (value) => {
                if (!value) {
                    Swal.showValidationMessage(
                        '<div>โปรดระบุเหตผล</div>'
                    )
                }
                else {
                    this.textLeave = value
                    Swal.fire({
                        icon: 'success',
                        title: `ยกเลิกการลาสำเร็จ`,
                        text: '*กรุณารออนุมัติยกเลิกการลาจากหัวหน้า',
                        showConfirmButton: true,
                    }).then((e) => {
                        this.router.navigate(['/main/leave/history']);
                    })
                }
            }
        })
    }
}
