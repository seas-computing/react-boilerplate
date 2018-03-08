# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.provider "virtualbox" do |vb|
    vb.gui = false
    vb.memory = "512"
  end
  config.vm.box = "centos/7"
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "./ansible/vagrant_deploy.yml"
  end
  config.vm.network "forwarded_port", guest: 80, host: 8080
  config.vm.network "forwarded_port", guest: 443, host: 8443
  config.vm.network "forwarded_port", guest: 3001, host: 8000
  # config.vm.network "private_network", ip: "10.20.30.40"
end
