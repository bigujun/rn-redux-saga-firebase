import { call } from 'redux-saga/effects';

export function getFunctionURL(region, projectId, functionName, parameters = {}) {
  if (region && projectId) {
    // If the function name is already a URL, just return it.
    const baseUrl = /^https?:\/\//.test(functionName)
      ? functionName
      : `https://${region}-${projectId()}.cloudfunctions.net/${functionName}`;

    const query = Object.keys(parameters)
      .map((key) => `${key}=${parameters[key]}`)
      .join('&');

    if (query) {
      return `${baseUrl}?${query}`;
    }

    return baseUrl;
  }
  throw Error('Please provide projectId, data center region, Function not found.');
}

function* callFirebaseFunction(functionName, queryParams = {}, init = {}) {
  const url = getFunctionURL.call(this, functionName, queryParams);

  const response = yield call(fetch, url, init);

  if (!response.ok) throw response;

  const contentType = response.headers.get('Content-Type');
  const parser = contentType.startsWith('application/json') ? response.json : response.text;

  const data = yield call([response, parser]);

  return data;
}

export default { call: callFirebaseFunction };
