import{o as s,c as a,d as l,e as c,p as r,T as d,m as u,b as o,t as m,q as p,_}from"./index.ad7f3ca6.js";const f={class:"popup"},v={key:0,class:"dialog"},x=["textContent"],y=["textContent"];function C(t,e,n,k,$,h){return s(),a("div",f,[l(d,{name:"fade",apper:""},{default:c(()=>[n.showDialog?(s(),a("div",{key:0,class:"dialog-overlay",onClick:e[0]||(e[0]=i=>t.$emit("cancel"))})):r("",!0)]),_:1}),l(d,{name:"slide",apper:""},{default:c(()=>[n.showDialog?(s(),a("div",v,[u(t.$slots,"default"),o("button",{type:"submit",onClick:e[1]||(e[1]=p(i=>t.$emit("confirm"),["prevent"])),class:"confirm"},[o("h2",{textContent:m(n.confirmText)},null,8,x)]),o("button",{onClick:e[2]||(e[2]=i=>t.$emit("cancel")),class:"cancel"},[o("h2",{textContent:m(n.cancelText)},null,8,y)])])):r("",!0)]),_:3})])}const g={props:["showDialog","cancelText","confirmText","overlay"],emits:["cancel","confirm"],setup(){}},w=_(g,[["render",C]]);export{w as P};