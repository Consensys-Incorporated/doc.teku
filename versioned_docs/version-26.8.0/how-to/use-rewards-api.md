---
description: Use the rewards API to view validator rewards.
sidebar_position: 12
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# View block rewards

Use the [rewards API](https://consensys.github.io/teku/#tag/Rewards) to view the validator rewards.

:::note

You cannot query attestation rewards for the latest epoch.

:::

Enable the rewards API with the [`--rest-api-enabled`](../reference/cli/index.md#rest-api-enabled) command line option.

:::tip

A [Swagger interface is also available](../reference/rest.md#enable-the-rest-api-service).
Use the [`--rest-api-docs-enabled`](../reference/cli/index.md#rest-api-docs-enabled) command line option to enable the web interface.

:::

## Limitations

The following limitations apply:

- The rewards API currently supports the `altair` fork upgrade and later.

- The rewards API relies on state and block data to retrieve the reward information, meaning you'll receive limited data if the beacon node being queried is not an archive node.

- You can only query blocks from finalized to head if you are not using `archive` storage mode.

## Impact of data storage modes

:::tip

You can change the [`data-storage-mode`](../reference/cli/index.md#data-storage-mode) without re-initializing your database.

You can change the frequency that states are stored by specifying [`data-storage-archive-frequency`](../reference/cli/index.md#data-storage-archive-frequency),
but it will only affect the state storage from the time that the change has been made.
It will also directly impact the amount of disk space required by Teku.

:::

Consider using a beacon node with `archive` mode storage if you frequently call the rewards API on finalized data.
However, this may produce slow results due to having to replay blocks due to the infrequent storage of states on disk (every 2048 slots by default).

You can consider tuning your data storage to access data quicker, by storing more states (at the cost of disk space), for example,
[setting the archive frequency](../reference/cli/index.md#data-storage-archive-frequency) to `256` or even `64`, and replaying fewer blocks.

## Examples

Query all the rewards from the block currently at head.

<Tabs>
  <TabItem value="Example" label="Example" default>

```bash
curl http://localhost:5051/eth/v1/beacon/rewards/blocks/head |jq
```

  </TabItem>
  <TabItem value="Result" label="Result" >

```json
{
  "execution_optimistic": false,
  "finalized": false,
  "data": {
    "proposer_index": "555552",
    "total": "1217168",
    "attestations": "0",
    "sync_aggregate": "1217168",
    "proposer_slashings": "0",
    "attester_slashings": "0"
  }
}
```

  </TabItem>
</Tabs>

Query all the sync committee rewards from the block at head for validator index 1.

<Tabs>
  <TabItem value="Example" label="Example" default>

```bash
curl -X POST \
     -H 'accept: application/json' \
     -H 'Content-Type: application/json' \
     http://localhost:5051/eth/v1/beacon/rewards/sync_committee/head \
     -d '["1"]' |jq
```

  </TabItem>
  <TabItem value="Result" label="Result" >

```json
{
  "execution_optimistic": false,
  "finalized": false,
  "data": [
    {
      "validator_index": "1",
      "reward": "16778"
    }
  ]
}
```

  </TabItem>
</Tabs>

Query attestation rewards from epoch 204644, just for validator index 0.

<Tabs>
  <TabItem value="Example" label="Example" default>

```bash
curl -X POST \
     -H 'accept: application/json' \
     -H 'Content-Type: application/json' \
     http://localhost:5051/eth/v1/beacon/rewards/attestations/204648 \
     -d '["0"]' |jq
```

  </TabItem>
  <TabItem value="Result" label="Result" >

```json
 {
  "execution_optimistic": false,
  "finalized": true,
  "data": {
    "ideal_rewards": [...],
    "total_rewards": [
      {
        "validator_index": "0",
        "head": "3125",
        "target": "6005",
        "source": "3236"
      }
    ]
  }
}
```

  </TabItem>
</Tabs>
