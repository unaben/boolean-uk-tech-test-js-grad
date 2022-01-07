const fetch = require('node-fetch');

/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}

 ******

 *  With the results from this request, inside "content", count
 *  the number of packages that have a MAJOR semver version 
 *  greater than 10.x.x
 */

module.exports = async function countMajorVersionsAbove10() {
  // TODO
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: 'https://api.npms.io/v2/search/suggestions?q=react',
      method: 'GET',
      return_payload: true,
    }),
  };

  const res = await fetch(
    'http://ambush-api.inyourarea.co.uk/ambush/intercept',
    fetchOptions,
  );

  const data = await res.json();

  // console.log("IncomingData: ", data.content);

  const contents = data.content;

  let count = '';

  contents.map(content => {
    // console.log('Inside MAP: ', content.package.version.split('.'));
    const newVersion = content.package.version.split('.')[0];
    // console.log('newVersion: ', newVersion);
    if (newVersion > 10) {
      return count++;
    }
    // console.log('packages: ', count);
  });

  return count;
};

// With the results from this request, inside "content", count
// the number of packages that have a MAJOR semver version
//  greater than 10.x.x
