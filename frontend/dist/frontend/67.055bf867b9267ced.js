"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[67],{5650:(q,Z,i)=>{i.d(Z,{j:()=>m});var g=i(5516),u=i(5879),r=i(1474);class m{constructor(l){this.http=l,this.celebrityApiURL=g.N.apiUrl+"/v1/celebrities"}addCelebrity(l){return this.http.post(`${this.celebrityApiURL}/createCelebrity`,l)}getCelebrities(){return this.http.get(`${this.celebrityApiURL}/getCelebrities`)}deleteCelebrity(l){return this.http.delete(`${this.celebrityApiURL}/deleteCelebrity/${l}`)}getCelebrity(l){return this.http.get(`${this.celebrityApiURL}/getCelebrity/${l}`)}updateCelebrity(l,p){return this.http.patch(`${this.celebrityApiURL}/updateCelebrity/${p}`,l)}}m.\u0275fac=function(l){return new(l||m)(u.LFG(r.eN))},m.\u0275prov=u.Yz7({token:m,factory:m.\u0275fac,providedIn:"root"})},6067:(q,Z,i)=>{i.r(Z),i.d(Z,{CreateModule:()=>d});var g=i(6814),u=i(1896),r=i(6223),m=i(5753),e=i(5879),l=i(96),p=i(3934),N=i(9229),A=i(2296),J=i(5986),w=i(9287),_=i(4995),O=i(6397),S=i(9647),k=i(7237);class h{constructor(o,t,a,s,c){this.formBuilder=o,this.service=t,this.route=a,this.userService=s,this.toastrService=c,this.isNotCelebrity=!0,this.path=m.m,this.initializeElements()}initializeElements(){this.newInfluencerForm=this.formBuilder.group({generalInfo:this.formBuilder.group({Name:["",[r.kI.required]],Gender:["",[r.kI.required]],Number:[""],Email:["",[r.kI.email]],MainContentLanguage:[""],SubContentLang:[""],MainVertical:[""],SubVertical:[""],Occupation:[""],ItpRelationship:[""],Nationality:[""],SecondNationality:[""],CountryLocation:[""],CityLocation:[""],Address:[""]}),socials:this.formBuilder.group({InstagramHandle:["",[r.kI.required]],InstagramFollowers:[""],InstagramLink:[""],TiktokHandle:[""],TiktokFollowers:[""],TiktokLink:[""],SnapchatHandle:[""],SnapchatFollowers:[""],SnapchatLink:[""],TwitterHandle:[""],TwitterFollowers:[""],TwitterLink:[""],FacebookHandle:[""],FacebookFollowers:[""],FacebookLink:[""],YoutubeHandle:[""],YoutubeFollowers:[""],YoutubeLink:[""],TwitchHandle:[""],TwitchFollowers:[""],TwitchLink:[""]}),statistics:this.formBuilder.group({AudienceMalePer:[""],AudienceFemalePer:[""],AgeGroup1317:[""],AgeGroup1824:[""],AgeGroup2534:[""],AgeGroup3544:[""],AgeGroup4554:[""],AgeGroup55:[""],AudienceTopCountries1:[""],AudienceTopCountries1Percentage:[""],AudienceTopCountries2:[""],AudienceTopCountries2Percentage:[""],AudienceTopCountries3:[""],AudienceTopCountries3Percentage:[""]}),KSALicense:[""],UAELicense:[""],agencyInfo:this.formBuilder.group({AgencyContactPerson:[""],AgencyNumber:[""],AgencyEmail:["",[r.kI.email]]}),extraInfo:this.formBuilder.group({PreviousBrands:[""],Bio:[""],Notes:[""]})})}onSubmit(){const o=this.processFormGroups(this.newInfluencerForm);o.updatedBy=this.userService.getID(),this.service.addInfluencer({...o}).subscribe(t=>{this.data=t,"success"===this.data.status?(this.route.navigate([this.path.influencers]),this.toastrService.success("Influencer Added Successfully")):this.toastrService.warning("Influencer Not Added")})}processFormGroups(o){let t={};return o instanceof r.cw&&Object.keys(o.controls).forEach(a=>{const s=o.get(a);s instanceof r.cw?t={...t,...this.processFormGroups(s)}:s instanceof r.NI&&(t[a]=s.value)}),t}}h.\u0275fac=function(o){return new(o||h)(e.Y36(r.qu),e.Y36(l.N),e.Y36(u.F0),e.Y36(p.K),e.Y36(N._W))},h.\u0275cmp=e.Xpm({type:h,selectors:[["app-new-influencer"]],decls:30,vars:5,consts:[[1,"form-container"],["autocomplete","off",3,"formGroup","ngSubmit"],["formGroupName","generalInfo",3,"isCelebrity"],["formGroupName","socials"],["formGroupName","statistics"],[1,"row"],["formControlName","KSALicense"],["formControlName","UAELicense"],["formGroupName","agencyInfo",3,"isCelebrity"],["formGroupName","extraInfo",3,"isCelebrity"],["mat-raised-button","","color","primary","type","submit",3,"disabled"]],template:function(o,t){1&o&&(e.TgZ(0,"div",0)(1,"form",1),e.NdJ("ngSubmit",function(){return t.onSubmit()}),e.TgZ(2,"h2"),e._uU(3,"General Information"),e.qZA(),e._UZ(4,"app-general-info",2)(5,"hr"),e.TgZ(6,"h2"),e._uU(7,"Socials"),e.qZA(),e._UZ(8,"app-socials",3)(9,"hr"),e.TgZ(10,"h2"),e._uU(11,"Statistics"),e.qZA(),e._UZ(12,"app-statistics",4)(13,"hr"),e.TgZ(14,"h2"),e._uU(15,"Licenses"),e.qZA(),e.TgZ(16,"div",5)(17,"mat-checkbox",6),e._uU(18,"KSA License"),e.qZA()(),e.TgZ(19,"div",5)(20,"mat-checkbox",7),e._uU(21,"UAE License"),e.qZA()(),e._UZ(22,"hr"),e.TgZ(23,"h2"),e._uU(24,"Agency Information"),e.qZA(),e._UZ(25,"app-agency-info",8)(26,"hr")(27,"app-extra-info",9),e.TgZ(28,"button",10),e._uU(29," Add new Influencer "),e.qZA()()()),2&o&&(e.xp6(1),e.Q6J("formGroup",t.newInfluencerForm),e.xp6(3),e.Q6J("isCelebrity",t.isNotCelebrity),e.xp6(21),e.Q6J("isCelebrity",t.isNotCelebrity),e.xp6(2),e.Q6J("isCelebrity",t.isNotCelebrity),e.xp6(1),e.Q6J("disabled",!t.newInfluencerForm.valid))},dependencies:[r._Y,r.JJ,r.JL,r.sg,r.u,r.x0,A.lW,J.oG,w.X,_.A,O.B,S.B,k.m]});var b=i(1218),U=i(2032),v=i(4170),x=i(8525),L=i(3680),I=i(8034);function P(n,o){if(1&n&&(e.TgZ(0,"mat-option",14),e._uU(1),e.qZA()),2&n){const t=o.$implicit;e.Q6J("value",t),e.xp6(1),e.Oqu(t)}}function M(n,o){if(1&n&&(e.TgZ(0,"mat-option",14),e._uU(1),e.qZA()),2&n){const t=o.$implicit;e.Q6J("value",t),e.xp6(1),e.Oqu(t)}}function G(n,o){if(1&n&&(e.TgZ(0,"mat-option",14),e._uU(1),e.qZA()),2&n){const t=o.$implicit;e.Q6J("value",t),e.xp6(1),e.Oqu(t)}}class C{constructor(o,t){this.formBuilder=o,this.userService=t,this.agencies=b.aR,this.mainTaskType=b.rb,this.timeSpent=b._z,this.newTalentTimeForm=this.formBuilder.group({Date:[""],Agency:[""],Client:[""],MainTaskType:[""],ExtraNotes:[""],TimeSpentInHours:[""]})}ngOnInit(){this.userId=this.userService.getID(),this.userService.getUserByID(this.userId).subscribe(o=>{this.name=o.name})}onSubmit(){this.userService.addTimeForm({user_id:this.userId,...this.newTalentTimeForm.value}).subscribe(o=>{"success"==o.status&&setTimeout(()=>{window.location.reload()},2e3)})}}C.\u0275fac=function(o){return new(o||C)(e.Y36(r.qu),e.Y36(p.K))},C.\u0275cmp=e.Xpm({type:C,selectors:[["app-new-time-form"]],decls:39,vars:8,consts:[[1,"form-container"],["autocomplete","off",3,"formGroup","ngSubmit"],[1,"row"],["appearance","outline"],["matInput","","formControlName","Date","required","",3,"matDatepicker"],["matSuffix","",3,"for"],["picker1",""],["formControlName","Agency","required",""],[3,"value",4,"ngFor","ngForOf"],["matInput","","type","text","formControlName","Client","autocomplete","off","required",""],["formControlName","MainTaskType","required",""],["matInput","","type","text","formControlName","ExtraNotes","autocomplete","off"],["formControlName","TimeSpentInHours","required",""],["mat-raised-button","","color","primary","type","submit",3,"disabled"],[3,"value"]],template:function(o,t){if(1&o&&(e.TgZ(0,"div",0)(1,"form",1),e.NdJ("ngSubmit",function(){return t.onSubmit()}),e.TgZ(2,"h2"),e._uU(3),e.qZA(),e.TgZ(4,"div",2)(5,"mat-form-field",3)(6,"mat-label"),e._uU(7," Date "),e.qZA(),e._UZ(8,"input",4)(9,"mat-datepicker-toggle",5)(10,"mat-datepicker",null,6),e.qZA(),e.TgZ(12,"mat-form-field",3)(13,"mat-label"),e._uU(14,"Agency"),e.qZA(),e.TgZ(15,"mat-select",7),e.YNc(16,P,2,2,"mat-option",8),e.qZA()()(),e.TgZ(17,"div",2)(18,"mat-form-field",3)(19,"mat-label"),e._uU(20,"Client"),e.qZA(),e._UZ(21,"input",9),e.qZA(),e.TgZ(22,"mat-form-field",3)(23,"mat-label"),e._uU(24,"Main Task Type"),e.qZA(),e.TgZ(25,"mat-select",10),e.YNc(26,M,2,2,"mat-option",8),e.qZA()()(),e.TgZ(27,"div",2)(28,"mat-form-field",3)(29,"mat-label"),e._uU(30,"Extra Notes"),e.qZA(),e._UZ(31,"input",11),e.qZA(),e.TgZ(32,"mat-form-field",3)(33,"mat-label"),e._uU(34,"Time Spent In Hours"),e.qZA(),e.TgZ(35,"mat-select",12),e.YNc(36,G,2,2,"mat-option",8),e.qZA()()(),e.TgZ(37,"button",13),e._uU(38," Add Log "),e.qZA()()()),2&o){const a=e.MAs(11);e.xp6(1),e.Q6J("formGroup",t.newTalentTimeForm),e.xp6(2),e.hij("Time Form: ",t.name,""),e.xp6(5),e.Q6J("matDatepicker",a),e.xp6(1),e.Q6J("for",a),e.xp6(7),e.Q6J("ngForOf",t.agencies),e.xp6(10),e.Q6J("ngForOf",t.mainTaskType),e.xp6(10),e.Q6J("ngForOf",t.timeSpent),e.xp6(1),e.Q6J("disabled",!t.newTalentTimeForm.valid)}},dependencies:[g.sg,r._Y,r.Fj,r.JJ,r.JL,r.Q7,r.sg,r.u,U.Nt,v.KE,v.hX,v.R9,A.lW,x.gD,L.ey,I.Mq,I.hl,I.nW],styles:[".form-container[_ngcontent-%COMP%]{max-height:auto;overflow-y:hidden;overflow-x:hidden;margin-left:10px}table[_ngcontent-%COMP%]{background-color:#fff!important}.row[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}mat-form-field[_ngcontent-%COMP%]{flex:1;margin-right:10px;margin-bottom:5px}[_ngcontent-%COMP%]::-webkit-scrollbar-track{background-color:#f5f5f5}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#888;border-radius:5px}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background-color:#555}[_ngcontent-%COMP%]::-webkit-scrollbar{width:8px;height:8px}"]});var Y=i(8074);function B(n,o){if(1&n&&(e.TgZ(0,"mat-option",15),e._uU(1),e.qZA()),2&n){const t=o.$implicit;e.Q6J("value",t.id),e.xp6(1),e.Oqu(t.name)}}function Q(n,o){if(1&n&&(e.TgZ(0,"mat-option",15),e._uU(1),e.qZA()),2&n){const t=o.$implicit;e.Q6J("value",t),e.xp6(1),e.Oqu(t)}}function R(n,o){if(1&n&&(e.TgZ(0,"mat-option",15),e._uU(1),e.qZA()),2&n){const t=o.$implicit;e.Q6J("value",t),e.xp6(1),e.Oqu(t)}}function D(n,o){if(1&n&&(e.TgZ(0,"mat-option",15),e._uU(1),e.qZA()),2&n){const t=o.$implicit;e.Q6J("value",t),e.xp6(1),e.Oqu(t)}}function E(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"div",16)(1,"div",2)(2,"mat-form-field",3)(3,"mat-label"),e._uU(4),e.qZA(),e.TgZ(5,"mat-select",17),e.NdJ("change",function(){const c=e.CHM(t).index,F=e.oxw();return e.KtG(F.onPlatformChange(c))}),e.YNc(6,R,2,2,"mat-option",5),e.qZA()(),e.TgZ(7,"mat-form-field",3)(8,"mat-label"),e._uU(9,"Deliverable"),e.qZA(),e.TgZ(10,"mat-select",18),e.YNc(11,D,2,2,"mat-option",5),e.qZA()()()()}if(2&n){const t=o.index,a=e.oxw();e.Q6J("formGroupName",t),e.xp6(4),e.hij("Platform ",t+1,""),e.xp6(2),e.Q6J("ngForOf",a.platforms),e.xp6(5),e.Q6J("ngForOf",a.getAvailableDeliverables(t))}}class T{constructor(o,t,a,s,c,F){this.formBuilder=o,this.route=t,this.service=a,this.userService=s,this.logService=c,this.toastrService=F,this.currencies=b.QT,this.platforms=b.Zk,this.submitted=!1,this.path=m.m,this.logForm=this.formBuilder.group({Influencer:["",r.kI.required],Campaign:["",r.kI.required],Currency:["",r.kI.required],Rate:["",r.kI.required],Notes:[""],Time_to_reply:["",r.kI.required]}),this.form=this.formBuilder.group({fields:this.formBuilder.array([])})}ngOnInit(){this.getInfluencers(),this.addFields(),null!=sessionStorage.getItem("influencerData")&&(this.influencerData=JSON.parse(sessionStorage.getItem("influencerData")||"{}"),this.logForm.controls.Influencer.setValue(this.influencerData.id),sessionStorage.removeItem("influencerData"))}get fields(){return this.form.get("fields")}addFields(){const o=this.formBuilder.group({Platform:["",r.kI.required],Deliverable:["",r.kI.required]});this.fields.push(o)}getInfluencers(){return this.service.getInfluencerNames().subscribe(o=>{this.influencers=o})}onSubmit(){if(!this.submitted){if(this.submitted=!0,this.form.valid){const o={UserID:this.userService.getID(),InfluencerID:this.logForm.value.Influencer,Campaign:this.logForm.value.Campaign,Currency:this.logForm.value.Currency,Rate:this.logForm.value.Rate,Notes:this.logForm.value.Notes,Time_to_reply:this.logForm.value.Time_to_reply,length:this.form.value.fields.length,fields:this.form.value.fields};this.logService.addLog(o).subscribe(t=>{this.data=t,"success"===this.data.status?(this.toastrService.success("Log Added Successfully"),this.route.navigate([this.path.rateLogs])):this.toastrService.error("Error! Please Try Again")})}setTimeout(()=>{this.submitted=!1},1e3)}}getAvailableDeliverables(o){switch(this.fields.controls[o].get("Platform")?.value){case"Instagram":return["Static image posts","Carousel posts","Instagram Stories","Instagram Reels","IGTV","Influencer partnerships and collaborations"];case"Tiktok":return["Short-form video content","Hashtag challenges","Influencer partnerships and collaborations"];case"Snapchat":return["Snap stories","Geofilters and lenses","Influencer partnerships and collaborations"];case"Twitter":return["Tweets","Retweets","Twitter threads","Hashtags","Influencer partnerships and collaborations"];case"Facebook":return["Facebook posts","Facebook Stories","Live videos","Groups","Influencer partnerships and collaborations"];case"Youtube":return["Video content","Livestreams","Live videos","Collaborations with other YouTubers or brands","Product reviews or demonstrations","Influencer partnerships and collaborations"];default:return[]}}onPlatformChange(o){const t=this.fields.controls[o].get("Platform")?.value,a=this.fields.controls[o].get("Deliverable");a?.setValue(null),a?.enable(),t?a?.setValidators(r.kI.required):a?.clearValidators()}}T.\u0275fac=function(o){return new(o||T)(e.Y36(r.qu),e.Y36(u.F0),e.Y36(l.N),e.Y36(p.K),e.Y36(Y.$),e.Y36(N._W))},T.\u0275cmp=e.Xpm({type:T,selectors:[["app-new-rate-log"]],decls:40,vars:6,consts:[[1,"form-container"],[3,"formGroup","ngSubmit"],[1,"row"],["appearance","outline"],["formControlName","Influencer"],[3,"value",4,"ngFor","ngForOf"],["matInput","","type","text","formControlName","Campaign","autocomplete","off","required",""],["formControlName","Currency","required",""],["matInput","","type","number","formControlName","Rate","autocomplete","off","required",""],["matInput","","formControlName","Notes","rows","2","autocomplete","off"],["matInput","","type","text","formControlName","Time_to_reply","autocomplete","off","required",""],["formArrayName","fields"],[3,"formGroupName",4,"ngFor","ngForOf"],["mat-raised-button","",3,"click"],["mat-raised-button","","color","primary","type","submit",3,"disabled"],[3,"value"],[3,"formGroupName"],["formControlName","Platform",3,"change"],["formControlName","Deliverable"]],template:function(o,t){1&o&&(e.TgZ(0,"div",0)(1,"h2"),e._uU(2,"New Log Form"),e.qZA(),e.TgZ(3,"form",1),e.NdJ("ngSubmit",function(){return t.onSubmit()}),e.TgZ(4,"div",2)(5,"mat-form-field",3)(6,"mat-label"),e._uU(7,"Influencer"),e.qZA(),e.TgZ(8,"mat-select",4),e.YNc(9,B,2,2,"mat-option",5),e.qZA()(),e.TgZ(10,"mat-form-field",3)(11,"mat-label"),e._uU(12," Campaign "),e.qZA(),e._UZ(13,"input",6),e.qZA(),e.TgZ(14,"mat-form-field",3)(15,"mat-label"),e._uU(16,"Currency"),e.qZA(),e.TgZ(17,"mat-select",7),e.YNc(18,Q,2,2,"mat-option",5),e.qZA()(),e.TgZ(19,"mat-form-field",3)(20,"mat-label"),e._uU(21," Rate"),e.qZA(),e._UZ(22,"input",8),e.qZA()(),e.TgZ(23,"div",2)(24,"mat-form-field",3)(25,"mat-label"),e._uU(26,"Notes "),e.qZA(),e._UZ(27,"textarea",9),e.qZA(),e.TgZ(28,"mat-form-field",3)(29,"mat-label"),e._uU(30," Time to reply "),e.qZA(),e._UZ(31,"input",10),e.qZA()()(),e.TgZ(32,"form",1),e.NdJ("ngSubmit",function(){return t.onSubmit()}),e.TgZ(33,"div",11),e.YNc(34,E,12,4,"div",12),e.qZA(),e.TgZ(35,"div",2)(36,"button",13),e.NdJ("click",function(){return t.addFields()}),e._uU(37," Add Platform "),e.qZA(),e.TgZ(38,"button",14),e._uU(39," Submit "),e.qZA()()()()),2&o&&(e.xp6(3),e.Q6J("formGroup",t.logForm),e.xp6(6),e.Q6J("ngForOf",t.influencers),e.xp6(9),e.Q6J("ngForOf",t.currencies),e.xp6(14),e.Q6J("formGroup",t.form),e.xp6(2),e.Q6J("ngForOf",t.fields.controls),e.xp6(4),e.Q6J("disabled",!(t.logForm.valid&&t.form.valid)))},dependencies:[g.sg,r._Y,r.Fj,r.wV,r.JJ,r.JL,r.Q7,r.sg,r.u,r.x0,r.CE,U.Nt,v.KE,v.hX,A.lW,x.gD,L.ey],styles:[".form-container[_ngcontent-%COMP%]{max-height:auto;overflow-y:hidden;overflow-x:hidden;margin-left:10px}mat-form-field[_ngcontent-%COMP%]{flex:1;margin-right:10px;margin-bottom:5px}h2[_ngcontent-%COMP%]{justify-content:center;align-items:center;font-size:200%}.row[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}button[_ngcontent-%COMP%]{flex:1;margin-right:10px;margin-bottom:5px}.color[_ngcontent-%COMP%]{background-color:green}[_ngcontent-%COMP%]::-webkit-scrollbar-track{background-color:#f5f5f5}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#888;border-radius:5px}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background-color:#555}[_ngcontent-%COMP%]::-webkit-scrollbar{width:8px;height:8px}"]});var H=i(5650);class y{constructor(o,t,a,s,c){this.formBuilder=o,this.service=t,this.route=a,this.userService=s,this.toastrService=c,this.isCelebrity=!1,this.path=m.m,this.initializeElements()}initializeElements(){this.newCelebrityForm=this.formBuilder.group({generalInfo:this.formBuilder.group({Name:["",[r.kI.required]],Gender:["",[r.kI.required]],Number:[""],Email:["",[r.kI.email]],MainContentLanguage:[""],MainVertical:[""],Occupation:[""],ItpRelationship:[""],Nationality:[""],CountryLocation:[""],CityLocation:[""],Address:[""]}),socials:this.formBuilder.group({InstagramHandle:["",[r.kI.required]],InstagramFollowers:[""],InstagramLink:[""],TiktokHandle:[""],TiktokFollowers:[""],TiktokLink:[""],SnapchatHandle:[""],SnapchatFollowers:[""],SnapchatLink:[""],TwitterHandle:[""],TwitterFollowers:[""],TwitterLink:[""],FacebookHandle:[""],FacebookFollowers:[""],FacebookLink:[""],YoutubeHandle:[""],YoutubeFollowers:[""],YoutubeLink:[""],TwitchHandle:[""],TwitchFollowers:[""],TwitchLink:[""]}),agencyInfo:this.formBuilder.group({Agency:[""],AgencyContactPerson:[""],AgencyNumber:[""],AgencyEmail:["",[r.kI.email]],PreviouslyWorkedWith:[""]}),extraInfo:this.formBuilder.group({PreviousBrands:[""],Bio:[""],Notes:[""],Rating:[""]})})}onSubmit(){const o=this.processFormGroups(this.newCelebrityForm);o.updatedBy=this.userService.getID(),this.service.addCelebrity({...o}).subscribe(t=>{this.data=t,"success"===this.data.status?(this.toastrService.success("Celebrity Added Successfully"),this.route.navigate([this.path.celebrities])):this.toastrService.warning("Celebrity Not Added")})}processFormGroups(o){let t={};return o instanceof r.cw&&Object.keys(o.controls).forEach(a=>{const s=o.get(a);s instanceof r.cw?t={...t,...this.processFormGroups(s)}:s instanceof r.NI&&(t[a]=s.value)}),t}}y.\u0275fac=function(o){return new(o||y)(e.Y36(r.qu),e.Y36(H.j),e.Y36(u.F0),e.Y36(p.K),e.Y36(N._W))},y.\u0275cmp=e.Xpm({type:y,selectors:[["app-new-celebrity"]],decls:17,vars:4,consts:[[1,"form-container"],["autocomplete","off",3,"formGroup","ngSubmit"],["formGroupName","generalInfo",3,"isCelebrity"],["formGroupName","socials"],["formGroupName","agencyInfo",3,"isCelebrity"],["formGroupName","extraInfo"],["mat-raised-button","","color","primary","type","submit",3,"disabled"]],template:function(o,t){1&o&&(e.TgZ(0,"div",0)(1,"form",1),e.NdJ("ngSubmit",function(){return t.onSubmit()}),e.TgZ(2,"h2"),e._uU(3,"General Information"),e.qZA(),e._UZ(4,"app-general-info",2)(5,"hr"),e.TgZ(6,"h2"),e._uU(7,"Socials"),e.qZA(),e._UZ(8,"app-socials",3)(9,"hr"),e.TgZ(10,"h2"),e._uU(11,"Agency Information"),e.qZA(),e._UZ(12,"app-agency-info",4)(13,"hr")(14,"app-extra-info",5),e.TgZ(15,"button",6),e._uU(16," Add new Celebrity "),e.qZA()()()),2&o&&(e.xp6(1),e.Q6J("formGroup",t.newCelebrityForm),e.xp6(3),e.Q6J("isCelebrity",t.isCelebrity),e.xp6(8),e.Q6J("isCelebrity",t.isCelebrity),e.xp6(3),e.Q6J("disabled",!t.newCelebrityForm.valid))},dependencies:[r._Y,r.JL,r.sg,r.x0,A.lW,w.X,_.A,S.B,k.m]});const $=[{path:"influencer",component:h},{path:"rateLog",component:T},{path:"timeForm",component:C},{path:"celebrity",component:y},{path:"",redirectTo:"/site/notFound",pathMatch:"full"},{path:"**",redirectTo:"/site/notFound"}];class f{}f.\u0275fac=function(o){return new(o||f)},f.\u0275mod=e.oAB({type:f}),f.\u0275inj=e.cJS({imports:[u.Bz.forChild($),u.Bz]});var j=i(1685),K=i(1474);class d{}d.\u0275fac=function(o){return new(o||d)},d.\u0275mod=e.oAB({type:d}),d.\u0275inj=e.cJS({imports:[g.ez,f,r.UX,j.q,K.JF,r.u5]})}}]);