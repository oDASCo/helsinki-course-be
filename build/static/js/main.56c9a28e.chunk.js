(this.webpackJsonphelsinki=this.webpackJsonphelsinki||[]).push([[0],{21:function(e,t,n){},22:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n(1),a=n.n(r),o=n(15),i=n.n(o),u=(n(21),n(22),n(5)),s=n(3),j=function(e){var t=e.searchVal,n=e.onSearchName;return Object(c.jsxs)("div",{children:[Object(c.jsx)("span",{children:"Filter shown with"}),Object(c.jsx)("input",{value:t,onInput:n})]})},d=function(e){var t=e.onSubmitAdd,n=e.newName,r=e.newNumber,a=e.onNameChange,o=e.onNumberChange;return Object(c.jsx)("div",{children:Object(c.jsxs)("form",{onSubmit:t,children:[Object(c.jsxs)("div",{children:["name: ",Object(c.jsx)("input",{value:n,onChange:a})]}),Object(c.jsxs)("div",{children:["number: ",Object(c.jsx)("input",{value:r,onChange:o})]}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",children:"add"})})]})})},l=function(e){var t=e.person,n=e.onDelete;return Object(c.jsxs)("li",{children:[t.name," ",Object(c.jsx)("i",{children:t.number})," ",Object(c.jsx)("button",{onClick:function(){return n(t)},children:"delete"})]},t.name)},b=function(e){var t=e.persons,n=e.onDelete;return Object(c.jsx)("div",{children:Object(c.jsx)("ul",{children:t.map((function(e){return Object(c.jsx)(l,{person:e,onDelete:n},e.name)}))})})},f=n(4),m=n.n(f),h="/api/persons",O=function(){return m.a.get(h)},x=function(e){return m.a.post(h,e)},v=function(e){return console.log(e),m.a.delete("".concat(h,"/").concat(e))},p=function(e,t){return m.a.put("".concat(h,"/").concat(t),e)},g=function(e){var t=e.message;if(null===t.text)return null;var n="";return t.text&&"general"===t.type?n="notif":t.text&&"error"===t.type&&(n="error"),Object(c.jsx)("div",{className:n,children:t.text})},w=function(){var e=Object(r.useState)([]),t=Object(s.a)(e,2),n=t[0],a=t[1],o=Object(r.useState)(n),i=Object(s.a)(o,2),l=i[0],f=i[1],m=Object(r.useState)(""),h=Object(s.a)(m,2),w=h[0],N=h[1],S=Object(r.useState)(""),y=Object(s.a)(S,2),C=y[0],D=y[1],k=Object(r.useState)(""),A=Object(s.a)(k,2),T=A[0],E=A[1],I=Object(r.useState)({text:"",type:"general"}),J=Object(s.a)(I,2),L=J[0],P=J[1];Object(r.useEffect)((function(){O().then((function(e){a(e.data),f(e.data)}))}),[]);var V=function(e){var t=e.id,n=e.name;p({id:t,name:n,number:C},t).then((function(e){f(l.map((function(n){return n.id!==t?n:e.data}))),a(l.map((function(n){return n.id!==t?n:e.data}))),N(""),D(""),P(Object(u.a)(Object(u.a)({},L),{},{text:"Number for ".concat(w,"  successfully updated")})),setTimeout((function(){P("")}),3e3)})).catch((function(e){P({type:"error",text:"Person ".concat(w," has already removed from server")}),setTimeout((function(){P("")}),3e3)}))};return Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{children:"Phonebook"}),Object(c.jsx)(j,{searchVal:T,onSearchName:function(e){if(""===e.target.value)E(""),f(n);else{E(e.target.value);var t=n.filter((function(t){return-1!==t.name.toLowerCase().indexOf(e.target.value.trim().toLowerCase())}));f(t)}}}),Object(c.jsx)("h3",{children:"Add new"}),Object(c.jsx)(g,{message:L}),Object(c.jsx)(d,{newName:w,newNumber:C,onNameChange:function(e){e.preventDefault(),N(e.target.value)},onNumberChange:function(e){e.preventDefault(),D(e.target.value)},onSubmitAdd:function(e){if(e.preventDefault(),l.find((function(e){return e.name===w}))){if(window.confirm("".concat(w," is already added to phonebook, replace old number?"))){var t=l.find((function(e){return e.name===w}));V(t,C)}}else{var c={name:w,id:+Date.now(),number:C};x(c).then((function(e){f(l.concat(e.data)),a(n.concat(e.data)),N(""),D(""),P(Object(u.a)(Object(u.a)({},L),{},{text:"".concat(w,"  successfully added")})),setTimeout((function(){P("")}),3e3)}))}}}),Object(c.jsx)("h2",{children:"Numbers"}),Object(c.jsx)(b,{persons:l,onDelete:function(e){var t=e.id,n=e.name;window.confirm("Delete ".concat(n))&&v(t).then((function(){var e=l.filter((function(e){return e.id!==t}));f(e),a(e)}))}})]})};i.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(w,{})}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.56c9a28e.chunk.js.map