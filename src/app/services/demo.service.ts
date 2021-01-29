import { Injectable } from '@angular/core';
import { Apollo,gql } from "apollo-angular";

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  constructor(private apollo :Apollo) { }

  getPodcasts(){
   const query = gql`
      {
        podcasts{
          id
          name
          url
        }
      }
    `
     return this.apollo.watchQuery({
        query:query
      }).valueChanges
  }

  savePodcast(data){
    console.log(data);
    
    const payload =  gql`
    mutation createPodcast($name:String!,$url:String!){
        createPodcast(input:{
          name:$name,
          url:$url
        }){
          id
          name
          url
        }
      }
    `;
     return this.apollo.mutate({
       mutation:payload,
       variables:{
          name: data.name,
          url: data.url
       }
     })
  }

  deletePodcast(id){
    console.log(id);
    
    const deletePayload =  gql`
    mutation deletePodcast($id:ID!){
      deletePodcast(id:$id){
        id
      }
    }
    `;
     return this.apollo.mutate({
       mutation:deletePayload,
       variables:{
          id: id
       }
     })
  }

  updatePodcast(id,data){
    const updatePayload =  gql`
      mutation updatePodcast($id:ID!,$name:String!,$url:String!){
        updatePodcast(
            id:$id,
            input:{
            name:$name,
            url:$url
          }){
            id,
            name,
            url
          }
        }
    `;

    return this.apollo.mutate({
      mutation:updatePayload,
      variables:{
         id: id,
         name: data.name,
         url:data.url
      }
    })
  }
}
