import { call } from 'redux-saga/effects';
import { getStorageRef } from './utility';

function uploadFile(pathOrRef, file, metadata) {
  const ref = getStorageRef(pathOrRef);
  const task = ref.put(file, metadata);

  return task;
}

function uploadString(pathOrRef, string, format, metadata) {
  const ref = getStorageRef(pathOrRef);
  const task = ref.putString(string, format, metadata);

  return task;
}

function* getDownloadURL(pathOrRef) {
  const ref = getStorageRef(pathOrRef);
  const url = yield call([ref, ref.getDownloadURL]);

  return url;
}

function* getFileMetadata(pathOrRef) {
  const ref = getStorageRef(pathOrRef);
  const metadata = yield call([ref, ref.getMetadata]);

  return metadata;
}

function* updateFileMetadata(pathOrRef, newMetadata) {
  const ref = getStorageRef(pathOrRef);
  const metadata = yield call([ref, ref.updateMetadata], newMetadata);

  return metadata;
}

function* deleteFile(pathOrRef) {
  const ref = getStorageRef(pathOrRef);

  yield call([ref, ref.delete]);
}

export default {
  deleteFile,
  getDownloadURL,
  getFileMetadata,
  updateFileMetadata,
  uploadFile,
  uploadString,
};
