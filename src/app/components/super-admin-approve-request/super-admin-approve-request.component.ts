import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-super-admin-approve-request',
  templateUrl: './super-admin-approve-request.component.html',
  styleUrls: ['./super-admin-approve-request.component.css']
})
export class SuperAdminApproveRequestComponent implements OnInit {

  id: any | null;

  requestData ={
    id:0,
    nic:'',
    name:'',
    contactNumber:'',
    teacherType:'',
    email:'',
    comment:'',
    currentSchool:'',
    appointedDate:'',
    currentProvince:'',
    requestedSchool:'',
    requestedProvince:''
  }

  subjects:Array<any>=[];
  suggestedSchools:Array<any>=[];

  approveRequest ={
    date:'',
    requestId:0,
    carderId:0
  }

  rejectRequestData={
    comment:''
  }
  constructor(private _Activatedroute:ActivatedRoute,private adminService:AdminService,private toast:ToastrService,
    private router:Router) { }

  ngOnInit(): void {

    this._Activatedroute.paramMap.subscribe(params => { 
      console.log(params);
       this.id = params.get('id'); 
       console.log(this.id);
       this.getDetailsById(this.id);
       this.getSuggestionForRequest(this.id);
      this.approveRequest.requestId=this.id;
   });
  }

  getDetailsById(id:number){
    this.adminService.getRequestById(id)
      .pipe(first())
      .subscribe(
        (data:any)=>{
          console.log("request Data => ",data.body);
          this.requestData.id=data.body.idrequest;
          this.requestData.nic = data.body.teacher.user.nic;
          this.requestData.name = data.body.teacher.user.firstName +' '+ data.body.teacher.user.lastName;
          this.requestData.contactNumber = data.body.teacher.user.contactNumber1;
          this.requestData.teacherType = data.body.teacher.teacherType.type;
          this.requestData.email = data.body.teacher.user.email;
          this.requestData.comment = data.body.comment;
          this.requestData.currentSchool = data.body.teacher.school.name;
          this.requestData.appointedDate = data.body.teacher.appointmentdate;

          for(let i =0; i<data.body.teacher.subjects.length;i++){
            let subject = data.body.teacher.subjects[i];
            let subjectName =subject.name +' - '+subject.description;
            
            this.subjects.push(subjectName);
          }
          this.requestData.currentProvince = data.body.teacher.school.city.district.province.name;
          this.requestData.requestedSchool = data.body.school.name;
          this.requestData.requestedProvince = data.body.province.name;
          

        },
       error=>{
          console.log(error);
        }
      );
  }

  getSuggestionForRequest(requestId:number){

    this.adminService.getSuggestionForRequest(requestId)
      .pipe(first())
      .subscribe(
        (data:any)=>{
          console.log("Suggest Data => ",data.body);
          for(let i =0; i< data.body.length;i++ ){
            let s = data.body[i];
            console.log(s);
            
            let suggest = {
              schoolid:s.idcarder,
              schoolName:s.school.name,
              schoolType:s.school.schoolType.type,
              slot: s.limitation-s.current,
              subject:s.subjects.name +' - '+ s.subjects.description
            }

            this.suggestedSchools.push(suggest);

          }

          console.log("All Schools =>",this.suggestedSchools);

        },
       error=>{
          console.log(error);
        }
      );

  }

  ApproveSelectedSchool(data:any,carderid:number){
      this.approveRequest.carderId=carderid;
      this.approveRequest.date = data.date;

      let is_valid = true;

     if ( this.approveRequest.date == null ||  this.approveRequest.date ==''){
      is_valid= false;
      this.toast.error("Appointment Date Cannot be Empty","Error",{timeOut: 3000});
    }

    console.log(this.approveRequest);

    if (is_valid){

      this.adminService.approveRequest(this.approveRequest)
          .subscribe(
            (data:any)=>{
              this.toast.success("Transfer Request is Approved","Success",{timeOut: 3000});
              setTimeout(()=>{
                return this.router.navigateByUrl("/superadmin");
              }, 1000);

            },
            error=>{
              console.log(error);
            }
          );

    }
       
  }

  rejectRequest(data:any,id:number){

    let requestData ={
      id:id,
      comment:data.comment
    }
    
    this.adminService.rejectRequest(requestData)
          .subscribe(
            (data:any)=>{
              this.toast.success("Transfer Request is Rejected","Success",{timeOut: 3000});
              setTimeout(()=>{
                return this.router.navigateByUrl("/superadmin");
              }, 1000);

            },
            error=>{
              console.log(error);
            }
          );
  }

}
