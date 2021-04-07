---
layout: article
title: Load Distributing and Factors in NeoLoad
category: Modeling
permalink: /tutorials/load-distributing-and-factors
support: Neotys
contributors:
- text: Jeff Lupisella
#toc: |
---

Load Balancing is an integral part of performance testing. Running tests with virtual users is the way we can predict run time behavior of applications. The ability to not only access an application with virtual users but also to designate the access points from where they make requests, is crucial to performance testing precision. Here is how Neoload enables Load Balancing.


Neoload provides “Load Factors” as part of the configuration criteria for Load Generators. By default, the total virtual load is divided evenly across each load generator. A Load Factor is an integer value used by Neoload to calculate load distribution. A load generator configured with the highest load factor will run the most available virtual users. Virtual users are proportioned across load generators in relation to each one’s load factor value.





The formula Neoload uses is simple; “LoadFactor / (SumOfLoadFactors)”.  Example; 4 load generators used for a performance test with 1000 VUs, by default would have a distribution of 250 VUs each. Applying load factors of 1,2,3 and 4 to each LG would provide a distribution of 10%,20%,30% and 40% respectively. The virtual user count for each LG would then be 100,200,300 and 400 as opposed to 250 each.


The example above is for a constant load of 1000 VUs for the entire duration of the test. Neoload provides a “Load Variation Policy” which defines if/how/when VUs are increased/decreased during test execution. The LVPs in Neoload are 1-“Constant”         2- “Ramp-Up”, 3-“Peak” and 4-”Customized”. Virtual user distribution across load generators are calculated with load factors but the distribution could change during test execution depending on the load variation policy. Each LVP sets the following behavior;


**Constant:** Static number of VUs throughout the test duration.


**Ramp-Up:** Number of VUs is increased periodically during the run


**Peak:** Static number of VUs alternated with a second static value over the test duration


**Custom:** A precise user load variation curve plotted on a graph specifying VUs over time.







So let’s take a look at an actual run to see how the number of VUs per load generator is calculated when we use the default “Custom” load variation policy.


Here is the first runtime configuration:


We have one population with only one user path


![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image18.png "image_tooltip")



Four Load Generators each with Load Factors of 1,2,3 and 4. A Duration Policy of 15 minutes and a Constant Load Variation policy with 200 virtual users.


![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image3.png "image_tooltip")



According to the formula, “LoadFactor / (SumOfLoadFactors)” we get the following: Localhost -  1/10 = 10% = 20 VUs


West Des Moines - 2/10 = 20% = 40 VUs


San Antonio - 3/10 = 30% = 60 VUs


Ashburn - 4/10 = 40% = 80 VUs





From the Neoload Web dashboard, we can see how Neoload disbursed the VUs across the four load generators adhering to the formula.  As expected, Neoload distributed according to the calculation.

| ![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image16.png "image_tooltip") | ![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image27.png "image_tooltip") |
| ![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image19.png "image_tooltip") | ![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image13.png "image_tooltip")



Now let’s take a look at the same run with a change in LVP. This time we’ll use “Ramp-Up” and run for 18 minutes so we can reach exactly 200 VUs. (Note: the “Maximum is” is an estimate made by Neoload before the run. The actual time it takes to reach the max number of users greatly depends on the server itself. For this run we need 18 minutes).

![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image36.png "image_tooltip")

The localhost Load Generator with a load factor of 1 was assigned 4 VUs to start and increased by 2 VUs every 2 minutes up to 20 VUs

![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image34.png "image_tooltip")

The Des Moines LG with a load factor of 2 started with 8 VUs and Neoload added 4 VUs every two minutes up to 40 VUs.

![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image1.png "image_tooltip")

San Antonio with a load factor of 3 is assigned 12 VUs to start and then incremented by 6 every two minutes for a total of 60 VUs.

![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image12.png "image_tooltip")

Finally, Ashburn with a load factor of 4 is assigned 16 VUs at the start incrementing by 8 every 2 minutes for a total of 80 VUs.

![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image21.png "image_tooltip")

For the Peak LVP we start with 25 VUs and increase to 200 VUs every 2 minutes.

![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image6.png "image_tooltip")


When the test begins, each load generator gets assigned VUs according to their load factors,  all totalling to 25.



| ![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image32.png "image_tooltip") | ![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image37.png "image_tooltip") |
| ![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image40.png "image_tooltip") | ![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image35.png "image_tooltip")


As the test progresses, the Peak of 200 VUs is divided across all 4 load generators as:

| ![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image5.png "image_tooltip") | ![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image26.png "image_tooltip") |
| ![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image15.png "image_tooltip") | ![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image24.png "image_tooltip") |


The test progresses for another 2 minutes and we see the drop to minimum load. The total VUs are 25 as configured but this time we see a slightly different distribution:

| ![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image33.png "image_tooltip") | ![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image39.png "image_tooltip") |
| ![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image20.png "image_tooltip") | ![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image10.png "image_tooltip") |


Let’s take a closer look at the calculation for the minimum load. The percentages allocated to each load generator are the same as in the example above but the total number of VUs for the low point is an odd number; 25. Here are the calculations for 25 users across the 4 LGs:

        Localhost -  1/10 = 10% = 2.5 VUs
        West Des Moines - 2/10 = 20% = 5 VUs
        San Antonio - 3/10 = 30% = 7.5 VUs
        Ashburn - 4/10 = 40% = 10 VUs

In this case, what Neoload will do is round up or down to get to a whole number value. At the start of the test, the distribution for the minimum VUs (25) for each LG was 3,5,7 and 10 respectively. After the first increase to 200 VUs, we decrease back to the 25 VU minimum. This time we see 2,4,6 and 13 for each LG respectively. Since we can’t have a fraction of a virtual user, Neoload rounded to get to a whole number. It will then increase or decrease the whole number values in order to create the distribution.  



The last option for a Load Variation Policy is “customized” which is used for precise numbers of virtual users plotted at points over time. Here is the custom LVP used for the next example.


![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image4.png "image_tooltip")


Selecting one point on the plot line we see 105 VUs at 7m33s :


![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image38.png "image_tooltip")


Let’s take a look at the Neoload Web dashboard at 7m30s (the graphs are increments of 5 seconds in Neoload Web).

The localhost Load Generator with a load factor of 1 went from 0 to 11VUs at 7m30s


![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image22.png "image_tooltip")


The West Des Moines LG with a load factor of 2 went from 0 to 21 at 7m30s

![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image11.png "image_tooltip")


San Antonio with a load factor of 3 went from 0 to 30 at 7m30s


![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image25.png "image_tooltip")


Ashburn with a load factor of 4 went from 0 to 40 at 7m30s


![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image28.png "image_tooltip")

So far, we’ve shown a scenario configured with one population containing one user path. 4 executions of that scenario each ran under 4 different Load Variation Policies and we used 4 geographically dispersed load generators each assigned a different load factor.  

Neoload provides virtual user disbursement at yet another level of the performance test configuration as well. “Populations'' which are groups of user paths (tests) can be configured to have percentages of VUs assigned to each virtual user “type” (user path).  Generally speaking, a user path is associated with a certain “type” of user.  For example, we have 3 user paths in this population that were recorded against the same JPetsore application.



![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image9.png "image_tooltip")


In the first user path - “JPetstore”, the user logs in and orders one item and logs out. In “JPetstoreBrowse”, the user does not log in, looks at multiple product categories and items but does not order anything. For the third user path in the population, “JPetstore_multi_items”, the user logs in and orders more than one item and logs out. The “percentage” column designates the percentage of total virtual users that will be allocated to execute each user path.

So let's take a look at two test runs from graphs in Neoload Web in terms of each user path in the population. This first run is with 200 VUs and a “Constant” LVP.

The localhost LG was allocated a total of 20 VUs


![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image8.png "image_tooltip")




Here is the distribution of VUs for each user path in the population on the localhost LG.

| The “JPetstore” user path which is configured for 50% is allocated 10 VUs | The “JPetsoreBrowser” user path which is configured for 25% is allocated 5 VUs |
| ![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image23.png "image_tooltip") | ![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image2.png "image_tooltip") |


And for the “JPetstore_multi_items” user path also configured for 25%, we correctly see 5 VUs.

![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image7.png "image_tooltip")

Here is a run of the same scenario using the same LGs only this time using the “ramp-up” load variation policy.


![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image14.png "image_tooltip")


The Ashburn LG with a load factor of 4 starts at 16 and ramps-up to 80 VUs.


![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image29.png "image_tooltip")


Here is the distribution of VUs for each user path in the population running on the Ashburn LG.

| For the “JPetsore” user path which is configured at 50% (of 80) starts at 8 VUs and ramps up to 40. | “JPetstoreBrowse” which is configured for 25% (of 80) starts at 4 VUs and ramps-up to 20. |
| ![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image31.png "image_tooltip") | ![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image30.png "image_tooltip") |


For “JPetstore_multi_user” which is also configured for 25%, the VU count starts at 4 and ramps-up to 20.  

![alt_text](/_pages/tutorials/load-distributing-and-factors/images/image30.png "image_tooltip")


Follow ons…

1. Load balancing actually gets more complicated when the scenario uses more then on population.
2. Since Load Generator distribution is actually assigned **per population, **you can have populationA running on specific LG: LG1/LG2/LG3, and a different population that run on LG3, LG4, LG5.  here’s how that works…..
