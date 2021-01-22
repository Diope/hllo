# Hllo

So this is me working on another medium sized app just to keep my knowledge up to date and because I enjoy coding. Not sure how far I'll go with this, but for the time being it'll be the bare basics of a social media app. So registration,
posting, deleting of posts. I might add in image hosting via AWS or Firestore, not sure. I'm trying to limit feature creep which ultimately dooms most projects I start.

### Technology Stack (as of Jan, 20th, 2021):
* React
* Express
* MongoDB
* Node
* GraphQL

### Notes
I've decided on putting comments within an array on the post model as I didn't want to deal with the complexities of handling/maintaining data duplication, and requesting data. To be certain, comments SHOULD get their own model/Schema and not be a subdocument if only from a architecture/design standpoint. Because the question arises what if a post has 150 comments? Suddenly being a subdocument in the post isn't looking so good!

But for the purposes of this toy app, I'll go with subdocument array for comments.