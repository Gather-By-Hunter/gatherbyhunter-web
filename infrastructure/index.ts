import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { createS3Bucket } from "./src/s3";
import { uploadFiles } from "./src/uploadFiles";

const config = new pulumi.Config();

const env = config.require("env");

const domain = config.require("domain");
const subdomain = config.require("subdomain");

const networkHostedZoneId = config.require("networkHostedZoneId");
const networkRoleArn = config.require("networkRoleArn");

const networkProvider = new aws.Provider("networkProvider", {
  assumeRoles: [
    {
      roleArn: networkRoleArn,
    },
  ],
  region: "us-east-1",
});

const usEastProvider = new aws.Provider("us-east-1-provider", {
  region: "us-east-1",
});

const bucket = createS3Bucket(env);

const fullDomain = subdomain ? `${subdomain}.${domain}` : domain;
const cert = new aws.acm.Certificate(
  "cert",
  {
    domainName: fullDomain,
    validationMethod: "DNS",
  },
  { provider: usEastProvider }
);

const certValidationRecord = new aws.route53.Record(
  "cert-validation-record",
  {
    name: cert.domainValidationOptions[0].resourceRecordName,
    zoneId: networkHostedZoneId,
    type: cert.domainValidationOptions[0].resourceRecordType,
    records: [cert.domainValidationOptions[0].resourceRecordValue],
    ttl: 300,
  },
  { provider: networkProvider }
);

const certValidation = pulumi
  .all([certValidationRecord.fqdn, cert.arn])
  .apply(([fqdn, certArn]) => {
    const certValidation = new aws.acm.CertificateValidation(
      "cert-validation",
      {
        certificateArn: certArn,
        validationRecordFqdns: [fqdn],
      },
      { provider: usEastProvider }
    );

    return certValidation;
  });

const timestamp = new Date().toISOString().replace(/[:.]/g, "");
const prefix = timestamp;

const objects = uploadFiles(bucket, prefix);

const cdn = new aws.cloudfront.Distribution(
  "cdn",
  {
    enabled: true,
    origins: [
      {
        domainName: bucket.bucketRegionalDomainName,
        originId: bucket.arn,
        originPath: `/${prefix}`,
        s3OriginConfig: {
          originAccessIdentity: new aws.cloudfront.OriginAccessIdentity(
            "oai",
            {}
          ).cloudfrontAccessIdentityPath,
        },
      },
    ],
    defaultCacheBehavior: {
      allowedMethods: ["GET", "HEAD"],
      cachedMethods: ["GET", "HEAD"],
      targetOriginId: bucket.arn,
      viewerProtocolPolicy: "redirect-to-https",
      forwardedValues: {
        queryString: false,
        cookies: { forward: "none" },
      },
    },
    viewerCertificate: {
      acmCertificateArn: certValidation.certificateArn,
      sslSupportMethod: "sni-only",
    },
    defaultRootObject: "index.html",
    aliases: [fullDomain],
    restrictions: {
      geoRestriction: { restrictionType: "none" },
    },
    priceClass: "PriceClass_100",
  },
  {
    dependsOn: objects,
  }
);
