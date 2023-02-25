import { Pipe, PipeTransform } from '@angular/core';
import { ListDepartmentComponent } from './list-department.component';

@Pipe({
    name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

    transform(value: any, args: any): any {
        if (!value) return null;
        if (!args) return value;

        args = args.toLowerCase();

        return value.filter(function (data:any) {
            return String(data.dept_name_en).toLowerCase().includes(args);
        });
    }

}
