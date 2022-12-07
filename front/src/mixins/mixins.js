import Vue from 'vue';
import store from '../store/store';
import Cookies from 'js-cookie';


Vue.mixin({
  methods: {
    hasPermission: function (permission) {
      return store.getters['roles/authUserRolesPermissionsName'].includes(permission) || store.getters['roles/authUserPermissionsName'].includes(permission);
    },

    hasRole: function (role) {
      return store.getters['roles/authUserRoles'].includes(role);
    },
    auth: function () {
      if (Cookies.get('user')) {
        let auth = JSON.parse(Cookies.get('user'));
        if (auth) {
          return auth;
        }
      }
      return false
    },
    isAuth: function (user) {
      let auth = JSON.parse(Cookies.get('user'));
      if (auth && user) {
        return auth.id === user.id;
      }
    },
    ntBr(string) {
      if (string) {
        return string.replace(/\n/g, '<br />');
      }
    },
    toLocalDatetime(input, lang = 'ar', time = false) {
      const datetime = new Date(input);
      datetime.getTimezoneOffset();
      if (time) {
        return datetime.toLocaleTimeString(`${lang == 'ar' ? 'ar-EG-u-nu-latn' : 'en-US'}`, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      } else {
        return datetime.toLocaleDateString(`${lang == 'ar' ? 'ar-EG-u-nu-latn' : 'en-US'}`, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      }
    },
    hideClass(className) {
      let elementName = this.$el.querySelectorAll(`${className}`);
      elementName.forEach(element => {
        element.style.display = 'none';
      });
    },
    isImage(ex) {
      if (ex) {
        const extension = ex.toLowerCase();
        if (extension == 'jpg' || extension == 'png' || extension == 'gif' || extension == 'tif' || extension == 'jpeg' || extension == 'bmp') {
          return true;
        }
      }
    },
    validation(message, type = 0) {
      let Valid = [];
      if (!message) {
        message = `${this.$t('Validation.selectFiled')}`;
      }
      if (type == 0) Valid = [{required: true, message: message, trigger: 'blur'}];
      if (type == 1) Valid = [{required: true, message: message, trigger: 'change'}];
      if (type == 'textarea')
        Valid = [
          {
            required: true,
            pattern: /\S$|\S[\s\S]*\S+/,
            message: message,
            trigger: 'blur',
          },
        ];
      if (type == 'checkbox') Valid = [{required: true, message: message, trigger: 'change'}];
      if (type == 'n_id') Valid = [{required: true, pattern: /[0-9]{14,14}/, message: message, trigger: 'blur'}];
      if (type == 'email')
        Valid = [
          {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: message,
            trigger: 'blur',
          },
        ];
      return Valid;
    },
    camelCase(str) {
      return str.replace('_', ' ').replace(/\s(.)/g, function ($1) {
        return $1.toUpperCase();
      }).replace(str[0], str[0].toUpperCase())
    },

  },
});
