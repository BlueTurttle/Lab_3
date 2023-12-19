import { Component, OnInit } from '@angular/core';
import {switchMap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  content: string = ""
  constructor(
    private route: ActivatedRoute,
    private _http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params =>
        this._http.get(`http://localhost:8080/files/${params.get('name')}`,
        { responseType: 'text' }))
    ).subscribe(content => {
      this.content = content
    });
  }

}
