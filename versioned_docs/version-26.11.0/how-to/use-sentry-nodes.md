---
title: Use sentry beacon nodes
description: Mitigate DoS attacks by using sentry nodes.
sidebar_position: 7
---

# Use sentry beacon nodes

You can calculate future block proposers ahead of time, which opens up an attack vector.
A DoS attack on a validator's beacon node can cause the validator to miss its block proposal, thereby losing the block proposal reward.
You can mitigate this issue by using sentry nodes.

:::info

Only [validators executed separately](../get-started/start-teku.md#run-the-clients-separately) from beacon nodes (remote validators) can use sentry nodes

:::

When you configure your remote validator to use sentry beacon nodes, each beacon node (or cluster of beacon nodes) can be assigned a role.
Each role determines which beacon node the remote validator sends request to when performing a task.

Sentry nodes support three roles:

- `duties_provider` - Beacon node used for requesting attestations and block duties.
- `block_handler` - Beacon node used for block creation and publishing.
- `attestation_publisher` - Beacon node used for publishing attestations.

Only the `duties_provider` role is mandatory. You can assign multiple beacon node endpoints for each role.

## Configure sentry nodes

:::info

The CLI option `--sentry-config-file=<file_path>` cannot be used with [`--beacon-node-api-endpoint`](../reference/cli/subcommands/validator-client.md#beacon-node-api-endpoint-beacon-node-api-endpoints).

:::

Configure your sentry nodes in a JSON configuration file. To configure your remote validator to use the sentry node configuration, use the `--sentry-config-file=<file_path>` CLI option.

The configuration file (in this example, `/etc/sentry-node-config.json`) uses the following format:

```json
{
  "beacon_nodes": {
    "duties_provider": {
      "endpoints": ["http://duties:9051"]
    },
    "block_handler": {
      "endpoints": ["http://block:9051"]
    },
    "attestation_publisher": {
      "endpoints": ["http://attestation:9051"]
    }
  }
}
```

Start your remote validator with the `--sentry-config-file` option, for example:

```bash
teku validator --sentry-config-file=/etc/sentry-node-config.json
```

During startup the logs display output similar to:

```bash
...
DEBUG | SentryNodesConfigLoader | 2022-10-03 01:31:48.260 INFO  - Loading sentry nodes configuration from /etc/sentry-node-config.json
DEBUG | SentryNodesConfigLoader | 2022-10-03 01:31:48.277 INFO  - Duty provider beacon nodes: http://duties:9051
DEBUG | SentryNodesConfigLoader | 2022-10-03 01:31:48.277 INFO  - Block handler beacon nodes: http://block:9051
DEBUG | SentryNodesConfigLoader | 2022-10-03 01:31:48.278 INFO  - Attestation publisher beacon nodes: http://attestation:9051
...
```

At this point, the remote validator knows what beacon nodes should be used for its tasks and no further configuration is required.
