import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FilesComponent} from "./components/files/files.component";
import {FileComponent} from "./components/file/file.component";

const routes: Routes = [{
  path: '', component: FilesComponent,
},
  {
    path: ':name', component: FileComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
