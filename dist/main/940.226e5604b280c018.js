"use strict";(self.webpackChunkmain=self.webpackChunkmain||[]).push([[940],{9559:(T,f,m)=>{m.r(f),m.d(f,{AUTH_ROUTE:()=>R});var l=m(8498),e=m(9417),u=m(2898),v=m(4619),c=m(9213),h=m(9631),s=m(2102),d=m(8834),t=m(4438);function b(r,p){1&r&&(t.j41(0,"mat-error"),t.EFF(1," Username is required "),t.k0s())}function F(r,p){1&r&&(t.j41(0,"mat-error"),t.EFF(1," Password is required "),t.k0s())}function k(r,p){if(1&r&&(t.j41(0,"div",21),t.EFF(1),t.k0s()),2&r){const n=t.XpG();t.R7$(),t.JRh(n.error)}}function j(r,p){1&r&&(t.j41(0,"mat-error"),t.EFF(1," Please enter a valid email address "),t.k0s())}function E(r,p){1&r&&(t.j41(0,"mat-error"),t.EFF(1," Password is required "),t.k0s())}const R=[{path:"",redirectTo:"signin",pathMatch:"full"},{path:"signin",component:(()=>{class r extends v.U{constructor(n,o,i,a){super(),this.formBuilder=n,this.route=o,this.router=i,this.authService=a,this.submitted=!1,this.loading=!1,this.error="",this.hide=!0}ngOnInit(){this.authForm=this.formBuilder.group({username:["admin@software.com",e.k0.required],password:["admin@123",e.k0.required]})}get f(){return this.authForm.controls}adminSet(){this.authForm.get("username")?.setValue("admin@software.com"),this.authForm.get("password")?.setValue("admin@123")}onSubmit(){this.submitted=!0,this.loading=!0,this.error="",this.authForm.invalid?this.error="Username and Password not valid !":this.subs.sink=this.authService.login(this.f.username.value,this.f.password.value).subscribe(n=>{n?setTimeout(()=>{const o=this.authService.currentUserValue.role;(o===u.Xh.All||o===u.Xh.Admin)&&this.router.navigate(["/admin/dashboard/main"]),this.loading=!1},1e3):this.error="Invalid Login"},n=>{this.error=n,this.submitted=!1,this.loading=!1})}static#t=this.\u0275fac=function(o){return new(o||r)(t.rXU(e.ze),t.rXU(l.nX),t.rXU(l.Ix),t.rXU(u.uR))};static#e=this.\u0275cmp=t.VBU({type:r,selectors:[["app-signin"]],standalone:!0,features:[t.Vt3,t.aNF],decls:54,vars:10,consts:[[1,"auth-container"],[1,"row","auth-main"],[1,"col-sm-6","px-0","d-none","d-sm-block"],[1,"left-img",2,"background-image","url(assets/images/pages/bg-01.png)"],[1,"col-sm-6","auth-form-section"],[1,"form-section"],[1,"auth-wrapper"],[1,"welcome-msg"],[1,"d-flex","justify-content-between","lbl-alert","mb-3"],[1,"login-title"],[1,"validate-form",3,"ngSubmit","formGroup"],[1,"row"],[1,"col-xl-12","col-lg-12","col-md-12","col-sm-12","mb-2"],["appearance","outline",1,"example-full-width"],["matInput","","formControlName","username"],["matSuffix","",1,"material-icons-outlined","color-icon","p-3"],[1,"col-xl-12col-lg-12","col-md-12","col-sm-12","mb-2"],["matInput","","formControlName","password",3,"type"],["matSuffix","",1,"material-icons-outlined","pwd-toggle","p-3",3,"click"],[1,"d-flex","justify-content-between","align-items-center","mb-5"],["routerLink","/authentication/forgot-password",1,"txt1"],[1,"alert","alert-danger","mt-3","mb-0"],[1,"container-auth-form-btn"],[2,"text-align","center"],["mat-raised-button","","color","primary","type","submit",1,"auth-form-btn",3,"disabled"],[1,"social-login-title"],[1,"list-unstyled","social-icon","mb-0","mt-3"],[1,"list-inline-item"],["href","javascript:void(0)",1,"rounded"],[1,"fab","fa-google"],["href","javascript:void(0)",1,"rounded","flex-c-m"],[1,"fab","fa-facebook-f"],[1,"fab","fa-twitter"],[1,"fab","fa-linkedin-in"]],template:function(o,i){if(1&o&&(t.j41(0,"div",0)(1,"div",1)(2,"div",2),t.nrm(3,"div",3),t.k0s(),t.j41(4,"div",4)(5,"div",5)(6,"div",6)(7,"h2",7),t.EFF(8," Admin Web App "),t.k0s(),t.nrm(9,"div",8),t.j41(10,"h2",9),t.EFF(11,"Sign in"),t.k0s(),t.j41(12,"form",10),t.bIt("ngSubmit",function(){return i.onSubmit()}),t.j41(13,"div",11)(14,"div",12)(15,"mat-form-field",13)(16,"mat-label"),t.EFF(17,"Username"),t.k0s(),t.nrm(18,"input",14),t.j41(19,"mat-icon",15),t.EFF(20,"face"),t.k0s(),t.DNE(21,b,2,0,"mat-error"),t.k0s()()(),t.j41(22,"div",11)(23,"div",16)(24,"mat-form-field",13)(25,"mat-label"),t.EFF(26,"Password"),t.k0s(),t.nrm(27,"input",17),t.j41(28,"mat-icon",18),t.bIt("click",function(){return i.hide=!i.hide}),t.EFF(29),t.k0s(),t.DNE(30,F,2,0,"mat-error"),t.k0s()()(),t.j41(31,"div",19)(32,"a",20),t.EFF(33,"Forgot Password?"),t.k0s()(),t.DNE(34,k,2,1,"div",21),t.j41(35,"div",22)(36,"div",23)(37,"button",24),t.EFF(38,"Login"),t.k0s()()()(),t.j41(39,"h6",25),t.EFF(40,"OR"),t.k0s(),t.j41(41,"ul",26)(42,"li",27)(43,"a",28),t.nrm(44,"i",29),t.k0s()(),t.j41(45,"li",27)(46,"a",30),t.nrm(47,"i",31),t.k0s()(),t.j41(48,"li",27)(49,"a",28),t.nrm(50,"i",32),t.k0s()(),t.j41(51,"li",27)(52,"a",28),t.nrm(53,"i",33),t.k0s()()()()()()()()),2&o){let a,g;t.R7$(12),t.Y8G("formGroup",i.authForm),t.R7$(9),t.vxM(21,null!=(a=i.authForm.get("username"))&&a.hasError("required")?21:-1),t.R7$(6),t.Y8G("type",i.hide?"password":"text"),t.R7$(2),t.SpI(" ",i.hide?"visibility_off":"visibility",""),t.R7$(),t.vxM(30,null!=(g=i.authForm.get("password"))&&g.hasError("required")?30:-1),t.R7$(4),t.vxM(34,i.error?34:-1),t.R7$(3),t.AVh("auth-spinner",i.loading),t.Y8G("disabled",i.loading)("disabled",!i.authForm.valid)}},dependencies:[l.Wk,d.Hl,d.$z,e.YN,e.qT,e.me,e.BC,e.cb,e.X1,e.j4,e.JD,s.RG,s.rl,s.nJ,s.TL,s.yw,h.fS,h.fg,c.m_,c.An]})}return r})()},{path:"forgot-password",component:(()=>{class r{constructor(n,o,i){this.formBuilder=n,this.route=o,this.router=i,this.submitted=!1}ngOnInit(){this.authForm=this.formBuilder.group({email:["",[e.k0.required,e.k0.email,e.k0.minLength(5)]]}),this.returnUrl=this.route.snapshot.queryParams.returnUrl||"/"}get f(){return this.authForm.controls}onSubmit(){this.submitted=!0,!this.authForm.invalid&&this.router.navigate(["/dashboard/main"])}static#t=this.\u0275fac=function(o){return new(o||r)(t.rXU(e.ze),t.rXU(l.nX),t.rXU(l.Ix))};static#e=this.\u0275cmp=t.VBU({type:r,selectors:[["app-forgot-password"]],standalone:!0,features:[t.aNF],decls:30,vars:3,consts:[[1,"auth-container"],[1,"row","auth-main"],[1,"col-sm-6","px-0","d-none","d-sm-block"],[1,"left-img",2,"background-image","url(assets/images/pages/bg-03.png)"],[1,"col-sm-6","auth-form-section"],[1,"form-section"],[1,"auth-wrapper"],[1,"welcome-msg"],[1,"auth-signup-text","text-muted"],[1,"validate-form",3,"ngSubmit","formGroup"],[1,"row"],[1,"col-xl-12","col-lg-12","col-md-12","col-sm-12","mb-2"],[1,"error-subheader2","p-t-20","p-b-15"],["appearance","outline",1,"example-full-width"],["matInput","","formControlName","email","required",""],["matSuffix","",1,"material-icons-outlined","color-icon","p-3"],[1,"container-auth-form-btn","mt-5"],["mat-raised-button","","color","primary","type","submit",1,"auth-form-btn",3,"disabled"],[1,"w-full","p-t-25","text-center"],["routerLink","/authentication/signin",1,"txt1"]],template:function(o,i){if(1&o&&(t.j41(0,"div",0)(1,"div",1)(2,"div",2),t.nrm(3,"div",3),t.k0s(),t.j41(4,"div",4)(5,"div",5)(6,"div",6)(7,"h2",7),t.EFF(8," Reset Password "),t.k0s(),t.j41(9,"p",8),t.EFF(10,"Let Us Help You"),t.k0s(),t.j41(11,"form",9),t.bIt("ngSubmit",function(){return i.onSubmit()}),t.j41(12,"div",10)(13,"div",11)(14,"span",12),t.EFF(15," Enter your registered email address. "),t.k0s(),t.j41(16,"mat-form-field",13)(17,"mat-label"),t.EFF(18,"Email"),t.k0s(),t.nrm(19,"input",14),t.j41(20,"mat-icon",15),t.EFF(21,"mail"),t.k0s(),t.DNE(22,j,2,0,"mat-error"),t.k0s()()(),t.j41(23,"div",16)(24,"button",17),t.EFF(25," Reset My Password "),t.k0s()(),t.j41(26,"div",18)(27,"div")(28,"a",19),t.EFF(29," Login? "),t.k0s()()()()()()()()()),2&o){let a;t.R7$(11),t.Y8G("formGroup",i.authForm),t.R7$(11),t.vxM(22,null!=(a=i.authForm.get("email"))&&a.hasError("required")||null!=(a=i.authForm.get("email"))&&a.touched?22:-1),t.R7$(2),t.Y8G("disabled",!i.authForm.valid)}},dependencies:[e.YN,e.qT,e.me,e.BC,e.cb,e.YS,e.X1,e.j4,e.JD,s.RG,s.rl,s.nJ,s.TL,s.yw,h.fS,h.fg,c.m_,c.An,d.Hl,d.$z,l.Wk]})}return r})()},{path:"locked",component:(()=>{class r{constructor(n,o,i){this.formBuilder=n,this.router=o,this.authService=i,this.submitted=!1,this.hide=!0}ngOnInit(){this.authForm=this.formBuilder.group({password:["",e.k0.required]}),this.userImg=this.authService.currentUserValue.img,this.userFullName=this.authService.currentUserValue.firstName+" "+this.authService.currentUserValue.lastName}get f(){return this.authForm.controls}onSubmit(){if(this.submitted=!0,!this.authForm.invalid){const n=this.authService.currentUserValue.role;this.router.navigate(n===u.Xh.All||n===u.Xh.Admin?["/admin/dashboard/main"]:n===u.Xh.Teacher?["/teacher/dashboard"]:n===u.Xh.Student?["/student/dashboard"]:["/authentication/signin"])}}static#t=this.\u0275fac=function(o){return new(o||r)(t.rXU(e.ze),t.rXU(l.Ix),t.rXU(u.uR))};static#e=this.\u0275cmp=t.VBU({type:r,selectors:[["app-locked"]],standalone:!0,features:[t.aNF],decls:34,vars:7,consts:[[1,"auth-container"],[1,"row","auth-main"],[1,"col-sm-6","px-0","d-none","d-sm-block"],[1,"left-img",2,"background-image","url(assets/images/pages/bg-01.png)"],[1,"col-sm-6","auth-form-section"],[1,"form-section"],[1,"auth-wrapper"],[1,"validate-form",3,"ngSubmit","formGroup"],[1,"auth-locked"],[1,"image"],["alt","User",3,"src"],[1,"auth-locked-title","p-b-34","p-t-27"],[1,"text-center"],[1,"txt1","p-b-20"],[1,"row"],[1,"col-xl-12","col-lg-12","col-md-12","col-sm-12","mb-2"],[1,"error-subheader2","p-t-20","p-b-15"],["appearance","outline",1,"example-full-width"],["matInput","","formControlName","password","required","",3,"type"],["matSuffix","",3,"click"],[1,"container-auth-form-btn","mt-5"],["mat-raised-button","","color","primary","type","submit",1,"auth-form-btn",3,"disabled"],[1,"w-full","p-t-15","p-b-15","text-center"],["routerLink","/authentication/signin",1,"txt1"]],template:function(o,i){if(1&o&&(t.j41(0,"div",0)(1,"div",1)(2,"div",2),t.nrm(3,"div",3),t.k0s(),t.j41(4,"div",4)(5,"div",5)(6,"div",6)(7,"form",7),t.bIt("ngSubmit",function(){return i.onSubmit()}),t.j41(8,"div",8)(9,"div",9),t.nrm(10,"img",10),t.k0s()(),t.j41(11,"span",11),t.EFF(12),t.k0s(),t.j41(13,"div",12)(14,"p",13),t.EFF(15," Locked "),t.k0s()(),t.j41(16,"div",14)(17,"div",15)(18,"span",16),t.EFF(19," Enter your password here. "),t.k0s(),t.j41(20,"mat-form-field",17)(21,"mat-label"),t.EFF(22,"Password"),t.k0s(),t.nrm(23,"input",18),t.j41(24,"mat-icon",19),t.bIt("click",function(){return i.hide=!i.hide}),t.EFF(25),t.k0s(),t.DNE(26,E,2,0,"mat-error"),t.k0s()()(),t.j41(27,"div",20)(28,"button",21),t.EFF(29," Reset My Password "),t.k0s()(),t.j41(30,"div",22)(31,"div")(32,"a",23),t.EFF(33," Need Help? "),t.k0s()()()()()()()()()),2&o){let a;t.R7$(7),t.Y8G("formGroup",i.authForm),t.R7$(3),t.FS9("src",i.userImg,t.B4B),t.R7$(2),t.SpI(" ",i.userFullName," "),t.R7$(11),t.Y8G("type",i.hide?"password":"text"),t.R7$(2),t.SpI(" ",i.hide?"visibility_off":"visibility",""),t.R7$(),t.vxM(26,null!=(a=i.authForm.get("password"))&&a.hasError("required")?26:-1),t.R7$(2),t.Y8G("disabled",!i.authForm.valid)}},dependencies:[e.YN,e.qT,e.me,e.BC,e.cb,e.YS,e.X1,e.j4,e.JD,s.RG,s.rl,s.nJ,s.TL,s.yw,h.fS,h.fg,c.m_,c.An,d.Hl,d.$z,l.Wk]})}return r})()},{path:"page404",component:m(2053).X},{path:"page500",component:(()=>{class r{constructor(){}static#t=this.\u0275fac=function(o){return new(o||r)};static#e=this.\u0275cmp=t.VBU({type:r,selectors:[["app-page500"]],standalone:!0,features:[t.aNF],decls:19,vars:0,consts:[[1,"auth-container"],[1,"row","auth-main"],[1,"col-sm-6","px-0","d-none","d-sm-block"],[1,"left-img",2,"background-image","url(assets/images/pages/bg-05.png)"],[1,"col-sm-6","auth-form-section"],[1,"form-section"],[1,"auth-wrapper"],[1,"error-header","p-b-45"],[1,"error-subheader2","p-b-5"],[1,"container-auth-form-btn","mt-5"],["mat-raised-button","","color","primary","type","submit",1,"auth-form-btn"],[1,"w-full","p-t-15","p-b-15","text-center"],["routerLink","/authentication/signin",1,"txt1"]],template:function(o,i){1&o&&(t.j41(0,"div",0)(1,"div",1)(2,"div",2),t.nrm(3,"div",3),t.k0s(),t.j41(4,"div",4)(5,"div",5)(6,"div",6)(7,"form")(8,"span",7),t.EFF(9," 500 "),t.k0s(),t.j41(10,"span",8),t.EFF(11," Oops, Something went wrong. Please try after some times. "),t.k0s(),t.j41(12,"div",9)(13,"button",10),t.EFF(14," Go To Home Page "),t.k0s()(),t.j41(15,"div",11)(16,"div")(17,"a",12),t.EFF(18," Need Help? "),t.k0s()()()()()()()()())},dependencies:[e.YN,e.qT,e.cb,e.cV,d.Hl,d.$z,l.Wk]})}return r})()}]}}]);