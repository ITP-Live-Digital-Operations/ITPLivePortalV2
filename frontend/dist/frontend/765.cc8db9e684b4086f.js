"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[765],{5650:(Y,F,a)=>{a.d(F,{j:()=>m});var h=a(5516),f=a(5879),r=a(1474);class m{constructor(l){this.http=l,this.celebrityApiURL=h.N.apiUrl+"/v1/celebrities"}addCelebrity(l){return this.http.post(`${this.celebrityApiURL}/createCelebrity`,l)}getCelebrities(){return this.http.get(`${this.celebrityApiURL}/getCelebrities`)}deleteCelebrity(l){return this.http.delete(`${this.celebrityApiURL}/deleteCelebrity/${l}`)}getCelebrity(l){return this.http.get(`${this.celebrityApiURL}/getCelebrity/${l}`)}updateCelebrity(l,d){return this.http.patch(`${this.celebrityApiURL}/updateCelebrity/${d}`,l)}}m.\u0275fac=function(l){return new(l||m)(f.LFG(r.eN))},m.\u0275prov=f.Yz7({token:m,factory:m.\u0275fac,providedIn:"root"})},9765:(Y,F,a)=>{a.r(F),a.d(F,{CreateModule:()=>v});var h=a(6814),f=a(1896),r=a(6223),m=a(5753),e=a(5879),l=a(96),d=a(3934),_=a(9229),C=a(2296),M=a(5986),q=a(9287),U=a(4995),L=a(9647),J=a(7237);class T{constructor(o,t,i,s,c){this.formBuilder=o,this.service=t,this.route=i,this.userService=s,this.toastrService=c,this.isNotCelebrity=!0,this.path=m.m,this.initializeElements()}initializeElements(){this.newInfluencerForm=this.formBuilder.group({generalInfo:this.formBuilder.group({Name:["",[r.kI.required]],Gender:["",[r.kI.required]],Number:[""],Email:["",[r.kI.email]],MainContentLanguage:[""],SubContentLang:[""],MainVertical:[""],SubVertical:[""],Occupation:[""],ItpRelationship:[""],Nationality:[""],SecondNationality:[""],CountryLocation:[""],CityLocation:[""],Address:[""]}),socials:this.formBuilder.group({InstagramHandle:[""],InstagramFollowers:[],InstagramLink:[""],TiktokHandle:[""],TiktokFollowers:[],TiktokLink:[""],SnapchatHandle:[""],SnapchatFollowers:[],SnapchatLink:[""],TwitterHandle:[""],TwitterFollowers:[],TwitterLink:[""],FacebookHandle:[""],FacebookFollowers:[],FacebookLink:[""],YoutubeHandle:[""],YoutubeFollowers:[],YoutubeLink:[""],TwitchHandle:[""],TwitchFollowers:[],TwitchLink:[""]}),KSALicense:[""],UAELicense:[""],agencyInfo:this.formBuilder.group({AgencyContactPerson:[""],AgencyNumber:[],AgencyEmail:["",[r.kI.email]]}),extraInfo:this.formBuilder.group({PreviousBrands:[""],Bio:[""],Notes:[""]})})}onSubmit(){const o=this.processFormGroups(this.newInfluencerForm);o.updatedBy=this.userService.getID(),console.log({...o}),this.service.addInfluencer({...o}).subscribe(t=>{this.data=t,"success"===this.data.status?(this.route.navigate([this.path.influencers]),this.toastrService.success("Influencer Added Successfully!")):this.toastrService.warning("Influencer Not Added!")})}processFormGroups(o){let t={};return o instanceof r.cw&&Object.keys(o.controls).forEach(i=>{const s=o.get(i);s instanceof r.cw?t={...t,...this.processFormGroups(s)}:s instanceof r.NI&&(""===s.value?t[i]=null:(i.endsWith("Followers")||i.endsWith("Number"))&&"string"==typeof s.value?t[i]=parseInt(s.value,10)||null:t[i]=s.value)}),t}}T.\u0275fac=function(o){return new(o||T)(e.Y36(r.qu),e.Y36(l.N),e.Y36(f.F0),e.Y36(d.K),e.Y36(_._W))},T.\u0275cmp=e.Xpm({type:T,selectors:[["app-new-influencer"]],decls:26,vars:5,consts:[[1,"form-container"],["autocomplete","off",3,"formGroup","ngSubmit"],["formGroupName","generalInfo",3,"isCelebrity"],["formGroupName","socials"],[1,"row"],["color","primary","formControlName","KSALicense"],["color","primary","formControlName","UAELicense"],["formGroupName","agencyInfo",3,"isCelebrity"],["formGroupName","extraInfo",3,"isCelebrity"],["mat-raised-button","","color","primary","type","submit",3,"disabled"]],template:function(o,t){1&o&&(e.TgZ(0,"div",0)(1,"form",1),e.NdJ("ngSubmit",function(){return t.onSubmit()}),e.TgZ(2,"h2"),e._uU(3,"General Information"),e.qZA(),e._UZ(4,"app-general-info",2)(5,"hr"),e.TgZ(6,"h2"),e._uU(7,"Socials"),e.qZA(),e._UZ(8,"app-socials",3)(9,"hr"),e.TgZ(10,"h2"),e._uU(11,"Licenses"),e.qZA(),e.TgZ(12,"div",4)(13,"mat-checkbox",5),e._uU(14,"KSA License"),e.qZA()(),e.TgZ(15,"div",4)(16,"mat-checkbox",6),e._uU(17,"UAE License"),e.qZA()(),e._UZ(18,"hr"),e.TgZ(19,"h2"),e._uU(20,"Agency Information"),e.qZA(),e._UZ(21,"app-agency-info",7)(22,"hr")(23,"app-extra-info",8),e.TgZ(24,"button",9),e._uU(25," Add new Influencer "),e.qZA()()()),2&o&&(e.xp6(1),e.Q6J("formGroup",t.newInfluencerForm),e.xp6(3),e.Q6J("isCelebrity",t.isNotCelebrity),e.xp6(17),e.Q6J("isCelebrity",t.isNotCelebrity),e.xp6(2),e.Q6J("isCelebrity",t.isNotCelebrity),e.xp6(1),e.Q6J("disabled",!t.newInfluencerForm.valid))},dependencies:[r._Y,r.JJ,r.JL,r.sg,r.u,r.x0,C.lW,M.oG,q.X,U.A,L.B,J.m],styles:[".mat-mdc-checkbox label{color:#fff}.mat-mdc-checkbox.mat-primary[_ngcontent-%COMP%]{--mdc-checkbox-disabled-selected-icon-color: white;--mdc-checkbox-disabled-unselected-icon-color: white;--mdc-checkbox-selected-checkmark-color: #fff;--mdc-checkbox-selected-focus-icon-color: #4789A1;--mdc-checkbox-selected-hover-icon-color: #4789A1;--mdc-checkbox-selected-icon-color: #4789A1;--mdc-checkbox-selected-pressed-icon-color: #4789A1;--mdc-checkbox-unselected-focus-icon-color: white;--mdc-checkbox-unselected-hover-icon-color: white;--mdc-checkbox-unselected-icon-color: white;--mdc-checkbox-unselected-pressed-icon-color: white;--mdc-checkbox-selected-focus-state-layer-color: #4789A1;--mdc-checkbox-selected-hover-state-layer-color: #4789A1;--mdc-checkbox-selected-pressed-state-layer-color: #4789A1;--mdc-checkbox-unselected-focus-state-layer-color: white;--mdc-checkbox-unselected-hover-state-layer-color: white;--mdc-checkbox-unselected-pressed-state-layer-color: white}.mat-mdc-raised-button.mat-primary[_ngcontent-%COMP%]{--mdc-protected-button-container-color: #4789A1}"]});var p=a(1218),S=a(2032),g=a(4170),w=a(8525),x=a(3680),k=a(8034);function D(n,o){if(1&n&&(e.TgZ(0,"mat-option",13),e._uU(1),e.qZA()),2&n){const t=o.$implicit;e.Q6J("value",t),e.xp6(1),e.Oqu(t)}}function R(n,o){if(1&n&&(e.TgZ(0,"mat-option",13),e._uU(1),e.qZA()),2&n){const t=o.$implicit;e.Q6J("value",t),e.xp6(1),e.Oqu(t)}}function G(n,o){if(1&n&&(e.TgZ(0,"mat-option",13),e._uU(1),e.qZA()),2&n){const t=o.$implicit;e.Q6J("value",t),e.xp6(1),e.Oqu(t)}}class Z{constructor(o,t,i){this.formBuilder=o,this.userService=t,this.toastrService=i,this.agencies=p.aR,this.mainTaskType=p.rb,this.timeSpent=p._z,this.newTalentTimeForm=this.formBuilder.group({Date:[""],Agency:[""],Client:[""],MainTaskType:[""],ExtraNotes:[""],TimeSpentInHours:[""]})}ngOnInit(){this.userId=this.userService.getID(),this.userService.getUserByID(this.userId).subscribe(o=>{this.name=o.name})}onSubmit(){this.userService.addTimeForm({user_id:this.userId,...this.newTalentTimeForm.value}).subscribe(o=>{"success"==o.status?(this.toastrService.success("Time form added successfully!"),setTimeout(()=>{window.location.reload()},2e3)):this.toastrService.error("Error adding time form!")})}}Z.\u0275fac=function(o){return new(o||Z)(e.Y36(r.qu),e.Y36(d.K),e.Y36(_._W))},Z.\u0275cmp=e.Xpm({type:Z,selectors:[["app-new-time-form"]],decls:39,vars:8,consts:[[1,"form-container"],["autocomplete","off",3,"formGroup","ngSubmit"],[1,"row"],["matInput","","formControlName","Date","required","",3,"matDatepicker"],["matSuffix","",3,"for"],["picker1",""],["formControlName","Agency","required",""],[3,"value",4,"ngFor","ngForOf"],["matInput","","type","text","formControlName","Client","autocomplete","off","required",""],["formControlName","MainTaskType","required",""],["matInput","","type","text","formControlName","ExtraNotes","autocomplete","off"],["formControlName","TimeSpentInHours","required",""],["mat-raised-button","","color","primary","type","submit",3,"disabled"],[3,"value"]],template:function(o,t){if(1&o&&(e.TgZ(0,"div",0)(1,"form",1),e.NdJ("ngSubmit",function(){return t.onSubmit()}),e.TgZ(2,"h2"),e._uU(3),e.qZA(),e.TgZ(4,"div",2)(5,"mat-form-field")(6,"mat-label"),e._uU(7," Date "),e.qZA(),e._UZ(8,"input",3)(9,"mat-datepicker-toggle",4)(10,"mat-datepicker",null,5),e.qZA(),e.TgZ(12,"mat-form-field")(13,"mat-label"),e._uU(14,"Agency"),e.qZA(),e.TgZ(15,"mat-select",6),e.YNc(16,D,2,2,"mat-option",7),e.qZA()()(),e.TgZ(17,"div",2)(18,"mat-form-field")(19,"mat-label"),e._uU(20,"Client"),e.qZA(),e._UZ(21,"input",8),e.qZA(),e.TgZ(22,"mat-form-field")(23,"mat-label"),e._uU(24,"Main Task Type"),e.qZA(),e.TgZ(25,"mat-select",9),e.YNc(26,R,2,2,"mat-option",7),e.qZA()()(),e.TgZ(27,"div",2)(28,"mat-form-field")(29,"mat-label"),e._uU(30,"Extra Notes"),e.qZA(),e._UZ(31,"input",10),e.qZA(),e.TgZ(32,"mat-form-field")(33,"mat-label"),e._uU(34,"Time Spent In Hours"),e.qZA(),e.TgZ(35,"mat-select",11),e.YNc(36,G,2,2,"mat-option",7),e.qZA()()(),e.TgZ(37,"button",12),e._uU(38," Add Log "),e.qZA()()()),2&o){const i=e.MAs(11);e.xp6(1),e.Q6J("formGroup",t.newTalentTimeForm),e.xp6(2),e.hij("Time Form: ",t.name,""),e.xp6(5),e.Q6J("matDatepicker",i),e.xp6(1),e.Q6J("for",i),e.xp6(7),e.Q6J("ngForOf",t.agencies),e.xp6(10),e.Q6J("ngForOf",t.mainTaskType),e.xp6(10),e.Q6J("ngForOf",t.timeSpent),e.xp6(1),e.Q6J("disabled",!t.newTalentTimeForm.valid)}},dependencies:[h.sg,r._Y,r.Fj,r.JJ,r.JL,r.Q7,r.sg,r.u,S.Nt,g.KE,g.hX,g.R9,C.lW,w.gD,x.ey,k.Mq,k.hl,k.nW],styles:[".form-container[_ngcontent-%COMP%]{max-height:auto;overflow-y:hidden;overflow-x:hidden;margin-left:10px}table[_ngcontent-%COMP%]{background-color:#fff!important}.row[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}mat-form-field[_ngcontent-%COMP%]{flex:1;margin-right:10px;margin-bottom:5px}[_ngcontent-%COMP%]::-webkit-scrollbar-track{background-color:#f5f5f5}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#888;border-radius:5px}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background-color:#555}[_ngcontent-%COMP%]::-webkit-scrollbar{width:8px;height:8px}"]});var B=a(5650);class y{constructor(o,t,i,s,c){this.formBuilder=o,this.service=t,this.route=i,this.userService=s,this.toastrService=c,this.isCelebrity=!1,this.path=m.m,this.initializeElements()}initializeElements(){this.newCelebrityForm=this.formBuilder.group({generalInfo:this.formBuilder.group({Name:["",[r.kI.required]],Gender:["",[r.kI.required]],Number:[""],Email:["",[r.kI.email]],MainContentLanguage:[""],MainVertical:[""],Occupation:[""],ItpRelationship:[""],Nationality:[""],CountryLocation:[""],CityLocation:[""],Address:[""]}),socials:this.formBuilder.group({InstagramHandle:["",[r.kI.required]],InstagramFollowers:[""],InstagramLink:[""],TiktokHandle:[""],TiktokFollowers:[""],TiktokLink:[""],SnapchatHandle:[""],SnapchatFollowers:[""],SnapchatLink:[""],TwitterHandle:[""],TwitterFollowers:[""],TwitterLink:[""],FacebookHandle:[""],FacebookFollowers:[""],FacebookLink:[""],YoutubeHandle:[""],YoutubeFollowers:[""],YoutubeLink:[""],TwitchHandle:[""],TwitchFollowers:[""],TwitchLink:[""]}),agencyInfo:this.formBuilder.group({Agency:[""],AgencyContactPerson:[""],AgencyNumber:[""],AgencyEmail:["",[r.kI.email]],PreviouslyWorkedWith:[""]}),extraInfo:this.formBuilder.group({PreviousBrands:[""],Bio:[""],Notes:[""],Rating:[""]})})}onSubmit(){const o=this.processFormGroups(this.newCelebrityForm);o.updatedBy=this.userService.getID(),this.service.addCelebrity({...o}).subscribe(t=>{this.data=t,"success"===this.data.status?(this.toastrService.success("Celebrity Added Successfully!"),this.route.navigate([this.path.celebrities])):this.toastrService.warning("Celebrity Not Added!")})}processFormGroups(o){let t={};return o instanceof r.cw&&Object.keys(o.controls).forEach(i=>{const s=o.get(i);s instanceof r.cw?t={...t,...this.processFormGroups(s)}:s instanceof r.NI&&(i.endsWith("Followers")||i.endsWith("Number")&&null===s.value?t[i]=null:t[i]=s.value)}),t}}y.\u0275fac=function(o){return new(o||y)(e.Y36(r.qu),e.Y36(B.j),e.Y36(f.F0),e.Y36(d.K),e.Y36(_._W))},y.\u0275cmp=e.Xpm({type:y,selectors:[["app-new-celebrity"]],decls:17,vars:4,consts:[[1,"form-container"],["autocomplete","off",3,"formGroup","ngSubmit"],["formGroupName","generalInfo",3,"isCelebrity"],["formGroupName","socials"],["formGroupName","agencyInfo",3,"isCelebrity"],["formGroupName","extraInfo"],["mat-raised-button","","color","primary","type","submit",3,"disabled"]],template:function(o,t){1&o&&(e.TgZ(0,"div",0)(1,"form",1),e.NdJ("ngSubmit",function(){return t.onSubmit()}),e.TgZ(2,"h2"),e._uU(3,"General Information"),e.qZA(),e._UZ(4,"app-general-info",2)(5,"hr"),e.TgZ(6,"h2"),e._uU(7,"Socials"),e.qZA(),e._UZ(8,"app-socials",3)(9,"hr"),e.TgZ(10,"h2"),e._uU(11,"Agency Information"),e.qZA(),e._UZ(12,"app-agency-info",4)(13,"hr")(14,"app-extra-info",5),e.TgZ(15,"button",6),e._uU(16," Add new Celebrity "),e.qZA()()()),2&o&&(e.xp6(1),e.Q6J("formGroup",t.newCelebrityForm),e.xp6(3),e.Q6J("isCelebrity",t.isCelebrity),e.xp6(8),e.Q6J("isCelebrity",t.isCelebrity),e.xp6(3),e.Q6J("disabled",!t.newCelebrityForm.valid))},dependencies:[r._Y,r.JL,r.sg,r.x0,C.lW,q.X,U.A,L.B,J.m],styles:[".mat-mdc-raised-button.mat-primary[_ngcontent-%COMP%]{--mdc-protected-button-container-color: #4789A1}"]});var O=a(4104),P=a(8074),Q=a(617);function E(n,o){if(1&n&&(e.TgZ(0,"mat-option",14),e._uU(1),e.qZA()),2&n){const t=o.$implicit;e.Q6J("value",t.id),e.xp6(1),e.Oqu(t.name)}}function H(n,o){if(1&n&&(e.TgZ(0,"mat-option",14),e._uU(1),e.qZA()),2&n){const t=o.$implicit;e.Q6J("value",t),e.xp6(1),e.Oqu(t)}}function $(n,o){if(1&n&&(e.TgZ(0,"mat-option",14),e._uU(1),e.qZA()),2&n){const t=o.$implicit;e.Q6J("value",t),e.xp6(1),e.Oqu(t)}}function W(n,o){if(1&n&&(e.TgZ(0,"mat-option",14),e._uU(1),e.qZA()),2&n){const t=o.$implicit;e.Q6J("value",t),e.xp6(1),e.Oqu(t)}}function V(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"div",15)(1,"div",2)(2,"mat-form-field")(3,"mat-label"),e._uU(4),e.qZA(),e.TgZ(5,"mat-select",16),e.NdJ("change",function(){const c=e.CHM(t).index,u=e.oxw();return e.KtG(u.onPlatformChange(c))}),e.YNc(6,$,2,2,"mat-option",4),e.qZA()(),e.TgZ(7,"mat-form-field")(8,"mat-label"),e._uU(9,"Deliverable"),e.qZA(),e.TgZ(10,"mat-select",17),e.YNc(11,W,2,2,"mat-option",4),e.qZA()(),e.TgZ(12,"mat-form-field")(13,"mat-label"),e._uU(14,"Quantity"),e.qZA(),e._UZ(15,"input",18),e.qZA(),e.TgZ(16,"button",19),e.NdJ("click",function(){const c=e.CHM(t).index,u=e.oxw();return e.KtG(u.removeFields(c))}),e.TgZ(17,"mat-icon"),e._uU(18,"delete"),e.qZA()()()()}if(2&n){const t=o.index,i=e.oxw();e.Q6J("formGroupName",t),e.xp6(4),e.hij("Platform ",t+1,""),e.xp6(2),e.Q6J("ngForOf",i.platforms),e.xp6(5),e.Q6J("ngForOf",i.getAvailableDeliverables(t))}}class I{constructor(o,t,i,s,c,u){this.formBuilder=o,this.router=t,this.service=i,this.userService=s,this.logService=c,this.toastrService=u,this.currencies=p.QT,this.platforms=p.Zk,this.submitted=!1,this.path=m.m,this.userId=this.userService.getID(),this.logForm=this.formBuilder.group({Influencer:["",r.kI.required],Campaign:["",r.kI.required],Currency:["",r.kI.required],Rate:["",r.kI.required],Notes:[""],Time_to_reply:["",r.kI.required]}),this.form=this.formBuilder.group({fields:this.formBuilder.array([])})}ngOnInit(){this.getInfluencers(),this.addFields(),null!=sessionStorage.getItem("influencerData")&&(this.influencerData=JSON.parse(sessionStorage.getItem("influencerData")||"{}"),this.logForm.controls.Influencer.setValue(this.influencerData.id))}get fields(){return this.form.get("fields")}addFields(){const o=this.formBuilder.group({Platform:["",r.kI.required],Deliverable:["",r.kI.required],Quantity:["",r.kI.required]});this.fields.push(o)}removeFields(o){this.fields.removeAt(o)}getInfluencers(){this.service.getInfluencerNames().subscribe(o=>{this.influencers=o})}onSubmit(){if(!this.submitted){if(this.submitted=!0,this.form.valid){console.log(this.form.value.fields);const o={UserID:this.userId,InfluencerID:this.logForm.value.Influencer,Campaign:this.logForm.value.Campaign,type:"package",Time_to_reply:this.logForm.value.Time_to_reply,Notes:this.logForm.value.Notes,Currency:this.logForm.value.Currency,Rate:this.logForm.value.Rate,packageItems:this.form.value.fields,rateLogItems:{}};this.logService.addLog(o).subscribe(t=>{this.data=t,"success"===this.data.status?(this.toastrService.success("Log Added Successfully!"),sessionStorage.removeItem("influencerData"),this.router.navigate([this.path.influencerRating+this.logForm.value.Influencer])):this.toastrService.error("Error! Please Try Again!")})}setTimeout(()=>{this.submitted=!1},1e3)}}getAvailableDeliverables(o){switch(this.fields.controls[o].get("Platform")?.value){case"Instagram":return["Static image posts","Carousel posts","Instagram Stories","Instagram Reels","IGTV","Influencer partnerships and collaborations"];case"Tiktok":return["Short-form video content","Hashtag challenges","Influencer partnerships and collaborations"];case"Snapchat":return["Snap stories","Geofilters and lenses","Influencer partnerships and collaborations"];case"Twitter":return["Tweets","Retweets","Twitter threads","Hashtags","Influencer partnerships and collaborations"];case"Facebook":return["Facebook posts","Facebook Stories","Live videos","Groups","Influencer partnerships and collaborations"];case"Youtube":return["Video content","Livestreams","Live videos","Collaborations with other YouTubers or brands","Product reviews or demonstrations","Influencer partnerships and collaborations"];default:return[]}}onPlatformChange(o){const t=this.fields.controls[o].get("Platform")?.value,i=this.fields.controls[o].get("Deliverable");i?.setValue(null),i?.enable(),t?i?.setValidators(r.kI.required):i?.clearValidators()}}function K(n,o){if(1&n&&(e.TgZ(0,"mat-option",12),e._uU(1),e.qZA()),2&n){const t=o.$implicit;e.Q6J("value",t.id),e.xp6(1),e.Oqu(t.name)}}function j(n,o){if(1&n&&(e.TgZ(0,"mat-option",12),e._uU(1),e.qZA()),2&n){const t=o.$implicit;e.Q6J("value",t),e.xp6(1),e.Oqu(t)}}function X(n,o){if(1&n&&(e.TgZ(0,"mat-option",12),e._uU(1),e.qZA()),2&n){const t=o.$implicit;e.Q6J("value",t),e.xp6(1),e.Oqu(t)}}function z(n,o){if(1&n&&(e.TgZ(0,"mat-option",12),e._uU(1),e.qZA()),2&n){const t=o.$implicit;e.Q6J("value",t),e.xp6(1),e.Oqu(t)}}function ee(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"div",13)(1,"div",2)(2,"mat-form-field")(3,"mat-label"),e._uU(4),e.qZA(),e.TgZ(5,"mat-select",14),e.NdJ("change",function(){const c=e.CHM(t).index,u=e.oxw();return e.KtG(u.onPlatformChange(c))}),e.YNc(6,j,2,2,"mat-option",4),e.qZA()(),e.TgZ(7,"mat-form-field")(8,"mat-label"),e._uU(9,"Deliverable"),e.qZA(),e.TgZ(10,"mat-select",15),e.YNc(11,X,2,2,"mat-option",4),e.qZA()(),e.TgZ(12,"mat-form-field")(13,"mat-label"),e._uU(14,"Quantity"),e.qZA(),e._UZ(15,"input",16),e.qZA(),e.TgZ(16,"mat-form-field")(17,"mat-label"),e._uU(18,"Currency"),e.qZA(),e.TgZ(19,"mat-select",17),e.YNc(20,z,2,2,"mat-option",4),e.qZA()(),e.TgZ(21,"mat-form-field")(22,"mat-label"),e._uU(23,"Rate"),e.qZA(),e._UZ(24,"input",18),e.qZA(),e.TgZ(25,"button",19),e.NdJ("click",function(){const c=e.CHM(t).index,u=e.oxw();return e.KtG(u.removeFields(c))}),e.TgZ(26,"mat-icon"),e._uU(27," delete "),e.qZA()()()()}if(2&n){const t=o.index,i=e.oxw();e.Q6J("formGroupName",t),e.xp6(4),e.hij("Platform ",t+1,""),e.xp6(2),e.Q6J("ngForOf",i.platforms),e.xp6(5),e.Q6J("ngForOf",i.getAvailableDeliverables(t)),e.xp6(9),e.Q6J("ngForOf",i.currencies)}}I.\u0275fac=function(o){return new(o||I)(e.Y36(r.qu),e.Y36(f.F0),e.Y36(l.N),e.Y36(d.K),e.Y36(P.$),e.Y36(_._W))},I.\u0275cmp=e.Xpm({type:I,selectors:[["app-new-rate-log"]],decls:38,vars:6,consts:[[1,"form-container"],[3,"formGroup","ngSubmit"],[1,"row"],["formControlName","Influencer"],[3,"value",4,"ngFor","ngForOf"],["matInput","","type","text","formControlName","Campaign","autocomplete","off","required",""],["formControlName","Currency","required",""],["matInput","","type","number","formControlName","Rate","autocomplete","off","required",""],["matInput","","formControlName","Notes","rows","2","autocomplete","off"],["matInput","","type","text","formControlName","Time_to_reply","autocomplete","off","required",""],["formArrayName","fields"],[3,"formGroupName",4,"ngFor","ngForOf"],["mat-raised-button","",3,"click"],["mat-raised-button","","color","primary","type","submit",3,"disabled"],[3,"value"],[3,"formGroupName"],["formControlName","Platform",3,"change"],["formControlName","Deliverable"],["matInput","","type","number","formControlName","Quantity","autocomplete","off","required",""],["color","warn",1,"icon-btn",2,"max-width","5%",3,"click"]],template:function(o,t){1&o&&(e.TgZ(0,"div",0)(1,"form",1),e.NdJ("ngSubmit",function(){return t.onSubmit()}),e.TgZ(2,"div",2)(3,"mat-form-field")(4,"mat-label"),e._uU(5,"Influencer"),e.qZA(),e.TgZ(6,"mat-select",3),e.YNc(7,E,2,2,"mat-option",4),e.qZA()(),e.TgZ(8,"mat-form-field")(9,"mat-label"),e._uU(10," Campaign "),e.qZA(),e._UZ(11,"input",5),e.qZA(),e.TgZ(12,"mat-form-field")(13,"mat-label"),e._uU(14,"Currency"),e.qZA(),e.TgZ(15,"mat-select",6),e.YNc(16,H,2,2,"mat-option",4),e.qZA()(),e.TgZ(17,"mat-form-field")(18,"mat-label"),e._uU(19," Rate"),e.qZA(),e._UZ(20,"input",7),e.qZA()(),e.TgZ(21,"div",2)(22,"mat-form-field")(23,"mat-label"),e._uU(24,"Notes "),e.qZA(),e._UZ(25,"textarea",8),e.qZA(),e.TgZ(26,"mat-form-field")(27,"mat-label"),e._uU(28," Time to reply "),e.qZA(),e._UZ(29,"input",9),e.qZA()()(),e.TgZ(30,"form",1),e.NdJ("ngSubmit",function(){return t.onSubmit()}),e.TgZ(31,"div",10),e.YNc(32,V,19,4,"div",11),e.qZA(),e.TgZ(33,"div",2)(34,"button",12),e.NdJ("click",function(){return t.addFields()}),e._uU(35," Add Platform "),e.qZA(),e.TgZ(36,"button",13),e._uU(37," Submit "),e.qZA()()()()),2&o&&(e.xp6(1),e.Q6J("formGroup",t.logForm),e.xp6(6),e.Q6J("ngForOf",t.influencers),e.xp6(9),e.Q6J("ngForOf",t.currencies),e.xp6(14),e.Q6J("formGroup",t.form),e.xp6(2),e.Q6J("ngForOf",t.fields.controls),e.xp6(4),e.Q6J("disabled",!(t.logForm.valid&&t.form.valid)||0==t.fields.length))},dependencies:[h.sg,r._Y,r.Fj,r.wV,r.JJ,r.JL,r.Q7,r.sg,r.u,r.x0,r.CE,S.Nt,g.KE,g.hX,C.lW,Q.Hw,w.gD,x.ey],styles:[".form-container[_ngcontent-%COMP%]{max-height:auto;overflow-y:hidden;overflow-x:hidden;margin-left:10px;margin-top:1%}.icon-btn[_ngcontent-%COMP%]{color:red}  .mat-mdc-form-field{margin-top:1%}mat-form-field[_ngcontent-%COMP%]{flex:1;margin-right:10px;margin-bottom:5px}h2[_ngcontent-%COMP%]{justify-content:center;align-items:center;font-size:200%}.mat-mdc-raised-button.mat-primary[_ngcontent-%COMP%]{--mdc-protected-button-container-color: #4789A1}button[_ngcontent-%COMP%]{flex:1;margin-right:10px;margin-bottom:5px}.color[_ngcontent-%COMP%]{background-color:green}[_ngcontent-%COMP%]::-webkit-scrollbar-track{background-color:#f5f5f5}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#888;border-radius:5px}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background-color:#555}[_ngcontent-%COMP%]::-webkit-scrollbar{width:8px;height:8px}"]});class A{constructor(o,t,i,s,c,u){this.formBuilder=o,this.router=t,this.influencerService=i,this.userService=s,this.logService=c,this.toastrService=u,this.currencies=p.QT,this.platforms=p.Zk,this.submitted=!1,this.path=m.m,this.userId=this.userService.getID(),this.logForm=this.formBuilder.group({Influencer:["",r.kI.required],Campaign:["",r.kI.required],Notes:[""],Time_to_reply:["",r.kI.required]}),this.form=this.formBuilder.group({fields:this.formBuilder.array([])})}ngOnInit(){this.getInfluencers(),this.addFields(),null!=sessionStorage.getItem("influencerData")&&(this.influencerData=JSON.parse(sessionStorage.getItem("influencerData")||"{}"),this.logForm.controls.Influencer.setValue(this.influencerData.id))}get fields(){return this.form.get("fields")}addFields(){const o=this.formBuilder.group({Platform:["",r.kI.required],Deliverable:["",r.kI.required],Quantity:["",r.kI.required],Currency:["",r.kI.required],Rate:["",r.kI.required]});this.fields.push(o)}removeFields(o){this.fields.removeAt(o)}getInfluencers(){this.influencerService.getInfluencerNames().subscribe(o=>{this.influencers=o})}onSubmit(){if(!this.submitted){if(this.submitted=!0,this.form.valid){const o={UserID:this.userId,InfluencerID:this.logForm.value.Influencer,Campaign:this.logForm.value.Campaign,type:"single",Notes:this.logForm.value.Notes,Time_to_reply:this.logForm.value.Time_to_reply,rateLogItems:this.form.value.fields,packageItems:{}};this.logService.addLog(o).subscribe(t=>{this.data=t,"success"===this.data.status?(this.toastrService.success("Log Added Successfully!"),sessionStorage.removeItem("influencerData"),this.router.navigate([this.path.influencerRating+this.logForm.value.Influencer])):this.toastrService.error("Error! Please Try Again!")})}setTimeout(()=>{this.submitted=!1},1e3)}}getAvailableDeliverables(o){switch(this.fields.controls[o].get("Platform")?.value){case"Instagram":return["Static image posts","Carousel posts","Instagram Stories","Instagram Reels","IGTV","Influencer partnerships and collaborations"];case"Tiktok":return["Short-form video content","Hashtag challenges","Influencer partnerships and collaborations"];case"Snapchat":return["Snap stories","Geofilters and lenses","Influencer partnerships and collaborations"];case"Twitter":return["Tweets","Retweets","Twitter threads","Hashtags","Influencer partnerships and collaborations"];case"Facebook":return["Facebook posts","Facebook Stories","Live videos","Groups","Influencer partnerships and collaborations"];case"Youtube":return["Video content","Livestreams","Live videos","Collaborations with other YouTubers or brands","Product reviews or demonstrations","Influencer partnerships and collaborations"];default:return[]}}onPlatformChange(o){const t=this.fields.controls[o].get("Platform")?.value,i=this.fields.controls[o].get("Deliverable");i?.setValue(null),i?.enable(),t?i?.setValidators(r.kI.required):i?.clearValidators()}}A.\u0275fac=function(o){return new(o||A)(e.Y36(r.qu),e.Y36(f.F0),e.Y36(l.N),e.Y36(d.K),e.Y36(P.$),e.Y36(_._W))},A.\u0275cmp=e.Xpm({type:A,selectors:[["app-single-influencer-logs"]],decls:29,vars:5,consts:[[1,"form-container"],[3,"formGroup","ngSubmit"],[1,"row"],["formControlName","Influencer"],[3,"value",4,"ngFor","ngForOf"],["matInput","","type","text","formControlName","Campaign","autocomplete","off","required",""],["matInput","","formControlName","Notes","rows","2","autocomplete","off"],["matInput","","type","text","formControlName","Time_to_reply","autocomplete","off","required",""],["formArrayName","fields"],[3,"formGroupName",4,"ngFor","ngForOf"],["mat-raised-button","",3,"click"],["mat-raised-button","","color","primary","type","submit",3,"disabled"],[3,"value"],[3,"formGroupName"],["formControlName","Platform",3,"change"],["formControlName","Deliverable"],["matInput","","type","number","formControlName","Quantity","autocomplete","off","required",""],["formControlName","Currency","required",""],["matInput","","type","number","formControlName","Rate","autocomplete","off","required",""],[1,"icon-btn",2,"max-width","5%",3,"click"]],template:function(o,t){1&o&&(e.TgZ(0,"div",0)(1,"form",1),e.NdJ("ngSubmit",function(){return t.onSubmit()}),e.TgZ(2,"div",2)(3,"mat-form-field")(4,"mat-label"),e._uU(5,"Influencer"),e.qZA(),e.TgZ(6,"mat-select",3),e.YNc(7,K,2,2,"mat-option",4),e.qZA()(),e.TgZ(8,"mat-form-field")(9,"mat-label"),e._uU(10," Campaign "),e.qZA(),e._UZ(11,"input",5),e.qZA()(),e.TgZ(12,"div",2)(13,"mat-form-field")(14,"mat-label"),e._uU(15,"Notes "),e.qZA(),e._UZ(16,"textarea",6),e.qZA(),e.TgZ(17,"mat-form-field")(18,"mat-label"),e._uU(19," Time to reply "),e.qZA(),e._UZ(20,"input",7),e.qZA()()(),e.TgZ(21,"form",1),e.NdJ("ngSubmit",function(){return t.onSubmit()}),e.TgZ(22,"div",8),e.YNc(23,ee,28,5,"div",9),e.qZA(),e.TgZ(24,"div",2)(25,"button",10),e.NdJ("click",function(){return t.addFields()}),e._uU(26," Add Platform "),e.qZA(),e.TgZ(27,"button",11),e._uU(28," Submit "),e.qZA()()()()),2&o&&(e.xp6(1),e.Q6J("formGroup",t.logForm),e.xp6(6),e.Q6J("ngForOf",t.influencers),e.xp6(14),e.Q6J("formGroup",t.form),e.xp6(2),e.Q6J("ngForOf",t.fields.controls),e.xp6(4),e.Q6J("disabled",!(t.logForm.valid&&t.form.valid)||0==t.fields.length))},dependencies:[h.sg,r._Y,r.Fj,r.wV,r.JJ,r.JL,r.Q7,r.sg,r.u,r.x0,r.CE,S.Nt,g.KE,g.hX,C.lW,Q.Hw,w.gD,x.ey],styles:[".form-container[_ngcontent-%COMP%]{margin-top:1%}.icon-btn[_ngcontent-%COMP%]{color:red}.mat-mdc-raised-button.mat-primary[_ngcontent-%COMP%]{--mdc-protected-button-container-color: #4789A1}button[_ngcontent-%COMP%]{flex:1;margin-right:10px;margin-bottom:5px}"]});class N{}N.\u0275fac=function(o){return new(o||N)},N.\u0275cmp=e.Xpm({type:N,selectors:[["app-rate-logs"]],decls:7,vars:0,consts:[["label","Single"],["label","Package"]],template:function(o,t){1&o&&(e.TgZ(0,"h1"),e._uU(1,"New Log Form"),e.qZA(),e.TgZ(2,"mat-tab-group")(3,"mat-tab",0),e._UZ(4,"app-single-influencer-logs"),e.qZA(),e.TgZ(5,"mat-tab",1),e._UZ(6,"app-new-rate-log"),e.qZA()())},dependencies:[O.uX,O.SP,I,A],styles:["h1[_ngcontent-%COMP%]{margin-top:2%;color:#fff}.mat-mdc-tab-group[_ngcontent-%COMP%]{--mdc-tab-indicator-active-indicator-color: #4789A1;--mat-tab-header-disabled-ripple-color: rgba(0, 0, 0, .38);--mat-tab-header-pagination-icon-color: #000;--mat-tab-header-inactive-label-text-color: rgba(0, 0, 0, .6);--mat-tab-header-active-label-text-color: #4789A1;--mat-tab-header-active-ripple-color: #4789A1;--mat-tab-header-inactive-ripple-color: #4789A1;--mat-tab-header-inactive-focus-label-text-color: #4789A1;--mat-tab-header-inactive-hover-label-text-color: rgba(0, 0, 0, .6);--mat-tab-header-active-focus-label-text-color: #4789A1;--mat-tab-header-active-hover-label-text-color: #4789A1;--mat-tab-header-active-focus-indicator-color: #4789A1;--mat-tab-header-active-hover-indicator-color: #4789A1}"]});const te=[{path:"influencer",component:T},{path:"rateLog",component:N},{path:"timeForm",component:Z},{path:"celebrity",component:y},{path:"",redirectTo:"/site/notFound",pathMatch:"full"},{path:"**",redirectTo:"/site/notFound"}];class b{}b.\u0275fac=function(o){return new(o||b)},b.\u0275mod=e.oAB({type:b}),b.\u0275inj=e.cJS({imports:[f.Bz.forChild(te),f.Bz]});var oe=a(8519),re=a(1474);class v{}v.\u0275fac=function(o){return new(o||v)},v.\u0275mod=e.oAB({type:v}),v.\u0275inj=e.cJS({imports:[h.ez,b,r.UX,oe.q,re.JF,r.u5]})}}]);