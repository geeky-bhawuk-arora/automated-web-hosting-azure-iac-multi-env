output "resource_group_name" {
  value = azurerm_resource_group.rg.name
}

output "load_balancer_public_ip" {
  value = azurerm_public_ip.lb_pip.ip_address
}

output "vm_private_ips" {
  value = [
    for nic in azurerm_network_interface.nic : nic.private_ip_address
  ]
}

output "vm_names" {
  value = [
    for vm in azurerm_linux_virtual_machine.vm : vm.name
  ]
}
