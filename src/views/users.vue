<template lang="pug">
.content
  Dialog(:visible="showDailog" v-on="{ confirm, close }") 
    p delete data ?
  Popup(:show="showPop")
    .head 
      p edit data
    .form
      .control-group
        input(type='text' placeholder='name' v-model="editItem.name")
      .control-group
        input(type='text' placeholder='amount' maxlength='12' v-model="editItem.num")
      .foot
        button(class='button' v-on:click="closePop") cancal
        button(class='button button-primary' v-on:click="updateItem(editItem)") confirm
  h1
    router-link(to="/") Go to home
  table(class="table table-striped")
    thead 
      tr 
        th name
        th amount
        th operate
    tbody
      tr(v-for="i in list") 
        td {{i.name}}
        td {{i.num}}
        td
          button(class="button button-primary" v-on:click="openPop(i)") edit 
          button(class="button button-success" v-on:click="openDialog(i.id)") delete
</template>

<script lang="ts">
import { Vue, Component, Watch, Provide } from "vue-property-decorator";
import { Mutation, Getter, namespace } from "vuex-class";
import { User } from "../type";
import Dialog from "./components/Dialog.vue";
import Popup from "./components/popup.vue";
type Fn = (arg?: any) => void;
const userInfo = namespace("user");

@Component({
  components: {
    Dialog,
    Popup,
  },
})
export default class Users extends Vue {
  @Provide() showDailog = false;
  @Provide() showPop = false;
  @Provide() delID = 0;
  @Provide() editItem = {};

  @Mutation showModal: Fn;
  @Mutation closeModal: Fn;

  @userInfo.Mutation remove: Fn;
  @userInfo.Mutation update: Fn;

  // @userInfo.Mutation init:Fn
  @Mutation("init", { namespace: "user" })
  init: Fn;

  // @userInfo.Getter list: User[];
  @Getter("list", { namespace: "user" })
  list: Fn;
  // @Getter list:User[]
  // @Getter('list') getterList:User[]
  // get list(){
  //     return this.getterList
  // }

  created() {
    if (this.list.length) return;
    this.init([
      { id: 1, name: "Alex", num: 10000 },
      { id: 2, name: "Bob", num: 9000 },
      { id: 3, name: "David", num: 7000 },
      { id: 4, name: "Edward", num: 8000 },
    ]);
  }

  @Watch("list", { immediate: true, deep: true })
  listUpdate(val: User[], oldVal: User[]) {
    console.log(val, oldVal);
    if (val.length) {
      console.log(val[0].name);
    }
  }

  openDialog(id: number) {
    this.showModal();
    this.showDailog = true;
    this.delID = id;
  }

  confirm() {
    this.remove(this.delID);
    this.close();
  }

  close() {
    this.closeModal();
    this.showDailog = false;
  }

  openPop(item: User) {
    this.showModal();
    this.showPop = true;
    this.editItem = Object.assign({}, item); //将数据复制一份，而不是引用原数据
  }

  updateItem(item: User) {
    this.update(item);
    this.closePop();
  }

  closePop() {
    this.showPop = false;
    setTimeout(() => {
      this.closeModal();
    }, 300);
  }
}
</script>

<style lang="scss">
/* Button
   ========================================================================== */
.button {
  /* Structure */
  display: inline-block;
  zoom: 1;
  line-height: normal;
  white-space: nowrap;
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
  -webkit-user-drag: none;
  user-select: none;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 100%;
  padding: 0.6em 1em;
  color: #444;
  /* rgba not supported (IE 8) */
  color: rgba(0, 0, 0, 0.8);
  /* rgba supported */
  border: 1px solid #999;
  /*IE 6/7/8*/
  border: none rgba(0, 0, 0, 0);
  /*IE9 + everything else*/
  background-color: #e6e6e6;
  text-decoration: none;
  border-radius: 2px;
}

/* Firefox: Get rid of the inner focus border */
.button::-moz-focus-inner {
  padding: 0;
  border: 0;
}

.button-group {
  text-rendering: optimizespeed;
  /* Webkit: fixes text-rendering: optimizeLegibility */
}

.button-group .button {
  letter-spacing: normal;
  word-spacing: normal;
  vertical-align: top;
  text-rendering: auto;
}

.button-hover,
.button:hover,
.button:focus {
  opacity: 0.9;
  filter: alpha(opacity=90);
  background-image: linear-gradient(
    transparent,
    rgba(0, 0, 0, 0.1) 40%,
    rgba(0, 0, 0, 0.2)
  );
}

.button:focus {
  outline: 0;
}

.button.active,
.button-active,
.button:active {
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15) inset, 0 0 6px rgba(0, 0, 0, 0.2) inset;
  border-color: #000;
}

.button[disabled],
.button.disabled,
.button-disabled,
.button-disabled:hover,
.button-disabled:focus,
.button-disabled:active {
  border: none;
  background-image: none;
  opacity: 0.4;
  filter: alpha(opacity=40);
  cursor: not-allowed;
  box-shadow: none;
  pointer-events: none;
}

.button-hidden {
  display: none;
}

.button-block {
  width: 100%;
  display: block;
}

/* this is a blue */
.button-primary,
a.button-primary {
  color: #fff;
  background-color: #0077e6;
}

/* this is a green */
.button-success,
a.button-success {
  color: #fff;
  background-color: #1cba41;
}

/* this is a maroon */
.button-danger,
a.button-danger {
  color: #fff;
  background-color: #d8544f;
}

/* this is an orange */
.button-warning,
a.button-warning {
  color: #fff;
  background-color: #efa948;
}

/* this is a light blue */
.button-info,
a.button-info {
  color: #fff;
  background-color: #40b9dd;
}

/* this is a dark gray */
.button-dark,
a.button-dark {
  color: #fff;
  background-color: #555555;
}

.button-small {
  font-size: 80%;
}

.button-large {
  font-size: 120%;
}

/* Button Groups */
.button-group .button {
  float: left;
  margin: 0;
  border-radius: 0;
  border-right: 1px solid #111;
  /* fallback color for rgba() for IE7/8 */
  border-right: 1px solid rgba(0, 0, 0, 0.2);
}

.button-group .button:first-child {
  border-bottom-left-radius: 3px;
  border-top-left-radius: 3px;
}

.button-group .button:last-child {
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
  border-right: none;
}

.button-group-justified {
  display: table;
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
}

.button-group-justified .button {
  display: table-cell;
  float: none;
}

.close {
  float: right;
  font-size: 21px;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.2;
  filter: alpha(opacity=20);
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
  opacity: 0.5;
  filter: alpha(opacity=50);
}

/* Form
   ========================================================================== */

.form input[type="text"],
.form input[type="password"],
.form input[type="email"],
.form input[type="url"],
.form input[type="date"],
.form input[type="month"],
.form input[type="time"],
.form input[type="datetime"],
.form input[type="datetime-local"],
.form input[type="week"],
.form input[type="number"],
.form input[type="search"],
.form input[type="tel"],
.form input[type="color"],
.form select,
.form textarea {
  padding: 0.5em 0.6em;
  display: inline-block;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 3px #ddd;
  border-radius: 4px;
  vertical-align: middle;
  box-sizing: border-box;
}

.form input:not([type]) {
  padding: 0.5em 0.6em;
  display: inline-block;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 3px #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.form input[type="color"] {
  padding: 0.2em 0.5em;
}

.form input[type="text"]:focus,
.form input[type="password"]:focus,
.form input[type="email"]:focus,
.form input[type="url"]:focus,
.form input[type="date"]:focus,
.form input[type="month"]:focus,
.form input[type="time"]:focus,
.form input[type="datetime"]:focus,
.form input[type="datetime-local"]:focus,
.form input[type="week"]:focus,
.form input[type="number"]:focus,
.form input[type="search"]:focus,
.form input[type="tel"]:focus,
.form input[type="color"]:focus,
.form select:focus,
.form textarea:focus {
  outline: 0;
  border-color: #119de8;
}

.form input:not([type]):focus {
  outline: 0;
  border-color: #119de8;
}

.form input[type="file"]:focus,
.form input[type="radio"]:focus,
.form input[type="checkbox"]:focus {
  outline: thin solid #119de8;
  outline: 1px auto #119de8;
}

.form .checkbox,
.form .radio {
  margin: 0.5em 0;
  display: block;
}

.form input[type="text"][disabled],
.form input[type="password"][disabled],
.form input[type="email"][disabled],
.form input[type="url"][disabled],
.form input[type="date"][disabled],
.form input[type="month"][disabled],
.form input[type="time"][disabled],
.form input[type="datetime"][disabled],
.form input[type="datetime-local"][disabled],
.form input[type="week"][disabled],
.form input[type="number"][disabled],
.form input[type="search"][disabled],
.form input[type="tel"][disabled],
.form input[type="color"][disabled],
.form select[disabled],
.form textarea[disabled] {
  cursor: not-allowed;
  background-color: #e9ecec;
  color: #cad2d3;
}

.form input:not([type])[disabled] {
  cursor: not-allowed;
  background-color: #e9ecec;
  color: #cad2d3;
}

.form input[readonly],
.form select[readonly],
.form textarea[readonly] {
  background-color: #eee;
  /* menu hover bg color */
  color: #777;
  /* menu text color */
  border-color: #ccc;
}

.form input.invalid,
.form textarea.invalid,
.form select.invalid,
.form input:focus:invalid,
.form textarea:focus:invalid,
.form select:focus:invalid {
  color: #b94846;
  border-color: #e9352f;
}

.form input[type="file"]:focus:invalid:focus,
.form input[type="radio"]:focus:invalid:focus,
.form input[type="checkbox"]:focus:invalid:focus {
  outline-color: #e9352f;
}

.form select {
  /* Normalizes the height; padding is not sufficient. */
  height: 2.25em;
  border: 1px solid #ccc;
  background-color: white;
}

.form select[multiple] {
  height: auto;
}

.form label {
  margin: 0.5em 0 0.2em;
}

.form fieldset {
  margin: 0;
  padding: 0.35em 0 0.75em;
  border: 0;
}

.form legend {
  display: block;
  width: 100%;
  padding: 0.3em 0;
  margin-bottom: 0.3em;
  color: #333;
  border-bottom: 1px solid #e5e5e5;
}

.form-stacked input[type="text"],
.form-stacked input[type="password"],
.form-stacked input[type="email"],
.form-stacked input[type="url"],
.form-stacked input[type="date"],
.form-stacked input[type="month"],
.form-stacked input[type="time"],
.form-stacked input[type="datetime"],
.form-stacked input[type="datetime-local"],
.form-stacked input[type="week"],
.form-stacked input[type="number"],
.form-stacked input[type="search"],
.form-stacked input[type="tel"],
.form-stacked input[type="color"],
.form-stacked input[type="file"],
.form-stacked select,
.form-stacked label,
.form-stacked textarea {
  display: block;
  margin: 0.25em 0;
}

.form-stacked input:not([type]) {
  display: block;
  margin: 0.25em 0;
}

.form-aligned input,
.form-aligned textarea,
.form-aligned select {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  vertical-align: middle;
}

.form-aligned textarea {
  vertical-align: top;
}

.form-aligned .control-group {
  margin-bottom: 0.5em;
}

.form-aligned .control-group label {
  text-align: right;
  display: inline-block;
  vertical-align: middle;
  width: 10em;
  margin: 0 1em 0 0;
}

.form-aligned .controls {
  margin: 1.5em 0 0 11em;
}

.form input.input-rounded,
.form .input-rounded {
  border-radius: 2em;
  padding: 0.5em 1em;
}

.form .group fieldset {
  margin-bottom: 10px;
}

.form .group input,
.form .group textarea {
  display: block;
  padding: 10px;
  margin: 0 0 -1px;
  border-radius: 0;
  position: relative;
  top: -1px;
}

.form .group input:focus,
.form .group textarea:focus {
  z-index: 3;
}

.form .group input:first-child,
.form .group textarea:first-child {
  top: 1px;
  border-radius: 4px 4px 0 0;
  margin: 0;
}

.form .group input:first-child:last-child,
.form .group textarea:first-child:last-child {
  top: 1px;
  border-radius: 4px;
  margin: 0;
}

.form .group input:last-child,
.form .group textarea:last-child {
  top: -2px;
  border-radius: 0 0 4px 4px;
  margin: 0;
}

.form .group input button,
.form .group textarea button {
  margin: 0.35em 0;
}

.form .input-1 {
  width: 100%;
}

.form .input-3-4 {
  width: 75%;
}

.form .input-2-3 {
  width: 66%;
}

.form .input-1-2 {
  width: 50%;
}

.form .input-1-3 {
  width: 33%;
}

.form .input-1-4 {
  width: 25%;
}

@media only screen and (max-width: 480px) {
  .form button[type="submit"] {
    margin: 0.7em 0 0;
  }

  .form input:not([type]),
  .form input[type="text"],
  .form input[type="password"],
  .form input[type="email"],
  .form input[type="url"],
  .form input[type="date"],
  .form input[type="month"],
  .form input[type="time"],
  .form input[type="datetime"],
  .form input[type="datetime-local"],
  .form input[type="week"],
  .form input[type="number"],
  .form input[type="search"],
  .form input[type="tel"],
  .form input[type="color"],
  .form label {
    margin-bottom: 0.3em;
    display: block;
  }

  .group input:not([type]),
  .group input[type="text"],
  .group input[type="password"],
  .group input[type="email"],
  .group input[type="url"],
  .group input[type="date"],
  .group input[type="month"],
  .group input[type="time"],
  .group input[type="datetime"],
  .group input[type="datetime-local"],
  .group input[type="week"],
  .group input[type="number"],
  .group input[type="search"],
  .group input[type="tel"],
  .group input[type="color"] {
    margin-bottom: 0;
  }

  .form-aligned .control-group label {
    margin-bottom: 0.3em;
    text-align: left;
    display: block;
    width: 100%;
  }

  .form-aligned .controls {
    margin: 1.5em 0 0 0;
  }
}

/* Panel
   ========================================================================== */
.table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border-spacing: 0;
  empty-cells: show;
  border: 1px solid #cbcbcb;
  background-color: #fff;
}

.table caption {
  color: #000;
  font: italic 85%/1 arial, sans-serif;
  padding: 1em 0;
  text-align: center;
}

.table td,
.table th {
  border-left: 1px solid #cbcbcb;
  border-width: 0 0 0 1px;
  font-size: inherit;
  margin: 0;
  overflow: visible;
  /*to make ths where the title is really long work*/
  padding: 0.5em 1em;
  /* cell padding */
}

.table td:first-child,
.table th:first-child {
  border-left-width: 0;
}

.table thead {
  background-color: #ddd;
  color: #000;
  text-align: left;
  vertical-align: bottom;
}

.table td {
  background-color: transparent;
}

/*
striping:
   even - #fff (white)
   odd  - #f2f2f2 (light gray)
*/
.table-odd td {
  background-color: #f2f2f2;
}

/* nth-child selector for modern browsers */
.table-striped tr:nth-child(2n-1) td {
  background-color: #f2f2f2;
}

/* BORDERED TABLES */
.table-bordered td {
  border-bottom: 1px solid #cbcbcb;
}

.table-bordered tbody > tr:last-child > td {
  border-bottom-width: 0;
}

/* HORIZONTAL BORDERED TABLES */
.table-horizontal td,
.table-horizontal th {
  border-width: 0 0 1px 0;
  border-bottom: 1px solid #cbcbcb;
}

.table-horizontal tbody > tr:last-child > td {
  border-bottom-width: 0;
}
</style>
<style lang="scss" scoped>
.content {
  width: 600px;
  margin: 50px auto;
}

button:not(:last-child) {
  margin-right: 10px;
}

.head {
  background: #0077e6;

  p {
    margin: 0;
    padding-left: 20px;
    line-height: 3;
    color: #fff;
    font-size: 18px;
    @include nowrap;
  }
}

.form {
  background: #fff;
  text-align: center;

  .control-group {
    padding: 10px 20px 0;
  }

  input {
    width: 100%;
  }

  .foot {
    padding: 14px 20px;
    text-align: right;
  }

  button {
    font-size: 12px;
    padding: 8px 20px;
  }
}
</style>
