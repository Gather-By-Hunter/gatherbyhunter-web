import * as aws from "@pulumi/aws";

export const createS3Bucket = (env: string) => {
  const name = `gatherbyhunter-frontend-${env}`;

  const bucket = new aws.s3.Bucket(`${name}-bucket`, {
    bucket: `${name}-bucket`,
    tags: {
      Environment: env,
    },
  });

  const bucketOwnershipControls = new aws.s3.BucketOwnershipControls(
    `${name}-ownership-controls`,
    {
      bucket: bucket.id,
      rule: {
        objectOwnership: "BucketOwnerPreferred",
      },
    }
  );

  new aws.s3.BucketAcl(
    `${name}-acl`,
    {
      bucket: bucket.id,
      acl: "private",
    },
    { dependsOn: [bucketOwnershipControls] }
  );

  return bucket;
};
