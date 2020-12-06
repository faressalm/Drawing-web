<template>
  <div id="app">
    <v-snackbar v-model="snackbarshape" :timeout="1000" top light>
      <span class="font-weight-bold">You added a new {{ shape }} </span>
      <v-btn dark class="cyan--text ml-12" @click="snackbarshape = false"
        >Close</v-btn
      >
    </v-snackbar>

    <v-snackbar
      v-model="savesnack"
      :timeout="1000"
      top
      dark
      max-width="50px"
      shaped
    >
      <v-layout row wrap justify-center>
        <v-icon x-large class="success--text">mdi-check-outline</v-icon>
      </v-layout>
    </v-snackbar>
    <nav>
      <!--toolbar-->
      <v-toolbar dark app height="42px" src="../assets/y.jpg">
        <v-app-bar-nav-icon
          x-large
          @click="drawer = !drawer"
          class="cyan--text"
        ></v-app-bar-nav-icon>
        <v-toolbar-title class="text-uppercase blue--text">
          <span class="font-weight-light">AFA </span>
          <span class="font-weight-bold">Drawer</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="amber--text" text small @click="undofun"
          ><v-icon small>mdi-undo</v-icon></v-btn
        >
        <v-btn class="amber--text" text small @click="redofun"
          ><v-icon small>mdi-redo</v-icon></v-btn
        >
      </v-toolbar>

      <v-navigation-drawer
        absolute
        bottom
        temporary
        v-model="drawer"
        class="blue--text"
        dark
        :style="{
          backgroundImage: 'url(' + require('@/assets/z.jpg') + ')',
          backgroundSize: 'cover',
        }"
      >
        <h2 class="ml-5 my-5 py-5">Options</h2>
        <v-menu v-model="menu" :close-on-content-click="false" offset-y>
          <template v-slot:activator="{ attrs, on }">
            <v-btn
              v-bind="attrs"
              @click="menu = true"
              v-on="on"
              depressed
              text
              block
              x-large
            >
              Save File
              <v-icon class="cyan--text" right>mdi-content-save</v-icon></v-btn
            >
          </template>

          <v-list
            dark
            max-height="300px"
            min-height="150px"
            class="overflow-y-auto"
          >
            <v-form ref="form" @submit="save" onSubmit="return false;">
              <v-text-field
                v-model="savetext"
                label="name.json or name.xml"
                :rules="inputRules"
                v-on:keyup.enter="save"
              ></v-text-field>
              <v-btn dark small @click="save">
                <v-icon class="amber--text" left>mdi-file-plus</v-icon>New File
              </v-btn>
            </v-form>

            <span class="custom-transform-class text-none ml-5"
              >Click to save</span
            >
            <v-list-item
              v-for="item in items"
              :key="item"
              link
              @click="(menu = false), saveShapes(item), (savesnack = true)"
            >
              <v-list-item-title
                v-text="item"
                class="cyan--text font-weight-bold"
              ></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu offset-y>
          <template v-slot:activator="{ attrs, on }">
            <v-btn v-bind="attrs" v-on="on" depressed text block x-large>
              Load File
              <v-icon class="cyan--text" right
                >mdi-download-outline</v-icon
              ></v-btn
            >
          </template>
          <v-list
            dark
            max-height="300px"
            min-height="150px"
            class="overflow-y-auto"
          >
            <v-list-item
              v-for="item in items"
              :key="item"
              link
              @click="loadData(item)"
            >
              <v-list-item-title
                v-text="item"
                class="cyan--text font-weight-bold"
              >
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-navigation-drawer>
    </nav>
    <!---->
    <v-layout row class="pt-3 pl-5">
      <v-flex xs6 md4 sm4 mr0>
        <v-btn
          small
          dark
          text
          elevation="24"
          fab
          @click="
            colorclick = true;
            deleteval = false;
          "
        >
          <v-icon class="amber--text"> mdi-format-color-fill</v-icon>
        </v-btn>
        <v-btn
          dark
          fab
          small
          text
          elevation="24"
          @click="
            deletevar = true;
            colorclick = false;
          "
        >
          <v-icon class="amber--text">mdi-delete-circle</v-icon>
        </v-btn>
      </v-flex>
      <!--shapes-->
      <v-flex xs6 md6>
        <v-card
          class="blue-grey darken-4"
          width="450px"
          :style="{ backgroundImage: 'url(' + require('@/assets/y.jpg') + ')' }"
        >
          <v-btn text small width="75px">
            <v-icon
              class="cyan--text"
              @click="
                openMyDialog();
                shape = 'Circle';
                NewElement = 1;
              "
              >mdi-circle-outline</v-icon
            >
          </v-btn>
          <v-btn text small width="75px">
            <v-icon
              class="cyan--text"
              @click.prevent="
                openMyDialogs();
                shape = 'Square';
                NewElement = 4;
              "
              >mdi-square-outline</v-icon
            >
          </v-btn>
          <v-btn text small width="75px">
            <v-icon
              class="cyan--text"
              @click.prevent="
                openMyDialogr();
                shape = 'Rectangle';
                NewElement = 2;
              "
              >mdi-rectangle-outline</v-icon
            >
          </v-btn>

          <v-btn text small width="75px">
            <v-icon
              class="cyan--text"
              @click="
                NewElement = 6;
                shape = 'Triangle';
              "
              >mdi-triangle-outline</v-icon
            >
          </v-btn>
          <v-btn text small width="75px">
            <v-icon
              class="cyan--text"
              @click.prevent="
                openMyDialoge();
                shape = 'Ellipse';
                NewElement = 3;
              "
              >mdi-ellipse-outline</v-icon
            >
          </v-btn>
          <v-btn text small width="75px">
            <v-icon
              class="cyan--text"
              @click="
                NewElement = 5;
                shape = 'Line';
              "
              >mdi-minus</v-icon
            >
          </v-btn>
        </v-card>
      </v-flex>

      <v-flex md2>
        <v-btn
          dark
          text
          fab
          elevation="24"
          rounded
          small
          @click="copyvar = true"
          class="ml-5"
        >
          <v-icon class="cyan--text" right>mdi-content-copy</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <!---->

    <v-layout row wrap>
      <v-flex xs2 md1 sm4 class="ml-5 pl-4 my-2">
        <v-menu
          bottom
          right
          nudge-bottom="105"
          nudge-left="16"
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ on }">
            <div :style="swatchStyle" v-on="on" />
          </template>
          <v-card>
            <v-card-text class="pa-0">
              <v-color-picker
                v-model="color"
                dot-size="12"
                hide-inputs
                hide-mode-switch
                mode="hexa"
                swatches-max-height="200"
              />
            </v-card-text>
          </v-card>
        </v-menu>
      </v-flex>
      <v-card
        max-width="1500px"
        min-width="1000px"
        height="500px"
        elevation="24"
        outlined
        shaped
      >
        <canvas
          id="myCanvas"
          width="1000px"
          height="500px"
          @mousedown="dragstart"
          @mousemove="drag"
          @mouseup="dragend"
          @click="drawNewElement"
        ></canvas>
      </v-card>
    </v-layout>
    <Circlepop @circlerad="getradius" />
    <Ellipsepop @ellipseval="getxy" />
    <Rectanglepop @rectangleval="getwl" />
    <Squarepop @squareval="getl" />
  </div>
</template>

<script>
import axios from "axios";
const appUrl = "http://localhost:9000/api/drawing"; // server-side runs in 9000.
import {
  MyCircle,
  MyRect,
  MyEllipse,
  MyLine,
  MyTraingle,
  shapeFactory,
} from "./shapes.js";
import Circlepop from "./circlepop.vue";
import Ellipsepop from "./ellipsepop.vue";
import Rectanglepop from "./rectanglepop.vue";
import Squarepop from "./squarepop.vue";
import { bus } from "../main";
import { buse } from "../main";
import { busr } from "../main";
import { buss } from "../main";
export default {
  name: "App",
  components: { Circlepop, Ellipsepop, Rectanglepop, Squarepop },
  data() {
    return {
      items: [],
      menu: false,
      savetext: "",
      inputRules: [
        (v) => v.length > 6 || "minimum world lenght allowed is 7 ",
        (v) => this.checksave(v) || "should be .json or .xml",
        (v) => this.checktext(v) || "This is a repeated name",
      ],
      savesnack: false,
      //save load
      //toolbar
      color: "#CAA61FC6",
      mask: "!#XXXXXXXX",
      colorclick: false,
      deletevar: false,
      copyvar: false,
      col: "",
      undo: [],
      redo: [],
      drawer: false,
      /**/
      id: -1,
      dragging: false,
      startdrag: true,
      canvas: null,
      accessEle: null,
      elements: [],
      counter: 0,
      NewElement: 0,
      clicks: [],
      resizeFlag: false,
      startLocation: { x: 0, y: 0 },
      resizePoint: 0,
      /**/
      snackbarshape: false,
      shape: "",
      radius: "30",
      width: "30",
      length: "20",
      squarelen: "30",
      radx: "30",
      rady: "20",
    };
  },
  methods: {
    drawNewElement(e) {
      this.colorclick = false;
      this.deletevar = false;
      if (this.NewElement != 0) {
        let ctx = this.canvas;
        var element;
        switch (this.NewElement) {
          case 1: {
            let radius = this.radius;
            let props = {
              id: this.counter,
              x: e.offsetX,
              y: e.offsetY,
              r: radius,
              type: 1,
              color: "#ffffffff",
              strokeColor: "#ffffffff",
            };
            element = new shapeFactory(1, props);
            break;
          }
          case 2: {
            let width = this.width;
            let height = this.length;
            let props = {
              id: this.counter,
              x: e.offsetX,
              y: e.offsetY,
              width: width,
              height: height,
              type: 2,
              color: "#ffffffff",
              strokeColor: "#ffffffff",
            };
            element = new shapeFactory(2, props);
            break;
          }
          case 3: {
            let xradius = this.radx;
            let yradius = this.rady;
            let props = {
              id: this.counter,
              x: e.offsetX,
              y: e.offsetY,
              xradius: xradius,
              yradius: yradius,
              type: 3,
              color: "#ffffffff",
              strokeColor: "#ffffffff",
            };
            element = new shapeFactory(3, props);
            break;
          }
          case 4: {
            let width = this.squarelen;
            let props = {
              id: this.counter,
              x: e.offsetX,
              y: e.offsetY,
              width: width,
              type: 4,
              color: "#ffffffff",
              strokeColor: "#ffffffff",
            };
            element = new shapeFactory(4, props);
            break;
          }
          case 5: {
            var x1 = e.offsetX;
            var y1 = e.offsetY;
            this.clicks.push(x1);
            this.clicks.push(y1);
            if (this.clicks.length > 2) {
              let props = {
                id: this.counter,
                x1: this.clicks[0],
                y1: this.clicks[1],
                x2: this.clicks[2],
                y2: this.clicks[3],
                type: 5,
                color: "#000000",
              };
              element = new shapeFactory(5, props);
              this.clicks = [];
            }
            break;
          }
          case 6: {
            var x = e.offsetX;
            var y = e.offsetY;
            this.clicks.push(x);
            this.clicks.push(y);
            if (this.clicks.length > 5) {
              let props = {
                id: this.counter,
                x1: this.clicks[0],
                y1: this.clicks[1],
                x2: this.clicks[2],
                y2: this.clicks[3],
                x3: this.clicks[4],
                y3: this.clicks[5],
                type: 6,
                color: "#ffffffff",
                strokeColor: "#000000",
              };
              element = new shapeFactory(6, props);
              this.clicks = [];
            }
            break;
          }
        }
        if (element != undefined) {
          this.elements.push(element);
          if (this.accessEle != null) {
            this.undo.push(this.accessEle.copy());
          }
          this.undo.push(element.copy());
          this.redo = [];
          this.accessEle = null;
          this.counter++;
          element.draw(ctx);
          this.NewElement = 0;
          this.snackbarshape = true;
        }
      }
    },
    clickElement(e) {
      let clickedX = e.offsetX;
      let clickedY = e.offsetY;
      let ctx = this.canvas;
      var selectedID = [-1, -1];
      for (let i = this.elements.length - 1; i >= 0; i--) {
        if (this.elements[i] == undefined) {
          continue;
        }
        let element = this.elements[i];
        selectedID = element.clicked(clickedX, clickedY, ctx);
        if (selectedID[0] != -1) {
          if (this.colorclick) {
            if (
              this.accessEle != null &&
              this.accessEle.id != this.elements[selectedID[0]].id
            ) {
              this.undo.push(this.accessEle.copy());
            }
            this.undo.push(this.elements[selectedID[0]].copy());
            this.redo = [];
            if (selectedID[1] != -1) {
              this.elements[selectedID[0]].strokeColor = this.color;
            } else {
              this.elements[selectedID[0]].color = this.color;
            }
            this.drawall();
            this.colorclick = false;
            this.accessEle = this.elements[selectedID[0]].copy();
            this.di = -1;
            selectedID[0] = -1;
          } else if (this.deletevar) {
            if (
              this.accessEle != null &&
              this.accessEle.id != this.elements[selectedID[0]].id
            ) {
              this.undo.push(this.accessEle.copy());
            }
            this.undo.push(this.elements[selectedID[0]]);
            this.redo = [];
            this.elements[selectedID[0]] = undefined;
            this.drawall();
            this.deletevar = false;
            this.id = -1;
            selectedID[0] = -1;
          } else if (this.copyvar) {
            if (this.accessEle != null) {
              this.undo.push(this.accessEle.copy());
            }
            let temp = this.elements[selectedID[0]].copy();
            temp.id = this.counter;
            if (temp.type == 5) {
              temp.x1 += 40;
              temp.y1 += 40;
              temp.x2 += 40;
              temp.y2 += 40;
            } else if (temp.type == 6) {
              temp.x1 += 40;
              temp.y1 += 40;
              temp.x2 += 40;
              temp.y2 += 40;
              temp.x3 += 40;
              temp.y3 += 40;
            } else {
              temp.x += 40;
              temp.y += 40;
            }
            this.counter++;
            this.accessEle = null;
            this.elements.push(temp);
            this.undo.push(temp.copy());
            this.drawall();
            this.redo = [];
            this.copyvar = false;
            this.id = -1;
            selectedID[0] = -1;
          }
          break;
        }
      }
      if (selectedID[1] != -1) this.resizeFlag = true;
      return selectedID;
    },
    update(id, x, y, xr, yr) {
      if (!this.resizeFlag) {
        this.changeCursor("move");
        this.elements[id].move(x, y);
      } else {
        this.changeCursor("crosshair");
        this.elements[id].resize(xr, yr, this.resizePoint);
      }
      this.drawall();
    },
    drawall() {
      let ctx = this.canvas;
      ctx.clearRect(0, 0, 1000, 1000);
      for (let i = 0; i < this.elements.length; i++) {
        if (this.elements[i] != undefined) {
          this.elements[i].draw(ctx);
        }
      }
    },
    dragstart(e) {
      let temp = this.clickElement(e);
      this.id = temp[0];
      this.resizePoint = temp[1];
      if (this.id != -1) {
        this.dragging = true;
        this.startLocation = { x: e.offsetX, y: e.offsetY };
        this.startdrag = true;
      }
    },
    drag(e) {
      let temp = this.hoverElement(e);
      if (this.colorclick || this.deletevar || this.copyvar) {
        this.changeCursor("pointer");
      } else if (temp[0] != -1 && temp[1] != -1) {
        this.changeCursor("crosshair");
      } else {
        this.changeCursor("default");
      }
      if (this.dragging === true) {
        if (this.id != -1 && this.id < this.counter && this.startdrag) {
          if (this.accessEle != null && this.accessEle.id != this.id) {
            this.undo.push(this.accessEle.copy());
          }
          this.undo.push(this.elements[this.id].copy());
          this.redo = [];
          this.accessEle = this.elements[this.id];
          this.startdrag = false;
        }
        var newx, newy, xr, yr; //2variable for move and 2 for resize
        newx = e.offsetX - this.startLocation.x;
        newy = e.offsetY - this.startLocation.y;
        xr = e.offsetX;
        yr = e.offsetY;
        this.update(this.id, newx, newy, xr, yr);
        this.startLocation.x = e.offsetX;
        this.startLocation.y = e.offsetY;
      }
    },
    dragend() {
      this.dragging = false;
      this.resizeFlag = false;
      this.changeCursor("default");
    },
    openMyDialog() {
      bus.$emit("dialog", true); // emit the event to the bus
    },
    openMyDialoge() {
      buse.$emit("dialog", true); // emit the event to the bus
    },
    openMyDialogr() {
      busr.$emit("dialog", true); // emit the event to the bus
    },
    openMyDialogs() {
      buss.$emit("dialog", true); // emit the event to the bus
    },
    getradius(value) {
      this.radius = value;
    },
    getwl(x, y) {
      this.width = x;
      this.length = y;
    },
    getl(value) {
      this.squarelen = value;
    },
    getxy(x, y) {
      this.radx = x;
      this.rady = y;
    },
    undofun() {
      if (this.undo.length != 0) {
        this.id = -1;
        if (this.accessEle != null) {
          this.redo.push(this.accessEle);
          this.accessEle = null;
        }
        var un = this.undo.pop();
        if (this.elements[un.id] == undefined) {
          this.elements[un.id] = un;
          let v = un.copy();
          v.color += "0";
          this.redo.push(v);
        } else if (
          this.elements[un.id].color != un.color ||
          this.elements[un.id].strokeColor != un.strokeColor
        ) {
          this.elements[un.id] = un;
          this.redo.push(un);
        } else if (un.id == this.elements.length - 1 && this.checkundo(un.id)) {
          this.elements.pop();
          this.counter--;
          this.redo.push(un);
        } else {
          this.redo.push(un);
          this.elements[un.id] = un;
        }

        this.drawall();
      }
    },
    checkundo(id) {
      for (let i = 0; i < this.undo.length; i++) {
        if (this.undo[i].id == id) {
          return false;
        }
      }
      return true;
    },
    redofun() {
      if (this.redo.length != 0) {
        this.id = -1;
        var un = this.redo.pop();
        if (un.id == this.elements.length && !this.checkredo(un)) {
          this.elements.push(un);
          this.counter++;
          this.undo.push(un);
        } else if (this.checkredo(un)) {
          this.elements[un.id] = undefined;
          un.color = un.color.substring(0, 9);
          this.undo.push(un);
        } else {
          this.elements[un.id] = un.copy();
          this.undo.push(un);
        }
        this.drawall();
      }
    },
    checkredo(un) {
      if (un.color.length == 10) {
        return true;
      }
      return false;
    },
    changeCursor(styleC) {
      var c = document.getElementById("myCanvas");
      c.style.cursor = styleC;
    },
    hoverElement(e) {
      let clickedX = e.offsetX;
      let clickedY = e.offsetY;
      let ctx = this.canvas;
      var selectedID = [-1, -1];
      for (let i = this.elements.length - 1; i >= 0; i--) {
        if (this.elements[i] == undefined) {
          continue;
        }
        let element = this.elements[i];
        selectedID = element.clicked(clickedX, clickedY, ctx);
        if (selectedID[0] != -1) break;
      }
      return selectedID;
    },
    /*save and load */
    loadData(load) {
      var ctx = this.canvas;
      ctx.clearRect(0, 0, 1000, 1000);
      axios
        .get(appUrl + "/load", {
          params: {
            file: load,
          },
        })
        .then((response) => {
          var temp = [];
          this.elements = [];
          temp = response.data;
          for (var i = 0; i < temp.length; i++) {
            var tt;
            if (temp[i].type == 1)
              tt = new MyCircle(
                temp[i].id,
                temp[i].x,
                temp[i].y,
                temp[i].r,
                temp[i].type,
                temp[i].color,
                temp[i].strokeColor
              );
            else if (temp[i].type == 2 || temp[i].type == 4)
              tt = new MyRect(
                temp[i].id,
                temp[i].x,
                temp[i].y,
                temp[i].width,
                temp[i].height,
                temp[i].type,
                temp[i].color,
                temp[i].strokeColor
              );
            else if (temp[i].type == 3)
              tt = new MyEllipse(
                temp[i].id,
                temp[i].x,
                temp[i].y,
                temp[i].xradius,
                temp[i].yradius,
                temp[i].type,
                temp[i].color,
                temp[i].strokeColor
              );
            else if (temp[i].type == 5)
              tt = new MyLine(
                temp[i].id,
                temp[i].x1,
                temp[i].y1,
                temp[i].x2,
                temp[i].y2,
                temp[i].type,
                temp[i].color
              );
            else
              tt = new MyTraingle(
                temp[i].id,
                temp[i].x1,
                temp[i].y1,
                temp[i].x2,
                temp[i].y2,
                temp[i].x3,
                temp[i].y3,
                temp[i].type,
                temp[i].color,
                temp[i].strokeColor
              );
            this.elements.push(tt);
            this.elements[i].draw(ctx);
          }
          this.loadundo();
          this.loadredo();
          this.counter = this.elements.length;
        });
    },
    loadundo() {
      axios
        .get(appUrl + "/undo", {
          params: {},
        })
        .then((response) => {
          var temp = [];
          this.undo = [];
          temp = response.data;
          for (var i = 0; i < temp.length; i++) {
            var tt;
            if (temp[i].type == 1)
              tt = new MyCircle(
                temp[i].id,
                temp[i].x,
                temp[i].y,
                temp[i].r,
                temp[i].type,
                temp[i].color,
                temp[i].strokeColor
              );
            else if (temp[i].type == 2 || temp[i].type == 4)
              tt = new MyRect(
                temp[i].id,
                temp[i].x,
                temp[i].y,
                temp[i].width,
                temp[i].height,
                temp[i].type,
                temp[i].color,
                temp[i].strokeColor
              );
            else if (temp[i].type == 3)
              tt = new MyEllipse(
                temp[i].id,
                temp[i].x,
                temp[i].y,
                temp[i].xradius,
                temp[i].yradius,
                temp[i].type,
                temp[i].color,
                temp[i].strokeColor
              );
            else if (temp[i].type == 5)
              tt = new MyLine(
                temp[i].id,
                temp[i].x1,
                temp[i].y1,
                temp[i].x2,
                temp[i].y2,
                temp[i].type,
                temp[i].color
              );
            else
              tt = new MyTraingle(
                temp[i].id,
                temp[i].x1,
                temp[i].y1,
                temp[i].x2,
                temp[i].y2,
                temp[i].x3,
                temp[i].y3,
                temp[i].type,
                temp[i].color,
                temp[i].strokeColor
              );
            this.undo.push(tt);
          }
        });
    },
    loadredo() {
      axios
        .get(appUrl + "/redo", {
          params: {},
        })
        .then((response) => {
          var temp = [];
          this.redo = [];
          temp = response.data;
          for (var i = 0; i < temp.length; i++) {
            var tt;
            if (temp[i].type == 1)
              tt = new MyCircle(
                temp[i].id,
                temp[i].x,
                temp[i].y,
                temp[i].r,
                temp[i].type,
                temp[i].color,
                temp[i].strokeColor
              );
            else if (temp[i].type == 2 || temp[i].type == 4)
              tt = new MyRect(
                temp[i].id,
                temp[i].x,
                temp[i].y,
                temp[i].width,
                temp[i].height,
                temp[i].type,
                temp[i].color,
                temp[i].strokeColor
              );
            else if (temp[i].type == 3)
              tt = new MyEllipse(
                temp[i].id,
                temp[i].x,
                temp[i].y,
                temp[i].xradius,
                temp[i].yradius,
                temp[i].type,
                temp[i].color,
                temp[i].strokeColor
              );
            else if (temp[i].type == 5)
              tt = new MyLine(
                temp[i].id,
                temp[i].x1,
                temp[i].y1,
                temp[i].x2,
                temp[i].y2,
                temp[i].type,
                temp[i].color
              );
            else
              tt = new MyTraingle(
                temp[i].id,
                temp[i].x1,
                temp[i].y1,
                temp[i].x2,
                temp[i].y2,
                temp[i].x3,
                temp[i].y3,
                temp[i].type,
                temp[i].color,
                temp[i].strokeColor
              );
            this.redo.push(tt);
          }
        });
    },
    save() {
      if (this.$refs.form.validate()) {
        if (this.checktext(this.savetext)) {
          this.items.push(this.savetext);
          this.saveShapes(this.savetext);
          this.savetext = "";
          this.menu = false;
          this.savesnack = true;
        }
      }
    },
    checksave(v) {
      let idx = v.indexOf(".json");
      let idxx = v.indexOf(".xml");

      if (
        (idx && v.substring(idx) == ".json") ||
        (idxx && v.substring(idxx) == ".xml")
      )
        return true;
      return false;
    },
    checktext(v) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].localeCompare(v) == 0) {
          return false;
        }
      }
      return true;
    },
    sendShapes(map, data) {
      return fetch(appUrl + map, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error " + response.status);
          }
        })
        .catch((error) => {
          console.log(error);
          // ...handle/report error
        });
    },
    async saveShapes(v) {
      if (this.accessEle != null) {
        await this.undo.push(this.accessEle.copy());
      }
      await this.sendShapes("/shapes", this.elements);
      await this.sendShapes("/undoShapes", this.undo);
      await this.sendShapes("/redoShape", this.redo);
      axios.get(appUrl + "/save", {
        params: {
          name: v,
        },
      });
    },
  },
  mounted() {
    var c = document.getElementById("myCanvas");
    this.canvas = c.getContext("2d");
    // get the file saved.
    axios.get(appUrl + "/getList", {}).then((response) => {
      this.items = response.data;
    });
  },
  computed: {
    swatchStyle() {
      const { color, menu } = this;
      return {
        backgroundColor: color,
        cursor: "pointer",
        height: "30px",
        width: "30px",
        borderRadius: menu ? "50%" : "4px",
        transition: "border-radius 200ms ease-in-out",
      };
    },
  },
};
</script>

<style>
</style>