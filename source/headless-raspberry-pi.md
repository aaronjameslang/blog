---
layout: page
title: Headless Raspberry Pi
tags: software ux
---

# Headless Raspberry Pi Setup

## Preparing the SD card

First we need grab ourselves an
[OS image](https://www.raspberrypi.com/software/operating-systems/).

While that's downloading, we can list the attached drives before and
after inserting our SD card, to find it's device name.

```
> lsblk -p
NAME                            MAJ:MIN RM   SIZE RO TYPE  MOUNTPOINT
/dev/mmcblk0                    179:0    0  14.9G  0 disk
└─/dev/mmcblk0p1                179:1    0  14.9G  0 part  /media/aaron/9016-4EF8
```

Once the image is downloaded, we can decompress it and write it to the SD card.

```
unzip ~/Downloads/2022-01-28-raspios-bullseye-armhf-lite.zip
sudo dd if=./2022-01-28-raspios-bullseye-armhf-lite.img \
  of=/dev/mmcblk0 bs=4M conv=fsync status=progress
```

This might take a minute or two. `-p` pipes the contents to stdout
rather than disk, and `fsync` ensure dd flushes writes to the SD card on
completion.

After it's finished, we can remove and re-insert the card to see the new
partitions.

```
> lsblk
NAME                MAJ:MIN RM   SIZE RO TYPE  MOUNTPOINT
mmcblk0             179:0    0  14.9G  0 disk
├─mmcblk0p1         179:1    0   256M  0 part  /media/aaron/boot
└─mmcblk0p2         179:2    0   1.6G  0 part  /media/aaron/rootfs
```

My OS has handily mounted this for me, you may have to do that manually.

```
> cd /media/aaron
> ls
boot
rootfs
```

To enable `ssh` on boot we can create the below empty file.

```
> touch boot/ssh
```

And configure the WiFi connection.

```
> vim boot/wpa_supplicant.conf
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
country=<Insert 2 letter ISO 3166-1 country code here>
update_config=1

network={
 ssid="<Name of your wireless LAN>"
 psk="<Password for your wireless LAN>"
}
```

Note that you are writing your WiFi password in plaintext on an unencrypted
filesystem, so don't leave this pi anywhere bad actors might have physical access.

If you want to add multiple networks add `id_str` with a unique name like

```

ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
country=<Insert 2 letter ISO 3166-1 country code here>
update_config=1

network={
 ssid="<Name of your wireless LAN>"
 psk="<Password for your wireless LAN>"
 id_str="Home_2.4GHz"
}

network={
 ssid="<Name of your wireless LAN>"
 psk="<Password for your wireless LAN>"
 id_str="Home_5GHz"
}
```

We want our pi to have a predictable IP. This can be done though DHCP reservation
if your router supports it, but raspberry pis have a habit of randomising their
MAC address which makes that tricky.

A more reliable solution is to assign a static IP address on the pi itself.
Check your router settings to ensure you pick an IP address that won't be assigned
to another device via DHCP.

Pick a hostname and IP address. You can get inspiration from any ordered set,
chemical elements, roman emperors, I usually use pokemon.

This device will be named `zenigame` and have IP address `192.168.1.7`.

Open `rootfs/etc/dhcpcd.conf` and append the following lines.
Your router address may vary, try `sudo arp-scan --localnet` if you're
not sure.

```
static ip_address=192.168.1.7/24
static routers=192.168.1.254
static domain_name_servers=192.168.1.254
```

Note that this sets the same IP address for both the WiFi and ethernet
interfaces, so you may not be able to use both at once.

To set the hostname, edit `rootfs/etc/hostname` and `rootfs/etc/hosts`
and change the default `raspberrypi` to your chosen name, I'm using
`zenigame`.

I also like to customise `rootfs/etc/motd` with some ascii art, I'm going
to be using [this](http://www.fiikus.net/asciiart/pokemon/007.txt)
by [Maija Haavisto](http://www.fiikus.net/?pokedex).

This is about as far as we can get with the pi offline, so let's unmount
the SD card.

```
> sudo umount boot
> sudo umount rootfs
```

Insert the SD card in to the raspberry pi and power it on.

## Pi Online

The only indication we get from the pi directly is the power LED,
but we can run `arp-scan` and wait for it's IP to show up.

```
> sudo arp-scan --localnet
192.168.1.7	dc:a6:32:a4:ad:bb	Raspberry Pi Trading Ltd
```

We can add an entry to our `.ssh/config` like below

```
Host zenigame
  Hostname 192.168.0.9
  User pi
```

and attempt to connect with the default password 'raspberry'

```
> ssh zenigame
```

Press ctrl-d to logout.

Assuming you have your ssh keys setup locally you can run

```
> ssh-copy-id zenigame
```

Once complete you should be able to run `ssh zenigame` without being asked for
a password.

Now we're not at risk of locking ourselves out we can change the password.
We won't be using it much so I'd suggest making it random and keeping it
in a password manager.

```
> ssh zenigame
pi> passwd
```

`vim` is not installed by default, only `vi`. You may wish to install vim
or simply alias to vi.

Let's update the system, which will also test our network connection.

```
pi> sudo apt update
pi> sudo apt upgrade
```

Let's also set up the system to [automatically install it's own security updates](https://wiki.debian.org/UnattendedUpgrades).

```
pi> sudo apt install unattended-upgrades apt-listchanges
```

Open the config
```
pi> vi /etc/apt/apt.conf.d/50unattended-upgrades
```
and uncomment and set
```
Unattended-Upgrade::Mail "root";
```
## Future Exploration

How best to check this mail? Can we install a web mail interface? Or forward the mail to another email address? Is there a client I can run from my main machine that will connect over ssh?

Does unattended upgrades work out of the box for raspberry pi systems? Some suggest that we need to also edit the sources in that config file,
some do not. I'll leave it as default for now and monitor.
https://raspberrypi.stackexchange.com/questions/38931/how-do-i-set-my-raspberry-pi-to-automatically-update-upgrade

You can monitor these files to check on the automation
```
/var/log/unattended-upgrades/unattended-upgrades.log
/var/log/unattended-upgrades/unattended-upgrades-dpkg.log
/var/log/dpkg.log
/var/log/apt/history.log
```
