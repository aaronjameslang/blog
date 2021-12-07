---
layout: page
title: CloudFront Invalidation
---

# CloudFront Invalidation

Hosting sites serverlessly using AWS S3 and CloudFront is a simple and affordable solution. Deploys can be automated simply using the [serverless](https://www.serverless.com/) framework and the [S3 sync](https://www.serverless.com/plugins/serverless-s3-sync) plugin.

Once you've synced your files up to your S3 bucket, you can use the below script to clear your CloudFront cache. Automating this as part of your deploy process will save confusion when your client can't see your updates.

```js
const AWS = require('aws-sdk')

const params = {
  DistributionId: process.env.AWS_DISTRIBUTION_ID,
  InvalidationBatch: {
    CallerReference: Date.now(),
    Paths: {
      Quantity: 1,
      Items: ['/*']
    }
  }
}
new AWS.CloudFront({ apiVersion: '2020-05-31' })
  .createInvalidation(params, function (err, data) {
    if (err) {
      console.error(err, err.stack)
      throw err
    }
    console.log('Invalidation complete')
    console.debug(data)
  })
```

