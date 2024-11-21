---
title: "No single source of truth"
date: 2024-11-21
draft: false
weight: 2
---

Before there was the Release Planner website, Microsoft published all their Power Platform and Dynamics 365 release plans on MS Learn. They [still do that](https://learn.microsoft.com/en-us/dynamics365/release-plans/). What this means in practice is that there is no single authoritative source for release plan item data.

One very nice feature of the MS Learn based release plan documentation is the change history pages for each plan. As an example, for 2024 release wave 2 we can see [changes](https://learn.microsoft.com/en-us/power-platform/release-plan/2024wave2/change-history) like this:

![MS Learn changes for Power Automate](/images/Progressive%20logging%20-%20MS%20Learn%20change%20history.png)

This Power Automate release item for [View progressive logging for desktop flows](https://learn.microsoft.com/en-us/power-platform/release-plan/2024wave2/power-automate/view-progressive-logging-desktop-flows) has been updated with a new data for public preview. Now, why isn't it showing up on the Power BI report of releasesplans.net then?

![MS Learn changes for Power Automate](/images/Progressive%20logging%20-%20Release%20Plans%20Visualized.png)

The reason is: Microsoft has only updated the documentation on MS Learn. If we search for the corresponding item on the [Release Planner website](https://releaseplans.microsoft.com/) that runs on Power Pages, we get the same old information as in our Power BI report:

![MS Learn changes for Power Automate](/images/Progressive%20logging%20-%20Release%20Planner.png)

So, obviously the process that results in the MS Learn documentation updates being pushed to the GitHub repo of the release plans is separate from the process that updates Microsoft's own Dataverse database beneath the Release Planner website.

Back in 2019, Microsoft blogged about how they were [managing the product release plans for Power Platform, using Power Platform](https://www.microsoft.com/en-us/power-platform/blog/power-apps/how-power-platform-helps-us-manage-and-publish-product-release-plans/). There was even a reference implementation of it published to a [public GitHub repo](https://github.com/microsoft/powerapps-tools/tree/master/Apps/ReleasePlanner).

It hasn't been updated beyond the V1 released 4 years ago, though. Which means whatever has since then been built to support the Power Pages based Release Planner website is not included in the public story as of today. It would be really interesting to hear about this "V2" story at some point as well, so let's hope there will eventually be a follow-up blog post.

And a more synchonized process for publishing the release plan item updates, too.🤞
