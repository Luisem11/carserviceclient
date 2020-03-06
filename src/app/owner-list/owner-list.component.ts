import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OwnerService } from '../shared/owner/owner.service';
import { CarService } from '../shared/car/car.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  cars: Array<any>;  
  owners: Array<any>;
  selectedOptions: Array<any>;
  sub: Subscription;
  href: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private carService: CarService, 
    private ownerService: OwnerService) { }

  ngOnInit() {    
    this.ownerService.getAll().subscribe(data => {
      this.owners = data._embedded.owners;
    });
    this.carService.getAll().subscribe(data => {
      this.cars = data;
    });
  }
  
  gotoList() {
    this.router.navigate(['/car-list']);
  }

  remove() {
    
    for (const dni of this.selectedOptions){ 
      this.ownerService.get(dni).subscribe(res => {
        this.href = res['_embedded'].owners[0]._links.self.href;
        this.ownerService.remove(this.href).subscribe(result => {}, error => console.error(error));
        for( const car of this.cars){
          if( car.ownerDni == dni){
            car.ownerDni = null;
            this.carService.get(car.id).subscribe((res: any) => {
              car.href = res._links.self.href;
              this.carService.save(car).subscribe(result => {
                this.gotoList();
              }, error => console.error(error));
            });
          }
        }
      });
    }
  }
}
