import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Podcast } from './podcast';
import { DemoService } from './services/demo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'apollo-client-angular';
  podcasts:Podcast[]=[];
  myform:FormGroup;
  editId = null;

  constructor(private demoService:DemoService,private fb:FormBuilder){}


  ngOnInit(){
    this.initForm()
    this.getPodcasts()
  }

  getPodcasts(){
    this.demoService.getPodcasts().subscribe((res:any)=>{
      console.log(res.data,"res");
      this.podcasts = res.data?.podcasts
    })
  }

  initForm(){
     this.myform = this.fb.group({
        name:[null,Validators.required],
        url:[null,Validators.required]
     })
  }

  savePodcast(){
    if(this.editId){
      this.demoService.updatePodcast(this.editId,this.myform.value).subscribe((res:any)=>{
        this.getPodcasts()
       })
    }else{
      // const payload 
      this.demoService.savePodcast(this.myform.value).subscribe((res:any)=>{
        this.getPodcasts()
       })
    }
    this.myform.reset();
    this.editId = null;
  }


  editPodcast(item){
     this.myform.controls.name.setValue(item.name);
     this.myform.controls.url.setValue(item.url);
     this.editId = item.id;
  }

  deletePodcast(item){
     this.podcasts = this.podcasts.filter(ele=> {return ele.id!==item.id})
     this.demoService.deletePodcast(item.id).subscribe(res=>{
     })
  }
}
