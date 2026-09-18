---
title: Improve peer-to-peer connectivity
description: Update your network configuration to improve peer counts.
sidebar_position: 1
---

# Improve peer-to-peer connectivity

The consensus layer relies on peer-to-peer (P2P) networking.
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

By default, Teku listens for connections on port `9000` for TCP and UDP. You can configure the port number with the [`--p2p-port`](../../reference/cli/index.md#p2p-port) option.

Configure port forwarding on your router and firewall to allow incoming and outgoing connections on the listening port for the TCP and UDP protocols.

View your router or firewall documentation to configure port-forwarding.

## Check readiness with a peer count

Check the readiness of your node by using the [`get node readiness` API](https://consensys-incorporated.github.io/teku/#tag/Teku/operation/readiness).
This check helps to prevent a beacon from receiving traffic from validators while the node is not being connected to enough peers.

You can specify a number in the `target_peer_count` parameter to require a minimum number of peers before the node is considered ready.

:::note

Make sure to [enable the REST API service](../../reference/rest.md#enable-the-rest-api-service).

:::
