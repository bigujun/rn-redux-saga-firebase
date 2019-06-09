import { eventChannel } from 'redux-saga';
import { call, fork } from 'redux-saga/effects';
import Firebase from 'react-native-firebase';

import { syncChannel } from './utility';

function channel() {
  if (this.messageChannel) return this.messageChannel;

  const messaging = Firebase.messaging();

  const evtChannel = eventChannel((emit) => {
    const unsubscribe = messaging.onMessage(emit);

    return unsubscribe;
  });

  this.messageChannel = evtChannel;

  return evtChannel;
}

function* syncMessages(options) {
  const evtChannel = yield call(this.messaging.channel);

  yield fork(syncChannel, evtChannel, options);
}

function tokenRefreshChannel() {
  if (this.tokenRefreshChannel) {
    return this.tokenRefreshChannel;
  }
  const messaging = Firebase.messaging();

  const evtChannel = eventChannel((emit) => {
    const unsubscribe = messaging.onTokenRefresh(() => {
      messaging.getToken().then(emit);
    });

    return unsubscribe;
  });

  this.tokenRefreshChannel = evtChannel;

  return evtChannel;
}

function* syncToken(options) {
  const evtChannel = yield call(this.messaging.tokenRefreshChannel);

  yield fork(syncChannel, evtChannel, options);
}

export default {
  channel,
  syncMessages,
  syncToken,
  tokenRefreshChannel,
};
