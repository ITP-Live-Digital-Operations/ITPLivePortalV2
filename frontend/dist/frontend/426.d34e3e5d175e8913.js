"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[426],{2426:(bt,w,l)=>{l.r(w),l.d(w,{CampaignModule:()=>u});var M=l(6814),C=l(1896),P=l(5753),O=l(3365),_=l(3566),c=l(5313),t=l(5879),T=l(3934),v=l(6291),h=l(9347),x=l(2032),Z=l(4170),D=l(617),N=l(3680),b=l(4630),r=l(6223);function y(e,n){if(1&e&&(t.TgZ(0,"mat-option",22),t._uU(1),t.qZA()),2&e){const i=n.$implicit;t.Q6J("value",i),t.xp6(1),t.hij(" ",i," ")}}function A(e,n){if(1&e&&(t.TgZ(0,"mat-option",22),t._uU(1),t.qZA()),2&e){const i=n.$implicit;t.Q6J("value",i),t.xp6(1),t.hij(" ",i," ")}}function U(e,n){1&e&&(t.TgZ(0,"th",23),t._uU(1,"Campaign"),t.qZA())}function Y(e,n){if(1&e&&(t.TgZ(0,"td",24),t._uU(1),t.qZA()),2&e){const i=n.$implicit;t.xp6(1),t.hij(" ",i.campaignName," ")}}function S(e,n){1&e&&(t.TgZ(0,"th",23),t._uU(1,"Client"),t.qZA())}function k(e,n){if(1&e&&(t.TgZ(0,"td",24),t._uU(1),t.qZA()),2&e){const i=n.$implicit;t.xp6(1),t.hij(" ",i.client.name," ")}}function q(e,n){1&e&&(t.TgZ(0,"th",23),t._uU(1,"Market"),t.qZA())}function Q(e,n){if(1&e&&(t.TgZ(0,"td",25),t._uU(1),t.qZA()),2&e){const i=n.$implicit;t.xp6(1),t.Oqu(i.market)}}function I(e,n){1&e&&(t.TgZ(0,"th",23),t._uU(1," Client's Industry "),t.qZA())}function J(e,n){if(1&e&&(t.TgZ(0,"td",25),t._uU(1),t.qZA()),2&e){const i=n.$implicit;t.xp6(1),t.Oqu(i.client.industry)}}function V(e,n){1&e&&(t.TgZ(0,"th",23),t._uU(1,"Action"),t.qZA())}function F(e,n){if(1&e){const i=t.EpF();t.TgZ(0,"td",25)(1,"button",26),t.NdJ("click",function(){const s=t.CHM(i).$implicit,m=t.oxw();return t.KtG(m.viewCampaign(s.id))}),t.TgZ(2,"mat-icon"),t._uU(3,"remove_red_eye"),t.qZA()()()}}function B(e,n){1&e&&t._UZ(0,"tr",27)}function j(e,n){1&e&&t._UZ(0,"tr",28)}const R=function(){return[5,10,25,50,100]};class d{constructor(n,i,a,o){this.userService=n,this.campaignService=i,this.dialog=a,this.router=o,this.userRole=this.userService.getRole(),this.campaigns=[],this.clients=[],this.influencers=[],this.displayedColumns=["campaignName","clientName","market","clientIndustry","action"],this.filterValues={campaignName:"",clientName:"",influencerName:""},this.filteredCampaigns=[],this.filteredClients=[],this.filteredInfluencers=[],this.selectedCampaign="",this.selectedClient="",this.selectedInfluencer=""}ngOnInit(){this.loadCampaigns(),this.filteredCampaigns=this.campaigns,this.filteredClients=this.clients,this.filteredInfluencers=this.influencers}loadCampaigns(){this.campaignService.getCampaigns().subscribe(n=>{this.dataSource=new c.by(n),this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort,this.campaigns=[...new Set(n.map(i=>i.campaignName))].sort(),this.clients=[...new Set(n.map(i=>i.client.name))]})}searchCampaigns(n){n?(this.filteredCampaigns=this.campaigns.filter(i=>i.toLowerCase().includes(n.toLowerCase())),this.filterCampaign(n.toLowerCase())):(this.filteredCampaigns=this.campaigns,this.filterCampaign(n.toLowerCase()))}searchClients(n){n?(this.filteredClients=this.clients.filter(i=>i.toLowerCase().includes(n.toLowerCase())),this.filterClient(n.toLowerCase())):(this.filteredClients=this.clients,this.filterClient(n.toLowerCase()))}onCampaignSelect(n){this.selectedCampaign=n.option.value,this.filterCampaign(this.selectedCampaign.toLowerCase())}onClientSelect(n){this.selectedClient=n.option.value,this.filterClient(this.selectedClient.toLowerCase())}applyFilter(){this.dataSource.filterPredicate=(n,i)=>{const a=JSON.parse(i),o=!a.clientName||n.client.name.toLowerCase().includes(a.clientName.toLowerCase()),s=!a.campaignName||n.campaignName.toLowerCase().includes(a.campaignName.toLowerCase());return o&&s},this.dataSource.filter=JSON.stringify(this.filterValues)}filterClient(n){this.filterValues.clientName=n,this.applyFilter(),this.updateFilterOptions()}filterCampaign(n){this.filterValues.campaignName=n,this.applyFilter(),this.updateFilterOptions()}updateFilterOptions(){const n=this.dataSource.filteredData||[];this.campaigns=[...new Set(n.map(i=>i.campaignName))].sort(),this.clients=[...new Set(n.map(i=>i.client.name))].sort()}viewCampaign(n){this.router.navigate([`/home/campaign/campaignDetails/${n}`])}}d.\u0275fac=function(n){return new(n||d)(t.Y36(T.K),t.Y36(v.U),t.Y36(h.uw),t.Y36(C.F0))},d.\u0275cmp=t.Xpm({type:d,selectors:[["app-view-campaigns"]],viewQuery:function(n,i){if(1&n&&(t.Gf(O.NW,5),t.Gf(_.YE,5),t.Gf(c.BZ,5)),2&n){let a;t.iGM(a=t.CRH())&&(i.paginator=a.first),t.iGM(a=t.CRH())&&(i.sort=a.first),t.iGM(a=t.CRH())&&(i.table=a.first)}},decls:41,vars:11,consts:[[1,"logs-button"],[1,"filter-container"],[1,"filter"],["type","text","matInput","",3,"matAutocomplete","ngModel","ngModelChange","input","focus"],[3,"optionSelected"],["autoCampaign","matAutocomplete"],[3,"value",4,"ngFor","ngForOf"],["autoClient","matAutocomplete"],["value",""],[1,"table-container"],["mat-table","","matSort","",3,"dataSource"],["matColumnDef","campaignName"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","","class","truncate-text",4,"matCellDef"],["matColumnDef","clientName"],["matColumnDef","market"],["mat-cell","",4,"matCellDef"],["matColumnDef","clientIndustry"],["matColumnDef","action"],["mat-header-row","","sticky","",4,"matHeaderRowDef"],["mat-row","","sticky","",4,"matRowDef","matRowDefColumns"],["pageSize","10","showFirstLastButtons","","aria-label","Select page",3,"pageSizeOptions"],[3,"value"],["mat-header-cell","","mat-sort-header",""],["mat-cell","",1,"truncate-text"],["mat-cell",""],[1,"icon-btn",3,"click"],["mat-header-row","","sticky",""],["mat-row","","sticky",""]],template:function(n,i){if(1&n&&(t.TgZ(0,"div",0)(1,"H2"),t._uU(2,"Campaigns"),t.qZA()(),t.TgZ(3,"div",1)(4,"mat-form-field",2)(5,"mat-label"),t._uU(6,"\u{1f50d} Campaign Filter"),t.qZA(),t.TgZ(7,"input",3),t.NdJ("ngModelChange",function(o){return i.selectedCampaign=o})("input",function(o){return i.searchCampaigns(o.target.value)})("focus",function(o){return i.searchCampaigns(o.target.value)}),t.qZA(),t.TgZ(8,"mat-autocomplete",4,5),t.NdJ("optionSelected",function(o){return i.onCampaignSelect(o)}),t.YNc(10,y,2,2,"mat-option",6),t.qZA()(),t.TgZ(11,"mat-form-field",2)(12,"mat-label"),t._uU(13,"\u{1f50d} Client Filter"),t.qZA(),t.TgZ(14,"input",3),t.NdJ("ngModelChange",function(o){return i.selectedClient=o})("input",function(o){return i.searchClients(o.target.value)})("focus",function(o){return i.searchClients(o.target.value)}),t.qZA(),t.TgZ(15,"mat-autocomplete",4,7),t.NdJ("optionSelected",function(o){return i.onClientSelect(o)}),t.TgZ(17,"mat-option",8),t._uU(18,"All Clients"),t.qZA(),t.YNc(19,A,2,2,"mat-option",6),t.qZA()()(),t.TgZ(20,"div",9)(21,"table",10),t.ynx(22,11),t.YNc(23,U,2,0,"th",12),t.YNc(24,Y,2,1,"td",13),t.BQk(),t.ynx(25,14),t.YNc(26,S,2,0,"th",12),t.YNc(27,k,2,1,"td",13),t.BQk(),t.ynx(28,15),t.YNc(29,q,2,0,"th",12),t.YNc(30,Q,2,1,"td",16),t.BQk(),t.ynx(31,17),t.YNc(32,I,2,0,"th",12),t.YNc(33,J,2,1,"td",16),t.BQk(),t.ynx(34,18),t.YNc(35,V,2,0,"th",12),t.YNc(36,F,4,0,"td",16),t._uU(37," > "),t.BQk(),t.YNc(38,B,1,0,"tr",19),t.YNc(39,j,1,0,"tr",20),t.qZA()(),t._UZ(40,"mat-paginator",21)),2&n){const a=t.MAs(9),o=t.MAs(16);t.xp6(7),t.Q6J("matAutocomplete",a)("ngModel",i.selectedCampaign),t.xp6(3),t.Q6J("ngForOf",i.filteredCampaigns),t.xp6(4),t.Q6J("matAutocomplete",o)("ngModel",i.selectedClient),t.xp6(5),t.Q6J("ngForOf",i.clients),t.xp6(2),t.Q6J("dataSource",i.dataSource),t.xp6(17),t.Q6J("matHeaderRowDef",i.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",i.displayedColumns),t.xp6(1),t.Q6J("pageSizeOptions",t.DdM(10,R))}},dependencies:[M.sg,x.Nt,Z.KE,Z.hX,D.Hw,N.ey,c.BZ,c.fO,c.as,c.w1,c.Dz,c.nj,c.ge,c.ev,c.XQ,c.Gk,O.NW,_.YE,_.nU,b.XC,b.ZL,r.Fj,r.JJ,r.On],styles:["body[_ngcontent-%COMP%]{font-family:Arial,sans-serif}h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%]{margin:10px 0;text-align:center}.table-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]{width:100%}.table-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .table-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{text-align:left;padding:8px}.table-container[_ngcontent-%COMP%]   .truncate-text[_ngcontent-%COMP%]{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:150px}.logs-button[_ngcontent-%COMP%], .filter-container[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:space-between;margin-bottom:1%;width:100%}.logs-button[_ngcontent-%COMP%]   .filter[_ngcontent-%COMP%], .filter-container[_ngcontent-%COMP%]   .filter[_ngcontent-%COMP%]{flex-grow:1;margin-right:20px}.logs-button[_ngcontent-%COMP%]   .filter[_ngcontent-%COMP%]:last-child, .filter-container[_ngcontent-%COMP%]   .filter[_ngcontent-%COMP%]:last-child{margin-right:0}.logs-button[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], .filter-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:10px 15px;background-color:transparent;color:#fff;border:1px solid #4789A1;border-radius:4px;cursor:pointer}.logs-button[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover, .filter-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background-color:#4789a1}mat-paginator[_ngcontent-%COMP%]{background-color:#f0f0f0}mat-paginator[_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]{margin:0 12px}.single[_ngcontent-%COMP%], .package[_ngcontent-%COMP%]{background-color:#fff;color:#333;padding:15px;border-radius:4px;margin-top:20px}.single[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%], .package[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin-top:10px}@media (max-width: 768px){.logs-button[_ngcontent-%COMP%], .filter-container[_ngcontent-%COMP%]{flex-direction:column;align-items:stretch}.logs-button[_ngcontent-%COMP%]   .filter[_ngcontent-%COMP%], .logs-button[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], .filter-container[_ngcontent-%COMP%]   .filter[_ngcontent-%COMP%], .filter-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-right:0;margin-bottom:10px}.row[_ngcontent-%COMP%]{flex-direction:column;align-items:flex-start}}[_ngcontent-%COMP%]::-webkit-scrollbar-track{background-color:#f5f5f5}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#888;border-radius:10px}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background-color:#555}[_ngcontent-%COMP%]::-webkit-scrollbar{width:8px;height:8px}"]});var $=l(825),L=l(9229),E=l(9061),H=l(2296);class p{constructor(n,i,a,o,s,m,xt){this.formBuilder=n,this.campaignService=i,this.toastrService=a,this.clientService=o,this.userService=s,this.activatedRoute=m,this.source=xt,this.userId=this.userService.getID(),this.newCampaignForm=this.formBuilder.group({campaignName:["",[r.kI.required]],market:["",[r.kI.required]],clientId:["",[r.kI.required]]})}ngOnInit(){this.loadClients(),this.loadCampaign()}editCampaign(){}loadCampaign(){this.campaign=this.source.campaign,this.newCampaignForm.patchValue({campaignName:this.campaign.campaignName,market:this.campaign.market,clientId:this.campaign.client.id})}loadClients(){this.clientService.getClients().subscribe(n=>{this.clients=n,this.clients.sort((i,a)=>i.name<a.name?-1:i.name>a.name?1:0)})}}function G(e,n){1&e&&(t.TgZ(0,"th",21),t._uU(1," Name "),t.qZA())}function z(e,n){if(1&e){const i=t.EpF();t.TgZ(0,"td",22),t.NdJ("click",function(){const s=t.CHM(i).$implicit,m=t.oxw(2);return t.KtG(m.viewInfluencer(s.influencerId))}),t._uU(1),t.qZA()}if(2&e){const i=n.$implicit;t.xp6(1),t.hij(" ",i.showName?i.name:""," ")}}function X(e,n){1&e&&(t.TgZ(0,"th",21),t._uU(1," Platform "),t.qZA())}function K(e,n){if(1&e&&(t.TgZ(0,"td",23),t._uU(1),t.qZA()),2&e){const i=n.$implicit;t.xp6(1),t.hij(" ",i.platform," ")}}function W(e,n){1&e&&(t.TgZ(0,"th",21),t._uU(1," Deliverable "),t.qZA())}function tt(e,n){if(1&e&&(t.TgZ(0,"td",23),t._uU(1),t.qZA()),2&e){const i=n.$implicit;t.xp6(1),t.hij(" ",i.deliverable," ")}}function nt(e,n){1&e&&(t.TgZ(0,"th",21),t._uU(1," Followers "),t.qZA())}function et(e,n){if(1&e&&(t.TgZ(0,"td",23),t._uU(1),t.qZA()),2&e){const i=n.$implicit;t.xp6(1),t.hij(" ",i.followers," ")}}function it(e,n){1&e&&(t.TgZ(0,"th",21),t._uU(1," Reach "),t.qZA())}function at(e,n){if(1&e&&(t.TgZ(0,"td",23),t._uU(1),t.qZA()),2&e){const i=n.$implicit;t.xp6(1),t.hij(" ",i.reach," ")}}function ot(e,n){1&e&&(t.TgZ(0,"th",21),t._uU(1," Impressions "),t.qZA())}function lt(e,n){if(1&e&&(t.TgZ(0,"td",23),t._uU(1),t.qZA()),2&e){const i=n.$implicit;t.xp6(1),t.hij(" ",i.impressions," ")}}function ct(e,n){1&e&&(t.TgZ(0,"th",21),t._uU(1," Interactions "),t.qZA())}function mt(e,n){if(1&e&&(t.TgZ(0,"td",23),t._uU(1),t.qZA()),2&e){const i=n.$implicit;t.xp6(1),t.hij(" ",i.interactions," ")}}function rt(e,n){1&e&&(t.TgZ(0,"th",21),t._uU(1," Client Cost "),t.qZA())}function st(e,n){if(1&e&&(t.TgZ(0,"td",23),t._uU(1),t.qZA()),2&e){const i=n.$implicit;t.xp6(1),t.hij(" ",i.clientCost," ")}}function pt(e,n){1&e&&(t.TgZ(0,"th",21),t._uU(1," Influencer Cost "),t.qZA())}function gt(e,n){if(1&e&&(t.TgZ(0,"td",23),t._uU(1),t.qZA()),2&e){const i=n.$implicit;t.xp6(1),t.hij(" ",i.influencerCost," ")}}function ut(e,n){1&e&&(t.TgZ(0,"th",21),t._uU(1," Metric "),t.qZA())}function Ct(e,n){if(1&e&&(t.TgZ(0,"td",23),t._uU(1),t.qZA()),2&e){const i=n.$implicit;t.xp6(1),t.hij(" ",i.metric," ")}}function dt(e,n){1&e&&(t.TgZ(0,"th",21),t._uU(1," Year "),t.qZA())}function ft(e,n){if(1&e&&(t.TgZ(0,"td",23),t._uU(1),t.qZA()),2&e){const i=n.$implicit;t.xp6(1),t.hij(" ",i.year," ")}}function _t(e,n){1&e&&t._UZ(0,"tr",24)}function ht(e,n){1&e&&t._UZ(0,"tr",25)}function Zt(e,n){if(1&e&&(t.TgZ(0,"div",3)(1,"table",4),t.ynx(2,5),t.YNc(3,G,2,0,"th",6),t.YNc(4,z,2,1,"td",7),t.BQk(),t.ynx(5,8),t.YNc(6,X,2,0,"th",6),t.YNc(7,K,2,1,"td",9),t.BQk(),t.ynx(8,10),t.YNc(9,W,2,0,"th",6),t.YNc(10,tt,2,1,"td",9),t.BQk(),t.ynx(11,11),t.YNc(12,nt,2,0,"th",6),t.YNc(13,et,2,1,"td",9),t.BQk(),t.ynx(14,12),t.YNc(15,it,2,0,"th",6),t.YNc(16,at,2,1,"td",9),t.BQk(),t.ynx(17,13),t.YNc(18,ot,2,0,"th",6),t.YNc(19,lt,2,1,"td",9),t.BQk(),t.ynx(20,14),t.YNc(21,ct,2,0,"th",6),t.YNc(22,mt,2,1,"td",9),t.BQk(),t.ynx(23,15),t.YNc(24,rt,2,0,"th",6),t.YNc(25,st,2,1,"td",9),t.BQk(),t.ynx(26,16),t.YNc(27,pt,2,0,"th",6),t.YNc(28,gt,2,1,"td",9),t.BQk(),t.ynx(29,17),t.YNc(30,ut,2,0,"th",6),t.YNc(31,Ct,2,1,"td",9),t.BQk(),t.ynx(32,18),t.YNc(33,dt,2,0,"th",6),t.YNc(34,ft,2,1,"td",9),t.BQk(),t.YNc(35,_t,1,0,"tr",19),t.YNc(36,ht,1,0,"tr",20),t.qZA()()),2&e){const i=t.oxw();t.xp6(1),t.Q6J("dataSource",i.dataSource),t.xp6(34),t.Q6J("matHeaderRowDef",i.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",i.displayedColumns)}}p.\u0275fac=function(n){return new(n||p)(t.Y36(r.qu),t.Y36(v.U),t.Y36(L._W),t.Y36(E.y),t.Y36(T.K),t.Y36(C.gz),t.Y36(h.WI))},p.\u0275cmp=t.Xpm({type:p,selectors:[["app-edit-campaign"]],decls:15,vars:2,consts:[[1,"form-container"],[3,"formGroup"],[1,"row"],["matInput","","type","text","formControlName","campaignName","autocomplete","off"],["matInput","","type","text","formControlName","market","autocomplete","off"],["mat-raised-button","","color","primary","type","submit",3,"disabled","click"]],template:function(n,i){1&n&&(t.TgZ(0,"div",0)(1,"form",1)(2,"h2"),t._uU(3,"New Client"),t.qZA(),t.TgZ(4,"div",2)(5,"mat-form-field")(6,"mat-label"),t._uU(7," Name "),t.qZA(),t._UZ(8,"input",3),t.qZA(),t.TgZ(9,"mat-form-field")(10,"mat-label"),t._uU(11," Market "),t.qZA(),t._UZ(12,"input",4),t.qZA()(),t.TgZ(13,"button",5),t.NdJ("click",function(){return i.editCampaign()}),t._uU(14," Edit Campaign "),t.qZA()()()),2&n&&(t.xp6(1),t.Q6J("formGroup",i.newCampaignForm),t.xp6(12),t.Q6J("disabled",!i.newCampaignForm.valid))},dependencies:[x.Nt,Z.KE,Z.hX,H.lW,r._Y,r.Fj,r.JJ,r.JL,r.sg,r.u],styles:[".form-container[_ngcontent-%COMP%]{margin:3%}.form-container[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}.form-container[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1;margin-right:10px;margin-bottom:5px}.form-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:#4789a1}"]});class f{constructor(n,i,a,o){this.activatedRoute=n,this.campaignService=i,this.cdr=a,this.dialog=o,this.dataSource=[],this.displayedColumns=["name","platform","deliverable","followers","reach","impressions","interactions","clientCost","influencerCost","metric","year"]}ngOnInit(){this.loadCampaignData()}ngOnChanges(){}loadCampaignData(){this.activatedRoute.params.subscribe(n=>{this.id=n.id,this.campaignService.getCampaignById(this.id).subscribe(i=>{console.log(i),this.campaign=i,this.campaign.Influencers.forEach(o=>{let s=!0;o.influencerStatistics.forEach(m=>{this.dataSource.push({showName:s,influencerId:o.id,name:s?o.Name:"",platform:m.platform,deliverable:m.deliverable,followers:m.followers,reach:m.reach,impressions:m.impressions,interactions:m.interactions,clientCost:m.clientCost,influencerCost:m.influencerCost,metric:m.metric,year:m.year}),s=!1})}),this.cdr.detectChanges()})})}viewInfluencer(n){this.dialog?.open($.Q,{width:"100%",height:"95%",exitAnimationDuration:"1000ms",enterAnimationDuration:"1000ms",data:{id:n}})}redirectToNewCampaign(){this.dialog?.open(p,{width:"80%",height:"65%",exitAnimationDuration:"1000ms",enterAnimationDuration:"1000ms",data:{campaign:this.campaign}})}}f.\u0275fac=function(n){return new(n||f)(t.Y36(C.gz),t.Y36(v.U),t.Y36(t.sBO),t.Y36(h.uw))},f.\u0275cmp=t.Xpm({type:f,selectors:[["app-campaign-details"]],features:[t.TTD],decls:13,vars:4,consts:[[1,"logs-button"],["type","button",2,"margin-left","2%",3,"click"],["class","table-container",4,"ngIf"],[1,"table-container"],["mat-table","","matSort","",3,"dataSource"],["matColumnDef","name"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",3,"click",4,"matCellDef"],["matColumnDef","platform"],["mat-cell","",4,"matCellDef"],["matColumnDef","deliverable"],["matColumnDef","followers"],["matColumnDef","reach"],["matColumnDef","impressions"],["matColumnDef","interactions"],["matColumnDef","clientCost"],["matColumnDef","influencerCost"],["matColumnDef","metric"],["matColumnDef","year"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["mat-header-cell",""],["mat-cell","",3,"click"],["mat-cell",""],["mat-header-row",""],["mat-row",""]],template:function(n,i){1&n&&(t.TgZ(0,"h1"),t._uU(1),t.qZA(),t.TgZ(2,"h2"),t._uU(3),t.qZA(),t.TgZ(4,"h2"),t._uU(5),t.qZA(),t._UZ(6,"br"),t.TgZ(7,"div",0)(8,"h2"),t._uU(9," Influencers' Results"),t.qZA(),t.TgZ(10,"button",1),t.NdJ("click",function(){return i.redirectToNewCampaign()}),t._uU(11," Edit Campaign "),t.qZA()(),t.YNc(12,Zt,37,3,"div",2)),2&n&&(t.xp6(1),t.hij("Campaign Name: ",null==i||null==i.campaign?null:i.campaign.campaignName,""),t.xp6(2),t.hij("Client: ",null==i||null==i.campaign||null==i.campaign.client?null:i.campaign.client.name,""),t.xp6(2),t.hij("Client Industry: ",null==i||null==i.campaign||null==i.campaign.client?null:i.campaign.client.industry,""),t.xp6(7),t.Q6J("ngIf",i.dataSource&&i.dataSource.length>0))},dependencies:[M.O5,c.BZ,c.fO,c.as,c.w1,c.Dz,c.nj,c.ge,c.ev,c.XQ,c.Gk,_.YE],styles:["h1[_ngcontent-%COMP%]{color:#fff}.logs-button[_ngcontent-%COMP%], .filter-container[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:space-between;margin-bottom:1%;width:100%}.logs-button[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .filter-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{color:#4789a1!important}.logs-button[_ngcontent-%COMP%]   .filter[_ngcontent-%COMP%], .filter-container[_ngcontent-%COMP%]   .filter[_ngcontent-%COMP%]{flex-grow:1;margin-right:20px}.logs-button[_ngcontent-%COMP%]   .filter[_ngcontent-%COMP%]:last-child, .filter-container[_ngcontent-%COMP%]   .filter[_ngcontent-%COMP%]:last-child{margin-right:0}.logs-button[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], .filter-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:10px 15px;background-color:transparent;color:#fff;border:1px solid #4789A1;border-radius:4px;cursor:pointer}.logs-button[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover, .filter-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background-color:#4789a1}"]});let Mt=P.m;const vt=[{path:"viewCampaigns",component:d},{path:"campaignDetails/:id",component:f},{path:"newCampaign",component:p},{path:"",redirectTo:`${Mt.forms}`,pathMatch:"full"},{path:"**",redirectTo:"/site/notFound"}];class g{}g.\u0275fac=function(n){return new(n||g)},g.\u0275mod=t.oAB({type:g}),g.\u0275inj=t.cJS({imports:[C.Bz.forChild(vt),C.Bz]});var wt=l(8519),Ot=l(3435),Tt=l(3006);class u{}u.\u0275fac=function(n){return new(n||u)},u.\u0275mod=t.oAB({type:u}),u.\u0275inj=t.cJS({imports:[M.ez,g,wt.q,r.UX,r.u5,h.Is,Ot.ViewBriefModule,Tt.SharingModule]})}}]);