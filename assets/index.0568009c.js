import{a as I,x as T,o as l,c as i,F as D,y as g,l as w,d as b,e as B,b as r,t as y,z as L,w as N,v as P,h as x,n as S,_ as F,g as v,s as C}from"./index.1ad6235a.js";import{P as K}from"./index.48d7c878.js";const O=["onClick"],V=["onClick"],z=["onKeyup","onBlur"],A=["onDblclick"],H=["onClick"],M=r("legend",null,"DELETE TODOLIST",-1);function U(a,s,c,t,h,k){const u=I("Popup"),f=T("focus");return l(),i(D,null,[(l(!0),i(D,null,g(c.todos,n=>(l(),i("div",{class:"item",key:n.index},[n.done?(l(),i("i",{key:0,class:"fa-solid fa-circle-check",onClick:o=>t.updateCompleted(n)},null,8,O)):(l(),i("i",{key:1,class:"fa-solid fa-clock-rotate-left",onClick:o=>t.updateCompleted(n)},null,8,V)),n.isEdit?N((l(),i("input",{key:2,type:"text","onUpdate:modelValue":s[0]||(s[0]=o=>t.editItem=o),onKeyup:[x(o=>t.submitEdit(n),["enter"]),x(o=>t.cancelEidt(n),["esc"])],onBlur:o=>t.cancelEidt(n)},null,40,z)),[[f],[P,t.editItem,void 0,{trim:!0}]]):(l(),i("p",{key:3,class:S([n.done?"completed":"active"]),onDblclick:o=>t.editHandler(n)},y(n.Content),43,A)),r("i",{class:"fa-solid fa-trash-arrow-up",onClick:o=>t.deletehandler(n)},null,8,H)]))),128)),(l(),w(L,{to:"body"},[b(u,{class:"deleteDialog",showDialog:t.isShowDeleteDialog,cancelText:"CNACEL",confirmText:"CONFIRM",onCancel:t.cancelDelete,onConfirm:t.confirmDelete},{default:B(()=>[r("fieldset",null,[M,r("p",null,'Are you sure you want to delete the "'+y(t.deleteItem.Content)+'" plan?',1)])]),_:1},8,["showDialog","onCancel","onConfirm"])]))],64)}const R={components:{Popup:K},props:["todos"],directives:{focus:{mounted(a){a.focus()}}},setup(){const a=v(""),s=v(""),c=v(!1);function t(e){a.value=e.Content,e.isEdit=!0}function h(e){e.Content=a.value,e.isEdit=!1;const{Content:d,Id:m,done:_,index:p}=e;C.dispatch("todos/updateTodo",{Content:d,Id:m,done:_,index:p})}function k(e){return e.isEdit=!1,e}function u(e){s.value=e,c.value=!0}function f(){c.value=!1,s.value=""}function n(){const{Id:e,index:d}=s.value;C.dispatch("todos/deleteTodo",{Id:e,index:d}),c.value=!1}function o(e){e.done=!e.done;const{Content:d,Id:m,UserId:_,done:p,index:E}=e;C.dispatch("todos/updateTodo",{Content:d,Id:m,UserId:_,done:p,index:E})}return{editItem:a,deleteItem:s,isShowDeleteDialog:c,editHandler:t,submitEdit:h,cancelEidt:k,deletehandler:u,cancelDelete:f,confirmDelete:n,updateCompleted:o}}},G=F(R,[["render",U]]);export{G as T};