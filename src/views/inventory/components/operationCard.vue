<template>
  <div class="info-container" @click="handleClick">
    <div class="left">
      <div class="title">{{ info.title }}</div>
      <div class="content">
        <div v-if="!testPic">
          {{ info.content }}
        </div>
        <div v-else>
          <img :src="info.content" alt="" />
        </div>
      </div>
    </div>
    <div class="right">
      <div class="icon">
        <img :src="info.avatar" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "operationCard",
  props: {
    info: {}
  },
  computed: {
    testPic() {
      let reg = /.png|.jpg|.jpeg$/; //正则表达式，判断content是否是图片
      return reg.test(this.info.content);
    }
  },
  methods: {
    handleClick(){
      this.$emit("myClick", this.info.type);
    }
  }
};
</script>

<style lang="scss" scoped>
.info-container {
  width: 315px;
  height: 124px;
  border-radius: 10px;
  border: 1px solid #f0f0f0;
  padding: 20px;
  position: relative;
  cursor: pointer;

  background: -webkit-linear-gradient(
    left bottom,
    white 60%,
    #9fa8da,
    #a486c7
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right bottom,
    white 60%,
    #9fa8da,
    #a486c7
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    right bottom,
    white 60%,
    #9fa8da,
    #a486c7
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right bottom, white 60%, #9fa8da, #a486c7);

  .left {
    width: 250px;
    .title {
      font-size: 19px;
      font-weight: 600;
      letter-spacing: 0.012em;
    }

    .content {
      color: #6e6e73;
      font-size: 14px;
      font-weight: 400;
      padding-left: 18px; //应对title自动多出的16px的padding

      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      img {
        width: 100px;
        height: 60px;
      }
    }
  }

  .right {
    .icon {
      position: absolute;
      top: 20px;
      right: 20px;

      img {
        width: 25px;
        height: 25px;
      }
    }
  }
}

.info-container:hover {
  box-shadow: 1px 1px 2px grey;
  border-radius: 10px;
}
</style>
