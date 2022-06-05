import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Button, Progress, Swipe, SwipeItem, Field, Icon, ActionBar, ActionBarIcon,
  ActionBarButton, Popup, Checkbox, CheckboxGroup, Stepper, SubmitBar
} from 'vant'
import '../mock/mock'

createApp(App)
  .use(store)
  .use(router)
  .use(Button)
  .use(Swipe)
  .use(Icon)
  .use(Field)
  .use(SwipeItem)
  .use(Progress)
  .use(ActionBar)
  .use(ActionBarIcon)
  .use(ActionBarButton)
  .use(Popup)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Stepper)
  .use(SubmitBar)
  .mount('#app')
