import { Injectable } from '@angular/core';
import { ProfileService } from '../profile.service';

@Injectable({
  providedIn: 'root'
})
export class ChartPersonalService {

constructor(private profileService: ProfileService) { }

}
