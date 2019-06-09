import { eventChannel } from 'redux-saga';
import { call } from 'redux-saga/effects';
import Firebase from 'react-native-firebase';

function channel() {
  if (this.authChannel) return this.authChannel;

  const auth = Firebase.auth();
  const evtChannel = eventChannel((emit) => {
    const unsubscribe = auth.onAuthStateChanged((user) => emit({ user }), (error) => emit({ error }));

    return unsubscribe;
  });

  this.authChannel = evtChannel;

  return evtChannel;
}

function* applyActionCode(code) {
  const auth = Firebase.auth();

  return yield call([auth, auth.applyActionCode], code);
}

function* confirmPasswordReset(code, newPassword) {
  const auth = Firebase.auth();

  return yield call([auth, auth.confirmPasswordReset], code, newPassword);
}

function* createUserWithEmailAndPassword(email, password) {
  const auth = Firebase.auth();

  return yield call([auth, auth.createUserWithEmailAndPassword], email, password);
}

function* deleteProfile() {
  const auth = Firebase.auth();

  return yield call([auth.currentUser, auth.currentUser.delete]);
}

function* linkWithPopup(authProvider) {
  const auth = Firebase.auth();

  return yield call([auth.currentUser, auth.currentUser.linkWithPopup], authProvider);
}

function* linkWithRedirect(authProvider) {
  const auth = Firebase.auth();

  return yield call([auth.currentUser, auth.currentUser.linkWithRedirect], authProvider);
}

function* sendEmailVerification(actionCodeSettings) {
  const auth = Firebase.auth();

  return yield call([auth.currentUser, auth.currentUser.sendEmailVerification], actionCodeSettings);
}

function* sendPasswordResetEmail(email, actionCodeSettings) {
  const auth = Firebase.auth();

  return yield call([auth, auth.sendPasswordResetEmail], email, actionCodeSettings);
}

function* signInAndRetrieveDataWithCredential(credential) {
  const auth = Firebase.auth();

  return yield call([auth, auth.signInAndRetrieveDataWithCredential], credential);
}

function* signInAnonymously() {
  const auth = Firebase.auth();

  return yield call([auth, auth.signInAnonymously]);
}

function* signInWithCredential(credential) {
  const auth = Firebase.auth();

  return yield call([auth, auth.signInWithCredential], credential);
}

function* signInWithCustomToken(token) {
  const auth = Firebase.auth();

  return yield call([auth, auth.signInWithCustomToken], token);
}

function* signInWithEmailAndPassword(email, password) {
  const auth = Firebase.auth();

  return yield call([auth, auth.signInWithEmailAndPassword], email, password);
}

function* signInWithPhoneNumber(phoneNumber, applicationVerifier) {
  const auth = Firebase.auth();

  return yield call([auth, auth.signInWithPhoneNumber], phoneNumber, applicationVerifier);
}

function* signInWithPopup(authProvider) {
  const auth = Firebase.auth();
  const { credential } = yield call([auth, auth.signInWithPopup], authProvider);

  return credential;
}

function* signInWithRedirect(authProvider) {
  const auth = Firebase.auth();

  yield call([auth, auth.signInWithRedirect], authProvider);
}

function* signOut() {
  const auth = Firebase.auth();

  yield call([auth, auth.signOut]);
}

function* unlink(provider) {
  const auth = Firebase.auth();

  return yield call([auth.currentUser, auth.currentUser.unlink], provider);
}

function* updateEmail(email) {
  const auth = Firebase.auth();

  return yield call([auth.currentUser, auth.currentUser.updateEmail], email);
}

function* updatePassword(password) {
  const auth = Firebase.auth();

  return yield call([auth.currentUser, auth.currentUser.updatePassword], password);
}

function* updateProfile(profile) {
  const auth = Firebase.auth();

  return yield call([auth.currentUser, auth.currentUser.updateProfile], profile);
}

export default {
  applyActionCode,
  channel,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  deleteProfile,
  linkWithPopup,
  linkWithRedirect,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInAndRetrieveDataWithCredential,
  signInAnonymously,
  signInWithCredential,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  unlink,
  updateEmail,
  updatePassword,
  updateProfile,
};
