
<template>
  <div class="gauge">
    <div class="progress" ref="progress">
      <canvas>浏览器不支持Canvas,请升级或改用其它浏览器</canvas>
    </div>
  </div>
</template>

<script>
const ratio = window.devicePixelRatio || 1; // Retina上面显示模糊，兼容苹果手机

const bound = {
  start: Math.PI + 0.1,
  end: Math.PI * 2 - 0.1
};

const colors = [
  {
    // 定义颜色，不同等级，弧度的颜色不一样
    start: "ffb488",
    end: "ffddc2"
  },
  {
    start: "ffb488",
    end: "ffddc2"
  },
  {
    start: "babfcd",
    end: "dde1eb"
  },
  {
    start: "e4b23f",
    end: "ffe892"
  }
];

let ctx = null;
let r = 0; // 半径
let lineWidth = 0;
let layerColor = "rgba(255,255,255, 0.5)";
let width = 0;
let height = 0;
let angle = 0.1;
let endAngle = 0;
let speed = 0.04;
let lineCap = "round";
let color = null;

export default {
  name: "canvas2",
  data() {
    return {
      canvas: null,
      width: 0,
      height: 0,
      color: {},
      rate: 1,
      count: 1,
      silver: 1,
      level: 1,
      text: "66"
    };
  },

  mounted() {
    this.rate = 2;
  },
  methods: {
    initCanvas() {
      const container = this.$refs["progress"];
      const width = ~~container.clientWidth;
      const height = ~~container.clientHeight;
      this.canvas = container.getElementsByTagName("canvas")[0];
      this.canvas.width = width * ratio;
      this.canvas.height = height * ratio;
      this.canvas.style.width = width + "px";
      this.canvas.style.height = height + "px";
      this.color = colors[this.level - 1];
      // this.canvas.getContext('2d').scale(ratio, ratio)
    },
    layer() {
      // 半圆
      const grd = ctx.createLinearGradient(0, height, width, height);
      grd.addColorStop(0, layerColor);
      grd.addColorStop(1, layerColor);
      ctx.beginPath();
      ctx.strokeStyle = grd;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = lineCap;
      ctx.arc(width / 2, height, r, bound.start, bound.end);
      ctx.stroke();
      ctx.closePath();
    },
    ball() {
      // 小圆球
      const start = Math.max(angle, 0);
      const end = Math.min(angle, Math.PI - 0.1);
      ctx.beginPath();
      ctx.fillStyle = "#fff";
      ctx.arc(
        width / 2 - Math.cos(start) * r,
        height - Math.sin(end) * r,
        lineWidth / 2 + 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.closePath();
    },
    step() {
      // 进度条
      const start = Math.min(Math.PI + angle, bound.start);
      const end = Math.min(Math.PI + angle, bound.end);
      const progressGrd = ctx.createLinearGradient(0, height, width, height);
      progressGrd.addColorStop(0, `#${color.start}`);
      progressGrd.addColorStop(1, `#${color.end}`);
      ctx.beginPath();
      ctx.strokeStyle = progressGrd;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = lineCap;
      ctx.arc(width / 2, height, r, start, end);
      ctx.stroke();
      ctx.closePath();
    },
    animate() {
      if (endAngle < angle) {
        return window.cancelAnimationFrame(this.animate);
      } else {
        ctx.clearRect(0, 0, width, height);
        this.setText();
        this.layer();
        this.step();
        this.ball();
        window.requestAnimationFrame(this.animate);
        angle += speed; // 匀速增加
      }
    },
    setText() {
      ctx.font = `${12 * ratio}px 微软雅黑`;
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText("已邀会员", width / 2, height / 2, width);
      ctx.font = `${32 * ratio}px 微软雅黑`;
      ctx.fillText(this.count || 0, width / 2, height - 5, width);
    },
    init() {
      this.initCanvas();
      ctx = this.canvas.getContext("2d");
      width = this.canvas.width;
      height = this.canvas.height;
      color = this.color;
      lineWidth = ~~(width / 18);
      r = width / 2 - lineWidth;
      endAngle = Math.max(Math.PI * this.rate, angle);
      this.animate();
    }
  },
  watch: {
    rate: {
      handler() {
        this.init();
      }
    }
  },
  beforeDestroy() {
    angle = 0.1;
    endAngle = 0;
  }
};
</script>

<style scoped>
.progress {
  width: 400px;
  height: 400px;
  background-color: #23b6e2;
}
</style>

