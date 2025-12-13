## Gather By Hunter

Description: A website to rent party, wedding, event decore

Goals: A website where a user can select items they want to rent for a specific time frame, "match their vibe" by sharing a pinterest board, and checkout automatically. A website where an admin can add, remove, or update items, as well as create packages, discounts, message users, etc.

Technologies:

- Code storage: Github
- Code deployment: Github actions, AWS
- Website front end: Typescript/react, tailwindcss, vite. Stored on AWS S3, distributed by AWS Cloudfront
- Website back end: Rust app with a postgres database, redis for cache. Deployed on AWS EC2
- Pinterest "match your vibe": AWS S3 for temp image storage, AWS Titan G1 for image embedding, and Postgres for vector lookups

```
┌────────────┐
│  Pinterest │
│   API      │
└────┬───────┘
     │ fetch image URLs
┌────▼─────┐
│ EC2 Rust │
│ backend  │
└────┬─────┘
     │ download & resize
     ▼
┌──────────────┐
│ Upload to S3 │
└────┬─────────┘
     │ generate list of S3 URIs
     ▼
┌─────────────────────────┐
│ Bedrock Titan G1 (batch)│
└────┬────────────────────┘
     │ embeddings → Vec<f32>
     ▼
┌─────────────┐
│  Postgres   │
│ + pgvector  │
└────┬────────┘
     │ centroid clustering
     ▼
┌───────────────┐
│ Return top N  │
│ similar images│
└───────────────┘
```

```
                          ┌───────────────────────┐
                          │    Network Account     │
                          │-----------------------│
                          │ Hosted Zone:           │
                          │ gatherbyhunter.com     │
                          │-----------------------│
                          │ IAM Role for           │
                          │ Route53 Record Creation│
                          └─────────┬─────────────┘
                                    │
                          Cross-account Assume Role
                                    │
               ┌────────────────────┴─────────────────────┐
               │                                          │
   ┌────────────────────────┐                    ┌────────────────────┐
   │  Dev Account           │                    │  Prod Account      │
   │------------------------│                    │--------------------│
   │ S3 Bucket              │                    │ S3 Bucket          │
   │ dev.gatherbyhunter.com │                    │ gatherbyhunter.com │
   │------------------------│                    │--------------------│
   │ ACM Cert               │                    │ ACM Cert           │
   │ dev.gatherbyhunter.com │                    │ gatherbyhunter.com │
   │------------------------│                    │--------------------│
   │ CloudFront             │                    │ CloudFront         │
   │ Distribution           │                    │ Distribution       │
   │ Origin: S3             │                    │ Origin: S3         │
   │------------------------│                    │--------------------│
   │ Pulumi Stack           │                    │ Pulumi Stack       │
   └────────────────────────┘                    └────────────────────┘
                                      │
                                      ▼
                          Route53 Records in
                          Network Account Hosted Zone
                          (CNAME/ALIAS pointing to
                            CloudFront distributions)
```

Goals: Working UI, "match your vibe" functions. Maybe not the admin portal, probably not enough time for that

| DATE  | DESCRIPTION                                                              | HOURS |
| ----- | ------------------------------------------------------------------------ | ----- |
| 11/03 | Set up AWS, Google workspace, Github. Acquired domain names              | 2.5   |
| 11/10 | Made initial design                                                      | 1.5   |
| 11/17 | Worked on org infra, created AWS Org                                     | 3     |
| 11/18 | Worked on org infra, fixed domains                                       | 3     |
| 11/19 | Worked on dev infra                                                      | 4     |
| 11/19 | Worked on dev infra                                                      | 4     |
| 11/25 | Worked on front end                                                      | 5     |
| 11/26 | Worked on front end                                                      | 4     |
| 11/28 | Created pinterest dev account, submitted pinterest documentation         | 3     |
| 11/29 | Started back end                                                         | 4     |
| 11/30 | Created back end daos                                                    | 3     |
| 12/1  | Added postgres to back end                                               | 2     |
| 12/2  | Added plantuml diagrams (see infra-now.plantuml and infra-idea.plantuml) | 3     |

Time taken: 42 hrs

## Final Report:

### Summary

A website to rent event decorations and equipment. Provides a "match your vibe" feature, to submit a pinterest board and get product recommendations

### Diagrams:

See above diagrams, and infra-now.plantuml/infra-idea.plantuml.

### What did I learn?

Oh man, this project was way harder than I thought it would be. I learned AWS Organizations, AWS Bedrock, some Rust, postgres, plantuml, and maybe even more importantly, I learned that things don't go to plan. Like, ever. But I feel that it was still a really cool project, and it enables me to understand a project's scope a lot better

### AI Integration

While I wasn't in the end able to get a pinterest dev account (waiting on approval...), I would have been able to use image embeddings to create product recommendations, which I thought was a cool use of the technology

### Why was I interested in this project?

First off, this is something I could actually use to make some money. Not a lot of money, but something. Also, doing something with AWS Bedrock and Rust was a big kinda programming "bucket list" item, and so I was able to mark that off. And I can show it off as a project I actually created from scratch for job applications

### Key learnings

1. AWS Bedrock
2. Rust
3. Postgres

### Failover strategy, scaling characterisics, performance characteristics, authentication, concurrency, etc

First off, my final implementation does not have all the scaling, failover, performance, etc of my initial (ideal) implementation, but it was a lot cheaper. And for this project, I don't need all those features for now, but I can actually pretty easily change those if I were to suddenly need it.

Let me talk about each component:

- Front end:
  - Good parts:
    - Distributed through cloudfront and s3
    - Fast and efficient, scalable, performant
    - Cheap
  - Bad parts:
    - Front end is a static app, so no server-side rendering for helping things like SEO, bad computers, etc.
- Back end:
  - Good parts:
    - Single ec2 instance is pretty cheap
    - So long as I don't crash the instance, it has pretty good reliability
    - No need for load balancer (only one instance)
  - Bad parts:
    - Not scalable
    - ECS would be more scalable, but is much more expensive
    - No load balancer means that single instance could get overloaded with traffic
    - No auto-restart on the instance
- Database
  - Good parts:
    - Postgres is a great database
    - SQL has good performance
    - Pretty cheap
  - Bad parts:
    - Current configuration doesn't auto scale (too expensive)
    - When scaling, it is easiest to vertically scale, which eventually would run out
    - Something like AWS Aurora with DSQL (distributed SQL) would be better, but that would be overkill and way to expensive
- "Match your vibe"
  - Good parts:
    - Quick how it works: pinterest url sent to sqs queue -> picked up by lambda, which pulls all images and puts them on an sqs queue -> images picked up by other lambda, image embeddings generated using AWS Bedrock, sent to redis -> ec2 instance picks up image embeddings from redis, puts in database -> when all image embeddings made, then image embeddings are compared with product image embeddings, close products sent to user
    - Lambdas and sqs queues are fast and scalable
    - Lambdas and sqs queues are pretty cheap
    - Model used in AWS Bedrock is pretty cheap ($0.06 per 1000 image embeddings)
  - Bad parts:
    - Difficult to implement/debug
    - Maybe a bit overkill
    - Would be technically cheaper to do all processing on EC2 instance, but that would eat up all the processing power too, so I went for this solution instead
- Authentication
  - Good parts:
    - Done through postgres, my own solution
    - Easy to add more
  - Bad parts:
    - Going with a different product may have been easier?
