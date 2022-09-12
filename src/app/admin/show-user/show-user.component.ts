import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AppUser} from "../../model/AppUser";
import {UserProfileService} from "../../user/service/user-profile.service";
import {ScriptService} from "../../script.service";

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit,OnChanges {
  appUsers: AppUser[]=[]
  // page!: Page
  p: any;
  form: any;
  profileUser:any
  page: any;


  constructor(private userProfileService: UserProfileService,private script:ScriptService) { }

  ngOnInit(): void {
    this.userProfileService.getProfiles(this.page).subscribe((data)=>{
      this.appUsers=data
      console.log(data)
    })
  }
  setInst(appUser: AppUser) {
    this.profileUser = appUser
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.script.load('bootstrap', 'tiny-slider', 'glightbox', 'purecounter_vanilla', 'functions').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }

  disableUser(idUser: number){
    this.userProfileService.disableUser(idUser).subscribe(()=>{
      this.userProfileService.getProfiles(this.page).subscribe((data)=>{
        this.page = data
        this.appUsers=this.page.content
        this.userProfileService.getProfiles(this.page).subscribe((data)=>{
          this.appUsers=data
          console.log(data)
        })
     })
    })

  }


  activatedUser(idUser: number){
    this.userProfileService.activatedUser(idUser).subscribe(()=>{
      this.userProfileService.getProfiles(this.page).subscribe((data) => {
        this.page = data
        this.appUsers = this.page.content
        this.userProfileService.getProfiles(this.page).subscribe((data)=>{
          this.appUsers=data
          console.log(data)
        })
      })
    })
  }
  search(input: any) {
    this.userProfileService.getProfiles(this.page).subscribe((data) => {
      let usersSearch:AppUser[]=[]
      for (const d of data) {
        if (d.fullName.toLowerCase().normalize('NFD') .replace(/[\u0300-\u036f]/g, '')
          .replace(/đ/g, 'd').replace(/Đ/g, 'D').includes(input.toLowerCase().normalize('NFD') .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D'))){
          usersSearch.push(d)
        }
      }
      console.log(usersSearch)
      this.appUsers=usersSearch;
    })
  }

}