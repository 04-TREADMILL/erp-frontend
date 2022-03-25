<template>
  <section class="product">
    <div class="product__photo">
      <div class="photo-container">
        <div class="photo-main">
          <img src="@/assets/pic/dell.png" alt="dell computer" />
<!--          Tip：图片是写死的；关注整个系统，不用太多关注UI-->
        </div>
      </div>
    </div>
    <div class="product__info">
      <div class="title">
        <h1>{{ product_info.name }}</h1>
        <span>ID: {{ product_info.id }}</span>
      </div>
      <div class="type">
        <h3>类型</h3>
        <div>{{ product_info.type }}</div>
      </div>
      <div class="quantity">
        库存量 <span>{{ product_info.quantity }}</span>
      </div>

      <div class="description">
        <h3>价格详情</h3>
        <ul>
          <li>进价: {{ product_info.purchasePrice }}</li>
          <li>零售价: {{ product_info.retailPrice }}</li>
          <li>最近进价: {{ product_info.recentPp }}</li>
          <li>最近零售价: {{ product_info.recentRp }}</li>
        </ul>
      </div>
      <button class="create-btn" @click="createInventoryIn">
        {{type_info.button_name}}
      </button>
    </div>

    <el-dialog
      :title="type_info.dialog_name"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <div class="basic-info">
        <div class="title">
          <h1>{{ product_info.name }}</h1>
          <span>ID: {{ product_info.id }}</span>
        </div>
        <div class="photo-box">
          <img src="@/assets/pic/dell.png" alt="dell computer" />
        </div>
        <div class="type">
          <h3>类型</h3>
          <div>{{ product_info.type }}</div>
        </div>
        <div class="input-content">
          <div class="group">
            <input type="text" v-model="inventory_in.quantity" required>
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>{{type_info.quantity}}</label>
          </div>

          <div class="group" v-if="card_type === '入库'">
            <input type="text" v-model="inventory_in.purchasePrice" required>
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>{{ type_info.price }}</label>

          </div>
          <div class="group">
            <textarea type="text" v-model="inventory_in.remark" required />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>备注</label>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import moment from "moment";

export default {
  name: "productInfoCard",
  props: ["product_info", "card_type"],
  data() {
    return {
      dialogVisible: false,
      inventory_in: {
        purchasePrice: null,
        quantity: null,
        remark: null,
      }
    };
  },
  mounted() {
  },
  computed: {
    type_info(){ //根据类型(入库或出库)，显示不同的界面内容
      if (this.card_type === "入库") {
        return {
          quantity: "入库数量",
          price: "进价",
          button_name: "新建入库单",
          dialog_name: "新建入库单",
        };
      } else if (this.card_type === "出库") {
        return {
          quantity: "出库数量",
          price: "出价",
          button_name: "新建出库单",
          dialog_name: "新建出库单",
        }
      }
      return "";
    }
  },
  methods: {
    createInventoryIn() {
      this.dialogVisible = true; //打开dialog
    },
    handleClose(done) { //el-dialog提供的方法，关闭dialog
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    submit() {
      this.inventory_in["pid"] = this.product_info.id;
      this.inventory_in["productionDate"] = moment().format(); // 使用moment包创建当前时间
      this.$emit("handleSubmit", this.inventory_in); // 向父组件传递数据
      this.dialogVisible = false; //关闭dialog
    }
  }
};
</script>

<style lang="scss" scoped>
/* ----- Variables ----- */
$color-primary: #4c4c4c;
$color-secondary: #a6a6a6;
$color-highlight: #a486c7;

/* ----- Global ----- */
* {
  box-sizing: border-box;
}

h3 {
  //font-size: 0.7em;
  letter-spacing: 1.2px;
  color: $color-secondary;
}

img {
  max-width: 100%;
  filter: drop-shadow(1px 1px 3px $color-secondary);
}

/* ----- Product Section ----- */
.product {
  display: grid;
  grid-template-columns: 0.9fr 1fr;
  margin: 50px auto;
  padding: 2.5em 0;
  width: 800px;
  background-color: white;
  border-radius: 5px;

  /* ----- Photo Section ----- */
  .product__photo {
    position: relative;

    .photo-container {
      position: absolute;
      left: -2.5em;
      display: grid;
      grid-template-rows: 1fr;
      width: 100%;
      height: 100%;
      border-radius: 6px;
      box-shadow: 4px 4px 25px -2px rgba(0, 0, 0, 0.3);

      .photo-main {
        border-radius: 6px;
        background: radial-gradient(white, #9fa8da);

        img {
          position: absolute;
          left: -3.5em;
          top: 4.5em;
          max-width: 110%;
          filter: saturate(150%) contrast(120%) hue-rotate(10deg)
            drop-shadow(1px 20px 10px rgba(0, 0, 0, 0.3));
        }
      }
    }
  }

  /* ----- Informations Section ----- */
  .product__info {
    padding: 0.8em 0;
    margin-left: 2.5em;

    .title {
      h1 {
        margin-bottom: 0.1em;
        color: $color-primary;
        font-size: 1.5em;
        font-weight: 900;
      }

      span {
        font-size: 0.7em;
        color: $color-secondary;
      }
    }

    .type {
      font-size: 14px;
      letter-spacing: 0.01em;
    }

    .quantity {
      margin: 1.5em 0;
      color: $color-highlight;
      font-size: 1.2em;

      span {
        padding-left: 0.15em;
        font-size: 2.9em;
      }
    }

    .description {
      clear: left;
      margin: 2em 0;

      h3 {
        margin-bottom: 1em;
      }

      ul {
        font-size: 0.8em;
        list-style: disc;
        margin-left: 1em;
      }

      li {
        text-indent: -0.6em;
        margin-bottom: 0.5em;
      }
    }

    .create-btn {
      padding: 1.5em 3.1em;
      border: none;
      border-radius: 7px;
      font-size: 0.8em;
      font-weight: 700;
      letter-spacing: 1.5px;
      color: #fff;
      background-color: $color-highlight;
      box-shadow: 2px 2px 25px -7px $color-primary;
      cursor: pointer;
      margin-left: 50px;

      &:active {
        transform: scale(0.97);
      }
    }
  }

  .basic-info {
    position: relative;

    .photo-box {
      position: absolute;
      top: 25px;
      right: 50px;
      img {
        width: 100px;
        height: 80px;
      }
    }

    .input-content {
      .group 			  {
        position:relative;
        margin:45px 0;
      }
      input 				{
        font-size:18px;
        padding:10px 10px 10px 5px;
        display:block;
        width:300px;
        border:none;
        border-bottom:1px solid #757575;
      }
      input:focus 		{ outline:none; }

      textarea {
        font-size:18px;
        padding:10px 10px 10px 5px;
        width: 300px;
        border: none;
        border-bottom:1px solid #757575;
      }
      textarea:focus {
        outline: none;
      }

      /* LABEL ======================================= */
      label 				 {
        color:#999;
        font-size:18px;
        font-weight:normal;
        position:absolute;
        pointer-events:none;
        left:5px;
        top:10px;
        transition:0.2s ease all;
        -moz-transition:0.2s ease all;
        -webkit-transition:0.2s ease all;
      }

      /* active state */
      input:focus ~ label, input:valid ~ label 		{
        top:-20px;
        font-size:14px;
        color:#5264AE;
      }

      textarea:focus ~ label, textarea:valid ~label {
        top: -20px;
        font-size: 14px;
        color: #5264AE;
      }

      /* BOTTOM BARS ================================= */
      .bar 	{ position:relative; display:block; width:300px; }
      .bar:before, .bar:after 	{
        content:'';
        height:2px;
        width:0;
        bottom:1px;
        position:absolute;
        background:#5264AE;
        transition:0.2s ease all;
        -moz-transition:0.2s ease all;
        -webkit-transition:0.2s ease all;
      }
      .bar:before {
        left: 50%;
      }
      .bar:after {
        right: 50%;
      }

      /* active state */
      input:focus ~ .bar:before, input:focus ~ .bar:after {
        width:50%;
      }

      textarea:focus ~ .bar:before, textarea:focus ~ .bar:after {
        width:50%;
      }

      /* HIGHLIGHTER ================================== */
      .highlight {
        position:absolute;
        height:60%;
        width:100px;
        top:25%;
        left:0;
        pointer-events:none;
        opacity:0.5;
      }

      /* active state */
      input:focus ~ .highlight {
        -webkit-animation:inputHighlighter 0.3s ease;
        -moz-animation:inputHighlighter 0.3s ease;
        animation:inputHighlighter 0.3s ease;
      }

      /* ANIMATIONS ================ */
      @-webkit-keyframes inputHighlighter {
        from { background:#5264AE; }
        to 	{ width:0; background:transparent; }
      }
      @-moz-keyframes inputHighlighter {
        from { background:#5264AE; }
        to 	{ width:0; background:transparent; }
      }
      @keyframes inputHighlighter {
        from { background:#5264AE; }
        to 	{ width:0; background:transparent; }
      }
    }
  }
}
</style>
