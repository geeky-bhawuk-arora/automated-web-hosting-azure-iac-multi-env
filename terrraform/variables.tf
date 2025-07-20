variable "env_name" {
  description = "Environment name: dev/uat/prod"
  type        = string
}

variable "location" {
  default = "East US"
}

variable "admin_username" {
  type = string
}

variable "public_key_path" {
  description = "Path to your public SSH key"
  type        = string
}

variable "vm_count" {
  description = "Number of VMs to create"
  type        = number
}
