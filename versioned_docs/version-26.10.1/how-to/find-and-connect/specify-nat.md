---
title: Specify NAT methods
description: Specify the method for handling NAT environments.
sidebar_position: 2
---

# Specify NAT methods

Use the [`--p2p-nat-method`](../../reference/cli/index.md#p2p-nat-method) option to specify the NAT method. Options are [`NONE`](#none) and [`UPNP`](#upnp).

You cannot change the NAT method while Teku is running. To change the NAT method restart the node with the [`--p2p-nat-method`](../../reference/cli/index.md#p2p-nat-method) option.

## UPnP

Specify `UPNP` to quickly allow inbound peer connections without manual router configuration. Use UPnP in home or small office environments where a wireless router or modem provides NAT isolation.

UPnP automatically detects if a node is running in a UPnP environment and provides port forwarding. UPnP might introduce delays during node startup, especially on networks without a UPnP gateway device.

:::tip

UPnP support is often disabled by default in networking firmware. If disabled by default, you must explicitly enable UPnP support.

:::

## None

Specify `NONE` to explicitly configure the external IP address and ports advertised using [`--p2p-advertised-ip`](../../reference/cli/index.md#p2p-advertised-ip-p2p-advertised-ips) and [`--p2p-advertised-port`](../../reference/cli/index.md#p2p-advertised-port) for the P2P service.

Manually configure your firewall to allow external hosts to create inbound connections to Teku.
