import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GiphyService } from '../shared/giphy/giphy.service';
import { NgForm } from '@angular/forms';
import { OwnerService } from '../shared/owner/owner.service';
import { CarService } from '../shared/car/car.service';

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css']
})
export class OwnerEditComponent implements OnInit {
  owner: any = {};
  sub: Subscription; 
  cars: Array<any>;  

  constructor(private route: ActivatedRoute,
    private router: Router,
    private ownerService: OwnerService,
    private carService: CarService, 
    private giphyService: GiphyService) {
}

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      const dni = params['dni'];
      if (dni) {        
        this.ownerService.get(dni).subscribe(res => {
          this.owner = res['_embedded'].owners[0];     
          if (this.owner) {
            this.owner.href = this.owner._links.self.href; 
          } else {
            console.log(`Ownner with dni '${dni}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }
  save(form: NgForm) {
    this.ownerService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
  gotoList() {
    this.router.navigate(['/owner-list']);
  }

  remove(dni) {
    this.ownerService.get(dni).subscribe(res => {
      this.ownerService.remove(res['_embedded'].owners[0]._links.self.href).subscribe(result => {       
      }, error => console.error(error)); 
      this.carService.getAll().subscribe(data => {
        this.cars = data;
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
    });
  }
  
}
