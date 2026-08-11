---
title: Improve peer-to-peer connectivity
description: Update your network configuration to improve peer counts.
sidebar_position: 1
---

# Improve peer-to-peer connectivity

The consensus layer relies on [peer-to-peer (P2P) networking](../../concepts/p2p-networking.md).
By having a good peer count you increase the performance and health of your node.
When a Teku node starts up, it looks for participants on the P2P network by listening for incoming connections, and finds and connects to peers.

While Teku is good at finding peers, changes to your network configuration can help improve your peer count.

## Advertise your public IP address

If you are using a NAT, it's easier to get peers by advertising your public address to the network.
Use the [`--p2p-advertised-ip`](../../reference/cli/index.md#p2p-advertised-ip-p2p-advertised-ips) option to advertise the address publicly.

Additionally, if on a home network, [configure port forwarding](#configure-ports) on your router.

:::tip

Check the [`ip4.me`](http://ip4.me/) website to view your public IP address.

:::

## Configure ports

By default, Teku uses two [P2P ports](../../concepts/p2p-networking.md#p2p-port-options) across three
protocols:

- `9000/tcp` and `9000/udp` for the TCP transport and peer discovery (configured with
  [`--p2p-port`](../../reference/cli/index.md#p2p-port)).
- `9001/udp` for the QUIC transport (configured with
  [`--p2p-quic-port`](../../reference/cli/index.md#p2p-quic-port)).

Configure port forwarding on your router and firewall to allow incoming and outgoing connections on
these ports and protocols.

View your router or firewall documentation to configure port-forwarding.

## Check readiness with a peer count

Check the readiness of your node by using the [`get node readiness` API](https://consensys.github.io/teku/#tag/Teku/operation/readiness).
This check helps to prevent a beacon from receiving traffic from validators while the node is not being connected to enough peers.

You can specify a number in the `target_peer_count` parameter to require a minimum number of peers before the node is considered ready.

:::note

Make sure to [enable the REST API service](../../reference/rest.md#enable-the-rest-api-service).

:::
