---
title: System requirements
description: System requirements to sync and run Teku
sidebar_position: 1
---

# System requirements

The following are the minimum system requirements for running a full node, with Teku as a beacon node and validator client:

- CPU: 4 cores at 2.8 GHz
- Memory: 16 GB RAM
- Storage: SSD with 2 TB free space
- Operating system: 64-bit Linux or macOS
- Internet: Broadband internet connection (10 Mbps)

:::caution Windows is not supported

Teku does not support Windows. Windows users may switch to using Docker, Windows Subsystem for
Linux, or other supported operating systems.

:::

:::note
We also recommend that you have an uninterrupted power supply (UPS) to ensure your node is always available.
However, this is not required.
:::

You can use [Prometheus](../how-to/monitor/use-metrics.md) to check CPU and disk space requirements for Teku.
Grafana provides a [sample Teku dashboard](https://grafana.com/grafana/dashboards/13457).
