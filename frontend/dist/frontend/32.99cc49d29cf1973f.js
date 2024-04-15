"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[32],{1213:(D,T,i)=>{i.d(T,{K$:()=>u,KY:()=>l,ew:()=>t,yE:()=>d});const u=["sales","talent","campaign","originals","superadmin"],l=["1","2","3","4","5","6","7","8","9","10"],d={SALES:1,TALENT:2,CAMPAIGN:3},t=["Production","Editing","Graphic Design"]},6032:(D,T,i)=>{i.r(T),i.d(T,{AdminModule:()=>_});var u=i(6814),l=i(1896),d=i(1213),t=i(5879),b=i(3934),s=i(6223),q=i(9229),N=i(3762),v=i(2032),c=i(4170),A=i(2296),w=i(8525),S=i(3680);function O(e,n){1&e&&(t.TgZ(0,"mat-error"),t._uU(1," Please enter a name. "),t.qZA())}function Q(e,n){1&e&&(t.TgZ(0,"mat-error"),t._uU(1," Please enter a valid email. "),t.qZA())}function k(e,n){if(1&e&&(t.TgZ(0,"mat-option",12),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.Q6J("value",o),t.xp6(1),t.Oqu(o)}}function R(e,n){1&e&&(t.TgZ(0,"mat-error"),t._uU(1," Please enter a valid role. "),t.qZA())}function J(e,n){if(1&e&&(t.TgZ(0,"mat-option",12),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.Q6J("value",o),t.xp6(1),t.Oqu(o)}}function L(e,n){1&e&&(t.TgZ(0,"mat-error"),t._uU(1," Please enter a valid level. "),t.qZA())}function I(e,n){if(1&e){const o=t.EpF();t.ynx(0),t.TgZ(1,"div",2)(2,"form",3),t.NdJ("ngSubmit",function(){t.CHM(o);const m=t.oxw();return t.KtG(m.updateUser())}),t.TgZ(3,"h2"),t._uU(4),t.qZA(),t.TgZ(5,"h2"),t._uU(6),t.qZA(),t.TgZ(7,"div",4)(8,"mat-form-field",5)(9,"mat-label"),t._uU(10,"Name"),t.qZA(),t._UZ(11,"input",6),t.YNc(12,O,2,0,"mat-error",0),t.qZA(),t.TgZ(13,"mat-form-field",5)(14,"mat-label"),t._uU(15,"Email"),t.qZA(),t._UZ(16,"input",7),t.YNc(17,Q,2,0,"mat-error",0),t.qZA()(),t.TgZ(18,"div",4)(19,"mat-form-field",5)(20,"mat-label"),t._uU(21,"Role "),t.qZA(),t.TgZ(22,"mat-select",8),t.YNc(23,k,2,2,"mat-option",9),t.qZA(),t.YNc(24,R,2,0,"mat-error",0),t.qZA(),t.TgZ(25,"mat-form-field",5)(26,"mat-label"),t._uU(27,"Privelege Level"),t.qZA(),t.TgZ(28,"mat-select",10),t.YNc(29,J,2,2,"mat-option",9),t.qZA(),t.YNc(30,L,2,0,"mat-error",0),t.qZA()(),t.TgZ(31,"button",11),t._uU(32," Edit User "),t.qZA()()(),t.BQk()}if(2&e){const o=t.oxw();t.xp6(2),t.Q6J("formGroup",o.updateUserForm),t.xp6(2),t.hij("User Id : ",o.user.id,""),t.xp6(2),t.hij("Privilege level : ",o.user.privilege_level,""),t.xp6(6),t.Q6J("ngIf",o.updateUserForm.controls.name.invalid&&o.updateUserForm.controls.name.touched),t.xp6(5),t.Q6J("ngIf",o.updateUserForm.controls.email.invalid&&o.updateUserForm.controls.email.touched),t.xp6(6),t.Q6J("ngForOf",o.roles),t.xp6(1),t.Q6J("ngIf",o.updateUserForm.controls.role.invalid&&o.updateUserForm.controls.role.touched),t.xp6(5),t.Q6J("ngForOf",o.privilege_level),t.xp6(1),t.Q6J("ngIf",o.updateUserForm.controls.privilege_level.invalid&&o.updateUserForm.controls.privilege_level.touched),t.xp6(1),t.Q6J("disabled",!o.updateUserForm.valid)}}class h{constructor(n,o,a,m,Z){this.activatedRoute=n,this.userService=o,this.formBuilder=a,this.toastrService=m,this.dialogService=Z,this.roles=d.K$,this.privilege_level=d.KY,this.updateUserForm=this.formBuilder.group({name:[""],email:[""],role:[""],privilege_level:[""]})}ngOnInit(){this.loadUserData()}loadUserData(){this.activatedRoute.params.subscribe(n=>{this.userID=n.id}),this.userService.getUserByID(this.userID).subscribe(n=>{this.user=n,null!=this.user&&(this.updateUserForm=this.formBuilder.group({name:[this.user.name],email:[this.user.email],role:[this.user.role],privilege_level:[this.privilege_level]}))})}updateUser(){this.userService.updateUser(this.updateUserForm.value,this.userID).subscribe(n=>{this.data=n,"success"===this.data.status?(this.toastrService.success("Influencer updated successfully!"),window.location.reload()):this.toastrService.error("Influencer was not updated!")})}resetCount(n){this.dialogService.openConfirmationDialog("Confirm!","Are you sure you want to reset coount?").subscribe(o=>{!0===o&&this.userService.resetCount(n).subscribe(a=>{this.toastrService.success("Count Reset Successfully!")})})}resetPassword(n){this.dialogService.openConfirmationDialog("Confirm!","Are you sure you want to reset password?").subscribe(o=>{!0===o&&this.userService.resetPassword(n).subscribe(a=>{this.toastrService.success("Password Reset Successfully!")})})}}h.\u0275fac=function(n){return new(n||h)(t.Y36(l.gz),t.Y36(b.K),t.Y36(s.qu),t.Y36(q._W),t.Y36(N.O))},h.\u0275cmp=t.Xpm({type:h,selectors:[["app-edit-user"]],decls:7,vars:1,consts:[[4,"ngIf"],["mat-raised-button","","color","accent",3,"click"],[1,"form-container"],["autocomplete","off",3,"formGroup","ngSubmit"],[1,"row"],["appearance","outline"],["matInput","","type","text","formControlName","name","autocomplete","off","required",""],["matInput","","type","email","formControlName","email","autocomplete","off","required",""],["formControlName","role"],[3,"value",4,"ngFor","ngForOf"],["formControlName","privilege_level"],["mat-raised-button","","color","primary","type","submit",2,"margin-bottom","2%",3,"disabled"],[3,"value"]],template:function(n,o){1&n&&(t.YNc(0,I,33,10,"ng-container",0),t.TgZ(1,"div")(2,"button",1),t.NdJ("click",function(){return o.resetCount(o.user.id)}),t._uU(3," Reset Count for user "),t.qZA(),t._UZ(4,"hr"),t.TgZ(5,"button",1),t.NdJ("click",function(){return o.resetPassword(o.user.id)}),t._uU(6," Reset Password for user "),t.qZA()()),2&n&&t.Q6J("ngIf",o.user)},dependencies:[u.sg,u.O5,v.Nt,c.KE,c.hX,c.TO,A.lW,w.gD,S.ey,s._Y,s.Fj,s.JJ,s.JL,s.Q7,s.sg,s.u],styles:["table[_ngcontent-%COMP%]{width:100%}.warn[_ngcontent-%COMP%]{background-color:red;color:#fff}.table-container[_ngcontent-%COMP%]{padding-top:15%;overflow-y:scroll;max-height:auto}.search-container[_ngcontent-%COMP%]{padding-top:2%;padding-bottom:2%;padding-left:1%;position:absolute;top:5;left:0;right:0;z-index:1;background-color:#fff}.form-container[_ngcontent-%COMP%]{max-height:auto;overflow-y:hidden;overflow-x:hidden;margin-left:10px}.row[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}mat-form-field[_ngcontent-%COMP%]{flex:1;margin-right:10px;margin-bottom:5px}h2[_ngcontent-%COMP%]{color:#000!important}h3[_ngcontent-%COMP%]{color:#000}"]});var y=i(5753);const P=["Production","Editing","Graphics"];function F(e,n){if(1&e&&(t.TgZ(0,"mat-option",16),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.Q6J("value",o),t.xp6(1),t.Oqu(o)}}function M(e,n){if(1&e&&(t.TgZ(0,"mat-option",16),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.Q6J("value",o),t.xp6(1),t.Oqu(o)}}function E(e,n){if(1&e&&(t.TgZ(0,"mat-option",16),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.Q6J("value",o),t.xp6(1),t.Oqu(o)}}function $(e,n){if(1&e&&(t.TgZ(0,"mat-option",16),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.Q6J("value",o),t.xp6(1),t.Oqu(o)}}function H(e,n){if(1&e&&(t.TgZ(0,"mat-option",16),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.Q6J("value",o.id),t.xp6(1),t.Oqu(o.name)}}class g{constructor(n,o,a,m){this.formBuilder=n,this.userService=o,this.router=a,this.toastrService=m,this.path=y.m,this.roles=d.K$,this.privilege_level=d.KY,this.teams=P,this.locations=["UAE","KSA","Beirut","India","USA"],this.userForm=this.formBuilder.group({name:["",s.kI.required],email:["",[s.kI.required,s.kI.email]],password:["",s.kI.required],role:["",s.kI.required],team:[""],location:["",s.kI.required],privilege_level:["",s.kI.required],parentId:[""]})}ngOnInit(){this.userService.getAllUsers().subscribe(n=>{this.users=n})}onSubmit(){this.userForm.valid?(this.userService.register({...this.userForm.value,status:"Active"}).subscribe(n=>{this.data=n,"successs"==this.data.status&&this.toastrService.success("User added successfully!")}),this.router.navigate([this.path.forms])):this.toastrService.warning("User was not added!")}}g.\u0275fac=function(n){return new(n||g)(t.Y36(s.qu),t.Y36(b.K),t.Y36(l.F0),t.Y36(q._W))},g.\u0275cmp=t.Xpm({type:g,selectors:[["app-register-user"]],decls:53,vars:6,consts:[[1,"form-container"],[3,"formGroup","ngSubmit"],[1,"row"],["appearance","outline"],["matInput","","formControlName","name","required",""],["matInput","","formControlName","email","required",""],["matInput","","formControlName","password","type","password","required",""],["formControlName","role","required",""],[3,"value",4,"ngFor","ngForOf"],["formControlName","team"],["formControlName","location"],["formControlName","privilege_level","required",""],["formControlName","parentId"],[1,"form-buttons"],["mat-raised-button","","color","primary","type","submit"],["mat-raised-button","","type","button",3,"click"],[3,"value"]],template:function(n,o){1&n&&(t.TgZ(0,"div",0)(1,"form",1),t.NdJ("ngSubmit",function(){return o.onSubmit()}),t.TgZ(2,"div",2)(3,"mat-form-field",3)(4,"mat-label"),t._uU(5,"Name"),t.qZA(),t._UZ(6,"input",4),t.TgZ(7,"mat-error"),t._uU(8,"Please enter a name"),t.qZA()(),t.TgZ(9,"mat-form-field",3)(10,"mat-label"),t._uU(11,"Email"),t.qZA(),t._UZ(12,"input",5),t.TgZ(13,"mat-error"),t._uU(14,"Please enter a valid email address"),t.qZA()(),t.TgZ(15,"mat-form-field",3)(16,"mat-label"),t._uU(17,"Password"),t.qZA(),t._UZ(18,"input",6),t.TgZ(19,"mat-error"),t._uU(20,"Please enter a password"),t.qZA()()(),t.TgZ(21,"div",2)(22,"mat-form-field",3)(23,"mat-label"),t._uU(24,"Role"),t.qZA(),t.TgZ(25,"mat-select",7),t.YNc(26,F,2,2,"mat-option",8),t.qZA()(),t.TgZ(27,"mat-form-field",3)(28,"mat-label"),t._uU(29,"Team"),t.qZA(),t.TgZ(30,"mat-select",9),t.YNc(31,M,2,2,"mat-option",8),t.qZA()(),t.TgZ(32,"mat-form-field",3)(33,"mat-label"),t._uU(34,"Location"),t.qZA(),t.TgZ(35,"mat-select",10),t.YNc(36,E,2,2,"mat-option",8),t.qZA()()(),t.TgZ(37,"div",2)(38,"mat-form-field",3)(39,"mat-label"),t._uU(40,"Privelege Level"),t.qZA(),t.TgZ(41,"mat-select",11),t.YNc(42,$,2,2,"mat-option",8),t.qZA()(),t.TgZ(43,"mat-form-field",3)(44,"mat-label"),t._uU(45,"Parent ID"),t.qZA(),t.TgZ(46,"mat-select",12),t.YNc(47,H,2,2,"mat-option",8),t.qZA()()(),t.TgZ(48,"div",13)(49,"button",14),t._uU(50,"Register"),t.qZA(),t.TgZ(51,"button",15),t.NdJ("click",function(){return o.userForm.reset()}),t._uU(52," Reset "),t.qZA()()()()),2&n&&(t.xp6(1),t.Q6J("formGroup",o.userForm),t.xp6(25),t.Q6J("ngForOf",o.roles),t.xp6(5),t.Q6J("ngForOf",o.teams),t.xp6(5),t.Q6J("ngForOf",o.locations),t.xp6(6),t.Q6J("ngForOf",o.privilege_level),t.xp6(5),t.Q6J("ngForOf",o.users))},dependencies:[u.sg,v.Nt,c.KE,c.hX,c.TO,A.lW,w.gD,S.ey,s._Y,s.Fj,s.JJ,s.JL,s.Q7,s.sg,s.u],styles:[".form-container[_ngcontent-%COMP%]{max-height:auto;overflow-y:hidden;overflow-x:hidden;margin-left:10px}mat-form-field[_ngcontent-%COMP%]{flex:1;margin-right:10px;margin-bottom:5px}h2[_ngcontent-%COMP%]{color:#000!important;justify-content:center;align-items:center;font-size:200%}.row[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}button[_ngcontent-%COMP%]{flex:1;margin-right:10px;margin-bottom:5px}[_ngcontent-%COMP%]::-webkit-scrollbar-track{background-color:#f5f5f5}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#888;border-radius:5px}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background-color:#555}[_ngcontent-%COMP%]::-webkit-scrollbar{width:8px;height:8px}"]});var Y=i(1476),x=i(3566),r=i(5313),G=i(617);function K(e,n){1&e&&(t.TgZ(0,"th",23),t._uU(1,"ID"),t.qZA())}function z(e,n){if(1&e&&(t.TgZ(0,"td",24),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.Oqu(o.id)}}function j(e,n){1&e&&(t.TgZ(0,"th",23),t._uU(1,"Name"),t.qZA())}function X(e,n){if(1&e&&(t.TgZ(0,"td",24),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.Oqu(o.name)}}function W(e,n){1&e&&(t.TgZ(0,"th",23),t._uU(1,"Email"),t.qZA())}function V(e,n){if(1&e&&(t.TgZ(0,"td",24),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.Oqu(o.email)}}function tt(e,n){1&e&&(t.TgZ(0,"th",23),t._uU(1,"Role"),t.qZA())}function et(e,n){if(1&e&&(t.TgZ(0,"td",24),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.Oqu(o.role)}}function nt(e,n){1&e&&(t.TgZ(0,"th",23),t._uU(1," Privilege Level "),t.qZA())}function ot(e,n){if(1&e&&(t.TgZ(0,"td",24),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.hij(" ",o.privilege_level," ")}}function rt(e,n){1&e&&(t.TgZ(0,"th",23),t._uU(1,"Login Count"),t.qZA())}function it(e,n){if(1&e&&(t.TgZ(0,"td",24),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.Oqu(o.loginCount)}}function st(e,n){1&e&&(t.TgZ(0,"th",23),t._uU(1,"View"),t.qZA())}function at(e,n){if(1&e&&(t.TgZ(0,"td",24)(1,"mat-icon",25),t._uU(2," remove_red_eye "),t.qZA()()),2&e){const o=n.$implicit,a=t.oxw();t.xp6(1),t.s9C("routerLink",a.path.editUser+o.id)}}function lt(e,n){1&e&&(t.TgZ(0,"th",23),t._uU(1,"Delete"),t.qZA())}function ct(e,n){if(1&e){const o=t.EpF();t.TgZ(0,"td",24)(1,"mat-icon",26),t.NdJ("click",function(){const Z=t.CHM(o).$implicit,pe=t.oxw();return t.KtG(pe.deleteUser(Z.id))}),t._uU(2," delete "),t.qZA()()}}function mt(e,n){1&e&&t._UZ(0,"tr",27)}function ut(e,n){1&e&&t._UZ(0,"tr",28)}const dt=function(){return[3,5,10,25,100]};class U{constructor(n,o){this.userService=n,this.dialogService=o,this.path=y.m,this.displayedColumns=["id","name","email","role","privilege_level","loginCount","view","action"]}ngOnInit(){this.getUsers()}getUsers(){this.userService.getAllUsers().subscribe(n=>{this.users=n,this.dataSource=new r.by(this.users),this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort})}applyFilter(n){this.dataSource.filter=n.trim().toLowerCase()}deleteUser(n){this.dialogService.openConfirmationDialog("Confirm!","Are you sure you want to delete?").subscribe(o=>{!0===o&&this.userService.deleteUser(n).subscribe(a=>{this.getUsers()})})}}U.\u0275fac=function(n){return new(n||U)(t.Y36(b.K),t.Y36(N.O))},U.\u0275cmp=t.Xpm({type:U,selectors:[["app-user-list"]],viewQuery:function(n,o){if(1&n&&(t.Gf(Y.NW,5),t.Gf(x.YE,7),t.Gf(r.BZ,5)),2&n){let a;t.iGM(a=t.CRH())&&(o.paginator=a.first),t.iGM(a=t.CRH())&&(o.sort=a.first),t.iGM(a=t.CRH())&&(o.table=a.first)}},decls:40,vars:7,consts:[[1,"form-container"],[2,"position","relative"],[1,"search-container"],["appearance","outline",2,"width","75%","height","10%","padding-left","2%","padding-right","2%"],["matInput","","placeholder","Search",3,"keyup"],["searchInput",""],["mat-raised-button","","color","primary","routerLink","/home/admin/register",1,"back-button",2,"height","3rem","width","10%"],[1,"table-container"],["mat-table","","matSort","",3,"dataSource"],["table",""],["matColumnDef","id"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","name"],["matColumnDef","email"],["matColumnDef","role"],["matColumnDef","privilege_level"],["matColumnDef","loginCount"],["matColumnDef","view"],["matColumnDef","action"],["mat-header-row","","sticky","",4,"matHeaderRowDef"],["mat-row","","sticky","",4,"matRowDef","matRowDefColumns"],["aria-label","Select page",3,"length","pageSize","pageSizeOptions"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],[3,"routerLink"],[3,"click"],["mat-header-row","","sticky",""],["mat-row","","sticky",""]],template:function(n,o){if(1&n){const a=t.EpF();t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"mat-form-field",3)(4,"input",4,5),t.NdJ("keyup",function(){t.CHM(a);const Z=t.MAs(5);return t.KtG(o.applyFilter(Z.value))}),t.qZA()(),t.TgZ(6,"button",6)(7,"mat-icon"),t._uU(8,"add_circle_outline"),t.qZA(),t._uU(9," New User "),t.qZA()(),t.TgZ(10,"div",7)(11,"table",8,9),t.ynx(13,10),t.YNc(14,K,2,0,"th",11),t.YNc(15,z,2,1,"td",12),t.BQk(),t.ynx(16,13),t.YNc(17,j,2,0,"th",11),t.YNc(18,X,2,1,"td",12),t.BQk(),t.ynx(19,14),t.YNc(20,W,2,0,"th",11),t.YNc(21,V,2,1,"td",12),t.BQk(),t.ynx(22,15),t.YNc(23,tt,2,0,"th",11),t.YNc(24,et,2,1,"td",12),t.BQk(),t.ynx(25,16),t.YNc(26,nt,2,0,"th",11),t.YNc(27,ot,2,1,"td",12),t.BQk(),t.ynx(28,17),t.YNc(29,rt,2,0,"th",11),t.YNc(30,it,2,1,"td",12),t.BQk(),t.ynx(31,18),t.YNc(32,st,2,0,"th",11),t.YNc(33,at,3,1,"td",12),t.BQk(),t.ynx(34,19),t.YNc(35,lt,2,0,"th",11),t.YNc(36,ct,3,0,"td",12),t.BQk(),t.YNc(37,mt,1,0,"tr",20),t.YNc(38,ut,1,0,"tr",21),t.qZA(),t._UZ(39,"mat-paginator",22),t.qZA()()()}2&n&&(t.xp6(11),t.Q6J("dataSource",o.dataSource),t.xp6(26),t.Q6J("matHeaderRowDef",o.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",o.displayedColumns),t.xp6(1),t.Q6J("length",100)("pageSize",15)("pageSizeOptions",t.DdM(6,dt)))},dependencies:[l.rH,v.Nt,c.KE,A.lW,G.Hw,r.BZ,r.fO,r.as,r.w1,r.Dz,r.nj,r.ge,r.ev,r.XQ,r.Gk,Y.NW,x.YE,x.nU],styles:["table[_ngcontent-%COMP%]{width:100%}.warn[_ngcontent-%COMP%]{background-color:red;color:#fff}.table-container[_ngcontent-%COMP%]{max-height:auto;overflow-y:hidden}.search-container[_ngcontent-%COMP%]{padding-top:2%;padding-left:1%;top:5;left:0;right:0;z-index:1;position:sticky}.mat-mdc-row[_ngcontent-%COMP%]   .mat-mdc-cell[_ngcontent-%COMP%]{border-bottom:1px solid transparent;border-top:1px solid transparent;cursor:pointer}.mat-mdc-row[_ngcontent-%COMP%]:hover   .mat-mdc-cell[_ngcontent-%COMP%]{border-color:currentColor}[_ngcontent-%COMP%]::-webkit-scrollbar-track{background-color:#f5f5f5}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#888;border-radius:10px}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background-color:#555}[_ngcontent-%COMP%]::-webkit-scrollbar{width:8px;height:8px}.form-container[_ngcontent-%COMP%]{max-height:auto;overflow-y:hidden;overflow-x:hidden;margin-left:10px}.row[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}"]});var pt=i(5516),ft=i(1474);class p{constructor(n){this.http=n,this.authApiURL=pt.N.apiUrl+"/v1/userStats"}countUploadedBriefsByUser(){return this.http.get(`${this.authApiURL}/countUploadedBriefsByUser`)}countAddedLogsByUser(){return this.http.get(`${this.authApiURL}/countAddedLogsByUser`)}countAddedInfluencersByUser(){return this.http.get(`${this.authApiURL}/countAddedInfluencersByUser`)}countAddedCelebritiesByUser(){return this.http.get(`${this.authApiURL}/countAddedCelebritiesByUser`)}countAddedClientsByUser(){return this.http.get(`${this.authApiURL}/countAddedClientsByUser`)}countAddedFilesByUser(){return this.http.get(`${this.authApiURL}/countAddedFilesByUser`)}countTalentTasks(){return this.http.get(`${this.authApiURL}/countTalentTasks`)}countInfluencerRemarksByUser(){return this.http.get(`${this.authApiURL}/countInfluencerRemarksByUser`)}}p.\u0275fac=function(n){return new(n||p)(t.LFG(ft.eN))},p.\u0275prov=t.Yz7({token:p,factory:p.\u0275fac,providedIn:"root"});var B=i(4104);function _t(e,n){1&e&&(t.TgZ(0,"th",17),t._uU(1,"Name"),t.qZA())}function ht(e,n){if(1&e&&(t.TgZ(0,"td",18),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.Oqu(o.name)}}function gt(e,n){1&e&&(t.TgZ(0,"th",17),t._uU(1,"Count"),t.qZA())}function Ut(e,n){if(1&e&&(t.TgZ(0,"td",18),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.Oqu(o.count)}}function Ct(e,n){1&e&&t._UZ(0,"tr",19)}function Zt(e,n){1&e&&t._UZ(0,"tr",20)}function Tt(e,n){1&e&&(t.TgZ(0,"th",17),t._uU(1,"Name"),t.qZA())}function bt(e,n){if(1&e&&(t.TgZ(0,"td",18),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.Oqu(o.name)}}function vt(e,n){1&e&&(t.TgZ(0,"th",17),t._uU(1,"Count"),t.qZA())}function At(e,n){if(1&e&&(t.TgZ(0,"td",18),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.Oqu(o.count)}}function yt(e,n){1&e&&t._UZ(0,"tr",19)}function xt(e,n){1&e&&t._UZ(0,"tr",20)}function qt(e,n){1&e&&(t.TgZ(0,"th",17),t._uU(1,"Name"),t.qZA())}function Nt(e,n){if(1&e&&(t.TgZ(0,"td",18),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.Oqu(o.name)}}function wt(e,n){1&e&&(t.TgZ(0,"th",17),t._uU(1,"Count"),t.qZA())}function St(e,n){if(1&e&&(t.TgZ(0,"td",18),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.Oqu(o.count)}}function Yt(e,n){1&e&&t._UZ(0,"tr",19)}function Bt(e,n){1&e&&t._UZ(0,"tr",20)}function Dt(e,n){1&e&&(t.TgZ(0,"th",17),t._uU(1,"Name"),t.qZA())}function Ot(e,n){if(1&e&&(t.TgZ(0,"td",18),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.Oqu(o.name)}}function Qt(e,n){1&e&&(t.TgZ(0,"th",17),t._uU(1,"Count"),t.qZA())}function kt(e,n){if(1&e&&(t.TgZ(0,"td",18),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.Oqu(o.count)}}function Rt(e,n){1&e&&t._UZ(0,"tr",19)}function Jt(e,n){1&e&&t._UZ(0,"tr",20)}function Lt(e,n){1&e&&(t.TgZ(0,"th",17),t._uU(1,"Name"),t.qZA())}function It(e,n){if(1&e&&(t.TgZ(0,"td",18),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.Oqu(o.name)}}function Pt(e,n){1&e&&(t.TgZ(0,"th",17),t._uU(1,"Count"),t.qZA())}function Ft(e,n){if(1&e&&(t.TgZ(0,"td",18),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.Oqu(o.count)}}function Mt(e,n){1&e&&t._UZ(0,"tr",19)}function Et(e,n){1&e&&t._UZ(0,"tr",20)}function $t(e,n){1&e&&(t.TgZ(0,"th",17),t._uU(1,"Name"),t.qZA())}function Ht(e,n){if(1&e&&(t.TgZ(0,"td",18),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.Oqu(o.name)}}function Gt(e,n){1&e&&(t.TgZ(0,"th",17),t._uU(1,"Count"),t.qZA())}function Kt(e,n){if(1&e&&(t.TgZ(0,"td",18),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.Oqu(o.count)}}function zt(e,n){1&e&&t._UZ(0,"tr",19)}function jt(e,n){1&e&&t._UZ(0,"tr",20)}function Xt(e,n){1&e&&(t.TgZ(0,"th",17),t._uU(1,"Name"),t.qZA())}function Wt(e,n){if(1&e&&(t.TgZ(0,"td",18),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.Oqu(o.name)}}function Vt(e,n){1&e&&(t.TgZ(0,"th",17),t._uU(1,"Count"),t.qZA())}function te(e,n){if(1&e&&(t.TgZ(0,"td",18),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.Oqu(o.count)}}function ee(e,n){1&e&&t._UZ(0,"tr",19)}function ne(e,n){1&e&&t._UZ(0,"tr",20)}function oe(e,n){1&e&&(t.TgZ(0,"th",17),t._uU(1,"Name"),t.qZA())}function re(e,n){if(1&e&&(t.TgZ(0,"td",18),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.Oqu(o.name)}}function ie(e,n){1&e&&(t.TgZ(0,"th",17),t._uU(1,"Count"),t.qZA())}function se(e,n){if(1&e&&(t.TgZ(0,"td",18),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.Oqu(o.count)}}function ae(e,n){1&e&&t._UZ(0,"tr",19)}function le(e,n){1&e&&t._UZ(0,"tr",20)}class C{constructor(n){this.userStatsService=n,this.displayedColumns=["name","count"],this.uploadedBriefsDataSource=new r.by([]),this.addedCelebritiesDataSource=new r.by([]),this.addedClientsByUserDataSource=new r.by([]),this.countAddedFilesByUserDataSource=new r.by([]),this.countAddedInfluencersByUser=new r.by([]),this.countAddedLogsByUser=new r.by([]),this.countTalentTasks=new r.by([]),this.countInfluencerRemarksByUser=new r.by([])}ngOnInit(){this.fetchUploadedBriefsData(),this.fetchAddedCelebritiesData(),this.fetchAddedClientsByUserData(),this.fetchcountAddedFilesByUserData(),this.fetchcountAddedInfluencersByUserData(),this.fetchcountTalentTasksData(),this.fetccountAddedLogsByUserhData(),this.fetchcountInfluencerRemarksByUserData()}fetchUploadedBriefsData(){this.userStatsService.countUploadedBriefsByUser().subscribe(n=>{this.uploadedBriefsDataSource=new r.by(n)},n=>{console.error("Error fetching uploaded briefs data: ",n)})}fetchAddedCelebritiesData(){this.userStatsService.countAddedCelebritiesByUser().subscribe(n=>{this.addedCelebritiesDataSource=new r.by(n)},n=>{console.error("Error fetching added celebrities data: ",n)})}fetchAddedClientsByUserData(){this.userStatsService.countAddedClientsByUser().subscribe(n=>{this.addedClientsByUserDataSource=new r.by(n)},n=>{console.error("Error fetching added celebrities data: ",n)})}fetchcountAddedFilesByUserData(){this.userStatsService.countAddedFilesByUser().subscribe(n=>{this.countAddedFilesByUserDataSource=new r.by(n)},n=>{console.error("Error fetching added celebrities data: ",n)})}fetchcountAddedInfluencersByUserData(){this.userStatsService.countAddedInfluencersByUser().subscribe(n=>{this.countAddedInfluencersByUser=new r.by(n)},n=>{console.error("Error fetching added celebrities data: ",n)})}fetccountAddedLogsByUserhData(){this.userStatsService.countAddedLogsByUser().subscribe(n=>{this.countAddedLogsByUser=new r.by(n)},n=>{console.error("Error fetching added celebrities data: ",n)})}fetchcountTalentTasksData(){this.userStatsService.countTalentTasks().subscribe(n=>{this.countTalentTasks=new r.by(n)},n=>{console.error("Error fetching added celebrities data: ",n)})}fetchcountInfluencerRemarksByUserData(){this.userStatsService.countInfluencerRemarksByUser().subscribe(n=>{console.log(n),this.countInfluencerRemarksByUser=new r.by(n)},n=>{console.error("Error fetching added celebrities data: ",n)})}}C.\u0275fac=function(n){return new(n||C)(t.Y36(p))},C.\u0275cmp=t.Xpm({type:C,selectors:[["app-userstats"]],decls:90,vars:24,consts:[[1,"vertical-tabs-container"],["mat-align-tabs","start","mat-stretch-tabs","true","mat-vertical-tabs",""],["label"," Added Briefs"],["mat-table","",1,"mat-elevation-z8",3,"dataSource"],["matColumnDef","name"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","count"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["label","Added Celebrities"],["label","Added Clients"],["label","Uploaded Files"],["label","Added Influencers"],["label","Created Logs"],["label"," Assigned Tasks"],["label"," Added Influencer Remarks"],["mat-header-cell",""],["mat-cell",""],["mat-header-row",""],["mat-row",""]],template:function(n,o){1&n&&(t.TgZ(0,"div",0)(1,"mat-tab-group",1)(2,"mat-tab",2)(3,"div")(4,"table",3),t.ynx(5,4),t.YNc(6,_t,2,0,"th",5),t.YNc(7,ht,2,1,"td",6),t.BQk(),t.ynx(8,7),t.YNc(9,gt,2,0,"th",5),t.YNc(10,Ut,2,1,"td",6),t.BQk(),t.YNc(11,Ct,1,0,"tr",8),t.YNc(12,Zt,1,0,"tr",9),t.qZA()()(),t.TgZ(13,"mat-tab",10)(14,"div")(15,"table",3),t.ynx(16,4),t.YNc(17,Tt,2,0,"th",5),t.YNc(18,bt,2,1,"td",6),t.BQk(),t.ynx(19,7),t.YNc(20,vt,2,0,"th",5),t.YNc(21,At,2,1,"td",6),t.BQk(),t.YNc(22,yt,1,0,"tr",8),t.YNc(23,xt,1,0,"tr",9),t.qZA()()(),t.TgZ(24,"mat-tab",11)(25,"div")(26,"table",3),t.ynx(27,4),t.YNc(28,qt,2,0,"th",5),t.YNc(29,Nt,2,1,"td",6),t.BQk(),t.ynx(30,7),t.YNc(31,wt,2,0,"th",5),t.YNc(32,St,2,1,"td",6),t.BQk(),t.YNc(33,Yt,1,0,"tr",8),t.YNc(34,Bt,1,0,"tr",9),t.qZA()()(),t.TgZ(35,"mat-tab",12)(36,"div")(37,"table",3),t.ynx(38,4),t.YNc(39,Dt,2,0,"th",5),t.YNc(40,Ot,2,1,"td",6),t.BQk(),t.ynx(41,7),t.YNc(42,Qt,2,0,"th",5),t.YNc(43,kt,2,1,"td",6),t.BQk(),t.YNc(44,Rt,1,0,"tr",8),t.YNc(45,Jt,1,0,"tr",9),t.qZA()()(),t.TgZ(46,"mat-tab",13)(47,"div")(48,"table",3),t.ynx(49,4),t.YNc(50,Lt,2,0,"th",5),t.YNc(51,It,2,1,"td",6),t.BQk(),t.ynx(52,7),t.YNc(53,Pt,2,0,"th",5),t.YNc(54,Ft,2,1,"td",6),t.BQk(),t.YNc(55,Mt,1,0,"tr",8),t.YNc(56,Et,1,0,"tr",9),t.qZA()()(),t.TgZ(57,"mat-tab",14)(58,"div")(59,"table",3),t.ynx(60,4),t.YNc(61,$t,2,0,"th",5),t.YNc(62,Ht,2,1,"td",6),t.BQk(),t.ynx(63,7),t.YNc(64,Gt,2,0,"th",5),t.YNc(65,Kt,2,1,"td",6),t.BQk(),t.YNc(66,zt,1,0,"tr",8),t.YNc(67,jt,1,0,"tr",9),t.qZA()()(),t.TgZ(68,"mat-tab",15)(69,"div")(70,"table",3),t.ynx(71,4),t.YNc(72,Xt,2,0,"th",5),t.YNc(73,Wt,2,1,"td",6),t.BQk(),t.ynx(74,7),t.YNc(75,Vt,2,0,"th",5),t.YNc(76,te,2,1,"td",6),t.BQk(),t.YNc(77,ee,1,0,"tr",8),t.YNc(78,ne,1,0,"tr",9),t.qZA()()(),t.TgZ(79,"mat-tab",16)(80,"div")(81,"table",3),t.ynx(82,4),t.YNc(83,oe,2,0,"th",5),t.YNc(84,re,2,1,"td",6),t.BQk(),t.ynx(85,7),t.YNc(86,ie,2,0,"th",5),t.YNc(87,se,2,1,"td",6),t.BQk(),t.YNc(88,ae,1,0,"tr",8),t.YNc(89,le,1,0,"tr",9),t.qZA()()()()()),2&n&&(t.xp6(4),t.Q6J("dataSource",o.uploadedBriefsDataSource),t.xp6(7),t.Q6J("matHeaderRowDef",o.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",o.displayedColumns),t.xp6(3),t.Q6J("dataSource",o.addedCelebritiesDataSource),t.xp6(7),t.Q6J("matHeaderRowDef",o.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",o.displayedColumns),t.xp6(3),t.Q6J("dataSource",o.addedClientsByUserDataSource),t.xp6(7),t.Q6J("matHeaderRowDef",o.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",o.displayedColumns),t.xp6(3),t.Q6J("dataSource",o.countAddedFilesByUserDataSource),t.xp6(7),t.Q6J("matHeaderRowDef",o.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",o.displayedColumns),t.xp6(3),t.Q6J("dataSource",o.countAddedInfluencersByUser),t.xp6(7),t.Q6J("matHeaderRowDef",o.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",o.displayedColumns),t.xp6(3),t.Q6J("dataSource",o.countAddedLogsByUser),t.xp6(7),t.Q6J("matHeaderRowDef",o.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",o.displayedColumns),t.xp6(3),t.Q6J("dataSource",o.countTalentTasks),t.xp6(7),t.Q6J("matHeaderRowDef",o.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",o.displayedColumns),t.xp6(3),t.Q6J("dataSource",o.countInfluencerRemarksByUser),t.xp6(7),t.Q6J("matHeaderRowDef",o.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",o.displayedColumns))},dependencies:[r.BZ,r.fO,r.as,r.w1,r.Dz,r.nj,r.ge,r.ev,r.XQ,r.Gk,B.uX,B.SP],styles:[".mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination{display:none!important}  .mat-mdc-tab-labels{flex-wrap:wrap!important;justify-content:flex-end!important}  .mat-tab-label{flex-grow:1!important;max-width:33.3333333333%!important}.vertical-tabs-container[_ngcontent-%COMP%]{-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);background-color:#ffffff0f;border-radius:15px;box-shadow:0 4px 6px #0000;padding:9px;max-width:1300px;margin:auto;overflow:hidden}"]});let ce=y.m;const me=[{path:"edit/:id",component:h},{path:"register",component:g},{path:"users",component:U},{path:"",redirectTo:`${ce.forms}`,pathMatch:"full"},{path:"employeeStats",component:C},{path:"**",redirectTo:"/site/notFound",pathMatch:"full"}];class f{}f.\u0275fac=function(n){return new(n||f)},f.\u0275mod=t.oAB({type:f}),f.\u0275inj=t.cJS({imports:[l.Bz.forChild(me),l.Bz]});var ue=i(609),de=i(1670);class _{}_.\u0275fac=function(n){return new(n||_)},_.\u0275mod=t.oAB({type:_}),_.\u0275inj=t.cJS({imports:[u.ez,f,ue.q,s.UX,de.SharedModule]})}}]);