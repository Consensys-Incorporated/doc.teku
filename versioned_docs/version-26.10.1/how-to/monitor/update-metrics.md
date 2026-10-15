---
title: Update metrics
description: Manually update metrics for your custom dashboard.
sidebar_position: 3
---

# Update metrics

Manually update Teku metrics for your custom dashboard.

With the upgrade of the Prometheus library, Teku introduces the following changes to metric names:

- Gauge names are not allowed to end with `total`, so metrics such as `beacon_proposers_data_total` and `beacon_eth1_current_period_votes_total` are dropping the `_total` suffix.
- The `_created` timestamps are not returned by default.
- Some JVM metric names are changing to adhere to the OTEL standard.

If you are using a custom dashboard, you must update the metric names to reflect these changes.  

The following table lists the name changes for Teku metrics:

| Previous Teku metric name                | New Teku metric name               |
|------------------------------------------|------------------------------------|
| `beacon_proposers_data_total`            | `beacon_proposers_data`            |
| `beacon_eth1_current_period_votes_total` | `beacon_eth1_current_period_votes` |
| `jvm_memory_bytes_committed`             | `jvm_memory_committed_bytes`       |
| `jvm_memory_bytes_init`                  | `jvm_memory_init_bytes`            |
| `jvm_memory_bytes_max`                   | `jvm_memory_max_bytes`             |
| `jvm_memory_bytes_used`                  | `jvm_memory_used_bytes`            |
| `jvm_memory_pool_bytes_committed`        | `jvm_memory_pool_committed_bytes`  |
| `jvm_memory_pool_bytes_init`             | `jvm_memory_pool_init_bytes`       |
| `jvm_memory_pool_bytes_max`              | `jvm_memory_pool_max_bytes`        |
| `jvm_memory_pool_bytes_used`             | `jvm_memory_pool_used_bytes`       |
