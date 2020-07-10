const xhttp = new XMLHttpRequest();

/**
 * @async
 * @param {string} url - request url
 * @param {JSON} params - body params
 *
 * @return {Promise} - result
 */

const requestGenerator = (method, url, params) => {
  return new Promise((resolve, reject) => {
    // 3번째 인자는 true: 비동기, false: 동기 를 결정한다.
    xhttp.open(method, url, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
          const res = JSON.parse(xhttp.response);
          resolve(res);
        } else {
          reject();
        }
      }
    };

    xhttp.send(JSON.stringify(params || ""));
  });
};

export const httpRequest = {
  get: (url, params) => requestGenerator("GET", url, params),
  post: (url, params) => requestGenerator("POST", url, params),
};
