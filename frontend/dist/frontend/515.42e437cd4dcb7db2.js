"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[515],{515:(y,i,t)=>{t.r(i),t.d(i,{HomeModule:()=>h});var v=t(6814),m=t(1896),d=t(8036),l=t(5879),c=t(3934);class o{constructor(a,e){this.userService=a,this.route=e}canActivate(a,e){const H=a.data.allowedRoles,S=this.userService.getRole();return!!H.includes(S)||this.route.parseUrl("/site/access-denied")}}o.\u0275fac=function(a){return new(a||o)(l.LFG(c.K),l.LFG(m.F0))},o.\u0275prov=l.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"});var f=t(4492);const g=[{path:"main",children:[{path:"",loadChildren:()=>Promise.all([t.e(305),t.e(72)]).then(t.bind(t,7072)).then(n=>n.SharingModule),canActivate:[d.a]}]},{path:"talent",children:[{path:"",loadChildren:()=>Promise.all([t.e(305),t.e(72),t.e(592),t.e(28)]).then(t.bind(t,28)).then(n=>n.TalentModule),canActivate:[d.a,o],data:{allowedRoles:["Talent Head","talent","admin","superadmin"]}}]},{path:"sales",children:[{path:"",loadChildren:()=>Promise.all([t.e(305),t.e(72),t.e(166),t.e(592),t.e(579)]).then(t.bind(t,8579)).then(n=>n.SalesModule),canActivate:[d.a,o],data:{allowedRoles:["Sales Head","sales","admin","superadmin"]}}]},{path:"campaign",children:[{path:"",loadChildren:()=>Promise.all([t.e(305),t.e(72),t.e(166),t.e(592),t.e(478)]).then(t.bind(t,6478)).then(n=>n.CampaignModule),canActivate:[d.a,o],data:{allowedRoles:["admin","superadmin","campaign","Campaign Head"]}}]},{path:"originals",children:[{path:"",loadChildren:()=>Promise.all([t.e(305),t.e(360)]).then(t.bind(t,4360)).then(n=>n.OriginalsModule),canActivate:[d.a,o],data:{allowedRoles:["admin","superadmin","originals"]}}]},{path:"admin",children:[{path:"",loadChildren:()=>t.e(77).then(t.bind(t,8077)).then(n=>n.AdminModule),canActivate:[d.a,o],data:{allowedRoles:["admin","superadmin"]}}]},{path:"changePassword",component:f.p},{path:"",redirectTo:"/site/notFound",pathMatch:"full"},{path:"**",redirectTo:"/site/notFound",pathMatch:"full"}];class s{}s.\u0275fac=function(a){return new(a||s)},s.\u0275mod=l.oAB({type:s}),s.\u0275inj=l.cJS({imports:[m.Bz.forChild(g),m.Bz]});var M=t(6058),R=t(1474),u=t(6223),C=t(1670),A=t(9347),F=t(4104);class h{}h.\u0275fac=function(a){return new(a||h)},h.\u0275mod=l.oAB({type:h}),h.\u0275inj=l.cJS({imports:[v.ez,s,R.JF,M.q,u.u5,C.SharedModule,A.Is,F.Nh]})}}]);