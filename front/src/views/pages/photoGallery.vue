<template>
  <div>
    <!-- Start Navbar  -->
    <nav class="navbar navbar-light bg-white">
      <a class="navbar-brand" href="#">
        <img
          src="justtolearn-logo.png"
          width="60"
          height="auto"
          class="d-inline-block align-top"
          alt=""
        />
      </a>
      <form class="form-inline d-flex justify-content-around w-25">
        <el-button
          @click="$router.push('exam-page')"
          type="info"
          class="px-4 py-2 m-auto d-block h5 login-button"
        >
          اختبار تورنس
        </el-button>

        <el-button
          @click="$router.push('login')"
          type="info"
          class="px-4 mx-2 py-2 m-auto d-block h5 login-button"
        >
          تسجيل دخول
        </el-button>

        <div class="mx-2"></div>
      </form>
    </nav>
    <section class="photos_gallery_section">
      <div class="container-fluid">
        <div class="all_images_wrapper">
          <div
            v-for="img in galleryPhotos"
            :key="img.id"
            :class="{ 'd-none': img.path == 'not found' }"
            class="main_loop_on_img"
          >
            <div class="every_img">
              <img class="img" :src="img.path" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Start Footer  -->
    <footer id="footer" class="pb-4">
      <div class="container">
        <div class="row py-5 my-4">
          <div class="col-md-6 mb-4">
            <div class="contact-details">
              <h3 class="text-right mb-3">تواصل معنا</h3>
              <ul class="list list-icons list-icons-lg">
                <li class="mb-1">
                  <i class="fa fa-map"></i>
                  <p class="mr-2">العنوان</p>
                </li>
                <li class="mb-1">
                  <i class="fa fa-whatsapp"></i>
                  <p class="mr-2">
                    <a href="tel:8001234567">(800) 123-4567</a>
                  </p>
                </li>
                <li class="mb-1">
                  <i class="fa fa-envelope"></i>
                  <p class="mr-2">
                    <a href="mailto:mail@example.com">mail@example.com</a>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-6 text-right">
            <h3 class="text-3 mb-3">تابعنا</h3>
            <ul class="social-icons">
              <li class="social-icons-facebook mb-1">
                <a
                  href="http://www.facebook.com/"
                  target="_blank"
                  title="Facebook"
                  ><i class="fa fa-facebook-f"></i> facebook</a
                >
              </li>
              <li class="social-icons-twitter mb-1">
                <a
                  href="http://www.twitter.com/"
                  target="_blank"
                  title="Twitter"
                  ><i class="fa fa-twitter"></i> twitter</a
                >
              </li>
              <li class="social-icons-linkedin">
                <a
                  href="http://www.linkedin.com/"
                  target="_blank"
                  title="Linkedin"
                  ><i class="fa fa-linkedin-in"></i
                ></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
    <!-- End Footer  -->
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("courses/getMobileGallery");
  },
  computed: {
    galleryPhotos() {
      return this.$store.getters["courses/galleryPhotos"];
    },
  },
};
</script>

<style lang="scss" scoped>
.photos_gallery_section {
  padding: 2rem 0;
}
.all_images_wrapper {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
  // .main_loop_on_img{
  //   width: 32%;
  // }
  .every_img {
    width: 400px;
    height: 350px;
  }
  .img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.navbar {
  max-height: 100px;
}
.navbar-brand {
  padding: 0px;
  margin: 0px;
}
a {
  color: #ecb0d5;
}
.login-button {
  background: #f1cadd;
  border: none;
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
</style>
