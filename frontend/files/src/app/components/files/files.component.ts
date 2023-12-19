import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

type File = {
  name: string
  isFolder: boolean
}

type FilesResponse = {
  filename: string,
  fileType: "DIRECTORY" | "FILE"
}[]

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  files: File[] = []

  constructor(private _http: HttpClient,
              private router: Router) {
  }

  ngOnInit(): void {
    this._http.get<FilesResponse>("http://localhost:8080/files").subscribe(_files => {
      // this.files = _files;
      console.log(_files)
      _files.forEach(_file => {
        this.files.push({
          name: _file.filename,
          isFolder: _file.fileType == 'DIRECTORY'
        })
      })
    })
  }

  showFile(file: File) {
    if (file.isFolder) return;
    this.router.navigateByUrl(`/${file.name}`);
  }
}
