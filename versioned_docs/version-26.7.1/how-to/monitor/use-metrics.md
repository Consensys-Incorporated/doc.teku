---
title: Use metrics
description: Use metrics to monitor Teku's performance.
sidebar_position: 1
---

# Use metrics to monitor performance

Enable the [Prometheus](https://prometheus.io/) monitoring and alerting service for Teku metrics using the [`--metrics-enabled`](../../reference/cli/index.md#metrics-enabled) option.

## Install Prometheus

To use Prometheus with Teku, install the [Prometheus main component](https://prometheus.io/download/). On macOS, install with [Homebrew](https://formulae.brew.sh/formula/prometheus):

```bash
brew install prometheus
```

## Setting up and running Prometheus with Teku

To configure Prometheus and run with Teku:

1. Configure Prometheus to poll Teku. For example, add the following YAML fragment to the `scrape_configs` block of the `prometheus.yml` file:

    ```yaml title="Example configuration"
    global:
      scrape_interval: 15s
    scrape_configs:
      - job_name: "prometheus"
        static_configs:
          - targets: ["localhost:9090"]
      - job_name: "teku-dev"
        scrape_timeout: 10s
        metrics_path: /metrics
        scheme: http
        static_configs:
          - targets: ["localhost:8008"]
    ```

2. Start Teku with the [`--metrics-enabled`](../../reference/cli/index.md#metrics-enabled) option. To start a node for testing with metrics enabled:

    ```bash
    teku --eth1-deposit-contract-address=dddddddddddddddddddddddddddddddddddddddd \
    --eth1-endpoint=http://localhost:8545 --validators-key-file=validator_keys \
    --p2p-port=9000 --rest-api-enabled=true --rest-api-docs-enabled=true \
    --metrics-enabled=true --metrics-categories=BEACON,PROCESS,LIBP2P,JVM,NETWORK,PROCESS
    ```

    :::warning

    To avoid DNS rebinding attacks, if running Prometheus on a different host to your Teku node
    (any host other than `localhost`), ensure you add the hostname that Prometheus uses to connect
    to Teku to [`--metrics-host-allowlist`](../../reference/cli/index.md#metrics-host-allowlist).

    For example, if Prometheus is configured to get metrics from `http://teku.local:8008/metrics` then `teku.local` has to be in `--metrics-host-allowlist`.

    :::

    To specify the host and port on which Prometheus accesses Teku, use the
    [`--metrics-interface`](../../reference/cli/index.md#metrics-interface) and
    [`--metrics-port`](../../reference/cli/index.md#metrics-port) options.
    The default host and port are 127.0.0.1 and 8008.

3. In another terminal, run Prometheus specifying the `prometheus.yml` file:

    ```bash
    prometheus --config.file=prometheus.yml
    ```

4. View the [Prometheus graphical interface](#view-prometheus-graphical-interface).

:::tip

Use a log ingestion tool, such as Logstash, to parse the logs and alert you to configured anomalies.

:::

## View Prometheus graphical interface

1. Open a web browser to `http://localhost:9090` to view the Prometheus graphical interface.

2. Choose **Graph** from the menu bar and click the **Console** tab below.

3. From the **Insert metric at cursor** drop-down, select a metric such as `libp2p_peers` or `beacon_finalized_epoch` and click **Execute**. The values display.

    :::note

    The available metrics are prefixed with the category type specified using [`--metrics-categories`](../../reference/cli/index.md#metrics-categories).

    The [Beacon Chain metrics] lists the minimum set of metrics implemented by beacon nodes.

    :::

Click the **Graph** tab to view the data as a time-based graph. The query string displays below the graph.

## Visualize collected data

Use [Grafana] to visualize the collected data. See the sample [Teku Grafana dashboard](https://grafana.com/grafana/dashboards/13457).

<!-- Links -->

[Beacon Chain metrics]: https://github.com/ethereum/beacon-metrics/blob/master/metrics.md
[Grafana]: https://grafana.com/docs/grafana/latest/guides/getting_started/
