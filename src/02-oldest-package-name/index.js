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

 *  With the results from this request, inside "content", return
 *  the "name" of the package that has the oldest "date" value
 */
const fetch = require('node-fetch');

module.exports = async function oldestPackageName() {
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

  // console.log({ IncomingData: data.content });

  const contents = data.content;

  // let allDates = '';
  // const oldestDate = contents.forEach(content => {
  //   console.log('contentDate: ', content.package.date);
  //   console.log('contentName: ', content.package.name)
  //   const date = content.package.date;
  //   if (date > allDates) {
  //     allDates = date
  //   }
  //   console.log('ALLDATES:', allDates);
  //   return allDates
  // });
  // console.log('OLDEST: ', oldestDate);

  const oldestName = contents.reduce((a, b) =>
    b.package.date < a.package.date ? b : a,
  );
  console.log("OLDEST: ", oldestName);
  const name = oldestName.package.name;
  return name;
};

//  With the results from this request, inside "content", return
//  the "name" of the package that has the oldest "date" value
