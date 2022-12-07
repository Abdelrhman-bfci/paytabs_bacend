<template>
  <auth-layout pageClass="register-page">
    <div class="row d-flex justify-content-center">
      <div class="col-md-8">
        <div class="header-text">
          <h2>Personal Learning Coach</h2>
          <h4>Register for free and experience</h4>
          <hr />
        </div>
      </div>
    
      <!-- <div v-if="Registerdialog || inistitutionForm" class="col-md-5 ml-auto mt-3">
        <fade-render-transition :duration="200">
          <div class="media">
            <div class="media-left">
              <div class="icon">
                <i class="nc-icon nc-circle-09"></i>
              </div>
            </div>
            <div class="media-body">
              <p>
                In order to take full advantage of the Personal Learning Coach
                you will first need to complete the Learning Connections
                Inventory (LCI).
              </p>
            </div>
          </div>
        </fade-render-transition>
        <fade-render-transition :delay="200" :duration="200">
          <div class="media">
            <div class="media-left">
              <div class="icon">
                <i class="nc-icon nc-preferences-circle-rotate"></i>
              </div>
            </div>
            <div class="media-body">
              <p>
                To access the Let Me Learn platform you must either belong to an
                institution and provide your institution's code OR you can
                purchase your own subscription with a credit card. Individual
                subscriptions come with a FREE 14-day trial period! You won't be
                charged until your trial period has ended.
              </p>
            </div>
          </div>
        </fade-render-transition>
      </div> -->

      <div class="col-md-5 ml-auto mt-3" v-if="!Registerdialog">
        <fade-render-transition :duration="200">
          <div class="media">
            <div class="media-left">
              <div class="icon">
                <i class="nc-icon nc-preferences-circle-rotate"></i>
              </div>
            </div>
            <div class="media-body">
              <p>
                In order to take full advantage of the Personal Learning Coach
                you will first need to complete the Learning Connections
                Inventory (LCI).
              </p>
            </div>
          </div>
        </fade-render-transition>
        <fade-render-transition :delay="200" :duration="200">
          <div class="media">
            <div class="media-left">
              <div class="icon">
                <i class="nc-icon nc-circle-09"></i>
              </div>
            </div>
            <div class="media-body">
              <p>
                To access the Let Me Learn platform you must either belong to an
                institution and provide your institution's code OR you can
                purchase your own subscription with a credit card.
              </p>
            </div>
          </div>
        </fade-render-transition>
        <fade-render-transition :delay="200" :duration="200">
          <div class="media">
            <div class="media-left">
              <div class="icon">
                <i class="nc-icon nc-money-coins"></i>
              </div>
            </div>
            <div class="media-body">
              <p>
                Individual subscriptions come with a FREE 14-day trial period!
                You won't be charged until your trial period has ended.
              </p>
            </div>
          </div>
        </fade-render-transition>
      </div>

<!--      <div class="col-md-12" v-if="Registerdialog">-->
<!--        <fade-render-transition>-->
<!--          <form method="#" action="#">-->
<!--            <card>-->
<!--              <div slot="header">-->
<!--                <h3 class="card-title text-center mb-3">Register</h3>-->
<!--              </div>-->
<!--              <div class="row">-->
<!--                <div class="col-md-6">-->
<!--                  <fg-input-->
<!--                    v-model="register.first_name"-->
<!--                    placeholder="Your First Name"-->
<!--                  ></fg-input>-->
<!--                </div>-->
<!--                <div class="col-md-6">-->
<!--                  <fg-input-->
<!--                    v-model="register.last_name"-->
<!--                    placeholder="Your Last Name"-->
<!--                  ></fg-input>-->
<!--                </div>-->
<!--                <div class="col-md-6">-->
<!--                  <fg-input-->
<!--                    v-model="register.email"-->
<!--                    placeholder="Email"-->
<!--                    type="email"-->
<!--                  ></fg-input>-->
<!--                </div>-->
<!--                <div class="col-md-6">-->
<!--                  <fg-input-->
<!--                    v-model="register.password"-->
<!--                    placeholder="Password"-->
<!--                    type="password"-->
<!--                  ></fg-input>-->
<!--                </div>-->
<!--                <div class="col-md-6">-->
<!--                  <fg-input-->
<!--                    v-model="register.confirm_password"-->
<!--                    placeholder="Password confirmation"-->
<!--                    type="password"-->
<!--                  ></fg-input>-->
<!--                </div>-->
<!--                <div class="col-md-6">-->
<!--                  <el-select-->
<!--                    class="select"-->
<!--                    size="large"-->
<!--                    style="width: 100% !important"-->
<!--                    placeholder="Select Age"-->
<!--                    v-model="register.age_group_id"-->
<!--                  >-->
<!--                    <el-option-->
<!--                      v-for="item in ageList"-->
<!--                      class=""-->
<!--                      :value="item.value"-->
<!--                      :label="item.label"-->
<!--                      :key="item.value"-->
<!--                    >-->
<!--                    </el-option>-->
<!--                  </el-select>-->
<!--                </div>-->
<!--                <div class="col-md-6">-->
<!--                  <fg-input-->
<!--                    v-model="register.city"-->
<!--                    placeholder="City"-->
<!--                  ></fg-input>-->
<!--                </div>-->
<!--                <div class="col-md-6">-->
<!--                  <fg-input-->
<!--                    v-model="register.state"-->
<!--                    placeholder="State"-->
<!--                  ></fg-input>-->
<!--                </div>-->
<!--                <div class="col-md-6">-->
<!--                  <fg-input-->
<!--                    v-model="register.zip_code"-->
<!--                    placeholder="Zip Code"-->
<!--                  ></fg-input>-->
<!--                </div>-->
<!--                <div class="col-md-6">-->
<!--                  <el-select-->
<!--                    class="select"-->
<!--                    size="large"-->
<!--                    style="width: 100% !important"-->
<!--                    placeholder="Select Country"-->
<!--                    v-model="register.country"-->
<!--                  >-->
<!--                    <el-option-->
<!--                      v-for="item in countries"-->
<!--                      class=""-->
<!--                      :value="item"-->
<!--                      :label="item"-->
<!--                      :key="item"-->
<!--                    >-->
<!--                    </el-option>-->
<!--                  </el-select>-->
<!--                </div>-->
<!--                <div class="col-md-12">-->
<!--                  <div v-if="studentform">-->
<!--                    <fg-input-->
<!--                      v-model="register.institution"-->
<!--                      placeholder="Please enter your Institution Name"-->
<!--                    ></fg-input>-->
<!--                  </div>-->
<!--                  <div v-if="!inistitutionForm">-->
<!--                    <fg-input-->
<!--                      v-model="register.card_name"-->
<!--                      placeholder="Card Name"-->
<!--                    ></fg-input>-->
<!--                    <fg-input-->
<!--                      v-model="register.card_number"-->
<!--                      placeholder="Card Number"-->
<!--                    ></fg-input>-->

<!--                    <fg-input>-->
<!--                      <el-date-picker-->
<!--                        v-model="register.exp_time"-->
<!--                        type="month"-->
<!--                        format="MM/yyyy"-->
<!--                        value-format="yyyy-MM"-->
<!--                        placeholder="Expiration date"-->
<!--                        :picker-options="datePickerOptions"-->
<!--                      >-->
<!--                      </el-date-picker>-->
<!--                    </fg-input>-->

<!--                    <fg-input-->
<!--                      v-model="register.cvc_code"-->
<!--                      placeholder="CVC Code"-->
<!--                      maxlength="3"-->
<!--                    ></fg-input>-->
<!--                  </div>-->
<!--                  <div v-if="inistitutionForm">-->
<!--                    <fg-input-->
<!--                      v-model="register.promo_code"-->
<!--                      placeholder="Please enter your Institution's Code"-->
<!--                    ></fg-input>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="text-center">-->
<!--                <button-->
<!--                  @click="-->
<!--                    Registerdialog = false;-->
<!--                    studentform = false;-->
<!--                    inistitutionForm = false;-->
<!--                  "-->
<!--                  type="button"-->
<!--                  class="btn btn-fill back"-->
<!--                >-->
<!--                  Back-->
<!--                </button>-->

<!--                <button-->
<!--                  type="button"-->
<!--                  @click="signUp"-->
<!--                  class="btn btn-fill btn-primary btn-neutral btn-wd"-->
<!--                >-->
<!--                  Create Free Account-->
<!--                </button>-->
<!--              </div>-->
<!--            </card>-->
<!--          </form>-->
<!--        </fade-render-transition>-->
<!--      </div>-->
<!--      <div class="col-md-4 mr-auto" v-else>-->
<!--        <form method="#" action="#">-->
<!--          <card class="card-plain">-->
<!--            <div class="btn-three text-center">-->
<!--              <button-->
<!--                @click="-->
<!--                  register.type = 'Student';-->
<!--                  Registerdialog = true;-->
<!--                  studentform = true;-->
<!--                  inistitutionForm = false;-->
<!--                "-->
<!--                type="button"-->
<!--                class="btn btn-fill btn-info btn-wd"-->
<!--              >-->
<!--                Semester-->
<!--              </button>-->
<!--              <div>-->
<!--                <span class="text-white mr-3 mt-1"-->
<!--                  ><strong> 4 Months: </strong></span-->
<!--                >-->
<!--                <span class="text-white"><strong> $14.99 </strong></span>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="btn-three text-center">-->
<!--              <button-->
<!--                @click="-->
<!--                  register.type = 'Individual';-->
<!--                  inistitutionForm = false;-->
<!--                  (studentform = false), (Registerdialog = true);-->
<!--                "-->
<!--                type="button"-->
<!--                class="btn btn-fill btn-info btn-wd"-->
<!--              >-->
<!--                Annual-->
<!--              </button>-->
<!--              <div>-->
<!--                <span class="text-white mr-3 mt-1"-->
<!--                  ><strong> one Year: </strong></span-->
<!--                >-->
<!--                <span class="text-white"><strong> $39.99 </strong></span>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="btn-three text-center">-->
<!--              <button-->
<!--                @click="-->
<!--                  register.type = 'Institution';-->
<!--                  Registerdialog = true;-->
<!--                  (studentform = false), (inistitutionForm = true);-->
<!--                "-->
<!--                type="button"-->
<!--                class="btn btn-fill btn-info btn-wd"-->
<!--              >-->
<!--                Institution-->
<!--              </button>-->
<!--              <div>-->
<!--                <span class="text-white mt-1 text-center"-->
<!--                  ><strong> verification code </strong></span-->
<!--                >-->
<!--              </div>-->
<!--            </div>-->
<!--          </card>-->
<!--        </form>-->
<!--      </div>-->
    </div>
  </auth-layout>
</template>
<script>
import { FadeRenderTransition } from "src/components/index";
import AuthLayout from "./AuthLayout.vue";
import {
  DatePicker,
  TimeSelect,
  Slider,
  Tag,
  Input,
  Button,
  Select,
  Option,
} from "element-ui";

export default {
  data: () => ({
    register: {},
    Registerdialog: false,
    inistitutionForm: false,
    studentform: false,
    ageList: [
      { value: 1, label: "6-12 years old" },
      { value: 2, label: "13 -21 years old" },
      { value: 3, label: "22 or older" },
    ],
    datePickerOptions: {
      disabledDate(date) {
        return date < new Date();
      },
    },

     countries: [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia ",
        "Bonaire, Sint Eustatius and Saba",
        "Bosnia and Herzegovina",
        "Botswana",
        "Bouvet Island",
        "Brazil",
        "British Indian Ocean Territory ",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cayman Islands ",
        "Central African Republic ",
        "Chad",
        "Chile",
        "China",
        "Christmas Island",
        "Cocos Islands ",
        "Colombia",
        "Comoros ",
        "Congo ",
        "Congo ",
        "Cook Islands ",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Curaçao",
        "Cyprus",
        "Czechia",
        "Côte d'Ivoire",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic ",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Falkland Islands  [Malvinas]",
        "Faroe Islands ",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "French Southern Territories ",
        "Gabon",
        "Gambia ",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Heard Island and McDonald Islands",
        "Holy See",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea",
        "Korea",
        "Kuwait",
        "Kyrgyzstan",
        "Lao People's Democratic Republic",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macao",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands ",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands ",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger ",
        "Nigeria",
        "Niue",
        "Norfolk Island",
        "Northern Mariana Islands ",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine, State of",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Pitcairn",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Republic of North Macedonia",
        "Romania",
        "Russian Federation",
        "Rwanda",
        "Réunion",
        "Saint Barthélemy",
        "Saint Helena, Ascension and Tristan da Cunha",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Martin (French part)",
        "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Sint Maarten (Dutch part)",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Georgia and the South Sandwich Islands",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan ",
        "Suriname",
        "Svalbard and Jan Mayen",
        "Sweden",
        "Switzerland",
        "Syrian Arab Republic",
        "Taiwan",
        "Tajikistan",
        "Tanzania, United Republic of",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tokelau",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos Islands ",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates ",
        "United Kingdom of Great Britain and Northern Ireland ",
        "United States Minor Outlying Islands ",
        "United States of America ",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela",
        "Viet Nam",
        "Virgin Islands (British)",
        "Virgin Islands (U.S.)",
        "Wallis and Futuna",
        "Western Sahara",
        "Yemen",
        "Zambia",
        "Zimbabwe",
        "Åland Islands",
      ],
    options: [
      { value: null, text: "Please select an option" },
      { value: "a", text: "This is First option" },
      { value: "b", text: "Selected Option" },
      { value: { C: "3PO" }, text: "This is an option with object value" },
      { value: "d", text: "This one is disabled", disabled: true },
    ],
  }),
  components: {
    FadeRenderTransition,
    AuthLayout,
    [Option.name]: Option,
    [Select.name]: Select,
    [DatePicker.name]: DatePicker,
  },
  methods: {
    toggleNavbar() {
      document.body.classList.toggle("nav-open");
    },
    signUp() {
      this.$store
        .dispatch("user/register", { query: this.register })
        .then((res) => {
          this.$router.push("/before");
        });
    },
    closeMenu() {
      document.body.classList.remove("nav-open");
      document.body.classList.remove("off-canvas-sidebar");
    },
  },
  beforeDestroy() {
    this.closeMenu();
  },
};
</script>
<style scoped>
.extended-forms .el-select {
  width: 100%;
  margin-bottom: 30px;
}
.select {
  margin-bottom: 25px;
  width: 320px;
}
.btn-three {
  margin-bottom: 50px;
}
.back {
  margin: auto !important;
}
</style>
