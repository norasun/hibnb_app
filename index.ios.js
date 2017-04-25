import React from 'react';
import moment from 'moment';
import {
  AppRegistry,
  AsyncStorage
} from 'react-native'
import {persistStore} from 'redux-persist'

//导入UI

import App from './app.js'

//导入Provider，用于后面包裹router
import { Provider } from 'react-redux'

//导入redux生成的state（应用状态都保存在这里）
import {store} from '@norasun/hibnb-core'
persistStore(store, {storage: AsyncStorage})


export default class hibnb_app extends React.Component {

  componentDidMount() {

    //   store.dispatch(letLogout())
    //   store.dispatch(navChange('PULSE'))

  }

  render() {

      return (
          <Provider store={store}>
              <App />
          </Provider>
      )

  }
}



AppRegistry.registerComponent('hibnb_app', () => hibnb_app);
