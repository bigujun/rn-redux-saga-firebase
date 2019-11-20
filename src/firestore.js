import { buffers, eventChannel } from "redux-saga";
import { call, fork } from "redux-saga/effects";

import { getCollectionRef, getDocumentRef, syncChannel } from "./utility";

function channel(
  pathOrRef,
  type = "collection",
  buffer = buffers.none(),
  snapshotListenOptions
) {
  const ref =
    type === "collection"
      ? getCollectionRef(pathOrRef)
      : getDocumentRef(pathOrRef);

  const evtChannel = eventChannel(emit => {
    const unsubscribe = snapshotListenOptions
      ? ref.onSnapshot(snapshotListenOptions, emit)
      : ref.onSnapshot(emit);

    // Returns unsubscribe function
    return unsubscribe;
  }, buffer);

  return evtChannel;
}

function* addDocument(collectionRef, data) {
  const collection = getCollectionRef(collectionRef);

  return yield call([collection, collection.add], data);
}

function* deleteDocument(documentRef) {
  const doc = getDocumentRef(documentRef);

  return yield call([doc, doc.delete]);
}

function* getCollection(collectionRef) {
  const collection = getCollectionRef(collectionRef);

  return yield call([collection, collection.get]);
}

function* getDocument(documentRef) {
  const doc = getDocumentRef(documentRef);

  return yield call([doc, doc.get]);
}

function* setDocument(documentRef, data, options) {
  const doc = getDocumentRef(documentRef);

  return yield call([doc, doc.set], data, options);
}

function* updateDocument(documentRef, ...args) {
  const doc = getDocumentRef(documentRef);

  return yield call([doc, doc.update], ...args);
}

function* syncCollection(pathOrRef, options) {
  const evtChannel = yield call(
    channel,
    pathOrRef,
    "collection",
    undefined,
    options.snapshotListenOptions
  );

  yield fork(syncChannel, evtChannel, options);
}

function* syncDocument(pathOrRef, options) {
  const evtChannel = yield call(
    channel,
    pathOrRef,
    "document",
    undefined,
    options.snapshotListenOptions
  );

  yield fork(syncChannel, evtChannel, options);
}

export default {
  addDocument,
  channel,
  deleteDocument,
  getCollection,
  getDocument,
  setDocument,
  syncCollection,
  syncDocument,
  updateDocument
};
