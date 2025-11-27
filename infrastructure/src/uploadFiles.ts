import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { readdirSync, statSync } from "fs";
import { join } from "node:path";

const getMimeType = (fileName: string) => {
  const ending = fileName.split(".").pop();

  switch (ending) {
    case "html":
      return "text/html";
    case "mjs":
    case "js":
      return "text/javascript";
    case "css":
      return "text/css";
    case "json":
      return "application/json";
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "gif":
      return "image/gif";
    case "svg":
      return "image/svg+xml";
    case "ico":
      return "image/x-icon";
    case "svg":
      return "image/svg+xml";
    case "woff":
      return "font/woff";
    case "woff2":
      return "font/woff2";
    case "ttf":
      return "font/ttf";
    case "eot":
      return "application/vnd.ms-fontobject";
    case "otf":
      return "font/otf";
    case "wasm":
      return "application/wasm";
    case "webmanifest":
      return "application/manifest+json";
    case "xml":
      return "application/xml";
    case "pdf":
      return "application/pdf";
    case "zip":
      return "application/zip";
    case "gz":
      return "application/gzip";
    case "tar":
      return "application/x-tar";
    case "rar":
      return "application/x-rar-compressed";
    case "7z":
      return "application/x-7z-compressed";
    case "mp4":
      return "video/mp4";
    case "webm":
      return "video/webm";
    case "ogg":
      return "video/ogg";
    case "mp3":
      return "audio/mpeg";
    case "wav":
      return "audio/wav";
    case "flac":
      return "audio/flac";
    case "aac":
      return "audio/aac";
    case "m4a":
      return "audio/m4a";
    case "3gp":
      return "video/3gpp";
    case "avi":
      return "video/x-msvideo";
    case "mov":
      return "video/quicktime";
    case "wmv":
      return "video/x-ms-wmv";
    case "flv":
      return "video/x-flv";
    case "swf":
      return "application/x-shockwave-flash";
    case "mid":
    case "midi":
    case "kar":
      return "audio/midi";
    case "mp2":
    case "mp2":
    case "mp1":
    case "mp1":
    case "mpg":
    case "mpeg":
      return "video/mpeg";
    case "m4v":
      return "video/x-m4v";
    default:
      return undefined;
  }
};

function* walkSync(dir: string, prefix = ""): Generator<string> {
  const files = readdirSync(dir);

  for (const file of files) {
    const path = join(dir, file);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      yield* walkSync(path, join(prefix, file));
    } else {
      yield join(prefix, file);
    }
  }
}

export const uploadFiles = (
  bucket: aws.s3.Bucket,
  prefix: string,
  buildDir = "../dist"
) => {
  const files = walkSync(buildDir);

  const objects = [];

  for (const file of files) {
    const object = new aws.s3.BucketObject(`${prefix}/${file}`, {
      bucket: bucket.id,
      source: new pulumi.asset.FileAsset(join(buildDir, file)),
      contentType: getMimeType(file),
    });

    objects.push(object);
  }

  return objects;
};
