import { buffers, eventChannel } from 'redux-saga';
import { call, fork } from 'redux-saga/effects';
import { getDataBaseRef, syncChannel } from './utility';

const defaultTransform = (data) => data.value;

function* read(pathOrRef) {
  const ref = getDataBaseRef(pathOrRef);
  const result = yield call([ref, ref.once], 'value');

  return result.val();
}

function* create(pathOrRef, data) {
  const ref = getDataBaseRef(pathOrRef);
  const result = yield call([ref, ref.push], data);

  return result.key;
}

function* update(pathOrRef, data) {
  const ref = getDataBaseRef(pathOrRef);

  yield call([ref, ref.set], data);
}

function* patch(pathOrRef, data) {
  const ref = getDataBaseRef(pathOrRef);

  yield call([ref, ref.update], data);
}

function* deleteDatabase(pathOrRef) {
  const ref = getDataBaseRef(pathOrRef);

  yield call([ref, ref.remove]);
}

function channel(pathOrRef, event = 'value', buffer = buffers.none()) {
  const ref = getDataBaseRef(pathOrRef);

  const evtChannel = eventChannel((emit) => {
    const callback = ref.on(event, (dataSnapshot) => emit({
      snapshot: dataSnapshot,
      value: dataSnapshot.val(),
    }));

    // Returns unsubscribe function
    return () => ref.off(event, callback);
  }, buffer);

  return evtChannel;
}

function* sync(pathOrRef, options, event) {
  const evtChannel = yield call(channel, pathOrRef, event);

  yield fork(syncChannel, evtChannel, {
    transform: defaultTransform,
    ...options,
  });
}

export default {
  channel,
  create,
  delete: deleteDatabase,
  patch,
  read,
  sync,
  update,
};
