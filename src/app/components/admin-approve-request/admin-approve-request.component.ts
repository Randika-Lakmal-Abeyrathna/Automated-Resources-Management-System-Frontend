import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AdminService } from 'src/app/service/admin.service';
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-admin-approve-request',
  templateUrl: './admin-approve-request.component.html',
  styleUrls: ['./admin-approve-request.component.css']
})
export class AdminApproveRequestComponent implements OnInit {

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
    requestedProvince:'',
    currentSchoolExperiance:''
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
          this.requestData.currentSchoolExperiance =this.calcDate(this.requestData.appointedDate);
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

 calcDate(date:string):string{
    /*
    * calcDate() : Calculates the difference between two dates
    * @date1 : "First Date in the format M-D-Y"
    * @date2 : "Second Date in the format M-D-Y"
    * return : Array
    */
    //Initiate date object
    const dt_date1 = new Date(date);
    const dt_date2= new Date();
    //Get the Timestamp
    var date1 =dt_date1.getTime();
    var date2 = dt_date2.getTime();
    
    var calc;
    //Check which timestamp is greater
    if (date1 < date2){
        calc = new Date(date2 - date1) ;

        //Retrieve the date, month and year
    var calcFormatTmp = calc.getDate() + '-' + (calc.getMonth()+1)+ '-'+calc.getFullYear();
    //Convert to an array and store
    var calcFormat = calcFormatTmp.split("-");
    //Subtract each member of our array from the default date
    var c0:number =parseInt(calcFormat[0]);
    var c1:number =parseInt(calcFormat[1]);
    var c2:number =parseInt(calcFormat[2]);
    var days_passed :number = Math.abs(c0) - 1;
    var months_passed = Math.abs(c1) - 1;
    var years_passed = Math.abs(c2 -   1970);
    
    //Set up custom text
    const yrsTxt =["year", "years"];
    const mnthsTxt = ["month", "months"];
    const daysTxt = ["day", "days"]; 
    
    //Convert to days and sum together
    var total_days = (years_passed * 365) + (months_passed * 30.417) + days_passed;
    
    //display result with custom text
    const result = ((years_passed == 1) ? years_passed+ ' '+ yrsTxt[0] + ' ' : (years_passed > 1 )  ? 
    years_passed+ ' ' + yrsTxt[1] + ' ' : '') + 
    ((months_passed == 1) ? months_passed+ ' ' + mnthsTxt[0] :  (months_passed > 1) ? 
     months_passed+ ' ' + mnthsTxt[1] + ' ' : '') +
    ((days_passed == 1) ? days_passed+ ' ' + daysTxt[0] : (days_passed > 1) ? 
    days_passed+ ' ' + daysTxt[1] : '' );

    console.log("Apointed Dates ==> " ,result);
    return result;
    }else{
      console.log("Invalid Date");
      return "";
    }
    
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
                return this.router.navigateByUrl("/admin");
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
                return this.router.navigateByUrl("/admin");
              }, 1000);

            },
            error=>{
              console.log(error);
            }
          );
  }

}
