"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[949],{5650:(L,T,o)=>{o.d(T,{j:()=>m});var h=o(5516),p=o(5879),_=o(1474);class m{constructor(s){this.http=s,this.celebrityApiURL=h.N.apiUrl+"/v1/celebrities"}addCelebrity(s){return this.http.post(`${this.celebrityApiURL}/createCelebrity`,s)}getCelebrities(){return this.http.get(`${this.celebrityApiURL}/getCelebrities`)}deleteCelebrity(s){return this.http.delete(`${this.celebrityApiURL}/deleteCelebrity/${s}`)}getCelebrity(s){return this.http.get(`${this.celebrityApiURL}/getCelebrity/${s}`)}updateCelebrity(s,x){return this.http.patch(`${this.celebrityApiURL}/updateCelebrity/${x}`,s)}}m.\u0275fac=function(s){return new(s||m)(p.LFG(_.eN))},m.\u0275prov=p.Yz7({token:m,factory:m.\u0275fac,providedIn:"root"})},6949:(L,T,o)=>{o.r(T),o.d(T,{HeadOfTalentModule:()=>C});var h=o(6814),p=o(1896),_=o(3365),m=o(3566),a=o(5313),s=o(488),x=o(9347),t=o(5879),y=o(5650),Z=o(4104),k=o(3719),A=o(8902),D=o(4330),w=o(905),U=o(2179);function N(e,i){if(1&e&&(t.TgZ(0,"div",1)(1,"div",2),t._UZ(2,"app-main",3)(3,"app-platform-links",4),t.qZA(),t.TgZ(4,"mat-tab-group")(5,"mat-tab",5),t._UZ(6,"app-table-content",6),t.qZA(),t.TgZ(7,"mat-tab",7),t._UZ(8,"app-campaign-results"),t.qZA(),t.TgZ(9,"mat-tab",8),t._UZ(10,"app-statistics",6),t.qZA()()()),2&e){const n=t.oxw();t.xp6(2),t.Q6J("profileData",n.celebrityData)("id",n.id),t.xp6(1),t.Q6J("profileData",n.celebrityData),t.xp6(3),t.Q6J("profileData",n.celebrityData),t.xp6(4),t.Q6J("profileData",n.celebrityData)}}class u{constructor(i,n){this.service=i,this.source=n,this.id=0,this.isReviewVisible=!1}ngOnInit(){this.GetCelebrityData(this.source.id)}GetCelebrityData(i){this.service.getCelebrity(i).subscribe(n=>{this.celebrityData=n})}}u.\u0275fac=function(i){return new(i||u)(t.Y36(y.j),t.Y36(x.WI))},u.\u0275cmp=t.Xpm({type:u,selectors:[["app-celebrity-id"]],decls:1,vars:1,consts:[["class","influencer",4,"ngIf"],[1,"influencer"],[1,"container"],[3,"profileData","id"],[1,"platform",3,"profileData"],["label","Basic Information"],[3,"profileData"],["label","Campaign"],["label","Statistics"]],template:function(i,n){1&i&&t.YNc(0,N,11,5,"div",0),2&i&&t.Q6J("ngIf",null!=n.celebrityData||null!=n.celebrityData)},dependencies:[h.O5,Z.uX,Z.SP,k.C,A.T,D.c,w.B,U.r],styles:[".influencer[_ngcontent-%COMP%]{border-radius:0}.container[_ngcontent-%COMP%]{display:flex;justify-content:space-evenly;background-color:#232c30;align-items:center;padding:20px}.platform[_ngcontent-%COMP%]{justify-content:center}.mat-mdc-tab-group[_ngcontent-%COMP%]{background-color:#2c393f;--mdc-tab-indicator-active-indicator-color: #4789A1;--mat-tab-header-disabled-ripple-color: rgba(0, 0, 0, .38);--mat-tab-header-pagination-icon-color: #000;--mat-tab-header-inactive-label-text-color: rgba(0, 0, 0, .6);--mat-tab-header-active-label-text-color: #4789A1;--mat-tab-header-active-ripple-color: #4789A1;--mat-tab-header-inactive-ripple-color: #4789A1;--mat-tab-header-inactive-focus-label-text-color: #4789A1;--mat-tab-header-inactive-hover-label-text-color: rgba(0, 0, 0, .6);--mat-tab-header-active-focus-label-text-color: #4789A1;--mat-tab-header-active-hover-label-text-color: #4789A1;--mat-tab-header-active-focus-indicator-color: #4789A1;--mat-tab-header-active-hover-indicator-color: #4789A1}.row[_ngcontent-%COMP%]{background-color:gray}[_ngcontent-%COMP%]::-webkit-scrollbar-track{background-color:#f5f5f5}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#888;border-radius:10px}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background-color:#555}[_ngcontent-%COMP%]::-webkit-scrollbar{width:5px;height:5px}"]});var Y=o(9229),M=o(3934),F=o(3762),O=o(2032),S=o(4170),H=o(2296),v=o(617),Q=o(3606);function R(e,i){1&e&&(t.TgZ(0,"th",26),t._uU(1,"ID"),t.qZA())}function $(e,i){if(1&e&&(t.TgZ(0,"td",27),t._uU(1),t.qZA()),2&e){const n=i.$implicit;t.xp6(1),t.Oqu(n.id)}}function I(e,i){1&e&&(t.TgZ(0,"th",26),t._uU(1,"Name"),t.qZA())}function B(e,i){if(1&e&&(t.TgZ(0,"td",27),t._uU(1),t.qZA()),2&e){const n=i.$implicit;t.xp6(1),t.Oqu(n.Name)}}function G(e,i){1&e&&(t.TgZ(0,"th",26),t._uU(1,"Gender"),t.qZA())}function P(e,i){if(1&e&&(t.TgZ(0,"td",27),t._uU(1),t.qZA()),2&e){const n=i.$implicit;t.xp6(1),t.Oqu(n.Gender)}}function J(e,i){1&e&&(t.TgZ(0,"th",26),t._uU(1,"IG #"),t.qZA())}function E(e,i){if(1&e){const n=t.EpF();t.TgZ(0,"td",28),t.NdJ("click",function(){const r=t.CHM(n).$implicit,c=t.oxw();return t.KtG(c.openLink(r.InstagramLink))}),t._uU(1),t.ALo(2,"numberFormat"),t.qZA()}if(2&e){const n=i.$implicit;t.xp6(1),t.hij(" ",t.lcZ(2,1,n.InstagramFollowers)," ")}}function q(e,i){1&e&&(t.TgZ(0,"th",26),t._uU(1,"TT #"),t.qZA())}function W(e,i){if(1&e){const n=t.EpF();t.TgZ(0,"td",28),t.NdJ("click",function(){const r=t.CHM(n).$implicit,c=t.oxw();return t.KtG(c.openLink(r.TiktokLink))}),t._uU(1),t.ALo(2,"numberFormat"),t.qZA()}if(2&e){const n=i.$implicit;t.xp6(1),t.hij(" ",t.lcZ(2,1,n.TiktokFollowers)," ")}}function j(e,i){1&e&&(t.TgZ(0,"th",26),t._uU(1,"SC #"),t.qZA())}function K(e,i){if(1&e){const n=t.EpF();t.TgZ(0,"td",28),t.NdJ("click",function(){const r=t.CHM(n).$implicit,c=t.oxw();return t.KtG(c.openLink(r.SnapchatLink))}),t._uU(1),t.ALo(2,"numberFormat"),t.qZA()}if(2&e){const n=i.$implicit;t.xp6(1),t.hij(" ",t.lcZ(2,1,n.SnapchatFollowers)," ")}}function z(e,i){1&e&&(t.TgZ(0,"th",26),t._uU(1,"TW #"),t.qZA())}function V(e,i){if(1&e){const n=t.EpF();t.TgZ(0,"td",28),t.NdJ("click",function(){const r=t.CHM(n).$implicit,c=t.oxw();return t.KtG(c.openLink(r.TwitterLink))}),t._uU(1),t.ALo(2,"numberFormat"),t.qZA()}if(2&e){const n=i.$implicit;t.xp6(1),t.hij(" ",t.lcZ(2,1,n.TwitterFollowers)," ")}}function X(e,i){1&e&&(t.TgZ(0,"th",26),t._uU(1,"YT #"),t.qZA())}function tt(e,i){if(1&e){const n=t.EpF();t.TgZ(0,"td",28),t.NdJ("click",function(){const r=t.CHM(n).$implicit,c=t.oxw();return t.KtG(c.openLink(r.YoutubeLink))}),t._uU(1),t.ALo(2,"numberFormat"),t.qZA()}if(2&e){const n=i.$implicit;t.xp6(1),t.hij(" ",t.lcZ(2,1,n.YoutubeFollowers)," ")}}function et(e,i){1&e&&(t.TgZ(0,"th",26),t._uU(1,"FB #"),t.qZA())}function it(e,i){if(1&e){const n=t.EpF();t.TgZ(0,"td",28),t.NdJ("click",function(){const r=t.CHM(n).$implicit,c=t.oxw();return t.KtG(c.openLink(r.FacebookLink))}),t._uU(1),t.ALo(2,"numberFormat"),t.qZA()}if(2&e){const n=i.$implicit;t.xp6(1),t.hij(" ",t.lcZ(2,1,n.FacebookFollowers)," ")}}function nt(e,i){1&e&&(t.TgZ(0,"th",26),t._uU(1,"Location"),t.qZA())}function ot(e,i){if(1&e&&(t.TgZ(0,"td",27),t._uU(1),t.qZA()),2&e){const n=i.$implicit;t.xp6(1),t.hij(" ",n.CountryLocation," ")}}function at(e,i){1&e&&(t.TgZ(0,"th",26),t._uU(1,"Main Vertical"),t.qZA())}function rt(e,i){if(1&e&&(t.TgZ(0,"td",27),t._uU(1),t.qZA()),2&e){const n=i.$implicit;t.xp6(1),t.Oqu(n.MainVertical)}}function lt(e,i){1&e&&(t.TgZ(0,"th",29),t._uU(1,"View | Edit"),t.qZA())}function ct(e,i){if(1&e){const n=t.EpF();t.TgZ(0,"button",32),t.NdJ("click",function(){t.CHM(n);const d=t.oxw().$implicit,r=t.oxw();return t.KtG(r.deleteCelebrity(d.id))}),t._uU(1,"Delete"),t.qZA()}}function st(e,i){if(1&e){const n=t.EpF();t.TgZ(0,"td",27)(1,"button",30),t.NdJ("click",function(){const r=t.CHM(n).$implicit,c=t.oxw();return t.KtG(c.viewCelebrity(r.id))}),t.TgZ(2,"mat-icon"),t._uU(3,"remove_red_eye"),t.qZA()(),t.TgZ(4,"button",30),t.NdJ("click",function(){const r=t.CHM(n).$implicit,c=t.oxw();return t.KtG(c.editCelebrity(r.id))}),t.TgZ(5,"mat-icon"),t._uU(6,"create"),t.qZA()(),t.YNc(7,ct,2,0,"button",31),t.qZA()}if(2&e){const n=t.oxw();t.xp6(7),t.Q6J("ngIf","superadmin"==n.userRole)}}function mt(e,i){1&e&&t._UZ(0,"tr",33)}function dt(e,i){1&e&&t._UZ(0,"tr",34)}const pt=function(){return[3,5,10,25,100]};class b{constructor(i,n,l,d,r){this.service=i,this.dialog=n,this.toastrService=l,this.userService=d,this.dialogService=r,this.userRole=this.userService.getRole(),this.displayedColumns=["Name","Gender","InstagramFollowers","TiktokFollowers","SnapchatFollowers","TwitterFollowers","FacebookFollowers","YoutubeFollowers","CountryLocation","MainVertical","Action"]}ngOnInit(){this.GetAllCelebrities()}GetAllCelebrities(){this.service.getCelebrities().subscribe(i=>{this.UserDetails=i,this.dataSource=new a.by(this.UserDetails),this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort})}applyFilter(i){this.dataSource.filter=i.trim().toLowerCase()}deleteCelebrity(i){this.dialogService.openConfirmationDialog("Confirm!","Are you sure you want to delete?").subscribe(n=>{!0===n&&(this.toastrService.success("Deleted Successfully!"),this.service.deleteCelebrity(i).subscribe(l=>{this.GetAllCelebrities()}))})}editCelebrity(i){this.dialog.open(s.l,{width:"80%",height:"70%",exitAnimationDuration:"1000ms",enterAnimationDuration:"1000ms",data:{id:i}})}viewCelebrity(i){this.dialog.open(u,{width:"80%",height:"70%",exitAnimationDuration:"1000ms",enterAnimationDuration:"1000ms",data:{id:i}})}openLink(i){i&&window.open(i,"_blank")}}b.\u0275fac=function(i){return new(i||b)(t.Y36(y.j),t.Y36(x.uw),t.Y36(Y._W),t.Y36(M.K),t.Y36(F.O))},b.\u0275cmp=t.Xpm({type:b,selectors:[["app-celebrities-list"]],viewQuery:function(i,n){if(1&i&&(t.Gf(_.NW,5),t.Gf(m.YE,5)),2&i){let l;t.iGM(l=t.CRH())&&(n.paginator=l.first),t.iGM(l=t.CRH())&&(n.sort=l.first)}},decls:49,vars:8,consts:[[2,"position","relative"],[2,"width","100%","height","10%","margin-left","0px"],["matInput","","placeholder","\u{1f50d} Search",3,"keyup"],["searchInput",""],["mat-raised-button","","routerLink","/home/talent/new/celebrity",1,"new-i",2,"width","15%","padding","25px 5px","margin-bottom","10px"],[1,"table-container"],["mat-table","","matSort","",3,"dataSource"],["matColumnDef","ID"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","Name"],["matColumnDef","Gender"],["matColumnDef","InstagramFollowers"],["mat-cell","",3,"click",4,"matCellDef"],["matColumnDef","TiktokFollowers"],["matColumnDef","SnapchatFollowers"],["matColumnDef","TwitterFollowers"],["matColumnDef","YoutubeFollowers"],["matColumnDef","FacebookFollowers"],["matColumnDef","CountryLocation"],["matColumnDef","MainVertical"],["matColumnDef","Action"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-header-row","",4,"matHeaderRowDef","matHeaderRowDefSticky"],["mat-row","","sticky","",4,"matRowDef","matRowDefColumns"],["aria-label","Select page",3,"length","pageSize","pageSizeOptions"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-cell","",3,"click"],["mat-header-cell",""],[1,"icon-btn",3,"click"],["mat-raised-button","","color","warn",3,"click",4,"ngIf"],["mat-raised-button","","color","warn",3,"click"],["mat-header-row",""],["mat-row","","sticky",""]],template:function(i,n){if(1&i){const l=t.EpF();t.TgZ(0,"div",0)(1,"mat-form-field",1)(2,"input",2,3),t.NdJ("keyup",function(){t.CHM(l);const r=t.MAs(3);return t.KtG(n.applyFilter(r.value))}),t.qZA()(),t.TgZ(4,"button",4)(5,"mat-icon"),t._uU(6,"add_circle_outline"),t.qZA(),t._uU(7," New Celebrity "),t.qZA(),t.TgZ(8,"div",5)(9,"table",6),t.ynx(10,7),t.YNc(11,R,2,0,"th",8),t.YNc(12,$,2,1,"td",9),t.BQk(),t.ynx(13,10),t.YNc(14,I,2,0,"th",8),t.YNc(15,B,2,1,"td",9),t.BQk(),t.ynx(16,11),t.YNc(17,G,2,0,"th",8),t.YNc(18,P,2,1,"td",9),t.BQk(),t.ynx(19,12),t.YNc(20,J,2,0,"th",8),t.YNc(21,E,3,3,"td",13),t.BQk(),t.ynx(22,14),t.YNc(23,q,2,0,"th",8),t.YNc(24,W,3,3,"td",13),t.BQk(),t.ynx(25,15),t.YNc(26,j,2,0,"th",8),t.YNc(27,K,3,3,"td",13),t.BQk(),t.ynx(28,16),t.YNc(29,z,2,0,"th",8),t.YNc(30,V,3,3,"td",13),t.BQk(),t.ynx(31,17),t.YNc(32,X,2,0,"th",8),t.YNc(33,tt,3,3,"td",13),t.BQk(),t.ynx(34,18),t.YNc(35,et,2,0,"th",8),t.YNc(36,it,3,3,"td",13),t.BQk(),t.ynx(37,19),t.YNc(38,nt,2,0,"th",8),t.YNc(39,ot,2,1,"td",9),t.BQk(),t.ynx(40,20),t.YNc(41,at,2,0,"th",8),t.YNc(42,rt,2,1,"td",9),t.BQk(),t.ynx(43,21),t.YNc(44,lt,2,0,"th",22),t.YNc(45,st,8,1,"td",9),t.BQk(),t.YNc(46,mt,1,0,"tr",23),t.YNc(47,dt,1,0,"tr",24),t.qZA(),t._UZ(48,"mat-paginator",25),t.qZA()()}2&i&&(t.xp6(9),t.Q6J("dataSource",n.dataSource),t.xp6(37),t.Q6J("matHeaderRowDef",n.displayedColumns)("matHeaderRowDefSticky",!0),t.xp6(1),t.Q6J("matRowDefColumns",n.displayedColumns),t.xp6(1),t.Q6J("length",100)("pageSize",5)("pageSizeOptions",t.DdM(7,pt)))},dependencies:[h.O5,p.rH,O.Nt,S.KE,H.lW,v.Hw,a.BZ,a.fO,a.as,a.w1,a.Dz,a.nj,a.ge,a.ev,a.XQ,a.Gk,_.NW,m.YE,m.nU,Q.p],styles:["table[_ngcontent-%COMP%]{width:100%}.warn[_ngcontent-%COMP%]{background-color:red;color:#fff}.table-container[_ngcontent-%COMP%]{max-height:auto;overflow-y:hidden}.searchInput[_ngcontent-%COMP%]{color:#fff!important}.matInput[_ngcontent-%COMP%]{color:#fff}.search-container[_ngcontent-%COMP%]{padding-top:2%;padding-left:1%;top:5;left:0;right:0;z-index:1;background-color:#2c393f;position:sticky}.form-container[_ngcontent-%COMP%]{max-height:auto;overflow-y:hidden;overflow-x:hidden;box-shadow:#00000005 0 1px 3px,#00000026 0 0 0 1px}.row[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}@media (max-width: 1440px),(max-height: 900px){.mat-mdc-raised-button[_ngcontent-%COMP%]{font-size:11px}}"]});var ut=o(5753),ft=o(1921);function Ct(e,i){1&e&&(t.TgZ(0,"th",10),t._uU(1,"Name"),t.qZA())}function ht(e,i){if(1&e&&(t.TgZ(0,"td",11),t._uU(1),t.qZA()),2&e){const n=i.$implicit;t.xp6(1),t.Oqu(n.name)}}function _t(e,i){1&e&&(t.TgZ(0,"th",10),t._uU(1,"Total Weight"),t.qZA())}function bt(e,i){if(1&e&&(t.TgZ(0,"td",11),t._uU(1),t.qZA()),2&e){const n=i.$implicit;t.xp6(1),t.Oqu(n.totalWeight)}}function gt(e,i){1&e&&(t.TgZ(0,"th",10),t._uU(1,"View"),t.qZA())}function Tt(e,i){1&e&&(t.TgZ(0,"td",11)(1,"button",12)(2,"mat-icon"),t._uU(3,"remove_red_eye"),t.qZA()()())}function xt(e,i){1&e&&t._UZ(0,"tr",13)}function yt(e,i){if(1&e&&t._UZ(0,"tr",14),2&e){const n=i.$implicit,l=t.oxw();t.s9C("routerLink",l.path.personTasks+n.id)}}class g{constructor(i){this.taskService=i,this.path=ut.m,this.displayedColumns=["name","totalWeight","action"]}ngOnInit(){this.getTalentTaskWeights()}getTalentTaskWeights(){this.taskService.getUsersAndTaskWeights().subscribe(i=>{this.dataSource=i.usersWithTasks})}}g.\u0275fac=function(i){return new(i||g)(t.Y36(ft.M))},g.\u0275cmp=t.Xpm({type:g,selectors:[["app-task-list"]],decls:16,vars:4,consts:[[1,"table-container"],["mat-table","","matSort","",3,"dataSource"],["table",""],["matColumnDef","name"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","totalWeight"],["matColumnDef","action"],["mat-header-row","",4,"matHeaderRowDef","matHeaderRowDefSticky"],["mat-row","",3,"routerLink",4,"matRowDef","matRowDefColumns"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],[1,"icon-btn"],["mat-header-row",""],["mat-row","",3,"routerLink"]],template:function(i,n){1&i&&(t.TgZ(0,"div")(1,"div",0)(2,"table",1,2),t.ynx(4,3),t.YNc(5,Ct,2,0,"th",4),t.YNc(6,ht,2,1,"td",5),t.BQk(),t.ynx(7,6),t.YNc(8,_t,2,0,"th",4),t.YNc(9,bt,2,1,"td",5),t.BQk(),t.ynx(10,7),t.YNc(11,gt,2,0,"th",4),t.YNc(12,Tt,4,0,"td",5),t.BQk(),t.YNc(13,xt,1,0,"tr",8),t.YNc(14,yt,1,1,"tr",9),t.qZA(),t._UZ(15,"mat-paginator"),t.qZA()()),2&i&&(t.xp6(2),t.Q6J("dataSource",n.dataSource),t.xp6(11),t.Q6J("matHeaderRowDef",n.displayedColumns)("matHeaderRowDefSticky",!0),t.xp6(1),t.Q6J("matRowDefColumns",n.displayedColumns))},dependencies:[p.rH,v.Hw,a.BZ,a.fO,a.as,a.w1,a.Dz,a.nj,a.ge,a.ev,a.XQ,a.Gk,_.NW,m.YE,m.nU],styles:[".table-container[_ngcontent-%COMP%]{padding-top:1%;max-height:auto}"]});const Zt=[{path:"celebrities",component:b},{path:"celebrity/:id",component:u},{path:"execTasks",component:g},{path:"",redirectTo:"/site/notFound",pathMatch:"full"},{path:"**",redirectTo:"/site/notFound"}];class f{}f.\u0275fac=function(i){return new(i||f)},f.\u0275mod=t.oAB({type:f}),f.\u0275inj=t.cJS({imports:[p.Bz.forChild(Zt),p.Bz]});var vt=o(8519),Lt=o(1670),kt=o(6223),At=o(9637);class C{}C.\u0275fac=function(i){return new(i||C)},C.\u0275mod=t.oAB({type:C}),C.\u0275inj=t.cJS({imports:[h.ez,f,vt.q,Lt.SharedModule,At.SharingModule,kt.UX]})}}]);