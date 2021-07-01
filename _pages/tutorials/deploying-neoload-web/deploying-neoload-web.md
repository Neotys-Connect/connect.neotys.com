---
layout: article
title: Deploying NeoLoad Web
category: Deployment
permalink: /tutorials/deploying-neoload-web
support: Various Sources
toc: |
  - [What is NeoLoad Web?](#what-is-neoload-web)
  - [Why Kubernetes to Deploy?](#why-kubernetes-to-deploy)
  - [Deployment Compatability Chart](#deployment-compatability-chart)
  - [What's deployed to a Kube Cluster?](#whats-deployed-to-a-kube-cluster)
  - [Don't know Kubernetes?](#dont-know-kubernetes)
  - [What is not supported for deploymernt](#what-is-not-supported-for-deploymernt)
  - [Still need help?](#still-need-help)
---

# What is NeoLoad Web?

NeoLoad Web is a unified "hub" for test execution, resources, and results. Though there
 is a SaaS subscription-based option, some organizations under strict data or security policies
 not yet able to work with SaaS providers may consider operating their own [traditionally
 referred to as "on-premise"] deployment of NeoLoad Web along with other associated components.

# Why Kubernetes to Deploy?

Due to the prevalence of private and public cloud infrastructure options as well as
 taking lessons and cues from our work with customers over the past few years, providing
 a consolidated set of options for how to deploy NeoLoad Web using Kubernetes just makes
 the most sense. Otherwise, there are a million ways to deploy Java and containerized solutions
 and becomes constrictingly difficult for our product team to support all of them.

As such, still NeoLoad Web can be deployed in many environments, primarily because we use Kubernetes.

- [NeoLoad Web in AWS](/tutorials/deploying-neoload-web-in-aws)
- [NeoLoad Web Helm Charts for Kubernetes Clusters](https://github.com/Neotys-Labs/helm-neoload-web)
- NeoLoad Web in Azure (tutorial coming soon, see above Kubernetes instructions)
- NeoLoad Web in GCP (tutorial coming soon, see above Kubernetes instructions)
- NeoLoad Web in OpenShift, Rancher, etc. (see instructions above or contact your rep)

# Deployment Compatability Chart

|                    | Azure | AWS<br />[(tutorial)](/tutorials/deploying-neoload-web-in-aws) | GCP | On-prem / DIY |
| Kubernetes master  | AKS | EKS | GKE | OpenShift, Rancher |
| Mongo data storage | [Atlas for Azure](https://docs.atlas.mongodb.com/reference/microsoft-azure/) | [Atlas for AWS](https://aws.amazon.com/quickstart/architecture/mongodb-atlas/) | Atlas on GCP | Mongo Enterprise |
| DNS / hostnanes    | Azure DNS | Route 53 | Google Cloud DNS | Corporate / internal |
| SSL / certificates | Azure Key Vault | ACM (Certificate Manager) | [Google Certificates](https://cloud.google.com/load-balancing/docs/ssl-certificates/google-managed-certs) | Corporate / internal |

If you don't find a tutorial already written for your particular desired deployment model,
 it's likely that we haven't got around to it yet because others are more prevalent
 and therefore higher priority for us to address. We're always interested to hear
 from you though, and you can [drop us a note about it](#feedback).

if you'd like to [contribute your own tutorial](/contribute/tutorial) that would be rapidly welcomed as well!

# What's deployed to a Kube Cluster?

We deploy what you would expect from a typical enterprise app, namely deployments, an ingress, some services, and supporting elements.

NeoLoad Web uses VertX and Hazelcast so that the back-end and front-end components can "discover" each other.

Therefore, a dry-run of the helm chart will show that the NeoLoad Web Helm chart creates:

- A Cluster Role and Binding (for Hazelcast pod and service discovery)
- A unique namespace for the following NeoLoad Web artifacts
- Secrets for Mongo connection and internal NLW encryption
- A Back-end Deployment (both REST APIs and files-service endpoints)
- A Front-end Deployment (the web browser app)
- Services for front-end, back-end, and files-service components
- An ingress with annotations to connect with your external Load Balancer of choice


![NeoLoad Kubernetes General Deployment Outcomes](/_pages/tutorials/deploying-neoload-web/images/nlw-kube-generic-architecture.png)


# Don't know Kubernetes?

If you don't know Kubernetes yourself or don't think it's available in your organization,
 simply [contact your NeoLoad Representative](/contact/) to schedule a quick technical
 discovery call and start getting the right resources together. We also provide
 professional services, typically as part of onboarding, to assist with NeoLoad Web deployment.

# What is not supported for deploymernt

There are a number of ways to run containers. In our experiences, using wrong-fit
 technology solution to manage containers leads to poor service availability, management,
 operations, and disaster recovery. As such, we have deprecated support for deployments
 to standalone Docker engines and single-node Mongo back-ends as well as any Windows
 installations that are not based on Kubernetes. This includes:

- NeoLoad Web directly on Windows
- NeoLoad Web on Linux via Docker

# Still need help?

It's okay if this seems complicated...everything's new to someone at some point.
If you don't have access to personnel that can help you with this inside your
 organization, feel free to [contact your Neotys CSM representative](/contact/)
 and schedule a session to discuss what you're looking to do.
