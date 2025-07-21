# Automated Web Hosting Solution with Single Click Replication to Uact And Prod Environment

This repository contains Terraform configurations to deploy a scalable and environment-specific infrastructure on Microsoft Azure. It's designed to support multiple environments like Development (`dev`), User Acceptance Testing (`uat`), and Production (`prod`) using separate variable files.

---

## Prerequisites

Before you begin, make sure you have the following tools installed on your local machine:
* [Git](https://git-scm.com/downloads)
* [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
* [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli)

---

## 🚀 Getting Started

Follow these steps to deploy the Azure infrastructure.

### 1. Clone the Repository
Clone this repository to your local machine and navigate into the project directory.
```bash
git clone https://github.com/geeky-bhawuk-arora/automated-web-hosting-azure-iac-multi-env
cd automated-web-hosting-azure-iac-multi-env
```
2. Authenticate with Azure
Log in to your Azure account using the Azure CLI.

```bash
az login
```
If you have multiple Azure subscriptions, make sure to set the correct one for this deployment.

```bash
az account set --subscription "<subscription-id>"
```

3. Initialize Terraform
Initialize the Terraform working directory. This will download the necessary providers and set up the backend.

```bash
terraform init
```
4. Select an Environment
The configuration is managed through environment-specific variable files:

dev.tfvars for the Development environment.

uat.tfvars for the User Acceptance Testing environment.

prod.tfvars for the Production environment.

Choose the appropriate file for the environment you wish to deploy.

5. Validate and Plan
Generate an execution plan to preview the changes Terraform will make. This step is a dry run and won't create any resources.
Replace dev.tfvars with the file for your target environment (e.g., uat.tfvars or prod.tfvars).

```bash
terraform plan -var-file=dev.tfvars
```
6. Apply the Configuration
Apply the changes to create the infrastructure on Azure. Terraform will ask for a final confirmation before proceeding.

Bash

terraform apply -var-file=dev.tfvars
When prompted, type yes and press Enter to confirm.

⚙️ Configuration Variables
All environment-specific configuration is managed via .tfvars files. Key configurable variables include:

Variable Name	Description	Example Value
env_name	Environment name (dev, uat, prod)	dev
resource_group_name	Name of the Azure Resource Group	dev-rg
vnet_cidr	Virtual Network CIDR block	10.1.0.0/16
subnet_frontend_cidr	Frontend subnet CIDR block	10.1.0.0/24
subnet_backend_cidr	Backend subnet CIDR block	10.1.1.0/24
vm_size	Azure VM size	Standard_B2s
vm_image	VM Image reference	UbuntuLTS

Export to Sheets
Refer to the .tfvars files for a complete list of environment-specific configurations.

📄 Outputs
After a successful deployment, Terraform will display key output values. You can use these to connect to your resources or for further configuration.

Resource Group Name: The name of the deployed resource group.

Virtual Network & Subnet IDs: The unique identifiers for your VNet and subnets.

Public IP Addresses: Public IP addresses assigned to VMs or Load Balancers.

Load Balancer Frontend IP: The IP address for accessing services behind the load balancer.

You can also view these outputs at any time by running:

Bash

terraform output
💣 Destroying the Infrastructure
To tear down all resources managed by this Terraform configuration, run the destroy command.

⚠️ Warning: This action is irreversible and will permanently delete all created resources.

Bash

terraform destroy -var-file=dev.tfvars
When prompted, type yes and press Enter to confirm the destruction.
