"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[592],{1921:(w,_,o)=>{o.d(_,{M:()=>l});var r=o(5516),e=o(5879),t=o(1474);class l{constructor(n){this.http=n,this.taskApiURL=r.N.apiUrl+"/v1/tasks"}createTask(n){return this.http.post(`${this.taskApiURL}/createTask`,n)}addUserToTask(n,c){return this.http.post(`${this.taskApiURL}/addUserToTask`,{taskId:n,userId:c})}getUnfinishedTasks(n){return this.http.get(`${this.taskApiURL}/getUnfinishedTasks/${n}`)}getMyTasks(n){return this.http.get(`${this.taskApiURL}/getMyTasks/${n}`)}updateStatus(n){return this.http.post(`${this.taskApiURL}/updateStatus`,n)}getUsersAndTaskWeights(){return this.http.get(`${this.taskApiURL}/getUsersAndTaskWeights`)}getTaskByBriefId(n){return this.http.get(`${this.taskApiURL}/getTaskByBriefId/${n}`)}deactivateTask(n){return this.http.get(`${this.taskApiURL}/deactivateTask/${n}`)}activateTask(n){return this.http.get(`${this.taskApiURL}/activateTask/${n}`)}updateStatusToComplete(n){return this.http.post(`${this.taskApiURL}/updateStatusToComplete`,n)}updateProgress(n,c){return this.http.post(`${this.taskApiURL}/updateProgress/${n}`,c)}updateUsersToTask(n,c){return this.http.post(`${this.taskApiURL}/updateUsersToTask/${n}`,c)}updateTask(n,c){return this.http.post(`${this.taskApiURL}/updateTask/${n}`,c)}roundFeedback(n,c){return this.http.post(`${this.taskApiURL}/roundFeedback/${n}`,c)}addRoundtoTask(n){return this.http.get(`${this.taskApiURL}/addRoundtoTask/${n}`)}createTaskClientCall(n){return this.http.post(`${this.taskApiURL}/createTaskClientCall`,n)}editTaskClientCall(n,c){return this.http.patch(`${this.taskApiURL}/editTaskClientCall/${n}`,c)}}l.\u0275fac=function(n){return new(n||l)(e.LFG(t.eN))},l.\u0275prov=e.Yz7({token:l,factory:l.\u0275fac,providedIn:"root"})},488:(w,_,o)=>{o.d(_,{l:()=>P});var r=o(6223),e=o(9347),t=o(5879),l=o(5650),C=o(9229),n=o(6814),c=o(9287),y=o(4995),p=o(9647),g=o(7237),i=o(2296),s=o(617),d=o(4104);function u(b,m){if(1&b){const a=t.EpF();t.ynx(0),t.TgZ(1,"button",16),t.NdJ("click",function(){t.CHM(a);const h=t.oxw();return t.KtG(h.nextTab())}),t._uU(2,"Next"),t.qZA(),t.BQk()}if(2&b){const a=t.oxw();t.xp6(1),t.Udp("visibility",a.activeTabIndex===a.tabCount-1?"hidden":"visible"),t.Q6J("disabled",a.activeTabIndex===a.tabCount-1)}}function T(b,m){if(1&b){const a=t.EpF();t.ynx(0),t.TgZ(1,"form",17),t.NdJ("ngSubmit",function(){t.CHM(a);const h=t.oxw();return t.KtG(h.onSubmit())}),t.TgZ(2,"button",18),t._uU(3,"Edit Celebrity "),t.qZA()(),t.BQk()}if(2&b){const a=t.oxw();t.xp6(1),t.Q6J("formGroup",a.editCelebrityForm),t.xp6(1),t.Q6J("disabled",!a.editCelebrityForm.valid)}}class P{constructor(m,a,f,h,k){this.formBuilder=m,this.service=a,this.source=f,this.dialogRef=h,this.toastrService=k,this.isCelebrity=!1,this.activeTabIndex=0,this.tabCount=3,this.initializeElements(),this.GetInfluencerData(this.source.id)}initializeElements(){this.editCelebrityForm=this.formBuilder.group({generalInfo:this.formBuilder.group({Name:["",[r.kI.required]],Gender:["",[r.kI.required]],Number:[""],Email:["",[r.kI.email]],MainContentLanguage:[""],MainVertical:[""],Occupation:[""],ItpRelationship:[""],Nationality:[""],CountryLocation:[""],CityLocation:[""],Address:[""]}),socials:this.formBuilder.group({InstagramHandle:[""],InstagramFollowers:[""],InstagramLink:[""],TiktokHandle:[""],TiktokFollowers:[""],TiktokLink:[""],SnapchatHandle:[""],SnapchatFollowers:[""],SnapchatLink:[""],TwitterHandle:[""],TwitterFollowers:[""],TwitterLink:[""],FacebookHandle:[""],FacebookFollowers:[""],FacebookLink:[""],YoutubeHandle:[""],YoutubeFollowers:[""],YoutubeLink:[""],TwitchHandle:[""],TwitchFollowers:[""],TwitchLink:[""]}),agencyInfo:this.formBuilder.group({Agency:[""],AgencyContactPerson:[""],AgencyNumber:[""],AgencyEmail:["",[r.kI.email]],PreviouslyWorkedWith:[""]}),extraInfo:this.formBuilder.group({Game:[""],PreviousBrands:[""],Bio:[""],Notes:[""],Rating:[""]})})}nextTab(){this.activeTabIndex<this.tabCount-1&&this.activeTabIndex++}prevTab(){this.activeTabIndex>0&&this.activeTabIndex--}closeDialog(){this.dialogRef.close()}GetInfluencerData(m){this.service.getCelebrity(m).subscribe(a=>{this.celebrityData=a,null!=this.celebrityData.data&&this.editCelebrityForm.setValue({generalInfo:{Name:this.celebrityData.data.Name,Gender:this.celebrityData.data.Gender,Number:this.celebrityData.data.Number,Email:this.celebrityData.data.Email,MainContentLanguage:this.celebrityData.data.MainContentLanguage,MainVertical:this.celebrityData.data.MainVertical,Occupation:this.celebrityData.data.Occupation,ItpRelationship:"",Nationality:this.celebrityData.data.Nationality,CountryLocation:this.celebrityData.data.CountryLocation,CityLocation:"",Address:""},socials:{InstagramHandle:this.celebrityData.data.InstagramHandle,InstagramFollowers:this.celebrityData.data.InstagramFollowers,InstagramLink:this.celebrityData.data.InstagramLink,TiktokHandle:this.celebrityData.data.TiktokHandle,TiktokFollowers:this.celebrityData.data.TiktokFollowers,TiktokLink:this.celebrityData.data.TiktokLink,SnapchatHandle:"",SnapchatFollowers:"",SnapchatLink:"",TwitterHandle:this.celebrityData.data.TwitterHandle,TwitterFollowers:this.celebrityData.data.TwitterFollowers,TwitterLink:this.celebrityData.data.TwitterLink,FacebookHandle:"",FacebookFollowers:"",FacebookLink:"",YoutubeHandle:this.celebrityData.data.YoutubeHandle,YoutubeFollowers:this.celebrityData.data.YoutubeFollowers,YoutubeLink:this.celebrityData.data.YoutubeLink,TwitchHandle:this.celebrityData.data.TwitchHandle,TwitchFollowers:this.celebrityData.data.TwitchFollowers,TwitchLink:this.celebrityData.data.TwitchLink},agencyInfo:{Agency:this.celebrityData.data.Agency,AgencyContactPerson:this.celebrityData.data.AgencyContactPerson,AgencyNumber:this.celebrityData.data.AgencyNumber,AgencyEmail:this.celebrityData.data.AgencyEmail,PreviouslyWorkedWith:this.celebrityData.data.PreviouslyWorkedWith},extraInfo:{Game:this.celebrityData.data.Game,PreviousBrands:this.celebrityData.data.PreviousBrands,Bio:this.celebrityData.data.Bio,Notes:this.celebrityData.data.Notes,Rating:""}})})}onSubmit(){const m=this.processFormGroups(this.editCelebrityForm);this.service.updateCelebrity(m,this.source.id).subscribe(a=>{this.data=a,"success"===this.data.status?(this.dialogRef.close(),this.toastrService.success("Influencer Edited Successfully!")):this.toastrService.error("Error! Please Try Again!")})}processFormGroups(m){let a={};return m instanceof r.cw&&Object.keys(m.controls).forEach(f=>{const h=m.get(f);h instanceof r.cw?a={...a,...this.processFormGroups(h)}:h instanceof r.NI&&(a[f]=h.value)}),a}}P.\u0275fac=function(m){return new(m||P)(t.Y36(r.qu),t.Y36(l.j),t.Y36(e.WI),t.Y36(e.so),t.Y36(C._W))},P.\u0275cmp=t.Xpm({type:P,selectors:[["app-edit-celebrity"]],decls:26,vars:11,consts:[[1,"form-container"],["mat-icon-button","",1,"close-button",3,"click"],[2,"color","aliceblue"],[2,"text-align","center"],[3,"selectedIndex","selectedIndexChange"],["label","General Information",1,"tab-with-border"],["autocomplete","off",3,"formGroup","ngSubmit"],["formGroupName","generalInfo",3,"isCelebrity"],["label","Socials"],["formGroupName","socials"],["label","Agency & Extra Info"],["formGroupName","agencyInfo",3,"isCelebrity"],["formGroupName","extraInfo"],[2,"display","flex","justify-content","space-between"],["mat-raised-button","","color","primary",2,"margin-right","10px","border-radius","10px !important",3,"disabled","click"],[4,"ngIf"],["mat-raised-button","","color","primary",2,"border-radius","10px !important",3,"disabled","click"],["autocomplete","off",2,"display","flex","justify-content","center",3,"formGroup","ngSubmit"],["mat-raised-button","","color","primary","type","submit",2,"margin","2% auto","border-radius","15px !important","color","white","width","200px",3,"disabled"]],template:function(m,a){1&m&&(t.TgZ(0,"div",0)(1,"button",1),t.NdJ("click",function(){return a.closeDialog()}),t.TgZ(2,"mat-icon",2),t._uU(3,"close"),t.qZA()(),t.TgZ(4,"h2",3),t._uU(5,"Edit Celebrity"),t.qZA(),t.TgZ(6,"mat-tab-group",4),t.NdJ("selectedIndexChange",function(h){return a.activeTabIndex=h}),t.TgZ(7,"mat-tab",5)(8,"form",6),t.NdJ("ngSubmit",function(){return a.onSubmit()}),t._UZ(9,"app-general-info",7),t.qZA()(),t.TgZ(10,"mat-tab",8)(11,"form",6),t.NdJ("ngSubmit",function(){return a.onSubmit()}),t._UZ(12,"app-socials",9),t.qZA()(),t.TgZ(13,"mat-tab",10)(14,"form",6),t.NdJ("ngSubmit",function(){return a.onSubmit()}),t.TgZ(15,"h2"),t._uU(16,"Agency Information"),t.qZA(),t._UZ(17,"app-agency-info",11),t.TgZ(18,"h2"),t._uU(19,"Extra Information"),t.qZA(),t._UZ(20,"app-extra-info",12),t.qZA()()(),t.TgZ(21,"div",13)(22,"button",14),t.NdJ("click",function(){return a.prevTab()}),t._uU(23,"Previous"),t.qZA(),t.YNc(24,u,3,3,"ng-container",15),t.YNc(25,T,4,2,"ng-container",15),t.qZA()()),2&m&&(t.xp6(6),t.Q6J("selectedIndex",a.activeTabIndex),t.xp6(2),t.Q6J("formGroup",a.editCelebrityForm),t.xp6(1),t.Q6J("isCelebrity",a.isCelebrity),t.xp6(2),t.Q6J("formGroup",a.editCelebrityForm),t.xp6(3),t.Q6J("formGroup",a.editCelebrityForm),t.xp6(3),t.Q6J("isCelebrity",a.isCelebrity),t.xp6(5),t.Udp("visibility",0===a.activeTabIndex?"hidden":"visible"),t.Q6J("disabled",0===a.activeTabIndex),t.xp6(2),t.Q6J("ngIf",a.activeTabIndex!==a.tabCount-1),t.xp6(1),t.Q6J("ngIf",a.activeTabIndex===a.tabCount-1))},dependencies:[n.O5,c.X,y.A,p.B,g.m,r._Y,r.JL,r.sg,r.x0,i.lW,i.RK,s.Hw,d.uX,d.SP],styles:[".form-container[_ngcontent-%COMP%]{-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);background-color:#ffffff25;border-radius:15px;box-shadow:0 4px 6px #0000001a;padding:20px;max-width:990px;margin:auto;overflow:hidden}.form-container[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{color:#fff;margin-left:35%}.form-container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:20px}.form-container[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]{display:flex;justify-content:space-between;gap:20px}@media (max-width: 768px){.form-container[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]{flex-direction:column}}.form-container[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{background-color:transparent;border-radius:10px;overflow:hidden}.form-container[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]   mat-label[_ngcontent-%COMP%]{color:#fff}.form-container[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .form-container[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%], .form-container[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]   mat-select[_ngcontent-%COMP%]{background-color:transparent;border:none}.form-container[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, .form-container[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus, .form-container[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]   mat-select[_ngcontent-%COMP%]:focus{outline:none}.form-container[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]     .mdc-text-field{background-color:transparent}.form-container[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]     .matformfieldlineripple{display:none}.form-container[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]   .mat-datepicker-toggle[_ngcontent-%COMP%], .form-container[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]   .mat-form-field-suffix[_ngcontent-%COMP%]{color:#0000008a}.form-container[_ngcontent-%COMP%]   input[matInput][_ngcontent-%COMP%]::placeholder, .form-container[_ngcontent-%COMP%]   textarea[matInput][_ngcontent-%COMP%]::placeholder{color:#00000080}.form-container[_ngcontent-%COMP%]     .mat-datepicker-toggle-default-icon{color:#fff}.form-container[_ngcontent-%COMP%]     .mdc-text-field--filled:not(.mdc-text-field--disabled){background-color:transparent;border-radius:10px!important}.form-container[_ngcontent-%COMP%]   mat-datepicker[_ngcontent-%COMP%]   mat-calendar[_ngcontent-%COMP%]{border-radius:10px}  .mat-mdc-select-panel{background-color:#29395de8!important;-webkit-backdrop-filter:blur(7px);backdrop-filter:blur(7px)}  .mat-mdc-option .mdc-list-item__primary-text{color:#fff!important}  .mat-mdc-option .mat-pseudo-checkbox-full{margin-right:16px;flex-shrink:0;border-radius:5px;border-color:#fff}",".mat-mdc-tab-body-content {\n    height: 100%;\n    overflow: hidden !important;\n  }\n      .mat-mdc-tab-group.mat-mdc-tab-group-stretch-tabs > .mat-mdc-tab-header .mat-mdc-tab {\n      flex-grow: 1;\n      border-right: 1px solid rgba(70, 70, 93, 0.559);\n      transition: background-color 0.3s ease;\n      text-align: center;\n      font-size: 16px;\n      padding-bottom: 20px;\n      color: #333; \n    }\n      .mat-raised-button {\n      border-radius: 20px;}\n      .mat-mdc-tab-group.mat-mdc-tab-group-stretch-tabs > .mat-mdc-tab-header .mat-mdc-tab:hover {\n      background-color: rgba(70, 70, 93, 0.379);\n      cursor: pointer;\n    }\n  \n    @media (max-width: 767px) {\n        .mat-mdc-tab-group.mat-mdc-tab-group-stretch-tabs > .mat-mdc-tab-header {\n        overflow-x: auto;\n        white-space: nowrap;\n        -webkit-overflow-scrolling: touch;\n      }\n    \n        .mat-mdc-tab-group.mat-mdc-tab-group-stretch-tabs > .mat-mdc-tab-header .mat-mdc-tab {\n        display: inline-block;\n        width: auto;\n        border-right: none;\n      }\n      \n        .mat-mdc-tab-group.mat-mdc-tab-group-stretch-tabs > .mat-mdc-tab-header .mat-mdc-tab:nth-child(n+3) {\n        display: none; \n      }\n    }"]})},4492:(w,_,o)=>{o.d(_,{p:()=>p});var r=o(6223),e=o(5879),t=o(3934),l=o(9229),C=o(6814);function n(g,i){1&g&&(e.TgZ(0,"div",16),e._uU(1," Passwords do not match! "),e.qZA())}function c(g,i){1&g&&(e.TgZ(0,"div",17),e._uU(1," Password changed successfully! "),e.qZA())}function y(g,i){1&g&&(e.TgZ(0,"div",18),e._uU(1," Password change failed. Please try again later. "),e.qZA())}class p{constructor(i,s,d){this.formBuilder=i,this.userService=s,this.toastrService=d,this.passwordMatchError=!1,this.passwordChangeSuccess=!1,this.passwordChangeError=!1,this.changePasswordForm=this.formBuilder.group({oldPassword:["",r.kI.required],newPassword:["",r.kI.required],confirmPassword:["",r.kI.required]},{validator:this.matchPassword.bind(this)})}matchPassword(i){const s=i.get("newPassword")?.value,d=i.get("confirmPassword")?.value;return this.passwordMatchError=s!==d,this.passwordMatchError?{passwordMismatch:!0}:null}onSubmit(){this.userService.changePassword({oldPassword:this.changePasswordForm.value.oldPassword,newPassword:this.changePasswordForm.value.newPassword,id:this.userService.getID()}).subscribe(i=>{"success"==i.status?(this.toastrService.success("Password changed successfully"),setTimeout(()=>{window.location.reload()},2e3)):this.toastrService.error("Error error changing password")})}}p.\u0275fac=function(i){return new(i||p)(e.Y36(r.qu),e.Y36(t.K),e.Y36(l._W))},p.\u0275cmp=e.Xpm({type:p,selectors:[["app-change-password"]],decls:23,vars:5,consts:[[1,"container","mt-3"],[1,"card"],[1,"card-header"],[1,"card-body"],[3,"formGroup","ngSubmit"],[1,"form-group"],["for","oldPassword"],["type","password","id","oldPassword","formControlName","oldPassword","required","",1,"form-control"],["for","newPassword"],["type","password","id","newPassword","formControlName","newPassword","required","",1,"form-control"],["for","confirmPassword"],["type","password","id","confirmPassword","formControlName","confirmPassword","required","",1,"form-control"],["class","text-danger",4,"ngIf"],["type","submit",1,"btn","btn-primary",2,"margin-top","2%",3,"disabled"],["class","mt-2 alert alert-success",4,"ngIf"],["class","mt-2 alert alert-danger",4,"ngIf"],[1,"text-danger"],[1,"mt-2","alert","alert-success"],[1,"mt-2","alert","alert-danger"]],template:function(i,s){1&i&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2),e._uU(3,"Change Password"),e.qZA(),e.TgZ(4,"div",3)(5,"form",4),e.NdJ("ngSubmit",function(){return s.onSubmit()}),e.TgZ(6,"div",5)(7,"label",6),e._uU(8,"Old Password"),e.qZA(),e._UZ(9,"input",7),e.qZA(),e.TgZ(10,"div",5)(11,"label",8),e._uU(12,"New Password"),e.qZA(),e._UZ(13,"input",9),e.qZA(),e.TgZ(14,"div",5)(15,"label",10),e._uU(16,"Confirm Password"),e.qZA(),e._UZ(17,"input",11),e.YNc(18,n,2,0,"div",12),e.qZA(),e.TgZ(19,"button",13),e._uU(20," Submit "),e.qZA(),e.YNc(21,c,2,0,"div",14),e.YNc(22,y,2,0,"div",15),e.qZA()()()()),2&i&&(e.xp6(5),e.Q6J("formGroup",s.changePasswordForm),e.xp6(13),e.Q6J("ngIf",s.passwordMatchError),e.xp6(1),e.Q6J("disabled",!s.changePasswordForm.valid),e.xp6(2),e.Q6J("ngIf",s.passwordChangeSuccess),e.xp6(1),e.Q6J("ngIf",s.passwordChangeError))},dependencies:[C.O5,r._Y,r.Fj,r.JJ,r.JL,r.Q7,r.sg,r.u]})},1670:(w,_,o)=>{o.r(_),o.d(_,{SharedModule:()=>s});var r=o(6814),e=o(1896),t=o(5879);class l{}l.\u0275fac=function(u){return new(u||l)},l.\u0275cmp=t.Xpm({type:l,selectors:[["app-access-denied"]],decls:1,vars:0,consts:[[1,"access-denied"]],template:function(u,T){1&u&&t._UZ(0,"div",0)},styles:['.access-denied[_ngcontent-%COMP%]{background-image:url("403 Error Forbidden.4bab250018ae0ba6.png")}']});var C=o(9229);class n{back(){window.history.back()}constructor(u){this.toastr=u}ngOnInit(){this.toastr.error(" Click to go back","404 Error")}}n.\u0275fac=function(u){return new(u||n)(t.Y36(C._W))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-not-found"]],decls:2,vars:0,consts:[[1,"not-found"],["src","../../../../assets/images/404.png",3,"click"]],template:function(u,T){1&u&&(t.TgZ(0,"div",0)(1,"img",1),t.NdJ("click",function(){return T.back()}),t.qZA()())},styles:[".not-found[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;height:100vh;width:100vw;background:rgb(3,3,3);background:radial-gradient(circle,rgb(1,1,1) 25%,rgb(0,9,41) 65%,rgb(8,36,119) 100%)}.not-found[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:100%;width:100%;cursor:pointer;object-fit:cover;object-position:bottom}"]});var c=o(4492);const y=[{path:"accessDenied",component:l},{path:"notFound",component:n},{path:"changePassword",component:c.p},{path:"",redirectTo:"/site/notFound",pathMatch:"full"},{path:"**",redirectTo:"/site/notFound",pathMatch:"full"}];class p{}p.\u0275fac=function(u){return new(u||p)},p.\u0275mod=t.oAB({type:p}),p.\u0275inj=t.cJS({imports:[e.Bz.forChild(y),e.Bz]});var g=o(609),i=o(6223);class s{}s.\u0275fac=function(u){return new(u||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[r.ez,p,g.q,i.UX]})}}]);