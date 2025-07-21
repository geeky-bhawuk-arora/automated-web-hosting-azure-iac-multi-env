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

yaml
Copy
Edit

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

You must maintain **per-environment inventory files**:

Example: `inventories/inventory_dev.ini`

```ini
[web]
20.123.45.67 ansible_user=azureuser ansible_ssh_private_key_file=~/.ssh/id_rsa
🔧 Configuration Variables
Set in: group_vars/all.yml

yaml
Copy
Edit
app_dir: /home/azureuser/tomato-app
backend_dir: "{{ app_dir }}/app/backend"
frontend_dir: "{{ app_dir }}/app/frontend"
repo_url: https://github.com/geeky-bhawuk-arora/iac-multi-env-azure-webinfra.git
🚀 Run Locally (Optional Testing)
bash
Copy
Edit
ansible-playbook -i inventories/inventory_dev.ini deploy.yml
🤖 CI/CD via GitHub Actions
This Ansible setup is executed post-Terraform deployment in your GitHub Actions pipeline:

yaml
Copy
Edit
- name: Run Ansible Playbook
  run: |
    ansible-playbook ansible/deploy.yml -i ansible/inventories/inventory_${{ github.event.inputs.environment }}.ini
Secrets like the SSH private key are configured in GitHub → Repo → Settings → Secrets.
