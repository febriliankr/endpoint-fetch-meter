import fetch from "node-fetch";

async function fetchEndpoint() {
  const amountOfRequests = 100;
  const begin = new Date().getTime();
  let successCounter = 0;
  let errorCounter = 0;
  const promises = [];
  for (let i = 0; i < amountOfRequests; i++) {
    promises.push(
      fetch("http://localhost:3001/api/seller/balance", {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": "xAuthToken",
        },
      })
    );
  }

  await Promise.all(promises);

  const end = new Date().getTime();
  const duration = (end - begin) / 1000;
  console.log(`duration: `, duration, " seconds");
  console.log(`requests: `, amountOfRequests);
  console.log(
    `requests/second: `,
    amountOfRequests / duration,
    " requests/second"
  );
  console.log(
    `avg request duration: `,
    (duration * 1000) / amountOfRequests,
    " ms"
  );
  console.log(`success: `, successCounter);
  console.log(`error: `, errorCounter);
  console.log(`Success Rate: `, (successCounter * 100) / amountOfRequests, "%");
}

fetchEndpoint();
