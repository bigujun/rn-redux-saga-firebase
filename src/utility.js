/* eslint-disable import/prefer-default-export */
import { cancelled, put, take } from 'redux-saga/effects';
import Firebase from 'react-native-firebase';

const isDev = () => process.env.NODE_ENV !== 'production';

const assert = (condition, message) => {
  if (isDev() && !condition) throw Error(message);
};

const getCollectionRef = (pathOrRef) => {
  assert(!!Firebase.firestore(), 'Firestore isn\'t installed. ');

  return typeof pathOrRef === 'string' ? Firebase.firestore().collection(pathOrRef) : pathOrRef;
};

const getDataBaseRef = (pathOrRef) => (typeof pathOrRef === 'string' ? Firebase.database().ref(pathOrRef) : pathOrRef);
const getStorageRef = (pathOrRef) => (typeof pathOrRef === 'string' ? Firebase.storage().ref(pathOrRef) : pathOrRef);

const getDocumentRef = (pathOrRef) => {
  assert(!!Firebase.firestore(), 'Firestore isn\'t installed. ');

  return typeof pathOrRef === 'string' ? Firebase.firestore().doc(pathOrRef) : pathOrRef;
};

function* syncChannel(channel, options) {
  const {
    successActionCreator, failureActionCreator, transform,
  } = options;

  try {
    while (true) {
      const data = yield take(channel);
      const transformedData = transform ? transform(data) : data;

      yield put(successActionCreator(transformedData));
    }
  } catch (err) {
    /* eslint-disable no-console */
    if (failureActionCreator) yield put(failureActionCreator(err));
    else {
      console.error('The following error has been ignored because no `failureActionCreator` has been set:', err);
    }
  } finally {
    if (yield cancelled()) channel.close();
  }
}

export { assert, getCollectionRef, getDataBaseRef, getDocumentRef, getStorageRef, syncChannel };
