import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { readdirSync } from "fs";
import { join } from "path";

export const uploadFiles = (
  bucket: aws.s3.Bucket,
  prefix: string,
  buildDir = "../dist"
) => {
  const files = readdirSync(buildDir);

  const objects = [];

  for (const file of files) {
    const object = new aws.s3.BucketObject(`${prefix}/${file}`, {
      bucket: bucket.id,
      source: new pulumi.asset.FileAsset(join(buildDir, file)),
      contentType: file.endsWith(".html")
        ? "text/html"
        : file.endsWith(".js")
        ? "application/javascript"
        : file.endsWith(".css")
        ? "text/css"
        : undefined,
    });

    objects.push(object);
  }

  return objects;
};
