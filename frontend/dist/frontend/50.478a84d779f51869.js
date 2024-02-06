"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[50],{5650:(k,x,o)=>{o.d(x,{j:()=>s});var h=o(5516),d=o(5879),u=o(1474);class s{constructor(m){this.http=m,this.celebrityApiURL=h.N.apiUrl+"/v1/celebrities"}addCelebrity(m){return this.http.post(`${this.celebrityApiURL}/createCelebrity`,m)}getCelebrities(){return this.http.get(`${this.celebrityApiURL}/getCelebrities`)}deleteCelebrity(m){return this.http.delete(`${this.celebrityApiURL}/deleteCelebrity/${m}`)}getCelebrity(m){return this.http.get(`${this.celebrityApiURL}/getCelebrity/${m}`)}updateCelebrity(m,y){return this.http.patch(`${this.celebrityApiURL}/updateCelebrity/${y}`,m)}}s.\u0275fac=function(m){return new(m||s)(d.LFG(u.eN))},s.\u0275prov=d.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"})},50:(k,x,o)=>{o.r(x),o.d(x,{HeadOfTalentModule:()=>_});var h=o(6814),d=o(1896),u=o(1476),s=o(3566),r=o(5313),m=o(488),y=o(9347),t=o(5879),Z=o(5650),v=o(4104),A=o(3719),D=o(8902),w=o(4330),N=o(905),U=o(2179);function M(e,n){if(1&e&&(t.TgZ(0,"div",1)(1,"div",2),t._UZ(2,"app-main",3)(3,"app-platform-links",4),t.qZA(),t.TgZ(4,"mat-tab-group")(5,"mat-tab",5),t._UZ(6,"app-table-content",6),t.qZA(),t.TgZ(7,"mat-tab",7),t._UZ(8,"app-campaign-results"),t.qZA(),t.TgZ(9,"mat-tab",8),t._UZ(10,"app-statistics",6),t.qZA()()()),2&e){const i=t.oxw();t.xp6(2),t.Q6J("profileData",i.celebrityData)("id",i.id),t.xp6(1),t.Q6J("profileData",i.celebrityData),t.xp6(3),t.Q6J("profileData",i.celebrityData),t.xp6(4),t.Q6J("profileData",i.celebrityData)}}class f{constructor(n,i){this.service=n,this.source=i,this.id=0,this.isReviewVisible=!1}ngOnInit(){this.GetCelebrityData(this.source.id)}GetCelebrityData(n){this.service.getCelebrity(n).subscribe(i=>{this.celebrityData=i})}}f.\u0275fac=function(n){return new(n||f)(t.Y36(Z.j),t.Y36(y.WI))},f.\u0275cmp=t.Xpm({type:f,selectors:[["app-celebrity-id"]],decls:1,vars:1,consts:[["class","influencer",4,"ngIf"],[1,"influencer"],[1,"container"],[3,"profileData","id"],[1,"platform",3,"profileData"],["label","Basic Information"],[3,"profileData"],["label","Campaign"],["label","Statistics"]],template:function(n,i){1&n&&t.YNc(0,M,11,5,"div",0),2&n&&t.Q6J("ngIf",null!=i.celebrityData||null!=i.celebrityData)},dependencies:[h.O5,v.uX,v.SP,A.C,D.T,w.c,N.B,U.r],styles:[".influencer[_ngcontent-%COMP%]{border-radius:0}.container[_ngcontent-%COMP%]{display:flex;justify-content:space-evenly;background-color:#232c30;align-items:center;padding:20px}.platform[_ngcontent-%COMP%]{justify-content:center}.mat-mdc-tab-group[_ngcontent-%COMP%]{background-color:#2c393f;--mdc-tab-indicator-active-indicator-color: #4789A1;--mat-tab-header-disabled-ripple-color: rgba(0, 0, 0, .38);--mat-tab-header-pagination-icon-color: #000;--mat-tab-header-inactive-label-text-color: rgba(0, 0, 0, .6);--mat-tab-header-active-label-text-color: #4789A1;--mat-tab-header-active-ripple-color: #4789A1;--mat-tab-header-inactive-ripple-color: #4789A1;--mat-tab-header-inactive-focus-label-text-color: #4789A1;--mat-tab-header-inactive-hover-label-text-color: rgba(0, 0, 0, .6);--mat-tab-header-active-focus-label-text-color: #4789A1;--mat-tab-header-active-hover-label-text-color: #4789A1;--mat-tab-header-active-focus-indicator-color: #4789A1;--mat-tab-header-active-hover-indicator-color: #4789A1}.row[_ngcontent-%COMP%]{background-color:gray}[_ngcontent-%COMP%]::-webkit-scrollbar-track{background-color:#f5f5f5}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#888;border-radius:10px}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background-color:#555}[_ngcontent-%COMP%]::-webkit-scrollbar{width:5px;height:5px}"]});var Y=o(9229),O=o(3934),S=o(3762),F=o(2032),Q=o(4170),P=o(2296),L=o(617),G=o(3606);function H(e,n){1&e&&(t.TgZ(0,"th",29),t._uU(1,"ID"),t.qZA())}function R(e,n){if(1&e&&(t.TgZ(0,"td",30),t._uU(1),t.qZA()),2&e){const i=n.$implicit;t.xp6(1),t.Oqu(i.id)}}function $(e,n){1&e&&(t.TgZ(0,"th",29),t._uU(1,"Name"),t.qZA())}function B(e,n){if(1&e&&(t.TgZ(0,"td",31),t._uU(1),t.qZA()),2&e){const i=n.$implicit;t.xp6(1),t.Oqu(i.Name)}}function I(e,n){1&e&&(t.TgZ(0,"th",29),t._uU(1,"Gender"),t.qZA())}function J(e,n){if(1&e&&(t.TgZ(0,"td",30),t._uU(1),t.qZA()),2&e){const i=n.$implicit;t.xp6(1),t.Oqu(i.Gender)}}function q(e,n){1&e&&(t.TgZ(0,"th",29),t._uU(1,"IG #"),t.qZA())}function E(e,n){if(1&e){const i=t.EpF();t.TgZ(0,"td",32),t.NdJ("click",function(){const l=t.CHM(i).$implicit,c=t.oxw();return t.KtG(c.openLink(l.InstagramLink))}),t._uU(1),t.ALo(2,"numberFormat"),t.qZA()}if(2&e){const i=n.$implicit;t.xp6(1),t.hij(" ",t.lcZ(2,1,i.InstagramFollowers)," ")}}function W(e,n){1&e&&(t.TgZ(0,"th",29),t._uU(1,"TT #"),t.qZA())}function j(e,n){if(1&e){const i=t.EpF();t.TgZ(0,"td",32),t.NdJ("click",function(){const l=t.CHM(i).$implicit,c=t.oxw();return t.KtG(c.openLink(l.TiktokLink))}),t._uU(1),t.ALo(2,"numberFormat"),t.qZA()}if(2&e){const i=n.$implicit;t.xp6(1),t.hij(" ",t.lcZ(2,1,i.TiktokFollowers)," ")}}function z(e,n){1&e&&(t.TgZ(0,"th",29),t._uU(1,"SC #"),t.qZA())}function K(e,n){if(1&e){const i=t.EpF();t.TgZ(0,"td",32),t.NdJ("click",function(){const l=t.CHM(i).$implicit,c=t.oxw();return t.KtG(c.openLink(l.SnapchatLink))}),t._uU(1),t.ALo(2,"numberFormat"),t.qZA()}if(2&e){const i=n.$implicit;t.xp6(1),t.hij(" ",t.lcZ(2,1,i.SnapchatFollowers)," ")}}function V(e,n){1&e&&(t.TgZ(0,"th",29),t._uU(1,"TW #"),t.qZA())}function X(e,n){if(1&e){const i=t.EpF();t.TgZ(0,"td",32),t.NdJ("click",function(){const l=t.CHM(i).$implicit,c=t.oxw();return t.KtG(c.openLink(l.TwitterLink))}),t._uU(1),t.ALo(2,"numberFormat"),t.qZA()}if(2&e){const i=n.$implicit;t.xp6(1),t.hij(" ",t.lcZ(2,1,i.TwitterFollowers)," ")}}function tt(e,n){1&e&&(t.TgZ(0,"th",29),t._uU(1,"YT #"),t.qZA())}function et(e,n){if(1&e){const i=t.EpF();t.TgZ(0,"td",32),t.NdJ("click",function(){const l=t.CHM(i).$implicit,c=t.oxw();return t.KtG(c.openLink(l.YoutubeLink))}),t._uU(1),t.ALo(2,"numberFormat"),t.qZA()}if(2&e){const i=n.$implicit;t.xp6(1),t.hij(" ",t.lcZ(2,1,i.YoutubeFollowers)," ")}}function nt(e,n){1&e&&(t.TgZ(0,"th",29),t._uU(1,"FB #"),t.qZA())}function it(e,n){if(1&e){const i=t.EpF();t.TgZ(0,"td",32),t.NdJ("click",function(){const l=t.CHM(i).$implicit,c=t.oxw();return t.KtG(c.openLink(l.FacebookLink))}),t._uU(1),t.ALo(2,"numberFormat"),t.qZA()}if(2&e){const i=n.$implicit;t.xp6(1),t.hij(" ",t.lcZ(2,1,i.FacebookFollowers)," ")}}function ot(e,n){1&e&&(t.TgZ(0,"th",29),t._uU(1,"Location"),t.qZA())}function at(e,n){if(1&e&&(t.TgZ(0,"td",30),t._uU(1),t.qZA()),2&e){const i=n.$implicit;t.xp6(1),t.hij(" ",i.CountryLocation," ")}}function rt(e,n){1&e&&(t.TgZ(0,"th",29),t._uU(1,"Main Vertical"),t.qZA())}function lt(e,n){if(1&e&&(t.TgZ(0,"td",30),t._uU(1),t.qZA()),2&e){const i=n.$implicit;t.xp6(1),t.Oqu(i.MainVertical)}}function ct(e,n){1&e&&(t.TgZ(0,"th",29),t._uU(1,"Game"),t.qZA())}function st(e,n){if(1&e&&(t.TgZ(0,"td",31),t._uU(1),t.qZA()),2&e){const i=n.$implicit;t.xp6(1),t.Oqu(i.Game)}}function mt(e,n){1&e&&(t.TgZ(0,"th",33),t._uU(1,"View | Edit"),t.qZA())}function pt(e,n){if(1&e){const i=t.EpF();t.TgZ(0,"button",36),t.NdJ("click",function(){t.CHM(i);const p=t.oxw().$implicit,l=t.oxw();return t.KtG(l.deleteCelebrity(p.id))}),t._uU(1,"Delete"),t.qZA()}}function dt(e,n){if(1&e){const i=t.EpF();t.TgZ(0,"td",30)(1,"button",34),t.NdJ("click",function(){const l=t.CHM(i).$implicit,c=t.oxw();return t.KtG(c.viewCelebrity(l.id))}),t.TgZ(2,"mat-icon"),t._uU(3,"remove_red_eye"),t.qZA()(),t.TgZ(4,"button",34),t.NdJ("click",function(){const l=t.CHM(i).$implicit,c=t.oxw();return t.KtG(c.editCelebrity(l.id))}),t.TgZ(5,"mat-icon"),t._uU(6,"create"),t.qZA()(),t.YNc(7,pt,2,0,"button",35),t.qZA()}if(2&e){const i=t.oxw();t.xp6(7),t.Q6J("ngIf","superadmin"==i.userRole)}}function ut(e,n){1&e&&t._UZ(0,"tr",37)}function ft(e,n){1&e&&t._UZ(0,"tr",38)}const Ct=function(){return[3,5,10,25,100]};class b{constructor(n,i,a,p,l){this.service=n,this.dialog=i,this.toastrService=a,this.userService=p,this.dialogService=l,this.userRole=this.userService.getRole(),this.displayedColumns=["Name","InstagramFollowers","TiktokFollowers","TwitterFollowers","YoutubeFollowers","CountryLocation","MainVertical","Game","Action"]}ngOnInit(){this.GetAllCelebrities()}GetAllCelebrities(){this.service.getCelebrities().subscribe(n=>{this.UserDetails=n,this.dataSource=new r.by(this.UserDetails),this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort})}applyFilter(n){this.dataSource.filter=n.trim().toLowerCase()}deleteCelebrity(n){this.dialogService.openConfirmationDialog("Confirm!","Are you sure you want to delete?").subscribe(i=>{!0===i&&(this.toastrService.success("Deleted Successfully!"),this.service.deleteCelebrity(n).subscribe(a=>{this.GetAllCelebrities()}))})}editCelebrity(n){this.dialog.open(m.l,{width:"80%",height:"70%",exitAnimationDuration:"1000ms",enterAnimationDuration:"1000ms",data:{id:n}})}viewCelebrity(n){this.dialog.open(f,{width:"80%",height:"70%",exitAnimationDuration:"1000ms",enterAnimationDuration:"1000ms",data:{id:n}})}openLink(n){n&&window.open(n,"_blank")}}b.\u0275fac=function(n){return new(n||b)(t.Y36(Z.j),t.Y36(y.uw),t.Y36(Y._W),t.Y36(O.K),t.Y36(S.O))},b.\u0275cmp=t.Xpm({type:b,selectors:[["app-celebrities-list"]],viewQuery:function(n,i){if(1&n&&(t.Gf(u.NW,5),t.Gf(s.YE,5)),2&n){let a;t.iGM(a=t.CRH())&&(i.paginator=a.first),t.iGM(a=t.CRH())&&(i.sort=a.first)}},decls:53,vars:8,consts:[[2,"position","relative"],[2,"width","100%","height","10%","margin-left","0px"],["matInput","","placeholder","\u{1f50d} Search",3,"keyup"],["searchInput",""],[1,"new-celeb"],["mat-raised-button","","routerLink","/home/talent/new/celebrity"],[1,"table-container"],["mat-table","","matSort","",3,"dataSource"],["matColumnDef","ID"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","Name"],["mat-cell","","class","truncate",4,"matCellDef"],["matColumnDef","Gender"],["matColumnDef","InstagramFollowers"],["mat-cell","",3,"click",4,"matCellDef"],["matColumnDef","TiktokFollowers"],["matColumnDef","SnapchatFollowers"],["matColumnDef","TwitterFollowers"],["matColumnDef","YoutubeFollowers"],["matColumnDef","FacebookFollowers"],["matColumnDef","CountryLocation"],["matColumnDef","MainVertical"],["matColumnDef","Game",1,"truncate"],["matColumnDef","Action"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-header-row","",4,"matHeaderRowDef","matHeaderRowDefSticky"],["mat-row","","sticky","",4,"matRowDef","matRowDefColumns"],["aria-label","Select page",3,"length","pageSize","pageSizeOptions"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-cell","",1,"truncate"],["mat-cell","",3,"click"],["mat-header-cell",""],[1,"icon-btn",3,"click"],["mat-raised-button","","class","delete-btn",3,"click",4,"ngIf"],["mat-raised-button","",1,"delete-btn",3,"click"],["mat-header-row",""],["mat-row","","sticky",""]],template:function(n,i){if(1&n){const a=t.EpF();t.TgZ(0,"div",0)(1,"mat-form-field",1)(2,"input",2,3),t.NdJ("keyup",function(){t.CHM(a);const l=t.MAs(3);return t.KtG(i.applyFilter(l.value))}),t.qZA()(),t.TgZ(4,"div",4)(5,"button",5)(6,"mat-icon"),t._uU(7,"add_circle_outline"),t.qZA(),t._uU(8," New Celebrity "),t.qZA()(),t.TgZ(9,"div",6)(10,"table",7),t.ynx(11,8),t.YNc(12,H,2,0,"th",9),t.YNc(13,R,2,1,"td",10),t.BQk(),t.ynx(14,11),t.YNc(15,$,2,0,"th",9),t.YNc(16,B,2,1,"td",12),t.BQk(),t.ynx(17,13),t.YNc(18,I,2,0,"th",9),t.YNc(19,J,2,1,"td",10),t.BQk(),t.ynx(20,14),t.YNc(21,q,2,0,"th",9),t.YNc(22,E,3,3,"td",15),t.BQk(),t.ynx(23,16),t.YNc(24,W,2,0,"th",9),t.YNc(25,j,3,3,"td",15),t.BQk(),t.ynx(26,17),t.YNc(27,z,2,0,"th",9),t.YNc(28,K,3,3,"td",15),t.BQk(),t.ynx(29,18),t.YNc(30,V,2,0,"th",9),t.YNc(31,X,3,3,"td",15),t.BQk(),t.ynx(32,19),t.YNc(33,tt,2,0,"th",9),t.YNc(34,et,3,3,"td",15),t.BQk(),t.ynx(35,20),t.YNc(36,nt,2,0,"th",9),t.YNc(37,it,3,3,"td",15),t.BQk(),t.ynx(38,21),t.YNc(39,ot,2,0,"th",9),t.YNc(40,at,2,1,"td",10),t.BQk(),t.ynx(41,22),t.YNc(42,rt,2,0,"th",9),t.YNc(43,lt,2,1,"td",10),t.BQk(),t.ynx(44,23),t.YNc(45,ct,2,0,"th",9),t.YNc(46,st,2,1,"td",12),t.BQk(),t.ynx(47,24),t.YNc(48,mt,2,0,"th",25),t.YNc(49,dt,8,1,"td",10),t.BQk(),t.YNc(50,ut,1,0,"tr",26),t.YNc(51,ft,1,0,"tr",27),t.qZA(),t._UZ(52,"mat-paginator",28),t.qZA()()}2&n&&(t.xp6(10),t.Q6J("dataSource",i.dataSource),t.xp6(40),t.Q6J("matHeaderRowDef",i.displayedColumns)("matHeaderRowDefSticky",!0),t.xp6(1),t.Q6J("matRowDefColumns",i.displayedColumns),t.xp6(1),t.Q6J("length",100)("pageSize",25)("pageSizeOptions",t.DdM(7,Ct)))},dependencies:[h.O5,d.rH,F.Nt,Q.KE,P.lW,L.Hw,r.BZ,r.fO,r.as,r.w1,r.Dz,r.nj,r.ge,r.ev,r.XQ,r.Gk,u.NW,s.YE,s.nU,G.p],styles:["table[_ngcontent-%COMP%]{width:100%}.delete-btn[_ngcontent-%COMP%]{padding:10px 15px;background-color:transparent!important;color:#fff!important;border:1px solid #FF0000;border-radius:4px;cursor:pointer;margin-bottom:2%}.delete-btn[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:hover{background-color:red}.table-container[_ngcontent-%COMP%]{max-height:auto;overflow-y:hidden}.searchInput[_ngcontent-%COMP%]{color:#fff!important}.matInput[_ngcontent-%COMP%]{color:#fff}.search-container[_ngcontent-%COMP%]{padding-top:2%;padding-left:1%;top:5;left:0;right:0;z-index:1;background-color:#2c393f;position:sticky}.form-container[_ngcontent-%COMP%]{max-height:auto;overflow-y:hidden;overflow-x:hidden;box-shadow:#00000005 0 1px 3px,#00000026 0 0 0 1px}.row[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}@media (max-width: 1440px),(max-height: 900px){.mat-mdc-raised-button[_ngcontent-%COMP%]{font-size:11px}}.new-celeb[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:10px 15px;background-color:transparent!important;color:#fff!important;border:1px solid #4789A1;border-radius:4px;cursor:pointer;margin-bottom:2%}.new-celeb[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background-color:#4789a1}.truncate[_ngcontent-%COMP%]{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:150px}"]});var _t=o(5753),ht=o(1921);class g{transform(n,i,a){return n?i:a}}function bt(e,n){1&e&&(t.TgZ(0,"th",12),t._uU(1,"Name"),t.qZA())}function gt(e,n){if(1&e&&(t.TgZ(0,"td",13),t._uU(1),t.qZA()),2&e){const i=n.$implicit;t.xp6(1),t.Oqu(i.name)}}function Tt(e,n){1&e&&(t.TgZ(0,"th",12),t._uU(1,"Total Weight"),t.qZA())}function xt(e,n){if(1&e&&(t.TgZ(0,"td",13),t._uU(1),t.qZA()),2&e){const i=n.$implicit;t.xp6(1),t.Oqu(i.totalWeight)}}function yt(e,n){1&e&&(t.TgZ(0,"th",12),t._uU(1,"On Leave "),t.qZA())}function Zt(e,n){if(1&e&&(t.TgZ(0,"td",13),t._uU(1),t.ALo(2,"boolean"),t.qZA()),2&e){const i=n.$implicit;t.xp6(1),t.Oqu(t.Dn7(2,1,i.onLeave,"Yes","No"))}}function vt(e,n){1&e&&(t.TgZ(0,"th",12),t._uU(1,"View"),t.qZA())}function Lt(e,n){1&e&&(t.TgZ(0,"td",13)(1,"button",14)(2,"mat-icon"),t._uU(3,"remove_red_eye"),t.qZA()()())}function kt(e,n){1&e&&t._UZ(0,"tr",15)}function At(e,n){if(1&e&&t._UZ(0,"tr",16),2&e){const i=n.$implicit,a=t.oxw();t.s9C("routerLink",a.path.personTasks+i.id)}}g.\u0275fac=function(n){return new(n||g)},g.\u0275pipe=t.Yjl({name:"boolean",type:g,pure:!0});const Dt=function(){return[3,5,10,25,100]};class T{constructor(n){this.taskService=n,this.path=_t.m,this.displayedColumns=["name","totalWeight","onLeave","action"]}ngOnInit(){this.getTalentTaskWeights()}getTalentTaskWeights(){this.taskService.getUsersAndTaskWeights().subscribe(n=>{console.log(n),this.dataSource=new r.by(n.usersWithTasks),this.dataSource.sort=this.sort,this.dataSource.paginator=this.paginator})}}T.\u0275fac=function(n){return new(n||T)(t.Y36(ht.M))},T.\u0275cmp=t.Xpm({type:T,selectors:[["app-task-list"]],viewQuery:function(n,i){if(1&n&&(t.Gf(u.NW,5),t.Gf(s.YE,5)),2&n){let a;t.iGM(a=t.CRH())&&(i.paginator=a.first),t.iGM(a=t.CRH())&&(i.sort=a.first)}},decls:19,vars:8,consts:[[1,"table-container"],["mat-table","","matSort","",3,"dataSource"],["table",""],["matColumnDef","name"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","totalWeight"],["matColumnDef","onLeave"],["matColumnDef","action"],["mat-header-row","",4,"matHeaderRowDef","matHeaderRowDefSticky"],["mat-row","",3,"routerLink",4,"matRowDef","matRowDefColumns"],["aria-label","Select page",3,"length","pageSize","pageSizeOptions"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],[1,"icon-btn"],["mat-header-row",""],["mat-row","",3,"routerLink"]],template:function(n,i){1&n&&(t.TgZ(0,"div")(1,"div",0)(2,"table",1,2),t.ynx(4,3),t.YNc(5,bt,2,0,"th",4),t.YNc(6,gt,2,1,"td",5),t.BQk(),t.ynx(7,6),t.YNc(8,Tt,2,0,"th",4),t.YNc(9,xt,2,1,"td",5),t.BQk(),t.ynx(10,7),t.YNc(11,yt,2,0,"th",4),t.YNc(12,Zt,3,5,"td",5),t.BQk(),t.ynx(13,8),t.YNc(14,vt,2,0,"th",4),t.YNc(15,Lt,4,0,"td",5),t.BQk(),t.YNc(16,kt,1,0,"tr",9),t.YNc(17,At,1,1,"tr",10),t.qZA(),t._UZ(18,"mat-paginator",11),t.qZA()()),2&n&&(t.xp6(2),t.Q6J("dataSource",i.dataSource),t.xp6(14),t.Q6J("matHeaderRowDef",i.displayedColumns)("matHeaderRowDefSticky",!0),t.xp6(1),t.Q6J("matRowDefColumns",i.displayedColumns),t.xp6(1),t.Q6J("length",100)("pageSize",10)("pageSizeOptions",t.DdM(7,Dt)))},dependencies:[d.rH,L.Hw,r.BZ,r.fO,r.as,r.w1,r.Dz,r.nj,r.ge,r.ev,r.XQ,r.Gk,u.NW,s.YE,s.nU,g],styles:[".table-container[_ngcontent-%COMP%]{padding-top:1%;max-height:auto}"]});const wt=[{path:"celebrities",component:b},{path:"celebrity/:id",component:f},{path:"execTasks",component:T},{path:"",redirectTo:"/site/notFound",pathMatch:"full"},{path:"**",redirectTo:"/site/notFound"}];class C{}C.\u0275fac=function(n){return new(n||C)},C.\u0275mod=t.oAB({type:C}),C.\u0275inj=t.cJS({imports:[d.Bz.forChild(wt),d.Bz]});var Nt=o(8519),Ut=o(1670),Mt=o(6223),Yt=o(8853);class _{}_.\u0275fac=function(n){return new(n||_)},_.\u0275mod=t.oAB({type:_}),_.\u0275inj=t.cJS({imports:[h.ez,C,Nt.q,Ut.SharedModule,Yt.SharingModule,Mt.UX]})}}]);