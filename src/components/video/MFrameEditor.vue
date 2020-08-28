<template>
  <v-card ref="card" class="mx-auto" color="grey">
    <v-toolbar dense>
      <m-color-menu v-model="color" />
      <v-spacer />
      <v-btn-toggle v-model="mode" dense background-color="primary" dark>
        <v-btn>
          <v-icon>mdi-shape-circle-plus</v-icon>
        </v-btn>
        <v-btn>
          <v-icon>mdi-shape-rectangle-plus</v-icon>
        </v-btn>
        <v-btn>
          <v-icon>mdi-eraser</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-toolbar>

    <v-stage
      ref="stage"
      :config="canvas"
      @mousedown="onStageMouseDown"
      @touchstart="onStageMouseDown"
    >
      <v-layer ref="layer">
        <v-image @dblclick="onDblClick" :config="background" />
      </v-layer>
      <v-layer ref="layer">
        <v-circle
          v-for="(x, i) in points"
          :key="i"
          :config="{
            x: x.x,
            y: x.y,
            stroke: 'white',
            strokeWidth: 1,
            opacity: x.opacity || 1,
            radius: x.size,
            fill: x.color,
            draggable: true
          }"
          @click="onPointClick"
          @mouseenter="onPointMouseEnter"
          @mouseleave="onPointMouseLeave"
          @dragstart="onPointDragStart"
          @dragend="onPointDragEnd"
        />
      </v-layer>
      <v-layer ref="layer">
        <v-rect
          v-for="x in rects"
          :key="x.name"
          :config="{
            name: x.name,
            x: x.x,
            y: x.x,
            width: x.width,
            height: x.height,
            rotation: x.rotation,
            scaleX: 1,
            scaleY: 1,
            stroke: x.color,
            strokeWidth: 1,
            draggable: true
          }"
          @transformend="onTransformEnd"
        />
        <v-transformer ref="transformer" />
      </v-layer>
    </v-stage>
  </v-card>
</template>
<script>
import MColorMenu from "@/components/menus/MColorMenu";
export default {
  name: "m-frame-editor",
  components: {
    MColorMenu
  },
  props: {
    src: {
      type: String,
      required: true
    },
    frame: {
      type: Object
    },
    originSize: {
      type: Object
    }
  },
  data: () => ({
    color: "#F44336",
    size: 5,
    mode: 0,
    background: {
      image: null
    },
    points: [],
    rects: [],
    selectedShapeName: "",
    canvas: {
      width: 500,
      height: 500
    },
    mouse: {
      x: null,
      y: null
    }
  }),
  methods: {
    loadImage: function(val) {
      const img = new Image();
      img.src = val;
      img.onload = () => {
        console.log("onload");
        this.onResize();
        this.background.image = img;
        this.syncPoints();
      };
    },
    addRect: function(x, y, width, height, rotation, color, size) {
      this.rects.push({
        name: `rect-${this.rects.length}`,
        x: x,
        y: y,
        width: width,
        height: height,
        rotation: rotation,
        size: size,
        color: color
      });
    },
    // 過去データの内現在に存在しないものがあれば追加
    syncPoints: function() {
      this.points = [];
      if (this.frame) {
        const cw = this.canvas.width;
        const ow = this.originSize.width;
        const ch = this.canvas.height;
        const oh = this.originSize.height;
        for (const p of this.frame.points) {
          this.points.push({
            x: (p.x * cw) / ow,
            y: (p.y * ch) / oh,
            size: p.size,
            color: p.color
          });
        }
      }
    },
    emitUpdatePoints: function() {
      setTimeout(() => {
        const points = this.points.map(x => {
          return {
            x: (x.x * this.originSize.width) / this.canvas.width,
            y: (x.y * this.originSize.height) / this.canvas.height,
            size: x.size,
            color: x.color
          };
        });
        this.$emit("points-updated", points);
      }, 1);
    },
    addPoint: function(x, y, color, size) {
      this.points.push({
        x: x,
        y: y,
        size: size,
        color: color
      });
      this.emitUpdatePoints();
    },
    onResize: function() {
      const cw = this.$refs.card.$el.clientWidth || 500;
      const ch = (this.originSize.height * cw) / this.originSize.width;
      this.canvas.width = cw;
      this.canvas.height = ch;
      this.background.height = cw;
      this.background.width = ch;
    },
    onDblClick: function() {
      this.mouse = this.$refs.stage.getNode().getPointerPosition();
      // 点を追加
      if (this.mode == 0) {
        this.addPoint(this.mouse.x, this.mouse.y, this.color, this.size);
      }
      if (this.mode == 1) {
        const width = this.canvas.width / 5;
        const height = this.canvas.height / 5;
        this.addRect(
          this.mouse.x - width / 2,
          this.mouse.y - height / 2,
          width,
          height,
          0,
          this.color,
          this.size
        );
      }
    },
    onPointClick: function(e) {
      // ポイントがクリックされた場合, mode が 2 であればデータを削除する
      if (this.mode == 2) {
        this.points.splice(e.target.index, 1);
        this.emitUpdatePoints();
      }
    },
    onPointMouseEnter: function(e) {
      // ポイントにマウスが入った場合, 強調を行う
      const i = e.target.index;
      if (this.mode == 2) {
        this.points[i].size = this.size + 2;
      }
    },
    onPointMouseLeave: function(e) {
      // ポイントからマウスが離れた場合, 強調を解除する
      const i = e.target.index;
      if (this.mode == 2) {
        this.points[i].size = this.size;
      }
    },
    onPointDragStart: function(e) {
      const i = e.target.index;
      this.points[i].size = this.size + 2;
      this.points[i].opacity = 0.5;
    },
    onPointDragEnd: function(e) {
      const i = e.target.index;
      this.points[i].x = e.target.x();
      this.points[i].y = e.target.y();
      this.points[i].opacity = 1;
      this.points[i].size = this.size;
      this.emitUpdatePoints();
    },
    onStageMouseDown(e) {
      if (e.target === e.target.getStage()) {
        this.selectedShapeName = "";
        this.updateTransformer();
        return;
      }
      const clickedOnTransformer =
        e.target.getParent().className === "Transformer";
      if (clickedOnTransformer) {
        return;
      }
      const name = e.target.name();
      const rect = this.rects.find(r => r.name === name);
      if (rect) {
        this.selectedShapeName = name;
      } else {
        this.selectedShapeName = "";
      }
      this.updateTransformer();
    },
    onTransformEnd(e) {
      console.log("transformend");
      const rect = this.rects.find(r => r.name === this.selectedShapeName);
      console.log(rect, e);
      // TODO ここで更新式を記述
      // rect.x = e.target.x();
      // rect.y = e.target.y();
      // rect.rotation = e.target.rotation();
      // rect.scaleX = e.target.scaleX();
      // rect.scaleY = e.target.scaleY();
    },
    updateTransformer() {
      const transformerNode = this.$refs.transformer.getNode();
      const stage = transformerNode.getStage();
      const { selectedShapeName } = this;
      const selectedNode = stage.findOne("." + selectedShapeName);
      if (selectedNode === transformerNode.node()) {
        return;
      }
      if (selectedNode) {
        transformerNode.nodes([selectedNode]);
      } else {
        transformerNode.nodes([]);
      }
      transformerNode.getLayer().batchDraw();
    }
  },
  watch: {
    src: function(val) {
      if (val) {
        this.loadImage(val);
      }
    }
  },
  mounted: function() {
    this.loadImage(this.src);
  }
};
</script>

<style scoped></style>
