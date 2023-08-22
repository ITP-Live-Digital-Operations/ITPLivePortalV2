"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[592],{1921:(y,h,a)=>{a.d(h,{M:()=>l});var r=a(5516),t=a(5879),e=a(1474);class l{constructor(s){this.http=s,this.taskApiURL=r.N.apiUrl+"/v1/tasks"}createTask(s){return this.http.post(`${this.taskApiURL}/createTask`,s)}getUnfinishedTasks(s){return this.http.get(`${this.taskApiURL}/getUnfinishedTasks/${s}`)}getMyTasks(s){return this.http.get(`${this.taskApiURL}/getMyTasks/${s}`)}updateStatus(s){return this.http.post(`${this.taskApiURL}/updateStatus`,s)}getUsersAndTaskWeights(){return this.http.get(`${this.taskApiURL}/getUsersAndTaskWeights`)}getTaskByBriefId(s){return this.http.get(`${this.taskApiURL}/getTaskByBriefId/${s}`)}deactivateTask(s){return this.http.get(`${this.taskApiURL}/deactivateTask/${s}`)}activateTask(s){return this.http.get(`${this.taskApiURL}/activateTask/${s}`)}updateStatusToComplete(s){return this.http.post(`${this.taskApiURL}/updateStatusToComplete`,s)}updateProgress(s,g){return this.http.post(`${this.taskApiURL}/updateProgress/${s}`,g)}}l.\u0275fac=function(s){return new(s||l)(t.LFG(e.eN))},l.\u0275prov=t.Yz7({token:l,factory:l.\u0275fac,providedIn:"root"})},488:(y,h,a)=>{a.d(h,{l:()=>n});var r=a(6223),t=a(9347),e=a(5879),l=a(5650),p=a(9229),s=a(9287),g=a(4995),_=a(9647),d=a(7237),u=a(2296);class n{constructor(i,o,m,f,b){this.formBuilder=i,this.service=o,this.source=m,this.dialogRef=f,this.toastrService=b,this.isCelebrity=!1,this.initializeElements(),this.GetInfluencerData(this.source.id)}initializeElements(){this.editCelebrityForm=this.formBuilder.group({generalInfo:this.formBuilder.group({Name:["",[r.kI.required]],Gender:["",[r.kI.required]],Number:[""],Email:["",[r.kI.email]],MainContentLanguage:[""],MainVertical:[""],Occupation:[""],ItpRelationship:[""],Nationality:[""],CountryLocation:[""],CityLocation:[""],Address:[""]}),socials:this.formBuilder.group({InstagramHandle:["",[r.kI.required]],InstagramFollowers:[""],InstagramLink:[""],TiktokHandle:[""],TiktokFollowers:[""],TiktokLink:[""],SnapchatHandle:[""],SnapchatFollowers:[""],SnapchatLink:[""],TwitterHandle:[""],TwitterFollowers:[""],TwitterLink:[""],FacebookHandle:[""],FacebookFollowers:[""],FacebookLink:[""],YoutubeHandle:[""],YoutubeFollowers:[""],YoutubeLink:[""],TwitchHandle:[""],TwitchFollowers:[""],TwitchLink:[""]}),agencyInfo:this.formBuilder.group({Agency:[""],AgencyContactPerson:[""],AgencyNumber:[""],AgencyEmail:["",[r.kI.email]],PreviouslyWorkedWith:[""]}),extraInfo:this.formBuilder.group({PreviousBrands:[""],Bio:[""],Notes:[""],Rating:[""]})})}GetInfluencerData(i){this.service.getCelebrity(i).subscribe(o=>{this.celebrityData=o,null!=this.celebrityData.data&&this.editCelebrityForm.setValue({generalInfo:{Name:this.celebrityData.data.Name,Gender:this.celebrityData.data.Gender,Number:this.celebrityData.data.Number,Email:this.celebrityData.data.Email,MainContentLanguage:this.celebrityData.data.MainContentLanguage,MainVertical:this.celebrityData.data.MainVertical,Occupation:this.celebrityData.data.Occupation,ItpRelationship:this.celebrityData.data.ItpRelationship,Nationality:this.celebrityData.data.Nationality,CountryLocation:this.celebrityData.data.CountryLocation,CityLocation:this.celebrityData.data.CityLocation,Address:this.celebrityData.data.Address},socials:{InstagramHandle:this.celebrityData.data.InstagramHandle,InstagramFollowers:this.celebrityData.data.InstagramFollowers,InstagramLink:this.celebrityData.data.InstagramLink,TiktokHandle:this.celebrityData.data.TiktokHandle,TiktokFollowers:this.celebrityData.data.TiktokFollowers,TiktokLink:this.celebrityData.data.TiktokLink,SnapchatHandle:this.celebrityData.data.SnapchatHandle,SnapchatFollowers:this.celebrityData.data.SnapchatFollowers,SnapchatLink:this.celebrityData.data.SnapchatLink,TwitterHandle:this.celebrityData.data.TwitterHandle,TwitterFollowers:this.celebrityData.data.TwitterFollowers,TwitterLink:this.celebrityData.data.TwitterLink,FacebookHandle:this.celebrityData.data.FacebookHandle,FacebookFollowers:this.celebrityData.data.FacebookFollowers,FacebookLink:this.celebrityData.data.FacebookLink,YoutubeHandle:this.celebrityData.data.YoutubeHandle,YoutubeFollowers:this.celebrityData.data.YoutubeFollowers,YoutubeLink:this.celebrityData.data.YoutubeLink,TwitchHandle:this.celebrityData.data.TwitchHandle,TwitchFollowers:this.celebrityData.data.TwitchFollowers,TwitchLink:this.celebrityData.data.TwitchLink},agencyInfo:{Agency:this.celebrityData.data.Agency,AgencyContactPerson:this.celebrityData.data.AgencyContactPerson,AgencyNumber:this.celebrityData.data.AgencyNumber,AgencyEmail:this.celebrityData.data.AgencyEmail,PreviouslyWorkedWith:this.celebrityData.data.PreviouslyWorkedWith},extraInfo:{PreviousBrands:this.celebrityData.data.PreviousBrands,Bio:this.celebrityData.data.Bio,Notes:this.celebrityData.data.Notes,Rating:this.celebrityData.data.Rating}})})}onSubmit(){const i=this.processFormGroups(this.editCelebrityForm);this.service.updateCelebrity(i,this.source.id).subscribe(o=>{this.data=o,"success"===this.data.status?(this.dialogRef.close(),this.toastrService.success("Influencer Edited Successfully!")):this.toastrService.error("Error! Please Try Again!")})}processFormGroups(i){let o={};return i instanceof r.cw&&Object.keys(i.controls).forEach(m=>{const f=i.get(m);f instanceof r.cw?o={...o,...this.processFormGroups(f)}:f instanceof r.NI&&(o[m]=f.value)}),o}}n.\u0275fac=function(i){return new(i||n)(e.Y36(r.qu),e.Y36(l.j),e.Y36(t.WI),e.Y36(t.so),e.Y36(p._W))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-edit-celebrity"]],decls:17,vars:5,consts:[[1,"form-container"],["autocomplete","off",3,"formGroup","ngSubmit"],["formGroupName","generalInfo",3,"isCelebrity"],["formGroupName","socials"],["formGroupName","agencyInfo",3,"isCelebrity"],["formGroupName","extraInfo",3,"isCelebrity"],["mat-raised-button","","color","primary","type","submit",3,"disabled"]],template:function(i,o){1&i&&(e.TgZ(0,"div",0)(1,"form",1),e.NdJ("ngSubmit",function(){return o.onSubmit()}),e.TgZ(2,"h2"),e._uU(3,"General Information"),e.qZA(),e._UZ(4,"app-general-info",2)(5,"hr"),e.TgZ(6,"h2"),e._uU(7,"Socials"),e.qZA(),e._UZ(8,"app-socials",3)(9,"hr"),e.TgZ(10,"h2"),e._uU(11,"Agency Information"),e.qZA(),e._UZ(12,"app-agency-info",4)(13,"hr")(14,"app-extra-info",5),e.TgZ(15,"button",6),e._uU(16," Edit Celebrity "),e.qZA()()()),2&i&&(e.xp6(1),e.Q6J("formGroup",o.editCelebrityForm),e.xp6(3),e.Q6J("isCelebrity",o.isCelebrity),e.xp6(8),e.Q6J("isCelebrity",o.isCelebrity),e.xp6(2),e.Q6J("isCelebrity",o.isCelebrity),e.xp6(1),e.Q6J("disabled",!o.editCelebrityForm.valid))},dependencies:[s.X,g.A,_.B,d.m,r._Y,r.JL,r.sg,r.x0,u.lW],styles:[".form-container[_ngcontent-%COMP%]{background-color:#202020;padding:50px}"]})},4492:(y,h,a)=>{a.d(h,{p:()=>d});var r=a(6223),t=a(5879),e=a(3934),l=a(9229),p=a(6814);function s(u,n){1&u&&(t.TgZ(0,"div",16),t._uU(1," Passwords do not match! "),t.qZA())}function g(u,n){1&u&&(t.TgZ(0,"div",17),t._uU(1," Password changed successfully! "),t.qZA())}function _(u,n){1&u&&(t.TgZ(0,"div",18),t._uU(1," Password change failed. Please try again later. "),t.qZA())}class d{constructor(n,c,i){this.formBuilder=n,this.userService=c,this.toastrService=i,this.passwordMatchError=!1,this.passwordChangeSuccess=!1,this.passwordChangeError=!1,this.changePasswordForm=this.formBuilder.group({oldPassword:["",r.kI.required],newPassword:["",r.kI.required],confirmPassword:["",r.kI.required]},{validator:this.matchPassword.bind(this)})}matchPassword(n){const c=n.get("newPassword")?.value,i=n.get("confirmPassword")?.value;return this.passwordMatchError=c!==i,this.passwordMatchError?{passwordMismatch:!0}:null}onSubmit(){this.userService.changePassword({oldPassword:this.changePasswordForm.value.oldPassword,newPassword:this.changePasswordForm.value.newPassword,id:this.userService.getID()}).subscribe(n=>{"success"==n.status?(this.toastrService.success("Password changed successfully"),setTimeout(()=>{window.location.reload()},2e3)):this.toastrService.error("Error error changing password")})}}d.\u0275fac=function(n){return new(n||d)(t.Y36(r.qu),t.Y36(e.K),t.Y36(l._W))},d.\u0275cmp=t.Xpm({type:d,selectors:[["app-change-password"]],decls:23,vars:5,consts:[[1,"container","mt-3"],[1,"card"],[1,"card-header"],[1,"card-body"],[3,"formGroup","ngSubmit"],[1,"form-group"],["for","oldPassword"],["type","password","id","oldPassword","formControlName","oldPassword","required","",1,"form-control"],["for","newPassword"],["type","password","id","newPassword","formControlName","newPassword","required","",1,"form-control"],["for","confirmPassword"],["type","password","id","confirmPassword","formControlName","confirmPassword","required","",1,"form-control"],["class","text-danger",4,"ngIf"],["type","submit",1,"btn","btn-primary",2,"margin-top","2%",3,"disabled"],["class","mt-2 alert alert-success",4,"ngIf"],["class","mt-2 alert alert-danger",4,"ngIf"],[1,"text-danger"],[1,"mt-2","alert","alert-success"],[1,"mt-2","alert","alert-danger"]],template:function(n,c){1&n&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2),t._uU(3,"Change Password"),t.qZA(),t.TgZ(4,"div",3)(5,"form",4),t.NdJ("ngSubmit",function(){return c.onSubmit()}),t.TgZ(6,"div",5)(7,"label",6),t._uU(8,"Old Password"),t.qZA(),t._UZ(9,"input",7),t.qZA(),t.TgZ(10,"div",5)(11,"label",8),t._uU(12,"New Password"),t.qZA(),t._UZ(13,"input",9),t.qZA(),t.TgZ(14,"div",5)(15,"label",10),t._uU(16,"Confirm Password"),t.qZA(),t._UZ(17,"input",11),t.YNc(18,s,2,0,"div",12),t.qZA(),t.TgZ(19,"button",13),t._uU(20," Submit "),t.qZA(),t.YNc(21,g,2,0,"div",14),t.YNc(22,_,2,0,"div",15),t.qZA()()()()),2&n&&(t.xp6(5),t.Q6J("formGroup",c.changePasswordForm),t.xp6(13),t.Q6J("ngIf",c.passwordMatchError),t.xp6(1),t.Q6J("disabled",!c.changePasswordForm.valid),t.xp6(2),t.Q6J("ngIf",c.passwordChangeSuccess),t.xp6(1),t.Q6J("ngIf",c.passwordChangeError))},dependencies:[p.O5,r._Y,r.Fj,r.JJ,r.JL,r.Q7,r.sg,r.u]})},1670:(y,h,a)=>{a.r(h),a.d(h,{SharedModule:()=>c});var r=a(6814),t=a(1896),e=a(5879);class l{}l.\u0275fac=function(o){return new(o||l)},l.\u0275cmp=e.Xpm({type:l,selectors:[["app-access-denied"]],decls:1,vars:0,consts:[[1,"access-denied"]],template:function(o,m){1&o&&e._UZ(0,"div",0)},styles:['.access-denied[_ngcontent-%COMP%]{background-image:url("403 Error Forbidden.4bab250018ae0ba6.png")}']});var p=a(9229);class s{back(){window.history.back()}constructor(o){this.toastr=o}ngOnInit(){this.toastr.error(" Click to go back","404 Error")}}s.\u0275fac=function(o){return new(o||s)(e.Y36(p._W))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-not-found"]],decls:2,vars:0,consts:[[1,"not-found"],["src","../../../../assets/images/404 Not Found.png","no-repeat","","center","","fit","",3,"click"]],template:function(o,m){1&o&&(e.TgZ(0,"div",0)(1,"img",1),e.NdJ("click",function(){return m.back()}),e.qZA()())},styles:[".not-found[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;height:100vh;width:100vw;background:rgb(3,3,3);background:radial-gradient(circle,rgb(1,1,1) 25%,rgb(0,9,41) 65%,rgb(8,36,119) 100%)}.not-found[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-height:100%;max-width:100%;cursor:pointer}"]});var g=a(4492);const _=[{path:"accessDenied",component:l},{path:"notFound",component:s},{path:"changePassword",component:g.p},{path:"",redirectTo:"/site/notFound",pathMatch:"full"},{path:"**",redirectTo:"/site/notFound",pathMatch:"full"}];class d{}d.\u0275fac=function(o){return new(o||d)},d.\u0275mod=e.oAB({type:d}),d.\u0275inj=e.cJS({imports:[t.Bz.forChild(_),t.Bz]});var u=a(1685),n=a(6223);class c{}c.\u0275fac=function(o){return new(o||c)},c.\u0275mod=e.oAB({type:c}),c.\u0275inj=e.cJS({imports:[r.ez,d,u.q,n.UX]})}}]);