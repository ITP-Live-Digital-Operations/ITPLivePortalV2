"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[582],{9582:(re,Z,i)=>{i.r(Z),i.d(Z,{AdminModule:()=>c});var f=i(6814),m=i(1896);const C=["sales","talent","campaign"],b=["1","2","3","4","5","6","7","8","9","10"];var e=i(5879),_=i(3934),n=i(6223),h=i(2032),l=i(4170),v=i(2296),T=i(8525),x=i(3680);function y(r,t){1&r&&(e.TgZ(0,"mat-error"),e._uU(1," Please enter a name. "),e.qZA())}function O(r,t){1&r&&(e.TgZ(0,"mat-error"),e._uU(1," Please enter a valid email. "),e.qZA())}function w(r,t){if(1&r&&(e.TgZ(0,"mat-option",12),e._uU(1),e.qZA()),2&r){const o=t.$implicit;e.Q6J("value",o),e.xp6(1),e.Oqu(o)}}function P(r,t){1&r&&(e.TgZ(0,"mat-error"),e._uU(1," Please enter a valid role. "),e.qZA())}function N(r,t){if(1&r&&(e.TgZ(0,"mat-option",12),e._uU(1),e.qZA()),2&r){const o=t.$implicit;e.Q6J("value",o),e.xp6(1),e.Oqu(o)}}function M(r,t){1&r&&(e.TgZ(0,"mat-error"),e._uU(1," Please enter a valid level. "),e.qZA())}function k(r,t){if(1&r){const o=e.EpF();e.ynx(0),e.TgZ(1,"div",2)(2,"form",3),e.NdJ("ngSubmit",function(){e.CHM(o);const q=e.oxw();return e.KtG(q.updateUser())}),e.TgZ(3,"h2"),e._uU(4),e.qZA(),e.TgZ(5,"h2"),e._uU(6),e.qZA(),e.TgZ(7,"div",4)(8,"mat-form-field",5)(9,"mat-label"),e._uU(10,"Name"),e.qZA(),e._UZ(11,"input",6),e.YNc(12,y,2,0,"mat-error",0),e.qZA(),e.TgZ(13,"mat-form-field",5)(14,"mat-label"),e._uU(15,"Email"),e.qZA(),e._UZ(16,"input",7),e.YNc(17,O,2,0,"mat-error",0),e.qZA()(),e.TgZ(18,"div",4)(19,"mat-form-field",5)(20,"mat-label"),e._uU(21,"Role "),e.qZA(),e.TgZ(22,"mat-select",8),e.YNc(23,w,2,2,"mat-option",9),e.qZA(),e.YNc(24,P,2,0,"mat-error",0),e.qZA(),e.TgZ(25,"mat-form-field",5)(26,"mat-label"),e._uU(27,"Privelege Level"),e.qZA(),e.TgZ(28,"mat-select",10),e.YNc(29,N,2,2,"mat-option",9),e.qZA(),e.YNc(30,M,2,0,"mat-error",0),e.qZA()(),e.TgZ(31,"button",11),e._uU(32," Edit User "),e.qZA()()(),e.BQk()}if(2&r){const o=e.oxw();e.xp6(2),e.Q6J("formGroup",o.updateUserForm),e.xp6(2),e.hij("User Id : ",o.user.id,""),e.xp6(2),e.hij("Privilege level : ",o.user.privilege_level,""),e.xp6(6),e.Q6J("ngIf",o.updateUserForm.controls.name.invalid&&o.updateUserForm.controls.name.touched),e.xp6(5),e.Q6J("ngIf",o.updateUserForm.controls.email.invalid&&o.updateUserForm.controls.email.touched),e.xp6(6),e.Q6J("ngForOf",o.roles),e.xp6(1),e.Q6J("ngIf",o.updateUserForm.controls.role.invalid&&o.updateUserForm.controls.role.touched),e.xp6(5),e.Q6J("ngForOf",o.privilege_level),e.xp6(1),e.Q6J("ngIf",o.updateUserForm.controls.privilege_level.invalid&&o.updateUserForm.controls.privilege_level.touched),e.xp6(1),e.Q6J("disabled",!o.updateUserForm.valid)}}class p{constructor(t,o,a){this.activatedRoute=t,this.userService=o,this.formBuilder=a,this.roles=C,this.privilege_level=b,this.updateUserForm=this.formBuilder.group({name:[""],email:[""],role:[""],privilege_level:[""]})}ngOnInit(){this.loadUserData()}loadUserData(){this.activatedRoute.params.subscribe(t=>{this.userID=t.id}),this.userService.getUserByID(this.userID).subscribe(t=>{this.user=t,null!=this.user&&(this.updateUserForm=this.formBuilder.group({name:[this.user.name],email:[this.user.email],role:[this.user.role],privilege_level:[this.privilege_level]}))})}updateUser(){this.userService.updateUser(this.updateUserForm.value,this.userID).subscribe(t=>{this.data=t,"success"===this.data.status&&window.location.reload()})}resetCount(t){this.userService.resetCount(t).subscribe(o=>{})}resetPassword(t){this.userService.resetPassword(t).subscribe(o=>{console.log(o||"error")})}ngOnDestroy(){this.loadUserData()}}function F(r,t){if(1&r&&(e.TgZ(0,"mat-option",14),e._uU(1),e.qZA()),2&r){const o=t.$implicit;e.Q6J("value",o),e.xp6(1),e.Oqu(o)}}function S(r,t){if(1&r&&(e.TgZ(0,"mat-option",14),e._uU(1),e.qZA()),2&r){const o=t.$implicit;e.Q6J("value",o),e.xp6(1),e.Oqu(o)}}function J(r,t){if(1&r&&(e.TgZ(0,"mat-option",14),e._uU(1),e.qZA()),2&r){const o=t.$implicit;e.Q6J("value",o.id),e.xp6(1),e.Oqu(o.name)}}p.\u0275fac=function(t){return new(t||p)(e.Y36(m.gz),e.Y36(_.K),e.Y36(n.qu))},p.\u0275cmp=e.Xpm({type:p,selectors:[["app-edit-user"]],decls:7,vars:1,consts:[[4,"ngIf"],["mat-raised-button","","color","accent",3,"click"],[1,"form-container"],["autocomplete","off",3,"formGroup","ngSubmit"],[1,"row"],["appearance","outline"],["matInput","","type","text","formControlName","name","autocomplete","off","required",""],["matInput","","type","email","formControlName","email","autocomplete","off","required",""],["formControlName","role"],[3,"value",4,"ngFor","ngForOf"],["formControlName","privilege_level"],["mat-raised-button","","color","primary","type","submit",2,"margin-bottom","2%",3,"disabled"],[3,"value"]],template:function(t,o){1&t&&(e.YNc(0,k,33,10,"ng-container",0),e.TgZ(1,"div")(2,"button",1),e.NdJ("click",function(){return o.resetCount(o.user.id)}),e._uU(3," Reset Count for user "),e.qZA(),e._UZ(4,"hr"),e.TgZ(5,"button",1),e.NdJ("click",function(){return o.resetPassword(o.user.id)}),e._uU(6," Reset Password for user "),e.qZA()()),2&t&&e.Q6J("ngIf",o.user)},dependencies:[f.sg,f.O5,h.Nt,l.KE,l.hX,l.TO,v.lW,T.gD,x.ey,n._Y,n.Fj,n.JJ,n.JL,n.Q7,n.sg,n.u],styles:["table[_ngcontent-%COMP%]{width:100%}.warn[_ngcontent-%COMP%]{background-color:red;color:#fff}.table-container[_ngcontent-%COMP%]{padding-top:15%;overflow-y:scroll;max-height:auto}.search-container[_ngcontent-%COMP%]{padding-top:2%;padding-bottom:2%;padding-left:1%;position:absolute;top:5;left:0;right:0;z-index:1;background-color:#fff}.form-container[_ngcontent-%COMP%]{max-height:auto;overflow-y:hidden;overflow-x:hidden;margin-left:10px}.row[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}mat-form-field[_ngcontent-%COMP%]{flex:1;margin-right:10px;margin-bottom:5px}h2[_ngcontent-%COMP%]{color:#000!important}h3[_ngcontent-%COMP%]{color:#000}"]});class d{constructor(t,o,a){this.formBuilder=t,this.userService=o,this.router=a,this.roles=C,this.privilege_level=b,this.userForm=this.formBuilder.group({name:["",n.kI.required],email:["",[n.kI.required,n.kI.email]],password:["",n.kI.required],role:["",n.kI.required],privilege_level:["",n.kI.required],parentId:[""]})}ngOnInit(){this.userService.getAllUsers().subscribe(t=>{this.users=t})}onSubmit(){this.userForm.valid&&(console.log(this.userForm.value),this.userService.register({...this.userForm.value,status:"Active"}).subscribe(t=>{this.data=t,this.data.status}),this.router.navigate(["home/admin/forms"]))}ngOnDestroy(){this.userService.getAllUsers().subscribe(t=>{this.users=t})}backButton(){window.history.back()}}d.\u0275fac=function(t){return new(t||d)(e.Y36(n.qu),e.Y36(_.K),e.Y36(m.F0))},d.\u0275cmp=e.Xpm({type:d,selectors:[["app-register-user"]],decls:42,vars:4,consts:[[1,"form-container"],[3,"formGroup","ngSubmit"],[1,"row"],["appearance","outline"],["matInput","","formControlName","name","required",""],["matInput","","formControlName","email","required",""],["matInput","","formControlName","password","type","password","required",""],["formControlName","role","required",""],[3,"value",4,"ngFor","ngForOf"],["formControlName","privilege_level","required",""],["formControlName","parentId"],[1,"form-buttons"],["mat-raised-button","","color","primary","type","submit"],["mat-raised-button","","type","button",3,"click"],[3,"value"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0)(1,"form",1),e.NdJ("ngSubmit",function(){return o.onSubmit()}),e.TgZ(2,"div",2)(3,"mat-form-field",3)(4,"mat-label"),e._uU(5,"Name"),e.qZA(),e._UZ(6,"input",4),e.TgZ(7,"mat-error"),e._uU(8,"Please enter a name"),e.qZA()(),e.TgZ(9,"mat-form-field",3)(10,"mat-label"),e._uU(11,"Email"),e.qZA(),e._UZ(12,"input",5),e.TgZ(13,"mat-error"),e._uU(14,"Please enter a valid email address"),e.qZA()(),e.TgZ(15,"mat-form-field",3)(16,"mat-label"),e._uU(17,"Password"),e.qZA(),e._UZ(18,"input",6),e.TgZ(19,"mat-error"),e._uU(20,"Please enter a password"),e.qZA()()(),e.TgZ(21,"div",2)(22,"mat-form-field",3)(23,"mat-label"),e._uU(24,"Role"),e.qZA(),e.TgZ(25,"mat-select",7),e.YNc(26,F,2,2,"mat-option",8),e.qZA()(),e.TgZ(27,"mat-form-field",3)(28,"mat-label"),e._uU(29,"Privelege Level"),e.qZA(),e.TgZ(30,"mat-select",9),e.YNc(31,S,2,2,"mat-option",8),e.qZA()(),e.TgZ(32,"mat-form-field",3)(33,"mat-label"),e._uU(34,"Parent ID"),e.qZA(),e.TgZ(35,"mat-select",10),e.YNc(36,J,2,2,"mat-option",8),e.qZA()()(),e.TgZ(37,"div",11)(38,"button",12),e._uU(39,"Register"),e.qZA(),e.TgZ(40,"button",13),e.NdJ("click",function(){return o.userForm.reset()}),e._uU(41," Reset "),e.qZA()()()()),2&t&&(e.xp6(1),e.Q6J("formGroup",o.userForm),e.xp6(25),e.Q6J("ngForOf",o.roles),e.xp6(5),e.Q6J("ngForOf",o.privilege_level),e.xp6(5),e.Q6J("ngForOf",o.users))},dependencies:[f.sg,h.Nt,l.KE,l.hX,l.TO,v.lW,T.gD,x.ey,n._Y,n.Fj,n.JJ,n.JL,n.Q7,n.sg,n.u],styles:[".form-container[_ngcontent-%COMP%]{max-height:auto;overflow-y:hidden;overflow-x:hidden;margin-left:10px}mat-form-field[_ngcontent-%COMP%]{flex:1;margin-right:10px;margin-bottom:5px}h2[_ngcontent-%COMP%]{color:#000!important;justify-content:center;align-items:center;font-size:200%}.row[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}button[_ngcontent-%COMP%]{flex:1;margin-right:10px;margin-bottom:5px}[_ngcontent-%COMP%]::-webkit-scrollbar-track{background-color:#f5f5f5}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#888;border-radius:5px}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background-color:#555}[_ngcontent-%COMP%]::-webkit-scrollbar{width:8px;height:8px}"]});var A=i(3365),U=i(3566),s=i(5313),Y=i(617);function L(r,t){1&r&&(e.TgZ(0,"th",21),e._uU(1,"ID"),e.qZA())}function Q(r,t){if(1&r&&(e.TgZ(0,"td",22),e._uU(1),e.qZA()),2&r){const o=t.$implicit;e.xp6(1),e.Oqu(o.id)}}function I(r,t){1&r&&(e.TgZ(0,"th",21),e._uU(1,"Name"),e.qZA())}function D(r,t){if(1&r&&(e.TgZ(0,"td",22),e._uU(1),e.qZA()),2&r){const o=t.$implicit;e.xp6(1),e.Oqu(o.name)}}function E(r,t){1&r&&(e.TgZ(0,"th",21),e._uU(1,"Email"),e.qZA())}function R(r,t){if(1&r&&(e.TgZ(0,"td",22),e._uU(1),e.qZA()),2&r){const o=t.$implicit;e.xp6(1),e.Oqu(o.email)}}function B(r,t){1&r&&(e.TgZ(0,"th",21),e._uU(1,"Role"),e.qZA())}function G(r,t){if(1&r&&(e.TgZ(0,"td",22),e._uU(1),e.qZA()),2&r){const o=t.$implicit;e.xp6(1),e.Oqu(o.role)}}function z(r,t){1&r&&(e.TgZ(0,"th",21),e._uU(1," Privilege Level "),e.qZA())}function $(r,t){if(1&r&&(e.TgZ(0,"td",22),e._uU(1),e.qZA()),2&r){const o=t.$implicit;e.xp6(1),e.hij(" ",o.privilege_level," ")}}function H(r,t){1&r&&(e.TgZ(0,"th",21),e._uU(1,"Login Count"),e.qZA())}function j(r,t){if(1&r&&(e.TgZ(0,"td",22),e._uU(1),e.qZA()),2&r){const o=t.$implicit;e.xp6(1),e.Oqu(o.loginCount)}}function K(r,t){1&r&&e._UZ(0,"tr",23)}function X(r,t){if(1&r&&e._UZ(0,"tr",24),2&r){const o=t.$implicit;e.MGl("routerLink","/home/admin/edit/",o.id,"")}}const W=function(){return[3,5,10,25,100]};class g{constructor(t,o){this.userService=t,this.router=o,this.userpl=this.userService.getPrivilegeLevel(),this.displayedColumns=["id","name","email","role","privilege_level","loginCount"]}ngOnInit(){this.getUsers()}ngOnDestroy(){this.getUsers()}getUsers(){this.userService.getAllUsers().subscribe(t=>{this.users=t,this.dataSource=new s.by(this.users),this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort})}applyFilter(t){this.dataSource.filter=t.trim().toLowerCase()}backButton(){window.history.back()}}g.\u0275fac=function(t){return new(t||g)(e.Y36(_.K),e.Y36(m.F0))},g.\u0275cmp=e.Xpm({type:g,selectors:[["app-user-list"]],viewQuery:function(t,o){if(1&t&&(e.Gf(A.NW,5),e.Gf(U.YE,7),e.Gf(s.BZ,5)),2&t){let a;e.iGM(a=e.CRH())&&(o.paginator=a.first),e.iGM(a=e.CRH())&&(o.sort=a.first),e.iGM(a=e.CRH())&&(o.table=a.first)}},decls:34,vars:7,consts:[[1,"form-container"],[2,"position","relative"],[1,"search-container"],["appearance","outline",2,"width","75%","height","10%","padding-left","2%","padding-right","2%"],["matInput","","placeholder","Search",3,"keyup"],["searchInput",""],["mat-raised-button","","color","primary","routerLink","/home/admin/register",1,"back-button",2,"height","3rem","width","10%"],[1,"table-container"],["mat-table","","matSort","",3,"dataSource"],["table",""],["matColumnDef","id"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","name"],["matColumnDef","email"],["matColumnDef","role"],["matColumnDef","privilege_level"],["matColumnDef","loginCount"],["mat-header-row","","sticky","",4,"matHeaderRowDef"],["mat-row","","sticky","",3,"routerLink",4,"matRowDef","matRowDefColumns"],["aria-label","Select page",3,"length","pageSize","pageSizeOptions"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-header-row","","sticky",""],["mat-row","","sticky","",3,"routerLink"]],template:function(t,o){if(1&t){const a=e.EpF();e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"mat-form-field",3)(4,"input",4,5),e.NdJ("keyup",function(){e.CHM(a);const oe=e.MAs(5);return e.KtG(o.applyFilter(oe.value))}),e.qZA()(),e.TgZ(6,"button",6)(7,"mat-icon"),e._uU(8,"add_circle_outline"),e.qZA(),e._uU(9," New User "),e.qZA()(),e.TgZ(10,"div",7)(11,"table",8,9),e.ynx(13,10),e.YNc(14,L,2,0,"th",11),e.YNc(15,Q,2,1,"td",12),e.BQk(),e.ynx(16,13),e.YNc(17,I,2,0,"th",11),e.YNc(18,D,2,1,"td",12),e.BQk(),e.ynx(19,14),e.YNc(20,E,2,0,"th",11),e.YNc(21,R,2,1,"td",12),e.BQk(),e.ynx(22,15),e.YNc(23,B,2,0,"th",11),e.YNc(24,G,2,1,"td",12),e.BQk(),e.ynx(25,16),e.YNc(26,z,2,0,"th",11),e.YNc(27,$,2,1,"td",12),e.BQk(),e.ynx(28,17),e.YNc(29,H,2,0,"th",11),e.YNc(30,j,2,1,"td",12),e.BQk(),e.YNc(31,K,1,0,"tr",18),e.YNc(32,X,1,1,"tr",19),e.qZA(),e._UZ(33,"mat-paginator",20),e.qZA()()()}2&t&&(e.xp6(11),e.Q6J("dataSource",o.dataSource),e.xp6(20),e.Q6J("matHeaderRowDef",o.displayedColumns),e.xp6(1),e.Q6J("matRowDefColumns",o.displayedColumns),e.xp6(1),e.Q6J("length",100)("pageSize",15)("pageSizeOptions",e.DdM(6,W)))},dependencies:[m.rH,h.Nt,l.KE,v.lW,Y.Hw,s.BZ,s.fO,s.as,s.w1,s.Dz,s.nj,s.ge,s.ev,s.XQ,s.Gk,A.NW,U.YE,U.nU],styles:["table[_ngcontent-%COMP%]{width:100%}.warn[_ngcontent-%COMP%]{background-color:red;color:#fff}.table-container[_ngcontent-%COMP%]{max-height:auto;overflow-y:hidden}.search-container[_ngcontent-%COMP%]{padding-top:2%;padding-left:1%;top:5;left:0;right:0;z-index:1;background-color:#fff;position:sticky}.mat-mdc-row[_ngcontent-%COMP%]   .mat-mdc-cell[_ngcontent-%COMP%]{border-bottom:1px solid transparent;border-top:1px solid transparent;cursor:pointer}.mat-mdc-row[_ngcontent-%COMP%]:hover   .mat-mdc-cell[_ngcontent-%COMP%]{border-color:currentColor}[_ngcontent-%COMP%]::-webkit-scrollbar-track{background-color:#f5f5f5}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#888;border-radius:10px}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background-color:#555}[_ngcontent-%COMP%]::-webkit-scrollbar{width:8px;height:8px}.form-container[_ngcontent-%COMP%]{max-height:auto;overflow-y:hidden;overflow-x:hidden;margin-left:10px}.row[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}"]});const V=[{path:"edit/:id",component:p},{path:"register",component:d},{path:"users",component:g},{path:"",redirectTo:"/home/main/forms",pathMatch:"full"},{path:"**",redirectTo:"/site/notFound"}];class u{}u.\u0275fac=function(t){return new(t||u)},u.\u0275mod=e.oAB({type:u}),u.\u0275inj=e.cJS({imports:[m.Bz.forChild(V),m.Bz]});var ee=i(1685),te=i(785);class c{}c.\u0275fac=function(t){return new(t||c)},c.\u0275mod=e.oAB({type:c}),c.\u0275inj=e.cJS({imports:[f.ez,u,ee.q,n.UX,te.SharedModule]})}}]);