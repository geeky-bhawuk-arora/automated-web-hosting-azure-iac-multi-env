# Automated Web Hosting Solution with Single Click Replication to Uact And Prod Environment

This repository provides a fully automated solution to provision, configure, and deploy a web application across multiple environments (dev, uat, prod) using:

- Terraform for Infrastructure as Code (IaC)

- Ansible for Application Configuration

- GitHub Actions for CI/CD integration

This setup supports single-click replication to easily promote infrastructure and app deployments from Development to UAT and Production.

 ---


## 📁 Project Structure

```bash
automated-web-hosting-azure-iac-multi-env/
├── terraform/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   ├── dev.tfvars
│   ├── uat.tfvars
│   ├── prod.tfvars
├── ansible/
│   ├── deploy.yml
│   ├── group_vars/
│   │   └── all.yml
│   ├── inventories/
│   │   ├── inventory_dev.ini
│   │   ├── inventory_uat.ini
│   │   └── inventory_prod.ini
│   ├── roles/
│   │   ├── common/
│   │   │   └── tasks/main.yml
│   │   ├── backend/
│   │   │   └── tasks/main.yml
│   │   ├── frontend/
│   │   │   └── tasks/main.yml
│   │   └── nginx/
│   │       └── tasks/main.yml
│   ├── templates/
│   │   └── nginx.conf.j2
├── .github/
│   └── workflows/
│       └── deploy.yml
├── README.md
```

## 📦 Sections Overview
- Project Structure

- Project Overview

- Prerequisites

- Terraform Deployment

- Ansible App Configuration

- GitHub Actions CI/CD

- Infrastructure Outputs

- Destroy Infrastructure

---

## 🧩 Project Overview
This project automates the provisioning, configuration, and deployment of a web application infrastructure with environment separation for dev, uat, and prod.

It combines:

- Terraform for consistent, repeatable infrastructure provisioning

- Ansible for automated application deployment and configuration

- GitHub Actions for end-to-end CI/CD pipeline orchestration

## Prerequisites

Before you begin, make sure you have the following tools installed on your local machine:
* [Git](https://git-scm.com/downloads)
* [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
* [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli)

---

##  Getting Started

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
## 🚀 Deploying the Infrastructure

Follow these steps to deploy your chosen environment.

---

### 1. Select an Environment

The configuration is managed through environment-specific variable files. Before proceeding, choose the appropriate file for the environment you wish to deploy:

* **`dev.tfvars`** for the Development environment.
* **`uat.tfvars`** for the User Acceptance Testing environment.
* **`prod.tfvars`** for the Production environment.

---

### 2. Validate and Plan

Generate an execution plan to preview the changes Terraform will make. This step is a **dry run** and won't create any actual resources.

*Remember to replace **`dev.tfvars`** with your target environment file (e.g., **`uat.tfvars`**).*

```bash
terraform plan -var-file=dev.tfvars
```
---

Once your `.tfvars` file is configured, run the following commands to deploy the resources.


###  3. Initialize Terraform (only needs to be run once in your directory)
```bash
terraform init
```

### 4. Create the execution plan and deploy the resources
terraform apply -var-file=dev.tfvars

📄 Outputs -
After a successful deployment, Terraform will display key output values. You can use these to connect to your resources or for further configuration.

## Resource Group

* **Name**: `[Your-Resource-Group-Name]`

---

## Virtual Network (VNet) & Subnets

* **Virtual Network ID**:
    ```
    /subscriptions/[Your-Subscription-ID]/resourceGroups/[Your-Resource-Group-Name]/providers/Microsoft.Network/virtualNetworks/[Your-VNet-Name]
    ```
* **Subnet ID(s)**:
    ```
    # Subnet 1
    /subscriptions/[Your-Subscription-ID]/resourceGroups/[Your-Resource-Group-Name]/providers/Microsoft.Network/virtualNetworks/[Your-VNet-Name]/subnets/[Your-Subnet-1-Name]

    # Subnet 2
    /subscriptions/[Your-Subscription-ID]/resourceGroups/[Your-Resource-Group-Name]/providers/Microsoft.Network/virtualNetworks/[Your-VNet-Name]/subnets/[Your-Subnet-2-Name]
    ```

---

## Public IP Addresses

* **VM-1 Public IP**: `[Public-IP-Address-for-VM-1]`
* **VM-2 Public IP**: `[Public-IP-Address-for-VM-2]`

---

## Load Balancer

* **Load Balancer Frontend Public IP**: `[Load-Balancer-Public-IP]`

You can also view these outputs at any time by running:

```bash
terraform output
```

### 💣 Destroying the Infrastructure
To tear down all resources managed by this Terraform configuration, run the destroy command.

⚠️ Warning: This action is irreversible and will permanently delete all created resources.

```bash
terraform destroy -var-file=dev.tfvars
```
When prompted, type yes and press Enter to confirm the destruction.


# 🍽️ Ansible Deployment - Tomato App (Azure Multi-Env)

This Ansible configuration automates the **deployment and configuration** of a Node.js backend and static frontend (served via `serve`) for the Tomato food ordering app. It supports **multi-environment deployment** on **Azure VMs provisioned via Terraform**.

---

## 📁 Project Structure
```bash
ansible/
├── group_vars/
│ └── all.yml # Global variables (paths, user, repo, ports)
├── host_vars/ # (optional: per-host overrides)
├── inventories/
│ ├── inventory_dev.ini
│ ├── inventory_uat.ini
│ └── inventory_prod.ini
├── roles/
│ ├── backend/
│ │ └── tasks/main.yml
│ ├── frontend/
│ │ └── tasks/main.yml
│ ├── nginx/
│ │ └── tasks/main.yml # Optional reverse proxy setup
│ └── common/
│ └── tasks/main.yml # Common system tasks (apt update, users, etc.)
├── files/
│ └── (optional static files)
├── templates/
│ └── nginx.conf.j2 # Optional Nginx config template
├── deploy.yml # Master playbook for full deployment
```


---

## 🚀 What This Playbook Does

- ✅ Installs dependencies (`nodejs`, `npm`, `pm2`, `serve`)
- ✅ Clones your GitHub repo (`main` branch)
- ✅ Installs backend packages via `npm`
- ✅ Starts backend using `pm2`
- ✅ Serves frontend on port 80 using `serve`
- ✅ (Optional) Configures and restarts Nginx as reverse proxy

---

## 🧠 Prerequisites

- Ansible 2.12+
- Azure VMs provisioned via Terraform
- Public IPs reachable from GitHub Actions
- SSH access enabled (via `azureuser` + SSH key)
- Your app repo is publicly accessible or a deploy key is configured

---

## 🔐 Inventory Files

You must maintain **per-environment inventory files** to define the hosts for each specific environment (e.g., `dev`, `staging`, `prod`).

**Example:** `inventories/inventory_dev.ini`

```ini
[web]
20.123.45.67 ansible_user=azureuser ansible_ssh_private_key_file=~/.ssh/id_rsa
```
⚙️ Configuration Variables
Global configuration variables are set in the group_vars/all.yml file. These variables are accessible to all hosts in your inventory.

File: group_vars/all.yml

```yaml
app_dir: /home/azureuser/tomato-app
backend_dir: "{{ app_dir }}/app/backend"
frontend_dir: "{{ app_dir }}/app/frontend"
repo_url: https://github.com/geeky-bhawuk-arora/iac-multi-env-azure-webinfra.git]
```

## 🚀 Run Locally (Optional Testing)

To run the deployment playbook on your local machine for testing, use the following command. Make sure to specify the correct inventory file for the target environment.


```bash
ansible-playbook -i inventories/inventory_dev.ini deploy.yml
```

## 🤖 CI/CD via GitHub Actions
This Ansible setup is designed to be executed within a GitHub Actions pipeline, typically after a Terraform deployment stage. The environment is dynamically selected based on the workflow input.

GitHub Actions Workflow Step:

```yaml
- name: Run Ansible Playbook
  run: |
    ansible-playbook ansible/deploy.yml -i ansible/inventories/inventory_${{ github.event.inputs.environment }}.ini

```
💡 Note: Sensitive data, such as SSH_PRIVATE_KEY, should be stored as encrypted secrets in your GitHub repository:
Settings → Secrets and variables → Actions


## 🚦 How This Project Works
This project automates provisioning, configuring, and deploying web hosting infrastructure across multiple environments (dev, uat, prod) with single-click replication.

### Infrastructure Provisioning with Terraform
- Uses environment-specific .tfvars files to set parameters per environment.

- Runs terraform apply to provision Azure resources (resource groups, VNets, subnets, public IPs, VMs, load balancer) tailored for each environment.

- Ensures consistent, repeatable infrastructure deployment, enabling easy replication from Dev to UAT and Prod.

### Application Deployment & Configuration with Ansible
- Uses per-environment inventory files with VM IPs and SSH access details.

- Automates installing Node.js, backend dependencies, and starting services with pm2.

- Serves frontend statically via serve, optionally configures Nginx as reverse proxy.

- Ensures idempotent, environment-aware deployments without manual steps.

## Continuous Integration & Deployment with GitHub Actions
- Pipeline triggered manually or automatically, taking an environment parameter.

- Runs Terraform to provision/update infrastructure, then runs Ansible to deploy the app.

- Uses GitHub Secrets to store sensitive data securely (SSH keys).

- Supports one-click environment promotion for streamlined workflows.

## Summary
By combining Terraform, Ansible, and GitHub Actions, this project delivers an automated, scalable web hosting solution with minimal manual intervention enabling effortless replication and deployment across environments.