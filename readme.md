<h1 align="center">🛠️ Github merge queues demo</h1>
<br>

## Intro

This repo is used to discover how [Github merge queues](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue) work by using a simple node.js project and Github Actions for CI.
The app pulls current weather data from OpenWeatherMap for a location.

---
### Running

- `npm start` will run the main file (app.js) and display results for Berlin
- `node app --location Paris` will run app.js for a custom location, e.g. Paris
- `npm test` will run the Mocha tests, output results and generate reports

---

# Merge Queue - the missing guide

There is a **single** queue per repo (at the moment). 

There's is just a handful of configuration options to control queue's behaviour:

![queue-settings.png](./images/queue-settings.png)

It wasn't obvious how Merge limits affect queue's behaviour - the *minimum* defines 
_when_ queue starts merging PRs: as soon as one condition is met - N PRs added or M minutes passed.

Once merge queue is enabled, PRs can be added with _"Merge when ready"_ button:

![add-to-queue-1.png](./images/add-to-queue-1.png)

Confirm:
![add-to-queue-2.png](./images/add-to-queue-2.png)

It gets enqueued:
![add-to-queue-3.png](./images/add-to-queue-3.png)

And eventually merged if status checks pass:
![add-to-queue-4.png](./images/add-to-queue-4.png)


As PRs get added to the queue, Github will create a temporary branch and start merging
PRs in the way they are added to the queue, running checks after each merge.

Here's the flow for two PRs that get successfully merged:

1. We start by opening two PRs
    ![two-prs-1](./images/two-prs-1.png)
2. Then add one by one to the queue. Their status icon changes to reflect that:
    ![two-prs-2](./images/two-prs-2.png)
    ![two-prs-3](./images/two-prs-3.png)
3. After "minimum PRs" limit is met (number of PRs or timeout), the queue starts merging them:
    ![two-prs-4](./images/two-prs-4.png)
4. If all goes well you'll end up with two merge commits on the main branch:
    ![two-prs-5](./images/two-prs-5.png)

The actions page shows order of actions:
![two-prs-6](./images/two-prs-6.png)

1. tmp branch `gh-readonlhy-queue/main/pr..` branch is created
2. PR #3 is merged into the tmp branch, status checks pass
3. PR #3 gets merged into `main` (as defined by Minimum PRs)
4. tmp branch `gh-readonlhy-queue/main..` branch is (most likely) again created
5. PR #4 is merged into the tmp branch, status checks pass
6. PR #4 gets merged into `main`

This behaviour is controller by _Minimum pull requests to merge_, if it had been 2, then both PRs would've been merged into tmp branch before mering each into `main`.

If status checks fail, **that PR will be left out* and the queue will proceed
merging the remaning PRs. Here's a demo with 3 PRs where status checks fail for 
the second one:

1. We start by opening 3 PRs
    ![status-fail-1](./images/status-fail-1.png)
2. enqueue them in order:
    ![status-fail-2](./images/status-fail-2.png)
3. then eventually get processed:
    ![status-fail-3](./images/status-fail-3.png)
    ![status-fail-4](./images/status-fail-4.png)
    ![status-fail-5](./images/status-fail-5.png)
4. PR #6 fails status checks since #5 modified the test file and it doesn't get merged:
    ![status-fail-6](./images/status-fail-6.png)
5. That's **not indicated in any way** on the PR page:
    ![status-fail-7](./images/status-fail-7.png)
6. and can be found in the CI/CD (Github Actions in this case):
    ![status-fail-8](./images/status-fail-8.png)
7. or with email notifications if enabled:
    ![status-fail-9](./images/status-fail-9.png)


From the actions page it follows (assuming no clock skew):

1. tmp branch `gh-readonlhy-queue/main..` branch is created
2. PR #5 is merged into the tmp branch, status checks pass
4. PR #6 is merged into the tmp branch, status checks fail
5. PR #5 gets merged into `main`
6. tmp branch `gh-readonlhy-queue/main..` branch is (most likely) again created
7. PR #7 is merged into the tmp branch, status checks pass
8. PR #7 gets merged into `main`


Let's update "Minimum pull requests to merge" to 2 and open two PRs:

1. Enqueue the first PR
    ![minimum-two-1](./images/minimum-two-1.png)
2. It gets merged into tmp and checked, but not merged into `main` (unless 5min go by)
    ![minimum-two-2](./images/minimum-two-2.png)
3. Enqueue the second PR
    ![minimum-two-3](./images/minimum-two-3.png)
4. The second gets merged into tmp branch and status checks pass
    ![minimum-two-4](./images/minimum-two-4.png)
5. Finally both get merged into main
    ![minimum-two-5](./images/minimum-two-5.png)


## Open questions
1. can 2+ branches have branch protection rules that include merge queue? How are then PRs merged if from both get added to the queue?

