<template>
  <v-card ref="card" class="mx-auto" color="grey">
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
            radius: x.size,
            fill: toColor(x.color),
            draggable: true
          }"
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
    <v-toolbar dense>
      <v-spacer />
      <v-btn icon>
        <v-menu transition="slide-y-transition" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="mode = 'point'">
              <v-list-item-title>point</v-list-item-title>
            </v-list-item>
            <v-list-item @click="mode = 'rect'">
              <v-list-item-title>rect</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>
<script>
import util from "@/utils";
export default {
  name: "m-frame-editor",
  props: {
    src: {
      type: String,
      required: true
    },
    frame: {
      type: Object
    }
  },
  data: () => ({
    color: "red",
    size: 5,
    mode: "point",
    background: {
      image: null
    },
    points: [],
    rects: [],
    selectedShapeName: "",
    canvas: {
      width: 100,
      height: 100
    },
    originSize: {
      width: null,
      height: null
    },
    mouse: {
      x: null,
      y: null
    }
  }),
  methods: {
    toColor: function(color) {
      return util.color.toCss(color, this.$vuetify);
    },
    loadImage: function(val) {
      const img = new Image();
      img.src = val;
      img.onload = () => {
        // 元画像サイズを記録
        this.originSize.width = img.width;
        this.originSize.height = img.height;
        this.background.image = img;
        this.onResize();
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
      this.$emit("rects-updated", this.rects);
    },
    addPoint: function(x, y, color, size) {
      this.points.push({
        x: x,
        y: y,
        size: size,
        color: color
      });
      this.$emit("points-updated", this.points);
    },
    onResize: function() {
      const ow = this.originSize.width;
      const oh = this.originSize.height;
      const cw = this.$refs.card.$el.clientWidth || 100;
      const ch = (cw * oh) / ow;

      this.canvas.width = cw;
      this.canvas.height = ch;

      this.background.height = cw;
      this.background.width = ch;
    },
    onDblClick: function() {
      this.mouse = this.$refs.stage.getNode().getPointerPosition();
      // 点を追加
      if (this.mode == "point") {
        this.addPoint(this.mouse.x, this.mouse.y, this.color, this.size);
      }
      if (this.mode == "rect") {
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
    onStageMouseDown(e) {
      // clicked on stage - clear selection
      if (e.target === e.target.getStage()) {
        this.selectedShapeName = "";
        this.updateTransformer();
        return;
      }

      // clicked on transformer - do nothing
      const clickedOnTransformer =
        e.target.getParent().className === "Transformer";
      if (clickedOnTransformer) {
        return;
      }

      // find clicked rect by its name
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
    if (this.frame) {
      if (this.frame.points) {
        for (const p of this.frame.points) {
          this.addPoint(p.x, p.y, p.color, p.size);
        }
      }
    }
  }
};
</script>

<style scoped></style>
