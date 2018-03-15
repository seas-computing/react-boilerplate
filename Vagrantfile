# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.define "vagrant" do |vagrant|
    vagrant.vm.provider "virtualbox" do |vb|
      vb.gui = false
      vb.memory = "512"
    end
    vagrant.vm.box = "centos/7"
      vagrant.vm.provision "ansible" do |ansible|
        ansible.playbook = "./ansible/vagrant_deploy.yml"
        ansible.inventory_path = "./ansible/hosts"
        ansible.verbose = "true"
      end
    vagrant.vm.network "forwarded_port", guest: 80, host: 8080
    vagrant.vm.synced_folder ".", "/vagrant", disabled: true
  end
end
