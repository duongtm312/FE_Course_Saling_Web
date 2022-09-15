import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ScriptService} from "../../script.service";
import {LoginService} from "../../auth/service/login.service";
import {Router} from "@angular/router";
import {CourceService} from "../../user/service/cource.service";
import {data} from "jquery";
import {Course} from "../../model/Course";
import {AdminInstructorService} from "../../admin/service/admin-instructor.service";
import {Instructor} from "../../model/Instructor";

@Component({
  selector: 'app-showhome',
  templateUrl: './showhome.component.html',
  styleUrls: ['./showhome.component.css']
})
export class ShowhomeComponent implements OnInit, OnChanges {
  course: Course[] = []
  instructors: Instructor[] = []
  courseNew: any

  constructor(private script: ScriptService, private loginService: LoginService, private router: Router, private courseService: CourceService, private instructorService: AdminInstructorService) {
  }

  ngOnInit(): void {
    this.courseService.getCourseNew().subscribe((data) => {
      this.courseNew = data
    })
    this.courseService.getTrendingCourse().subscribe((data) => {
      this.course = data
      this.instructorService.getAllUser().subscribe((data) => {
        this.instructors = data
        this.script.load('functions','tiny-slider', 'glightbox', 'purecounter_vanilla').then(data => {
        }).catch(error => console.log(error));
      })
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.script.load('bootstrap').then(data => {
    }).catch(error => console.log(error));
  }
  counter(s: number) {
    return new Array(s);
  }

}
