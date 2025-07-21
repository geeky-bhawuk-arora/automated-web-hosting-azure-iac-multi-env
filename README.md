# ☁️ Azure Web Infrastructure with Load Balancer using Terraform + GitHub Actions

This project provisions a **highly available Azure web infrastructure** using **Terraform**, and automates deployment across **Dev**, **UAT**, and **Prod** environments via **GitHub Actions**.

---
An IAC Tool leveraged to deploy Virtual machine based web servers, Load balancer. A website hosted on two virtual machine instances added to the Backend of an Azure Load balancer. IAC tool capable of dynamically deploying the setup to Development, Uact (test), and Production Environment by using Parameters specific to an environment
## 📦 What This Does

✅ Provisions:

- A **Virtual Network (VNet)**  
- A **Subnet**  
- A **Network Security Group (NSG)**  
- Two **Ubuntu Virtual Machines**  
- An **Azure Load Balancer (Public)**  
- A **Backend Pool** with the two VMs  
- A **custom web page** on each VM (via cloud-init or Ansible)

---

## 🌍 Environments Supported

- **Development**
- **UAT (User Acceptance Testing)**
- **Production**

Each environment uses its own configuration file:
environments/
├── dev.tfvars
├── uat.tfvars
└── prod.tfvars

yaml
Copy
Edit

---

## 🔧 Tools Used

| Tool         | Purpose                              |
|--------------|--------------------------------------|
| Terraform    | Provision Azure resources            |
| GitHub Actions | Automate CI/CD pipeline             |
| Azure CLI    | Authentication and login             |

---

## 📁 Project Structure

azure-loadbalancer-project/
├── main.tf
├── variables.tf
├── outputs.tf
├── environments/
│ ├── dev.tfvars
│ ├── uat.tfvars
│ └── prod.tfvars
├── .github/
│ └── workflows/
│ └── terraform-deploy.yml
├── README.md

yaml
Copy
Edit

---

## 🚀 Getting Started

### Step 1: Login to Azure

```bash
az login
Step 2: Initialize Terraform
bash
Copy
Edit
terraform init
Step 3: Apply Environment
To deploy Dev:

bash
Copy
Edit
terraform apply -var-file="environments/dev.tfvars"
To deploy UAT:

bash
Copy
Edit
terraform apply -var-file="environments/uat.tfvars"
To deploy Prod:

bash
Copy
Edit
terraform apply -var-file="environments/prod.tfvars"
🤖 GitHub Actions CI/CD
GitHub Actions automates the deployment when you push changes to specific branches like dev, uat, or main.

📂 Sample Workflow: .github/workflows/terraform-deploy.yml
yaml
Copy
Edit
name: Deploy Terraform to Azure

on:
  push:
    branches:
      - dev
      - uat
      - main

jobs:
  terraform:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Code
      uses: actions/checkout@v3

    - name: Setup Terraform
      uses: hashicorp/setup-terraform@v3
      with:
        terraform_version: 1.6.0

    - name: Azure Login
      uses: azure/login@v1
      with:
        creds: ${{ secrets.AZURE_CREDENTIALS }}

    - name: Terraform Init
      run: terraform init

    - name: Terraform Apply
      run: |
        BRANCH=$(echo "${GITHUB_REF##*/}")
        terraform apply -auto-approve -var-file="environments/${BRANCH}.tfvars"
🧠 You'll need to store AZURE_CREDENTIALS in GitHub Secrets (you can generate it via az ad sp create-for-rbac).

🌐 Accessing Your Website
Once deployed, Terraform will output the public IP address of the Load Balancer.

Open your browser and navigate to:

cpp
Copy
Edit
http://<load_balancer_public_ip>
You should see the web page served from one of the backend VMs.

🧹 Tear Down (Clean Up)
To destroy resources from a specific environment:

bash
Copy
Edit
terraform destroy -var-file="environments/dev.tfvars"
📌 Notes
Each VM can be configured using cloud-init or external config tools like Ansible

Ensure you open port 80 in NSG rules

VM size and region can be customized in each *.tfvars

🔐 Secrets Setup for GitHub Actions
Generate a service principal:

bash
Copy
Edit
az ad sp create-for-rbac --role="Contributor" --scopes="/subscriptions/<subscription_id>" --sdk-auth
Copy the JSON output and save it as a secret in GitHub:
Repo → Settings → Secrets → Actions → AZURE_CREDENTIALS

