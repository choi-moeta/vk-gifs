import { Store } from '/@/store';
import { Router } from 'vue-router';
import { ActionTypes } from '/@/store/actions';

export default (store: Store, router: Router) => {
  store.dispatch(ActionTypes.logout)
  router.push({ name: 'auth' })
}
