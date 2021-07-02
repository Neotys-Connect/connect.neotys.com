---
layout: article
title: Deploying NeoLoad Web in AWS
category: Deployment
permalink: /tutorials/deploying-neoload-web-in-aws
support: Community
videos:
  - https://www.youtube.com/embed/Ui9LFbKX5zU
contributors:
  - text: QA Consultants
url: https://qaconsultants.com/
  - text: Scott Moore
url: http://scottmoore.consulting
  - text: Paul Bruce
url: https://github.com/paulsbruce
repo:
  - https://github.com/neotys-connect/neoload_kube/tree/master/aws

toc: |
  - [The Short Version](#the-short-version)
  - [The Complete Walkthrough](#the-complete-walkthrough)
  - [Who is this for?](#who-is-this-for)
  - [Before you begin](#before-you-begin)
  - [Prerequisites](#prerequisites)
  - [Permissions](#permissions)
  - [What is Amazon EKS?](#what-is-amazon-eks)
  - [CLI and Prerequisite Installation](#cli-and-prerequisite-installation)
    * [AWS CLI v2](#aws-cli-v2)
    * [install helm](#helm)
    * [install eksctl and kubectl](#eksctl-and-kubectl)
  - [Neoload Web](#neoload-web)
  - [Deploying Neoload Web on Kubernetes](#deploying-neoload-web-on-kubernetes)
    * [Create The EKS Cluster](#create-the-eks-cluster)
    * [Create A MongoDB Cluster](#create-a-mongodb-cluster)
    * [Install The Ingress Controller](#install-the-ingress-controller)
    * [Install NeoLoad Web Using Helm](#install-neoload-web-using-helm)
    * [Deploy Helm Chart](#deploy-helm-chart)
      + [Services host configuration](#services-host-configuration)
    * [Routing DNS Requests To Neoload Web](#routing-dns-requests-to-neoload-web)
    * [Verify Neoload Web](#verify-neoload-web)
  - [Post-deployment Considerations](#post-deployment-considerations)
  - [Upgrading Neoload Web](#upgrading-neoload-web)
---

# The Short Version

See <a href="https://github.com/neotys-connect/neoload_kube/tree/master/aws" target="_blank">this neoload_kube repo</a> for the TL;DR version of EKS setup and configuration.

# The Complete Walkthrough

The purpose of this document is to describe the steps needed to install Neoload Web as a stand-alone private cloud implementation. 

# Who is this for?

This document is for Neotys customers who may need to use an on-premise installation, in addition to the publicly available SaaS version provided by Neotys at [https://neoload.saas.neotys.com/](https://neoload.saas.neotys.com/)

These instructions are specific to implementing Neoload Web as a managed Kubernetes cluster using Amazon AWS cloud, and specifically the Elastic Kubernetes Service (EKS) for the deployment.

# Before you begin

Neotys is expecting that anyone attempting to set this up already has experience with AWS cloud services, Kubernetes, Docker, YAML, MongoDB, and the various CLI’s mentioned in this documentation. Neotys has provided online documentation through their web site and github repositories to help with Neoload specific tasks, but building out the infrastructure and services around the solution are the responsibility of the implementation person. This document provide more detailed guidance to make the process as easy as possible, but some experience by the user will be necessary to address unknown issues that may arise.

# Prerequisites

You will need the following:

1. Amazon Account with permissions to do everything in this article
2. The ability to route DNS records
3. An understanding of network routing on AWS, including setting up Application Load Balancers
4. The ability to setup a mongodb database, either as a cloud SaaS version at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas), or a stand alone version on a virtual/physical machine. Note that if you use the Mongodb Atlas service, you will need to use the paid tier to select the currently supported version of 4.0 
5. There are several programs and command line interface applications (CLI’s) that should be installed on your local machine. You will need install and configure these, and get familiar with their capabilities.

For these examples, the MacOS operating is being used. If you are using another OS such as Windows or Linux, you will need to research the alternative commands and information online.

# Permissions

1. Local permissions to install the command line interfaces (CLI) for AWS, eksctl, kubectl, etc. For example, using Brew on MacOS
2. Permission to execute all required CLI commands. For example, using the AWS CLI to list and create clusters
3. Permission to create an MongoDB cluster on Atlas. This includes setting the initial user credentials for database access by Neoload Web
4. Permission to use other services on AWS. This includes EC2, Route 53, configuring VPC's and security groups, opening ports, etc...

# What is Amazon EKS?

Amazon Elastic Kubernetes Service (EKS) is a managed Kubernetes service that makes it easy for you to run Kubernetes on AWS without needing to install, operate, and maintain your own Kubernetes control plane.

[https://aws.amazon.com/eks/features/](https://aws.amazon.com/eks/features/)



![alt_text](/_pages/tutorials/deploying-neoload-web-in-aws/images/image9.png "image_tooltip")


Creating and setting up an AWS account is out of scope of this document. The following links provide the basic information needed.

**Set up an AWS account:** [https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)

**Create SSH keypair: **[https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html)

We will be deploying Neoload Web on the Elastic Kubernetes Service. Below is a list of common commands that you should be familiar with.

**Elastic Kubernetes Service (EKS) Cheat Sheet:**

[https://theaws.blog/elastic-kubernetes-service-eks-cheat-sheet/](https://theaws.blog/elastic-kubernetes-service-eks-cheat-sheet/)


# CLI and Prerequisite Installation

The following installs will allow most of the work to be done as commands in the terminal. We are installing Python, the AWS CLI version 2, helm, eksctl, and kubectl.
## AWS CLI v2

Install Python 3.7+, required for AWS CLI v2

[https://docs.python-guide.org/starting/install3/osx/](https://docs.python-guide.org/starting/install3/osx/)

>> python --version

```
Python 3.9.5
```

Install and configure the AWS CLI v2

[https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)

>> brew install awscli

Verify you are using the right version:

>> aws --version

```
aws-cli/2.1.Python/3.7.4 Darwin/20.5.0 exe/x86_64
```

Log in to your AWS account via the configure argument:

>> aws configure

```
AWS Access Key ID [****************redacted]: <enter key Id>

AWS Secret Access Key [****************redacted]: <enter access key>

Default region name [us-east-2]: <or choose another region>

Default output format [json]: <or choose another format>
```

Make sure that you can run

aws eks list-clusters

```
{

"clusters": [

"nlw"

]

}
```

You may not have any listed yet. At this point, we are just making sure there are no security/permission related problems.

AWS CLI cheat sheet: [https://devhints.io/awscli](https://devhints.io/awscli)


## install helm

[https://helm.sh/docs/intro/install/](https://helm.sh/docs/intro/install/)

For MacOS:

brew install helm

>> helm version

```
version.BuildInfo{Version:"v3.6.1", GitCommit:"redacted", GitTreeState:"dirty", GoVersion:"go1.16.5"}
```

## install eksctl and kubectl

Install and configure AWS 'eksctl'

[https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html)

[https://eksctl.io/](https://eksctl.io/)

>> eksctl version

```
0.54.0
```

>> kubectl version

```

Client Version: version.Info{Major:"1", Minor:"21", GitVersion:"v1.21.2", GitCommit:"redacted", GitTreeState:"clean", BuildDate:"2021-06-16T12:52:14Z", GoVersion:"go1.16.5", Compiler:"gc", Platform:"darwin/amd64"}

error: You must be logged in to the server (the server has asked for the client to provide credentials)
```

Note: Don't worry about the error. We are only concerned about the Client Version at this point.

>> kubectl config get-contexts

```
CURRENT NAME CLUSTER AUTHINFO NAMESPACE

* smoore@nlw.us-east-2.eksctl.io nlw.us-east-2.eksctl.io smoore@nlw.us-east-2.eksctl.io 
```

>> kubectl config current-context

```
smoore@nlw.us-east-2.eksctl.io
```

>> kubectl cluster-info

```
Kubernetes master is running at https://redacted.yl4.us-east-2.eks.amazonaws.com

CoreDNS is running at https://redacted.yl4.us-east-2.eks.amazonaws.com/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

>> eksctl get cluster

```
NAME	REGION		EKSCTL CREATED

nlw	us-east-2	True
```

(You may not have any clusters yet.)

This guide makes a best effort to provide the main commands to accomplish the task of setting up the Neoload Web cluster. However, things don’t always go as expected. For this reason, it is advisable to get some level of training using eksctl and know what the commands are actually doing. Training in Kubernetes in general is also recommended. The following link provides basic information on some of the most used eksctl commands.

**kubectl commands cheat sheet:**

[https://drive.google.com/file/d/1Fd1Yq5uyWDxnx-9U2xMe2WsjP2x05xbu/view?usp=sharing](https://drive.google.com/file/d/1Fd1Yq5uyWDxnx-9U2xMe2WsjP2x05xbu/view?usp=sharing)


# Neoload Web

NeoLoad Web is the centralized Performance Testing Platform designed for Continuous Testing. You can do the following:

* Launch performance tests
* Select your load generation infrastructure
* Analyse test results in real time or for terminated tests
* Customize dashboards, based on custom graphs
* Share performance test results with Dev, QA, Ops
* Connect performance testing data: import and correlate third party data / export NeoLoad test data

![alt_text](/_pages/tutorials/deploying-neoload-web-in-aws/images/image4.png "image_tooltip")


**About Neoload Web**

[https://www.neotys.com/neoload/features/neoload-web](https://www.neotys.com/neoload/features/neoload-web)

The main thing we want to do is have our own stand-alone installation instead of being restricted to X hours per month for the Neotys SaaS version. We want other team members to be able to watch tests run and share test results. We also want to be able to upload ZIP’ed projects and YAML-based tests (like API direct calls) into Neoload Web for test execution.

**Neoload Official Documentation**

[https://www.neotys.com/documents/doc/nlweb/latest/en/html/#2983.htm](https://www.neotys.com/documents/doc/nlweb/latest/en/html/#2983.htm)

**Docker Deployment of Neoload Web with external MongoDB**

[https://www.neotys.com/documents/doc/nlweb/latest/en/html/#26078.htm](https://www.neotys.com/documents/doc/nlweb/latest/en/html/#26078.htm) - this document describes creating a dockerized installation with a separate Mongodb. We will be doing this with a Helm chart, but the concept and configuration is similar.


# Deploying Neoload Web on Kubernetes

Neoload AWS Kubernetes deployment documentation:

[https://github.com/paulsbruce/neoload_kube/blob/master/aws/nlw_deploy_eks.md](https://github.com/paulsbruce/neoload_kube/blob/master/aws/nlw_deploy_eks.md)

This is what we are trying to build:

![alt_text](/_pages/tutorials/deploying-neoload-web-in-aws/images/image14.png "image_tooltip")


This diagram shows that we will be accessing a custom domain for Neoload Web, and these requests will be routed to the Neoload Web Cluster (NLW Cluster above). This will access the front end (FE) web server which is the web UI for Neoload Web. The back end (BE) is the programming logic that communicates to the back end Mongo database - which we are creating as a Mongo Atlas database in the cloud from Mongo (this is an additional service set up outside of AWS, but the actual database runs on AWS infrastructure). Both the FE and BE are running as docker containers in the EKS cluster.

The Load Cluster listed in the diagram is a separate EKS cluster that will hold all Controllers and Load Generators. Setting up this cluster is outside of the scope of this document, but the purpose of the cluster is to be a place for all of the Neoload lab infrastructure to be accessible on demand as needed (when tests are executed). This cluster could be replaced with Dockerized containers running inside of a virtual machine, a generator (non-docker) installed on virtual machines, or generator (non-docker) installed directly on physical machines. Any of these can connect to the Neoload Web Cluster. If you are interested in setting up a second cluster for dynamic infrastructure on AWS using the Fargate service, see this URL:

[https://github.com/paulsbruce/neoload_kube/tree/master/aws](https://github.com/paulsbruce/neoload_kube/tree/master/aws)

Note that the dynamic infrastructure features require an Enterprise license of Neoload.

## Create The EKS Cluster

We could set the cluster using the AWS web site. However, this UI is always changing over time, and the instructions have to be maintained. Using a CLI allows for many tasks to be completed for setup and configuration with a few commands. We will use a combination of eksctl and kubectl to get most of the heavy lifting done.

The cluster contains a node group. Node groups are the mechanism for creating pools of resources that can enforce scheduling requirements. They provide a a way to shift workloads around during cluster management and updates. A Node is a worker machine that may be either a virtual or a physical machine. A Node can have multiple pods, and in traditional Kubernetes, the master automatically handles scheduling the pods across the nodes in the cluster. Amazon EKS managed node groups automate the provisioning and lifecycle management of nodes (which are Amazon ECvitual machine instances) for Amazon EKS Kubernetes clusters. Kubernetes documentation defines a Namespaces as “a way to divide cluster resources between multiple users” – used for multi-tenancy. Amazon EKS uses Kubernetes namespaces to divide cluster resources between multiple users and applications. These namespaces are the foundation for multi-tenant environments. A Kubernetes namespace can have either Amazon ECor AWS Fargate as the compute provider. Our implementation of Neoload Web will use EC2.

We will have to create a single node group with at least one node, using the eksctl CLI. We want to size the node so that it matches the Neoload documentation for hardware specifications. I suggest md5.xlarge. We will create this on us-east-2, but you may want to create this on the same region as the application under test.

For the eksctl command line arguments, we will reference a YAML file to define the arguments and make it easier to execute. We will use a custom YAML file to create the Neoload Web Cluster. Here is an example:


```
# An example of ClusterConfig with a normal nodegroup
---
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig

metadata:
 name: nlw
 region: us-east-2

vpc:
 cidr: 172.16.0.0/16

nodeGroups:
- name: ng-1
 instanceType: m5.xlarge
 desiredCapacity: 1
 volumeSize: 20
 privateNetworking: true
```


This example specifically uses a 172.16/1CIDR that is compatible with Mongo Atlas. [https://docs.atlas.mongodb.com/security-vpc-peering/](https://docs.atlas.mongodb.com/security-vpc-peering/) - see the section labeled “VPC CIDR”.

Note: CIDR (Classless Inter-Domain Routing) is a method for allocating IP addresses and for IP routing, also called "supernetting" because it replaces earlier methods that used "classes" of networks (A, B, C).

The AWS VPC CIDR block or subset cannot overlap with your Atlas CIDR Block or any other Network Peering connection VPC CIDR.

The CIDR block must be in one of the following private networks:

* **10.0.0.0 - 10.255.255.255** (10/8 prefix)
* **172.16.0.0 - 172.31.255.255** (172.16/1prefix)
* **192.168.0.0 - 192.168.255.255** (192.168/16 prefix)

You can choose to add the VPC CIDR block address (or a subset) to the IP access list. For Network Peering connections, you can also add the Security Group associated with the AWS VPC instead of the CIDR block.

Here is an example of running the eksctl create cluster command referencing the custom YAML file and what comes back from AWS:

>> eksctl create cluster -f /Users/smcllc/ekscluster-nlw.yaml

```
[ℹ]eksctl version 0.32.0
[ℹ]using region us-east-2
[ℹ]setting availability zones to [us-east-2a us-east-2b us-east-2c]
[ℹ]subnets for us-east-2a - public:172.redacted/19 private:172.redacted/19
[ℹ]subnets for us-east-2b - public:172.redacted/19 private:172.redacted/19
[ℹ]subnets for us-east-2c - public:172.redacted/19 private:172.redacted/19
[ℹ]nodegroup "ng-1" will use "ami-redacted" [AmazonLinux2/1.18]
[ℹ]using Kubernetes version 1.19
[ℹ]creating EKS cluster "nlw" in "us-east-2" region with un-managed nodes
[ℹ]1 nodegroup (ng-1) was included (based on the include/exclude rules)
[ℹ]will create a CloudFormation stack for cluster itself and 1 nodegroup stack(s)
[ℹ]will create a CloudFormation stack for cluster itself and 0 managed nodegroup stack(s)
[ℹ]if you encounter any issues, check CloudFormation console or try 'eksctl utils describe-stacks --region=us-east---cluster=nlw'
[ℹ]CloudWatch logging will not be enabled for cluster "nlw" in "us-east-2"
[ℹ]you can enable it with 'eksctl utils update-cluster-logging --enable-types={SPECIFY-YOUR-LOG-TYPES-HERE (e.g. all)} --region=us-east---cluster=nlw'
[ℹ]Kubernetes API endpoint access will use default of {publicAccess=true, privateAccess=false} for cluster "nlw" in "us-east-2"
[ℹ]sequential tasks: { create cluster control plane "nlw", sequential sub-tasks: { no tasks, create nodegroup "ng-1" } }
[ℹ]building cluster stack "eksctl-nlw-cluster"
[ℹ]deploying stack "eksctl-nlw-cluster"
[ℹ]building nodegroup stack "eksctl-nlw-nodegroup-ng-1"
[ℹ]--nodes-min=1 was set automatically for nodegroup ng-1
[ℹ]--nodes-max=1 was set automatically for nodegroup ng-1
[ℹ]deploying stack "eksctl-nlw-nodegroup-ng-1"
[ℹ]waiting for the control plane availability...
[✔]saved kubeconfig as "/Users/smcllc/.kube/config"
[ℹ]no tasks
[✔]all EKS cluster resources for "nlw" have been created
[ℹ]adding identity "arn:aws:iam::redacted:role/eksctl-nlw-nodegroup-ng-1-NodeInstanceRole-redacted" to auth ConfigMap
[ℹ]nodegroup "ng-1" has 0 node(s)
[ℹ]waiting for at least 1 node(s) to become ready in "ng-1"
[ℹ]nodegroup "ng-1" has 1 node(s)
[ℹ]node "ip-172-redacted.us-east-2.compute.internal" is ready
[ℹ]kubectl command should work with "/Users/smcllc/.kube/config", try 'kubectl get nodes'
[✔]EKS cluster "nlw" in "us-east-2" region is ready

LOCAL>>
```

If the local account zone is limited on resources (such as VPC's), you may receive an error the first time you try to create the cluster. For example

```

[ℹ]waiting for CloudFormation stack "eksctl-nlw-cluster"
[✖]unexpected status "ROLLBACK_IN_PROGRESS" while waiting for CloudFormation stack "eksctl-nlw-cluster"
[ℹ]fetching stack events in attempt to troubleshoot the root cause of the failure
[✖]AWS::IAM::Role/ServiceRole: CREATE_FAILED – "Resource creation cancelled"
[✖]AWS::EC2::EIP/NATIP: CREATE_FAILED – "The maximum number of addresses has been reached. (Service: AmazonEC2; Status Code: 400; Error Code: AddressLimitExceeded; Request ID: redacted; Proxy: null)"
[✖]AWS::EC2::VPC/VPC: CREATE_FAILED – "The maximum number of VPCs has been reached. (Service: AmazonEC2; Status Code: 400; Error Code: VpcLimitExceeded; Request ID: redacted; Proxy: null)"
[✖]AWS::EC2::InternetGateway/InternetGateway: CREATE_FAILED – "The maximum number of internet gateways has been reached. (Service: AmazonEC2; Status Code: 400; Error Code: InternetGatewayLimitExceeded; Request ID: redacted; Proxy: null)"
[!]1 error(s) occurred and cluster hasn't been created properly, you may wish to check CloudFormation console

```
You may need to choose a different zone or clean up resources in a shared account. This kind of issue can also happen if the AWS region is currently experiencing limits on resources. The us-east-1 region does experience resource issues during certain heavy usage times that may cause this kind of error. If that is the case, you can try a different zone or continue to retry if you require the use of that specific region.

We can check within AWS EKS and see if we have a new cluster:



![alt_text](/_pages/tutorials/deploying-neoload-web-in-aws/images/image19.png "image_tooltip")


nlw matches the name we gave to the cluster in the YAML file.

Let’s check to see if it has a node group:



![alt_text](/_pages/tutorials/deploying-neoload-web-in-aws/images/image20.png "image_tooltip")


Notice that this node is a m5.xlarge EC instance automatically created by Amazon EKS. If you do not stipulate a value in the YAML for the argument called --nodes-min= then it will set the value automatically. In earlier versions it was set to 1 and we see the line:

```
--nodes-min=1 was set automatically for nodegroup ng-1

```

Later versions of eksctl have increased this to 2. You may see a message like this unless you set the value:

```

--nodes-min=was set automatically for nodegroup ng-1

```

Use the kubectl CLI to the see if the cluster is running:

>> kubectl cluster-info

```
Kubernetes master is running at https://redacted.yl4.us-east-2.eks.amazonaws.com

CoreDNS is running at https://redacted.yl4.us-east-2.eks.amazonaws.com/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

Note: CoreDNS is software that Amazon EKS uses for DNS and Service discovery of the cluster. It is an open source Cloud Native Computing Foundation project and more information about it can be found at https://coredns.io/ 

Looking at the ECdashboard, you can see the mx5.xlarge ECinstance created for the cluster:



![alt_text](/_pages/tutorials/deploying-neoload-web-in-aws/images/image25.png "image_tooltip")


Now that we have a cluster, we need a back end database so that we can set up Neoload Web to store all the data. Keep in mind that even if you have to take down the FE and BE, or even start them back up from scratch, all the data is in the database, so you won’t lose anything.


## Create A MongoDB Cluster

We need a Mongo Database for the Neoload Web Back End (BE) to use. We will use Mongodb Atlas to do this. MongoDB Atlas is a global cloud database service fully managed MongoDB across AWS, Google Cloud, and Azure. This gives us the ability to deploy, run, and scale MongoDB in the cloud. For more information, see [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

Ensure to follow good security practices and set up appropriate user access. Do not use the default security. Keep in mind that passwords that use special characters will be URL encoded, which may cause problems. You will also want to whitelist only IP addresses that you want to access the database, and no others.



![alt_text](/_pages/tutorials/deploying-neoload-web-in-aws/images/image13.png "image_tooltip")


Set up a dedicated cluster, not a shared cluster. Ensure the version is 4.0 and no later.



![alt_text](/_pages/tutorials/deploying-neoload-web-in-aws/images/image1.png "image_tooltip")


If you click the “connect” button, you will see the various ways that can be used to connect. 

![alt_text](/_pages/tutorials/deploying-neoload-web-in-aws/images/image16.png "image_tooltip")

You should see this screen once you click the "connect" button:

![alt_text](/_pages/tutorials/deploying-neoload-web-in-aws/images/image11.png "image_tooltip")


Select “Connect Your Application” and select JAVA 3.4 or later


![alt_text](/_pages/tutorials/deploying-neoload-web-in-aws/images/image17.png "image_tooltip")


The string below has the information we need for the mongodb hostname:

mongodb://neoloadweb:<password>@**cluster0-shard-00-00.redacted.mongodb.net:27017,cluster0-shard-00-01.redacted.mongodb.net:27017,cluster0-shard-00-02.redacted.mongodb.net:27017/<dbname>?ssl=true**&replicaSet=atlas-redacted-shard-0&authSource=admin&retryWrites=true&w=majority

Note that we are referencing each shard with a port, and the database name (we can use admin). We also have to set ssl=true for it to work. This is a requirement by Mongo Atlas. We will have to address this when we create a custom YAML file. We will use this as the information for the mongoDB host name in the section titled “Deploy Helm Chart” later on.

Set up a user id and password for accessing the database within Atlas.

![alt_text](/_pages/tutorials/deploying-neoload-web-in-aws/images/image26.png "image_tooltip")

In this example, we added a user called neoloadweb and set a password. This information will be in our YAML file when we run the helm command in the section “Deploy Helm chart” later on.

We will want to whitelist only the IP address(es) needed for connections to the database, and deny all others. Amazon EKS automaically creates an Elastic IP that does not change and can be used for outbound traffic. Find the IP of the EKS cluster from the Elastic IP menu on AWS:

![alt_text](/_pages/tutorials/deploying-neoload-web-in-aws/images/image5.png "image_tooltip")

Note: This Elastic IP address is automatically assigned to the cluster during creation unless you specify that it be private only.

In Mongo Atlas, we set a whitelist filter with the Elastic IP address. Select "Network Access" under the Security options on the left menu panel.

![alt_text](/_pages/tutorials/deploying-neoload-web-in-aws/images/image22.png "image_tooltip")

Select "Add IP Address". Put in the Elastic IP address for the EKS cluster. Now we have a blank mongoDB database ready for Neoload Web to connect and configure the initial schema, and then begin using it.

## Install The Ingress Controller

The last step before deploying Neoload Web using helm, we need to set up an ingress controller. The ingress controller component sits inside of the cluster and watches for deployments (such as NeoLoad Web) that require an AWS load balancer. This load balancer will provide an entry point to access NeoLoad Web from an end users web browser. When it senses the right annotations, it will create the appropriate AWS load balancer automatically.

We’re going to be using an NGINX ingress controller to route three hostnames to the proper pod services. We want Amazon EKS to create an AWS NLB based on the settings in our helm file, so we need to install the AWS NGINX ingress controller. You can find out more about this ingress controller from the following links:

[https://aws.amazon.com/blogs/opensource/network-load-balancer-nginx-ingress-controller-eks/](https://aws.amazon.com/blogs/opensource/network-load-balancer-nginx-ingress-controller-eks/)

[https://kubernetes.github.io/ingress-nginx/deploy/#aws](https://kubernetes.github.io/ingress-nginx/deploy/#aws)

We will create the NGINX ingress controller using the kubectl CLI with a YAML file that contains all of the options we want to set. The YAML file is located on the web in a public Github repository. You may need to check to ensure you have the latest version of this deploy.yaml file.

>> kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-0.32.0/deploy/static/provider/aws/deploy.yaml

Check the pods to see if there are ingress components running using kubectl

>> kubectl get pods -n ingress-nginx

```
NAMEREADY STATUSRESTARTS AGE
ingress-nginx-admission-create-redacted0/1 Completed 059m
ingress-nginx-admission-patch-redacted 0/1 Completed 159m
ingress-nginx-controller-redacted 1/1 Running 059m
```

To verify what IP is being used by the ingress controller, run the following commands:

>> kubectl get service ingress-nginx-controller -n ingress-nginx

```
NAME TYPE CLUSTER-IPEXTERNAL-IPPORT(S)AGE
ingress-nginx-controller LoadBalancer 10.100.xxx.xxx redacted.elb.us-east-2.amazonaws.com 80:32474/TCP,443:30185/TCP 42m

```

The CLUSTER-IP column displays the originally assigned IP, which may change over time if the cluster has to be recreated. What we want is the unchangin Elastic IP. To get that, just ping the EXTERNAL-IP column value with the DNS name:

>> ping redacted.elb.us-east-2.amazonaws.com

```
3.139.107.100
```

This would tell you that IP 3.139.107.100 is the one being used to the outside world, and should match the one listed in Elastic IP’s for that cluster.


## Install NeoLoad Web Using Helm

We are almost ready to deploy Neoload Web using helm. We will be creating this:

![alt_text](/_pages/tutorials/deploying-neoload-web-in-aws/images/image15.png "image_tooltip")

We will be using a YAML template file called values-custom.yaml that we will customize for our specific values that apply to this implementation. We will use these instructions:

[https://github.com/Neotys-Labs/helm-neoload-web](https://github.com/Neotys-Labs/helm-neoload-web)

[https://github.com/paulsbruce/neoload_kube/blob/master/helm/post_cluster_nlw.md](https://github.com/paulsbruce/neoload_kube/blob/master/helm/post_cluster_nlw.md)

We have already created a managed Kubernetes Cluster in Amazon EKS, and a MongoDB database instance in their Atlas cloud service. We already have the Helm CLI installed. All that remains is deploying the Helm chart which will install/deploy the Neoload Web containers into the cluster node group. There are two containers (Front End and Back End) that make Neoload Web work. Instead of installing the containers into the DEFAULT namespace, we want to create a distinct namespace just for Neoload Web.

Check the list of namespaces

>> kubectl get ns

```
NAMESTATUS AGE
default Active 6d22h
ingress-nginx Active 6d3h
kube-node-lease Active 6d22h
kube-public Active 6d22h
kube-system Active 6d22h
```

Create a new namespace called neoloadweb:

>> kubectl create ns neoloadweb

You should see this command return a confirmation:

```

namespace/neoloadweb created

```

relist the namespaces to ensure neoloadweb is there:

>> kubectl get ns

```
NAMESTATUS AGE
default Active 6d22h
ingress-nginx Active 6d3h
kube-node-lease Active 6d22h
kube-public Active 6d22h
kube-system Active 6d22h
**neoloadwebActive 81m**
```

If you still don’t see one, the previous command failed.

If you see the new namespace, change the context to the neoloadweb namespace so that when we deploy the containers they will be in this namespace

>> kubectl config set-context --current --namespace=neoloadweb

```

Context "iam-root-account@nlw.us-east-2.eksctl.io" modified.

```

Verify you are now in the neoloadweb namespace:

>> kubectl config view --minify --output 'jsonpath={..namespace}'; echo

```
neoloadweb
```
## Deploy Helm Chart

Add the Neotys chart repository:

helm repo add neotys https://helm.prod.neotys.com/stable/

Download and set up your values-custom.yaml file

[https://raw.githubusercontent.com/Neotys-Labs/helm-neoload-web/master/values-custom.yaml](https://raw.githubusercontent.com/Neotys-Labs/helm-neoload-web/master/values-custom.yaml)

For the Mongo section, we used the values we got earlier from Mongo Altas for host name, userid, and password:


```
### NLWeb configuration
neoload:
 configuration:
 backend:
 mongo:
 host: cluster0-shard-00-02.redacted.mongodb.net:27017,cluster0-shard-00-00.redacted.mongodb.net:27017,cluster0-shard-00-01.redacted.mongodb.net:27017/admin?ssl=true
 port: 0
 # The secret key must be at least 8 characters long
 secretKey: neoloadweb

### MongoDB user configuration
mongodb:
 usePassword: true
 mongodbUsername: neoloadweb
 mongodbPassword: <secret>
```

We are using the information from the Mongo Atlas configuration section to put in the proper values into the mongo section of the YAML file:

_cluster0-shard-00-02.redacted.mongodb.net:27017,cluster0-shard-00-00.redacted.mongodb.net:27017,cluster0-shard-00-01.redacted.mongodb.net:27017/admin?ssl=true_

Because of this way of referencing the host, we need to set the **port** value in the YAML to 0 since the port is referenced and handled by the **host **connection string.

The secretKey is something we designate. In this example, we are using neoloadweb for simplicity’s sake.

The Services host configuration needs to reflect the DNS routing discussed in the section below titled, “Route DNS Requests To Neoload Web”.

The original

### Services host configuration

services:

webapp:

host: **neoload-web.mycompany.com**

api:

host: **neoload-web-api.mycompany.com**

files:

host: **neoload-web-files.mycompany.com**

You need to replace "mycompany.com" with the domain name used to navigate publicly to this Neoload Web install. Don't worry that we have not set up DNS yet. We will do this in a later section. DNS routing does not need to be set up to deploy the helm chart in this step.

Use the helm CLI to spin up the Neoload Web front end (FE) and back end (FE) containers into the cluster with the following command:

helm install nlw neotys/nlweb -f ./values-custom.yaml

```

NAME: nlw
LAST DEPLOYED: Fri Jul11:48:54 2021
NAMESPACE: neoloadweb
STATUS: deployed
REVISION: 1
NOTES:
1. Access the application with the following URL:
http://neoload-web-api.mycompany.com
http://neoload-web-files.mycompany.com
http://neoload-web.mycompany.com

```

In this example, we have named it nlw, but you can name it anything you like. When running this helm command, it already has the context of the current cluster and knows to deploy the containers to that EKS specific cluster. This is why you don’t have to designate the cluster name in the command arguments or have a reference to it in the YAML file.

As you deploy Neoload Web, you can monitor what is happening at various levels. First find out what the new POD name is that is being deployed using kubctl

>> kubectl get pods

```
NAMEREADY STATUSRESTARTS AGE
neoloadweb-redacted 0/Running 04s
```

To see the individual images deployed into the neoloadweb-redacted pod:

>> kubectl get pods --namespace=neoloadweb -o=jsonpath="{..image}"

```
neotys/**neoload-web-backend**:latest neotys/**neoload-web-frontend**:latest neotys/neoload-web-backend:latest neotys/neoload-web-frontend:latestLOCAL>>
```

This shows we have both of the containers pulled from the latest image available.

Check the logs for the Neoload Web back end container and make sure it is connecting to the Mongodb database and coming up properly:

>> kubectl logs neoloadweb-nlweb-redacted nlweb-backend

```
Starting mode START_MODE=ON_PREMISE
Starting Jetty on port 9092
Memory Allocation: Xmx2000m
Vertx IP Bus Address: 192.168.xxx.xxx public host 192.168.xxx.xxx
19:54:42,600 |-INFO in ch.qos.logback.classic.LoggerContext[default] - Found resource [conf/logback-prod.xml] at [file:/server/conf/logback-prod.xml]
…
…
```

Thelogs will have a lot of information in them. You want to look for errors/exceptions.

If you need to uninstall everything and fix any issues and do it over you can uninstall with the following command:

>> helm uninstall neoloadweb

Obviously, use the same name used during the install command.

Too see more details about a deployment:

>> kubectl get deployment <deployment name> -o yaml

What did we create?

![alt_text](/_pages/tutorials/deploying-neoload-web-in-aws/images/image14.png "image_tooltip")


The EKS Cluster created contains a single Node Group. The Node Group has a single Node. Within this node, there are multiple namespaces (including the one we created called neoloadweb):

* default
* ingress-nginx
* kube-node-lease
* kube-public
* kube-system
* neoloadweb

The neoloadweb namespace has a single pod with two containers (the front end and the back end for Neoload Web). The DEFAULT namespace contains nothing. The ingress-nginx namespace contains the ingress-nginx-controller-redacted pod. The kube-node-lease

and kube-public namespaces contain nothing.

The **kube-system** namespace contains the following pods:

* **aws-node**-redacted - A DaemonSet that deploys one pod to each Amazon ECnode in your cluster. The pod runs the Amazon Virtual Private Cloud (Amazon VPC) CNI controller, which provides VPC networking functionality to the pods and nodes in the cluster.
* **coredns**-redacted-redacted - this is a DNS server. Pods running inside the Amazon EKS cluster use the CoreDNS service's cluster IP as the default name server for querying internal and external DNS records. There are two of these listed in this cluster.
* **coredns**-redacted2-redacted- this is a DNS server. Pods running inside the Amazon EKS cluster use the CoreDNS service's cluster IP as the default name server for querying internal and external DNS records. There are two of these listed in this cluster.
* **kube-proxy**-redacted - a network proxy that runs on each node in the cluster. It maintains network rules on nodes. These network rules allow network communication to your Pods from network sessions inside or outside of your cluster.


## Routing DNS Requests To Neoload Web

The EKS cluster has a Load Balancer in AWS. This was created during EKS cluster creation. kubectl interacts with the EKS ALB for the cluster commands which we execute in the command line. See the section titled “Install The Ingress Controller” for more information.

![alt_text](/_pages/tutorials/deploying-neoload-web-in-aws/images/image7.png "image_tooltip")

Note that we have a DNS name for the load balancer of

redacted.f.elb.us-east-2.amazonaws.com

However, if we try to go there directly in the browser, we will not get to the Neoload Web page. Instead we get a 404 Not Found page form NGINX:



![alt_text](/_pages/tutorials/deploying-neoload-web-in-aws/images/image18.png "image_tooltip")


Why? Because the ingress controller will only route requests to those host names.

Use this command to see the ingress and ingress controller settings:

k get ingress neoloadweb-nlweb-ingress -o yaml

you will see in the yaml the host names we provided:

spec:

rules:

- host: **neoload-web-api.load.redacted.com**

http:

paths:

- backend:

serviceName: neoloadweb-nlweb-svc-api

servicePort: 80

pathType: ImplementationSpecific

- host: **neoload-web-files.load.redacted.com**

http:

paths:

- backend:

serviceName: neoloadweb-nlweb-svc-files

servicePort: 80

pathType: ImplementationSpecific

- host: **neoload-web.load.redacted.com**

http:

paths:

- backend:

serviceName: neoloadweb-nlweb-svc-webapp

servicePort: 80

pathType: ImplementationSpecific

It has to be able to resolve to the Load Balancer IP and HTTP requests must have the right host in the HTTP resource URI that allows the cluster to resolve to the right route/service.

How do we get**neoload-web.yourcompanyname.com** routed to the front end of our Neoload Web instance?

This depends on how your company handles DNS routing. If you are doing this yourself, you might use the Route 53 service from AWS:

[https://aws.amazon.com/route53/](https://aws.amazon.com/route53/)

This could also be handled by other third party DNS services. Here is an example using Rackspace:



![alt_text](/_pages/tutorials/deploying-neoload-web-in-aws/images/image24.png "image_tooltip")




![alt_text](/_pages/tutorials/deploying-neoload-web-in-aws/images/image23.png "image_tooltip")




![alt_text](/_pages/tutorials/deploying-neoload-web-in-aws/images/image2.png "image_tooltip")


This screenshot shows the entry for neoload-web-files. This needs to be repeated for the other two host names (neoload-web and neoload-web-api). They all point to the same DNS name listed in the AWS load balancer.

For Godaddy with a new domain name, just modify the default CNAME, and add two additional CNAME entries that point to the three subdomain names:

![alt_text](/_pages/tutorials/deploying-neoload-web-in-aws/images/image29.png "image_tooltip")

![alt_text](/_pages/tutorials/deploying-neoload-web-in-aws/images/image30.png "image_tooltip")

For Godaddy, you may need to wait up to an hour to see the change take effect

## Verify Neoload Web

Navigate to the same host URL that we defined in hour YAML file in a browser window:

**neoload-web.load.redacted.com**

You should see the main login window for Neoload Web. This indicates the routing is working correctly and the Neload Web application is available.



![alt_text](/_pages/tutorials/deploying-neoload-web-in-aws/images/image8.png "image_tooltip")
** \
**From here, you can follow the online documentation for Neoload Web:

[https://www.neotys.com/documents/doc/nlweb/latest/en/html/#2983.htm](https://www.neotys.com/documents/doc/nlweb/latest/en/html/#2983.htm) ** \
**

When connecting the Neoload GUI to the Neoload Web server, be aware that all of the host names point to port 80, whereas other ports are used in other kinds of configurations. For example, port 8080 is typically used by the API access - used by the Neoload GUI. In this case, we are referencing a distinct URL of neoload-web-api.company.com on port 80 to access the API:



![alt_text](/_pages/tutorials/deploying-neoload-web-in-aws/images/image6.png "image_tooltip")


This is a change to the default URL connection input in the Neoload GUI. The same concept applies to the neoload-web-files URL.

If you wanted to spin up a Docker Load Generator to connect to this cluster you would use a command like this:

docker run -d --name=generator01 -p 7101:7100 -e NEOLOADWEB_TOKEN=redacted -e NEOLOADWEB_URL=http://neoload-web-api.redacted.com -e ZONE=redacted -e NEOLOADWEB_WORKSPACE=redacted -e LG_HOST=redacted IP address -e LG_PORT=7101 -e LOADGENERATOR_XMX=-Xmx2048m -e AGENT_XMX=-Xmx512m neotys/neoload-loadgenerator

It is recommended to use a different port for each Generator running on a VM host.

generator01 = 7101

generator0= 7102

generator99 = 7199

Note that you should not need to add additional ports to be open at the AWS Security Group level.

# Post-deployment Considerations

For long-term support of this cluster, you will need to arrange to store, maintain, and protect the data stored as part of NeoLoad Web.

Backup and Recovery Strategy

THIS SECTION TO BE UPDATED IN A FUTURE UPDATE

Data Retention Policies and Processes

THIS SECTION TO BE UPDATED IN A FUTURE UPDATE

# Upgrading Neoload Web

Periodically, the Neoload Web software will be updated by Neotys. The Helm chart used in these examples produces a deployment that has container specs which include ‘imagePullPolicy: Always’.

To get the name of the deployment:

>> kubectl get deployment

```
NAME READY UP-TO-DATE AVAILABLE AGE
neoloadweb-nlweb 1/1 11 5d20h
```

Get the name of all pods

>> kubectl get pods -A

```
NAMESPACE NAMEREADY STATUSRESTARTS AGE
ingress-nginx ingress-nginx-controller-redacted 1/1 Running 04h30m
kube-system aws-node-redacted1/1 Running 06d22h
kube-system coredns-redacted1/1 Running 04h30m
kube-system coredns-redacted1/1 Running 04h30m
kube-system kube-proxy-redacted1/1 Running 06d22h
neoloadwebneoloadweb-nlweb-redacted2/Running 076m
```

To upgrade the containers within the EKS Cluster:

Ensure that scheduling is enabled:

Get the name of the node:

>> get nodes

```
NAMESTATUS ROLESAGE VERSION
ip-redacted.us-east-2.compute.internal Ready,**SchedulingDisabled** <none> 6d17h v1.18.9-eks-d1db3c
```

If you see in the STATUS column SchedulingDisabled, use the following command:

>> kubectl uncordon ip-redacted.us-east-2.compute.internal

rerun get nodes and this should be removed

```
NAMESTATUS ROLESAGE VERSION
ip-redacted.us-east-2.compute.internal Ready<none> 6d22h v1.18.9-eks-d1db3c
```

>> kubectl describe node ip-redacted.us-east-2.compute.internal

Check the list of namespaces and make sure you have one for neoloadweb

>> kubectl get ns

```
NAMESTATUS AGE
default Active 6d22h
ingress-nginx Active 6d3h
kube-node-lease Active 6d22h
kube-public Active 6d22h
kube-system Active 6d22h
```

If not, create one. Otherwise, skip this step:

>> kubectl create ns neoloadweb

relist:

>> kubectl get ns

```
NAMESTATUS AGE
default Active 6d22h
ingress-nginx Active 6d3h
kube-node-lease Active 6d22h
kube-public Active 6d22h
kube-system Active 6d22h
neoloadwebActive 81m
```

Change the context to the neoloadweb namespace

>> kubectl config set-context --current --namespace=neoloadweb

>> kubectl rollout restart deployment/neoloadweb-nlweb

```
deployment.apps/neoloadweb-nlweb restarted
```

To query the progress of the new deployment:

>> kubectl get pods

```
NAMEREADY STATUSRESTARTS AGE
neoloadweb-nlweb-redacted2/Running 05d20h
neoloadweb-nlweb-redacted 0/Pending 030s
```

You will see the old deployment (the one with the longer AGE value) change over time as you run this same query.

This will do a “rolling restart” of the neoload web deployment and cause kube master to spin up a new pod with the latest front/back versions, then drain the old pod. This may take several minutes. You can confirm what version of Neoload Web is running by either checking the Neoload Web login page:


![alt_text](/_pages/tutorials/deploying-neoload-web-in-aws/images/image27.png "image_tooltip")

The version number should be higher than the one previously installed. Note that Neotys may release version updates to Neoload GUI and the docker container images for Controllers and Generators at dockerhub.com separately from the Neoload Web container images. Verify that new Neoload Web images have been released before performing an upgrade.

To see all containers in the pod:

>> kubectl get pods --all-namespaces -o jsonpath="{..image}" |\
tr -s '[[:space:]]' '\n' |\
sort |\
uniq -c

```
 redacted.dkr.ecr.us-east-2.amazonaws.com/amazon-k8s-cni-init:v1.7.5-eksbuild.1
 redacted.dkr.ecr.us-east-2.amazonaws.com/amazon-k8s-cni:v1.7.5-eksbuild.1
 redacted.dkr.ecr.us-east-2.amazonaws.com/eks/coredns:v1.8.0-eksbuild.1
 redacted.dkr.ecr.us-east-2.amazonaws.com/eks/kube-proxy:v1.19.6-eksbuild.2
 jettech/kube-webhook-certgen:v1.2.0
 neotys/neoload-web-backend:latest
 neotys/neoload-web-frontend:latest
 quay.io/kubernetes-ingress-controller/nginx-ingress-controller:0.32.0
```

If the rolling update does not work, use help to uninstall and reinstall:

>> helm uninstall neoloadweb

>> helm install neoloadweb neotys/nlweb -f ./values-custom.yaml

To see a status:

>> kubectl get pods -A

Ensure they are all running
