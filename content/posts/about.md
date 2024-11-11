---
title: "👋 About this site"
date: 2024-11-11
draft: false
weight: 1
---

Have you ever struggled to find the right release items for Microsoft Power Platform and Microsoft Dynamics 365 products when using the [official Release Planner website](https://releaseplans.microsoft.com/)?

Did you ever get frustrated when Microsoft decided to categorize the release items in a non-intuitive way?

Ever wished there was a quick way to see the most recently updated items on the release plans?

_Yes! Yes! And, yes!_🙌

![Release Planner website: no results found](/images/Release%20Planner%20no%20results%20found.png)

Those answers were what drove me to explore alternative ways to access and present the release item data.


## Discovering the Release Planner API

While Microsoft doesn't show it in their website UI, there is actually a documented data feed to access the Release Planner content. You just have to dsicover it from the "What's New" PDF deck of the website.🧐

![Release Plans API](/images/Release%20Plans%20API.png)

The feed we get from https://releaseplans.microsoft.com/en-US/allreleaseplans/ contains almost all of the information needed for repliciating the Release Planner site in another format. To make it as easy as possible to work with the data, let's push the feed into Power BI:

![Release Plans data in Power BI table](/images/Release%20Plans%20data.png)


## Making it pretty

Originally I created just a quick & dirty version of the report for my own use, with basic table and slicer visualizations that allowed me to filter and browse the release item list. I [posted about it on LinkedIn](https://www.linkedin.com/feed/update/urn:li:activity:7257024372027101185/) during the 2024 Wave 2 launch event. Then a community member reached out:

![LinkedIn post about Release Planner Power BI report](/images/Release%20Planner%20pbix.png)

Thanks to the awesome work by [Wouter Kessener](https://www.linkedin.com/in/wouterkessener/), the report now had a user experience on a whole new level!👏

## Making it available

I had earlier seen how MVP Loryan Strant had published his [Microsoft 365 Roadmap visualization](https://www.loryanstrant.com/2024/10/14/the-microsoft-365-roadmap-now-with-more-sorting-filtering-and-statistics/) as a shared Power BI report, conveniently available via the URL https://www.m365roadmap.com/ . This seemed like such a great idea that I had to copy it.

So, I registered the domain releaseplans.net domain. Then, after some trial and error, I managed to get my very first Hugo based website up and running. And here you are now!💪

You're free to bookmark this site and access it for an online copy of the Release Plans report, refreshed on a daily basis. Alternatively, if you want to download your own .pbix copy of it, it's available on GitHub.


