import{a as c,o as r,l as d,_ as i,i as _,s as o,u as p}from"./index.40538bdf.js";import{T as e}from"./index.a6194830.js";import"./index.869eab48.js";function l(t,s,u,n,T,f){const a=c("TodoListItem");return r(),d(a,{todos:n.activeTodos},null,8,["todos"])}const m={components:{TodoListItem:e},setup(){const t=_(()=>o.getters["todos/activeTodos"]);async function s(){await o.dispatch("todos/getAllTodos"),o.getters["todos/allTodos"]}return p(()=>{s()}),{TodoListItem:e,activeTodos:t}}},y=i(m,[["render",l]]);export{y as default};