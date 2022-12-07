<template>
  <div class="w-100 d-flex m-0 p-0 fill-height">
    <div class="forms py-3 fill-height d-flex align-center">
      <v-container class="my-3">
        <v-row>
          <v-col cols="12">
            <v-card elevation="12">
              <v-tabs
                class="slide-group"
                v-model="tab"
                background-color="primary accent-4"
                dark
                icons-and-text
                grow
              >
                <v-tabs-slider color="purple darken-4"></v-tabs-slider>
                <v-tab v-for="i in tabs" :key="i.icon">
                  <v-icon large>{{ i.icon }}</v-icon>
                  <div class="caption py-1">{{ i.name }}</div>
                </v-tab>
                <v-tab-item>
                  <v-card class="fill-height px-4 pt-5" elevation="12">
                    <v-card-text>
                      <v-form
                        v-if="!forgetPass"
                        class="fill-height"
                        ref="login"
                      >
                        <v-text-field
                          :rules="[
                            () => !!login.email || 'This field is required',
                          ]"
                          label="Email"
                          name="Email"
                          v-model="login.email"
                          prepend-icon="mdi-email"
                          type="text"
                          color="cyan lighten-2"
                          required
                        />
                        <v-text-field
                          id="password"
                          label="Password"
                          name="password"
                          v-model="login.password"
                          prepend-icon="mdi-lock"
                          type="password"
                          color="cyan lighten-2"
                          required
                          :rules="[
                            () => !!login.password || 'This field is required',
                          ]"
                        />
                        <div class="text-right mt-3">
                          <v-btn
                            rounded
                            color="blue lighten-2"
                            dark
                            @click="signIn"
                            >SIGN IN</v-btn
                          >
                        </div>
                        <div class="mb-3">
                          <a
                            rounded
                            color="blue lighten-2"
                            dark
                            @click="ForgetPassword"
                            >Forget Password</a
                          >
                        </div>
                      </v-form>
                      <v-form v-if="forgetPass">
                        <v-text-field
                          label="Email"
                          name="Email"
                          v-model="forget.email"
                          prepend-icon="mdi-email-alert"
                          type="email"
                          color="cyan lighten-2"
                          required
                          :rules="[
                            () => !!forget.email || 'This field is required',
                          ]"
                        />
                        <div class="text-right mt-3">
                          <v-btn
                            rounded
                            color="blue lighten-2"
                            dark
                            @click="ForgetPasswordEmail"
                            >Send Me Email!</v-btn
                          >
                        </div>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card class="px-4 pt-5">
                    <v-card-text>
                      <v-form v-if="Registerdialog">
                        <v-text-field
                          label="Name * "
                          name="Name"
                          v-model="register.first_name"
                          prepend-icon="mdi-account"
                          type="text"
                          color="cyan lighten-2"
                          required
                          :rules="[
                            () =>
                              !!register.first_name || 'This field is required',
                          ]"
                        />
                        <v-text-field
                          label="Last Name * "
                          name="Last"
                          v-model="register.last_name"
                          prepend-icon="mdi-account"
                          type="text"
                          color="cyan lighten-2"
                          required
                          :rules="[
                            () =>
                              !!register.last_name || 'This field is required',
                          ]"
                        />
                        <v-text-field
                          label="Email * "
                          name="Email"
                          v-model="register.email"
                          prepend-icon="mdi-email"
                          type="email"
                          color="cyan lighten-2"
                          required
                          :rules="[
                            () => !!register.email || 'This field is required',
                          ]"
                        />

                        <v-text-field
                          id="password"
                          label="Password * "
                          name="password"
                          v-model="register.password"
                          prepend-icon="mdi-lock"
                          type="password"
                          color="cyan lighten-2"
                          required
                          :rules="[
                            () =>
                              !!register.password || 'This field is required',
                          ]"
                        />

                        <v-text-field
                          id="confirm-password"
                          label="Confirm Password * "
                          name="confirm-password"
                          prepend-icon="mdi-lock"
                          v-model="register.confirm_password"
                          type="password"
                          color="cyan lighten-2"
                          required
                          :rules="[
                            () =>
                              !!register.confirm_password ||
                              'This field is required',
                            register.password === register.confirm_password ||
                              'Password must match',
                          ]"
                        />
                        <v-select
                          outlined
                          :items="ageList"
                          v-model="register.age_group_id"
                          item-text="label"
                          item-value="value"
                          id="age"
                          label="Select Age Group * "
                          name="age"
                          prepend-icon="mdi-calendar-range"
                          color="cyan lighten-2"
                          class="mb-3"
                          :rules="[
                            () =>
                              !!register.age_group_id ||
                              'This field is required',
                          ]"
                          required
                        />

                        <v-text-field
                          ref="city"
                          v-model="register.city"
                          :rules="[
                            () => !!register.city || 'This field is required',
                          ]"
                          label="City * "
                          placeholder="El Paso"
                          required
                          prepend-icon="mdi-city"
                        ></v-text-field>
                        <v-text-field
                          ref="state"
                          v-model="register.state"
                          :rules="[
                            () => !!register.state || 'This field is required',
                          ]"
                          label="State/Province/Region * "
                          required
                          placeholder="TX"
                          prepend-icon="mdi-city-variant"
                        ></v-text-field>
                        <v-text-field
                          ref="zip"
                          v-model="register.zip_code"
                          :rules="[
                            () =>
                              !!register.zip_code || 'This field is required',
                          ]"
                          label="ZIP / Postal Code * "
                          required
                          placeholder="79938"
                          prepend-icon="mdi-counter"
                        ></v-text-field>
                        <v-autocomplete
                          ref="country"
                          v-model="register.country"
                          :rules="[
                            () =>
                              !!register.country || 'This field is required',
                          ]"
                          :items="countries"
                          label="Country * "
                          placeholder="Select..."
                          prepend-icon="mdi-earth"
                          required
                        ></v-autocomplete>

                        <div v-if="inistitutionForm">
                          <v-text-field
                            label="Please enter your Institution's Code:"
                            name="Please enter your Institution's Code:"
                            v-model="register.promo_code"
                            prepend-icon="mdi-account"
                            type="text"
                            color="cyan lighten-2"
                            required
                            :rules="[
                              () =>
                                !!register.promo_code ||
                                'This field is required',
                            ]"
                          />
                        </div>
                        <div v-else>
                          <v-text-field
                            label="Institution Name"
                            name="Institution Name"
                            v-model="register.institution"
                            prepend-icon="mdi-account"
                            type="text"
                            color="cyan lighten-2"
                            required
                            :rules="[
                              () =>
                                !!register.institution ||
                                'This field is required',
                            ]"
                          />

                          <v-text-field
                            label="Card Name"
                            name="Card Name"
                            v-model="register.card_name"
                            prepend-icon="mdi-account"
                            type="text"
                            color="cyan lighten-2"
                            required
                            :rules="[
                              () =>
                                !!register.card_name ||
                                'This field is required',
                            ]"
                          />
                          <v-text-field
                            label="Card Number"
                            name="Card Number"
                            v-model="register.card_number"
                            prepend-icon="mdi-counter"
                            type="text"
                            color="cyan lighten-2"
                            required
                            :rules="[
                              () =>
                                !!register.card_number ||
                                'This field is required',
                            ]"
                          />

                          <v-menu
                            v-model="menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="register.exp_time"
                                label="Expiration date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              type="month"
                              :min="minDate"
                              v-model="register.exp_time"
                              @input="menu = false"
                              format="MM/yy"
                              value-format="yyyy-MM"
                              :picker-options="datePickerOptions"
                            ></v-date-picker>
                          </v-menu>
                          <v-text-field
                            id="CVC Code"
                            label="CVC Code"
                            name="CVC Code"
                            prepend-icon="mdi-lock"
                            v-model="register.cvc_code"
                            type="text"
                            color="cyan lighten-2"
                            required
                            :rules="[
                              () =>
                                !!register.cvc_code || 'This field is required',
                            ]"
                          />
                        </div>
                        <div style="float: right" class="text-right mb-3">
                          <v-btn
                            rounded
                            color="blue lighten-2"
                            @click="signUp"
                            :disabled="
                              register.country == null ||
                              register.zip_code == null ||
                              register.state == null ||
                              register.city == null ||
                              register.age_group_id == null ||
                              register.confirm_password == null ||
                              register.password == null ||
                              register.email == null ||
                              register.first_name == null
                            "
                            dark
                            >Next</v-btn
                          >
                        </div>
                        <v-btn class="mb-3" @click="prevstep"> Back </v-btn>
                      </v-form>
                      <v-form v-else>
                        <v-card-text>
                          <v-container class="text--secondary text-justify">
                            In order to take full advantage of the Personal
                            Learning Coach you will first need to complete the
                            Learning Connections Inventory (LCI).
                          </v-container>
                        </v-card-text>
                        <v-card-text>
                          <v-container class="text--secondary text-justify">
                            To access the Let Me Learn platform you must either
                            belong to an institution and provide your
                            institution's code OR you can purchase your own
                            subscription with a credit card. Individual
                            subscriptions come with a FREE 14-day trial period!
                            You won't be charged until your trial period has
                            ended.
                          </v-container>
                        </v-card-text>
                        <v-hover class="my-5">
                          <template v-slot:default="{ hover }">
                            <div
                              :class="`elevation-${hover ? 24 : 5}`"
                              class="mx-auto pa-6 transition-swing"
                            >
                              <div>
                                <div class="display-2 mb-4 d-inline">
                                  Semester
                                </div>
                                <div
                                  class="display-2 d-inline float-right mx-5"
                                >
                                  <p><strong> $14.99 </strong></p>
                                </div>
                                <div class="text--secondary mb-4">4 Months</div>
                              </div>
                              <div class="mx-5 d-flex justify-end">
                                <v-btn
                                  color="blue"
                                  elevation="2"
                                  @click="
                                    register.type = 'Student';
                                    Registerdialog = true;
                                    inistitutionForm = false;
                                  "
                                >
                                  <v-icon right dark class="mr-3">
                                    mdi-account
                                  </v-icon>
                                  Semester
                                </v-btn>
                              </div>
                            </div>
                          </template>
                        </v-hover>
                        <v-hover class="my-5">
                          <template v-slot:default="{ hover }">
                            <div
                              :class="`elevation-${hover ? 24 : 5}`"
                              class="mx-auto pa-6 transition-swing"
                            >
                              <div>
                                <div class="display-2 mb-4 d-inline">
                                  Annual
                                </div>
                                <div
                                  class="display-2 d-inline float-right mx-5"
                                >
                                  <p><strong>$39.99 </strong></p>
                                </div>
                                <div class="text--secondary mb-4">one Year</div>
                              </div>

                              <div class="mx-5 d-flex justify-end">
                                <v-btn
                                  color="blue"
                                  elevation="2"
                                  @click="
                                    register.type = 'Individual';
                                    inistitutionForm = false;
                                    Registerdialog = true;
                                  "
                                >
                                  <v-icon right dark class="mr-3">
                                    mdi-account-tie
                                  </v-icon>
                                  Annual
                                </v-btn>
                              </div>
                            </div>
                          </template>
                        </v-hover>
                        <v-hover class="my-5">
                          <template v-slot:default="{ hover }">
                            <div
                              :class="`elevation-${hover ? 24 : 5}`"
                              class="mx-auto pa-6 transition-swing"
                            >
                              <div>
                                <div class="display-2 mb-4">Institution</div>
                                <div class="text--secondary mb-4">
                                  Promo Code
                                </div>
                              </div>
                              <div class="mx-5 d-flex justify-end">
                                <v-btn
                                  color="blue"
                                  elevation="2"
                                  @click="
                                    register.type = 'Institution';
                                    Registerdialog = true;
                                    inistitutionForm = true;
                                  "
                                >
                                  <v-icon right dark class="mr-3">
                                    mdi-account-group
                                  </v-icon>
                                  Institution
                                </v-btn>
                              </div>
                            </div>
                          </template>
                        </v-hover>
                      </v-form>

                      <!-- <v-form v-if="studentform">
                        <v-text-field
                          label="Institutions"
                          name="Institutions"
                          v-model="register.institution"
                          prepend-icon="mdi-account"
                          type="text"
                          color="cyan lighten-2"
                          required
                          :rules="[
                            () =>
                              !!register.institution ||
                              'This field is required',
                          ]"
                        />


                        <v-btn
                          rounded
                          style="float: right"
                          color="blue lighten-3"
                          @click="signUp"
                          dark
                          >SignUp</v-btn
                        >

                        <v-btn @click="prevstepToCards"> Back </v-btn>
                      </v-form>
                      <v-form v-if="individualform">
                        <v-text-field
                          label="Name"
                          name="Last"
                          v-model="register.card_name"
                          prepend-icon="mdi-counter"
                          type="text"
                          color="cyan lighten-2"
                          required
                          :rules="[
                            () =>
                              !!register.card_name || 'This field is required',
                          ]"
                        />
                        <v-text-field
                          label="Card Number"
                          name="Card Number"
                          v-model="register.card_number"
                          prepend-icon="mdi-counter"
                          type="text"
                          color="cyan lighten-2"
                          required
                          :rules="[
                            () =>
                              !!register.card_number ||
                              'This field is required',
                          ]"
                        />
                        <v-menu
                          v-model="menu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="register.exp_time"
                              label="Expiration date"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            :min="minDate"
                            v-model="register.exp_time"
                            @input="menu = false"
                          ></v-date-picker>
                        </v-menu>
                        <v-text-field
                          id="CVC Code"
                          label="CVC Code"
                          name="CVC Code"
                          prepend-icon="mdi-lock"
                          v-model="register.cvc_code"
                          type="text"
                          color="cyan lighten-2"
                          required
                          :rules="[
                            () =>
                              !!register.cvc_code || 'This field is required',
                          ]"
                        />

                        <v-btn
                          rounded
                          style="float: right"
                          color="blue lighten-3"
                          @click="signUp"
                          dark
                          >SignUp</v-btn
                        >

                        <v-btn @click="prevstepToCards"> Back </v-btn>
                      </v-form> -->
                      <!-- <v-form v-if="institutionlform">
                        <v-text-field
                          label="Please enter your Institution's Code:"
                          name="Please enter your Institution's Code:"
                          v-model="register.promo_code"
                          prepend-icon="mdi-account"
                          type="text"
                          color="cyan lighten-2"
                          required
                          :rules="[
                            () =>
                              !!register.promo_code || 'This field is required',
                          ]"
                        />
                        <div style="float: right" class="text-rihgt">
                          <v-btn
                            rounded
                            color="blue lighten-3"
                            @click="signUp"
                            dark
                            >SignUp</v-btn
                          >
                        </div>
                        <v-btn style="" @click="prevstepToCards"> Back </v-btn>
                      </v-form> -->
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="banner fill-height">
      <v-col class="text-col">
        <img src="~@/assets/images/download.png" alt="" srcset="" />
      </v-col>
      <v-col>
        <v-col class="text-col" cols="5">
          <p id="text">Personal Learning Coach</p>
        </v-col>
      </v-col>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data: () => ({
    menu: false,
    inistitutionForm: false,
    minDate: new Date(Date.now()).toISOString().substr(0, 10),
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
    Registerdialog: false,
    institutionlform: false,
    individualform: false,
    datePickerOptions: {
      disabledDate(date) {
        return date < new Date();
      },
    },
    tabs: [
      { name: "Login", icon: "mdi-account" },
      { name: "Register", icon: "mdi-account-outline" },
    ],
    tab: 0,
    originalform: true,
    studentform: false,
    forgetPass: false,
    // dialog: true,
    step: 1,
    ageList: [
      { value: 1, label: "6-12 years old" },
      { value: 2, label: "13 -21 years old" },
      { value: 3, label: "22 or older" },
    ],
    gender: [
      { value: 1, label: "Male" },
      { value: 2, label: "Female" },
    ],
    forget: {},
    register: {
      first_name: null,
      last_name: null,
      city: null,
      state: null,
      zip_code: null,
      country: null,
      email: null,

      password: null,
      confirm_password: null,
      age_group_id: null,
    },
    login: {
      email: null,
      password: null,
    },
  }),
  methods: {
    nextstep() {
      this.originalform = false;
      this.Registerdialog = true;
    },
    prevstepToCards() {
      this.studentform = false;
      this.individualform = false;
      this.Registerdialog = true;
      this.institutionlform = false;
    },
    prevstep() {
      this.originalform = true;
      this.Registerdialog = false;
    },
    signUp() {
      this.$store
        .dispatch("user/register", { query: this.register })
        .then((res) => {
          this.$router.push("before");
        });
    },
    signIn() {
      this.$store.dispatch("user/login", this.login).then((_) => {
        this.$router.push("profile/");
      });
    },

    ForgetPassword() {
      this.forgetPass = true;
      onsole.log("pass");
    },
    GoToQuestion() {
      this.$router.push("edit-questionnaire/");
    },
    goToProfile() {
      this.$router.push("profile/");
    },
    ForgetPasswordEmail() {
      console.log(this.forget);
    },
  },
  mounted() {
    this.$store.dispatch("user/orgs").then((_) => {
      // this.allOrgs=$store.getters['user/orgsAll']
    });
  },
};
</script>

<style scoped>
.banner {
  background: url("../../assets/login.jpg") no-repeat center;
  background-size: cover;
  min-width: 60%;
  width: 60%;
}

.overlay {
  background-color: black;
}
.height100 {
  height: 100vh;
}
.v-card {
  border-radius: 0;
  margin-top: 0;
  margin-bottom: 0;
}
.container {
  width: 100%;
  padding: 0px !important;
  margin: 0px !important;
}
v-form {
  height: 800px;
}
/* .transparent {
   background-color: white!important;
   opacity: 0.65;
   border-color: transparent!important;
 } */
#text {
  color: white;
  font-weight: 700;
  font-size: 112px;
  line-height: 0.9em;
  margin-left: -7px;
  margin-top: 20px;
  word-break: break-word;
}
.text-col {
  margin-left: 30%;
}

.v-slide-group {
  background-color: #90a4ae !important;
}

.row {
  margin-left: 30px;
  margin-right: 20px;
}

.theme--dark.v-btn.v-btn--disabled.v-btn--has-bg {
  background-color: rgb(171 171 171 / 60%) !important;
}

.v-card__subtitle,
.v-card__text,
.v-card__title {
  padding: 10px;
}

.forms {
  width: 40%;
}

.fill-height {
  min-height: 100% !important;
}

@media (max-width: 992px) {
  .banner {
    display: none;
  }
  .forms {
    width: 100%;
  }
}
</style>
