import {createApp} from 'vue';
import Routes from '/@/router/index';
import App from '/@/App.vue';
import {createPinia} from 'pinia';
import Notifications, {notify} from '@kyvg/vue3-notification';
import Popper from 'vue3-popper';
// @ts-ignore
import {createVfm} from 'vue-final-modal';

// Modal CSS (required)
import 'vue-final-modal/style.css';

// Fontawesome
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {
  faXmark,
  faWindowMinimize,
  faPlus,
  faArrowsRotate,
  faTriangleExclamation,
  faCircleInfo,
  faCircleCheck,
  faCircleStop,
  faServer,
  faUser,
  faDoorOpen,
  faGamepad,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import {faWindowMaximize, faKeyboard} from '@fortawesome/free-regular-svg-icons';
import {isOnline} from '#preload';
library.add(
  faXmark,
  faWindowMaximize,
  faWindowMinimize,
  faKeyboard,
  faPlus,
  faArrowsRotate,
  faTriangleExclamation,
  faCircleInfo,
  faCircleCheck,
  faCircleStop,
  faServer,
  faUser,
  faDoorOpen,
  faGamepad,
  faClock
);

const pinia = createPinia();
const vfm = createVfm();
createApp(App)
  .use(Routes)
  .use(pinia)
  .use(Notifications)
  .use(vfm)
  .component('font-awesome-icon', FontAwesomeIcon)
  .component('Popper', Popper)
  .mount('#app');

if (!await isOnline()) {
  notify({
    title: "Vous n'êtes pas connecté à internet",
    type: 'notif-warn',
    text: "Pour une meilleure expérience, nous vous recommandons d'être connecté à internet.",
  });
}
