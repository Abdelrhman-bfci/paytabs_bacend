<template>
  <div class="intro" dir="ltr">
<!--    <el-container>-->
      <h3 class="text-center mt-2">PayTabs Task</h3>

      <el-card class="mt-5">
        <el-row :gutter="20">
          <el-col :span="24" :md="6" v-for="(cat , i) in options" >
            <el-select placeholder="category"   v-model="selected[i]" style="width: 100%">
              <el-option v-for="(item, index) in cat.options"
                         :key="index"
                         :label="item.name"
                         :value="item.id"
              ></el-option>
            </el-select>
            <!--        </el-form-item>-->
          </el-col>

        </el-row>
      </el-card>
<!--    </el-container>-->
    <!-- Navigation bar -->


  </div>
</template>

<script>
  export default {

    data() {
      return {
        selected: [],
      };
    },
    mounted() {
      this.$store.dispatch("courses/categories")
    },
    methods: {
      init(index){
        if (!this.selected[index]){
          this.selected[index] = null;
        }
        return index;
      },
      // options() {
      //   return this.$store.dispatch("courses/categories").filter(el => el.parent_id == 0)
      // },
    },

    computed: {

      options() {


        let options = [{options: this.$store.getters["courses/categories"].filter(el => el.parent_id == 0)}];

        if (this.selected.length >= 1) {

          this.selected.map( item => {
            let data = this.$store.getters["courses/categories"].filter(el => el.parent_id == item)
            if (data.length > 0) {
              options.push({options: data})
            }
          })
          // for (let item , key in this.selected) {
          //   console.log(item)
          // }
        }

        return options
      },


      gallery() {
        let gallery = this.$store.getters["courses/gallery"].gallery;
        let likes = this.$store.getters["courses/gallery"].likes;

        console.log(gallery);
        console.log(likes);
        return {
          gallery,
          likes,
        };
      },
    },
  };
</script>

<style>
  .avatar {
    box-sizing: border-box;
    border: 5px white solid;
    border-radius: 13px;
    overflow: hidden;
    box-shadow: 0 5px 15px 0px rgba(226, 203, 220, 0.6);
    transform: translatey(0px);
    animation: float 6s ease-in-out infinite;
  }

  .el-select-dropdown {
    top: 54px !important;
  }

  /* @keyframes float {
    0% {
      box-shadow: 0 5px 15px 0px rgba(226, 203, 220, 0.6);
      transform: translatey(0px);
    }
    50% {
      box-shadow: 4 25px 15px 0px rgba(212, 196, 211, 0.6);
      transform: translatey(-25px);
    }
    100% {
      box-shadow: 0 5px 15px 0px rgba(226, 203, 220, 0.6);
      transform: translatey(0px);
    }
  } */

  .login-button {
    background: #f1cadd;
    border: none;
  }

  .banner {
    /* background-image: url("pexels.jpg") no-repeat center; */
    background-size: 100% auto;
    background-repeat: no-repeat;
    height: 600px;
  }

  .navbar {
    max-height: 100px;
  }

  .navbar-brand {
    padding: 0px;
    margin: 0px;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }

  .image {
    height: 100%;
    width: 100%;
  }

  .h5 {
    line-height: 30px;
  }

  .section {
    background-color: #f7f7f7;
  }

  iframe {
    border: unset;
  }

  #footer {
    background-color: #212529;
    color: #f7f7f7;
  }

  .list li {
    display: flex;
  }

  ul {
    list-style: none;
  }

  a {
    color: #ecb0d5;
  }

  .like {
    font-size: 40px;
  }

  .counter {
    font-size: 20px;
    color: #4286f4;
  }

  .title {
    font-size: 22px;
  }

  @media (max-width: 768px) {
    iframe {
      width: 100% !important;
    }
  }
</style>
