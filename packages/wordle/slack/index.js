const fetch = require("node-fetch");
const url = process.env.SLACK_WEBHOOK_URL

exports.handler = async (event, context) => {
  if (!url || !event || !event.result) {
    if (!url) {
      return { body: 'function not configured correctly', statusCode: 404 }
    } else {
      return { body: 'missing result', statusCode: 404 }
    }
  }

  attachments = [{
    color: 'good',
    title: event.result
  }]

  return fetch(url, {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ attachments }),
  })
    .then(() => ({
      statusCode: 200,
      body: `Your greeting has been sent to Slack 👋`,
    }))
    .catch((error) => ({
      statusCode: 422,
      body: `Oops! Something went wrong. ${error}`,
    }));
};