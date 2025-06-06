---
layout: page
title: Explicit Versioning
tags: software ux
---

# Home Cooked NAS

Today on ready-stedy-hack we're going to whip a home file server
using only ingredients I have on hand: a raspberry pi and an old 2TB
external harddrive.

{photo here}

## Disk Inspection

After guessing the voltage needed by the drive (12V seems to work) and
digging out a USB A to USB mini-B cable (and looking up what on earth mini-usb is) I can connect the drive to my laptop
and see what state it's in.

```
> lsblk -f
NAME                FSTYPE      FSVER LABEL          UUID                                 FSAVAIL FSUSE% MOUNTPOINT
sda
├─sda1              ext4        1.0   rome-ext-alpha 46e54fda-25ec-40f5-9bf5-26219ccf7213   17.1G    93% /media/aaron/rome-ext-alpha
└─sda2              ext4        1.0   rome-ext-beta  724acfc9-7e0d-47dc-8530-1e34fd31f6de    638G    25% /media/aaron/rome-ext-beta
> sudo blkid
/dev/sda1: LABEL="rome-ext-alpha" UUID="46e54fda-25ec-40f5-9bf5-26219ccf7213" BLOCK_SIZE="4096" TYPE="ext4" PARTUUID="302a4f1a-26ca-4862-8d30-b0636dcd6ca0"
/dev/sda2: LABEL="rome-ext-beta" UUID="724acfc9-7e0d-47dc-8530-1e34fd31f6de" BLOCK_SIZE="4096" TYPE="ext4" PARTUUID="204b3ba2-d313-4ef8-b995-e26b0ce117a4"
> sudo blkid /dev/sda
/dev/sda: PTUUID="32d806f2-9ba0-4ca9-8518-c6547689bd02" PTTYPE="gpt"
> udevadm info --query=all --name=/dev/sda | grep SERIAL
E: ID_SERIAL=WDC_WD10EAVS-32D7B1_WD-WCAU47962000
E: ID_SERIAL_SHORT=WD-WCAU47962000
> sudo sfdisk -l
Disk /dev/sda: 1.82 TiB, 2000397795328 bytes, 3907026944 sectors
Disk model: My Book
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 32D806F2-9BA0-4CA9-8518-C6547689BD02

Device          Start        End    Sectors   Size Type
/dev/sda1  1953513472 3907024895 1953511424 931.5G Microsoft basic data
/dev/sda2        2048 1953513471 1953511424 931.5G Microsoft basic data
```

Past me apparently named this disk "rome", no idea why but it's unique and
easy to spell so we'll roll with it.
We can see that the drive currently has two 1TB partitions on a GPT table.

Let's take a breif aside to talk about disk IDs. I recommend that any time
you are planning or documenting work on your drives you record all the IDs
in a way that you can later search them and find your notes.

`WDC_WD10EAVS-32D7B1_WD-WCAU47962000` is the serial number, in most cases
this is printed on the drive itself, if you ever needed to visually ID a drive.
This is the least likely to ever change.

`32D806F2-9BA0-4CA9-8518-C6547689BD02` is the ID in the partition table
(a.k.a. disk label). This will change if you reformat the entire drive,
but will survive partitions beginning created and removed.

`302a4f1a-26ca-4862-8d30-b0636dcd6ca0` and `204b3ba2-d313-4ef8-b995-e26b0ce117a4`
identify the partions respectively, these IDs are also part of the partition table.
If we remove and recreate the partition this ID will change, but filesytem operations
such as reformating the drive won't affect them.

Finally
`46e54fda-25ec-40f5-9bf5-26219ccf7213` and `724acfc9-7e0d-47dc-8530-1e34fd31f6de`
identify the filesystems, and will change if we reformat the individual partitions.

Seeing as this is a pretty old disk I pulled out of storage, let's see
how healthy it is.

```
> sudo smartctl -a /dev/sda
smartctl 7.2 2020-12-30 r5155 [x86_64-linux-5.10.0-9-amd64] (local build)
Copyright (C) 2002-20, Bruce Allen, Christian Franke, www.smartmontools.org

=== START OF INFORMATION SECTION ===
Model Family:     Western Digital Caviar Green
Device Model:     WDC WD10EAVS-32D7B1
Serial Number:    WD-WCAU47962000
LU WWN Device Id: 5 0014ee 257e09651
Firmware Version: 01.01A01
User Capacity:    1,000,204,886,016 bytes [1.00 TB]
Sector Size:      512 bytes logical/physical
Device is:        In smartctl database [for details use: -P show]
ATA Version is:   ATA8-ACS (minor revision not indicated)
SATA Version is:  SATA 2.5, 3.0 Gb/s
Local Time is:    Sun Jan 30 20:14:01 2022 GMT
SMART support is: Available - device has SMART capability.
SMART support is: Enabled

=== START OF READ SMART DATA SECTION ===
SMART overall-health self-assessment test result: PASSED
<snip>
```

Looks good. Looking at the files I have on this disk, there's a lot on 'alpha'
that I'd like to save, but 'beta' we can wipe. Then I can slowly move what
data I want to save from alpha to our new patition (gamma?), wipe alpha
and expand the new partition to the full extent. I've been wanting to try
out OpenZFS so that's what we'll be replacing beta with; we've just the one
drive so we can't do anything clever yet but it'll get our feet wet.
OpenZFS has native encryption support so we shouldn't need LUKS.

On to the pi!

## Initial Raspberry Pi Setup

We can set up the pi by following my [headless guide](/headless-raspberry-pi-setup.html)
and my guide for [self documentation](/self-documenting-micro-servers/).

Time to connect the harddrive to the pi!

## Pi and Platter

First thing I do is move both the drive and pi to where they're going to
stay long term, and hook them up to power and each other.



and local admin email?
uptime

mount drive
make mount point immutable
chattr +i /mountpoint

transmission, torrent raspbian

smb for filesharing

prometheus
