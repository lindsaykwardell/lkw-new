exports.handler = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      key: 'value',
      msg: 'You got it!',
    }),
  })
}
