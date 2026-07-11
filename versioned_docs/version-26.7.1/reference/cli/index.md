---
title: Command line options
description: Teku command line interface reference
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Teku command line options

This reference describes the syntax of the Teku command line interface (CLI) options.

## Specify options

You can specify Teku options:

- On the command line.

  ```bash
  teku [OPTIONS] [COMMAND]
  ```

- As an environment variable. For each command line option, the equivalent environment variable is:

  - Uppercase.
  - `-` is replaced by `_`.
  - Has a `TEKU_` prefix.

- In a [YAML configuration file](../../how-to/configure/use-config-file.md).

If you specify an option in multiple places, the order of priority is command line, environment
variable, configuration file.

## Using autocomplete

If using Bash or Z shell, you can enable autocomplete support by navigating to the `build` folder
and running:

```bash
source teku.autocomplete.sh
```

Autocomplete allows you to view option suggestions by entering `--` and pressing the Tab key twice.

```bash
teku --Tab+Tab
```

## Options

### `beacon-liveness-tracking-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--beacon-liveness-tracking-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--beacon-liveness-tracking-enabled=true
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_BEACON_LIVENESS_TRACKING_ENABLED=true
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
beacon-liveness-tracking-enabled: true
```

  </TabItem>
</Tabs>

Enables or disables validator liveness tracking.
Used by [doppelganger detection](../../how-to/prevent-slashing/detect-doppelgangers.md).
The default is `false`.

### `builder-bid-compare-factor`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--builder-bid-compare-factor=<STRING>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--builder-bid-compare-factor=50
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_BUILDER_BID_COMPARE_FACTOR=50
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
builder-bid-compare-factor: 50
```

  </TabItem>
</Tabs>

The builder bid compare factor. The default is 90 (90%).

Execution layer clients in
[Capella-enabled networks](https://notes.ethereum.org/@launchpad/withdrawals-faq#Q-What-is-ShanghaiCapella)
provide the execution payload and the payload value.
The beacon node compares this value against the builder bid to maximize the validator's profit or
decrease network censorship at a low or no cost.

Use this option to set the comparison factor applied to the builder bid value when comparing it to
the locally produced payload.
The factor is expressed as a percentage.
For example, a builder bid comparison factor of 90 means the builder's payload is chosen when its
value is at least 10% greater than what can be built locally.

Set this option to `BUILDER_ALWAYS` to always use the builder bid, unless the bid is invalid.

### `builder-endpoint`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--builder-endpoint=<URL>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--builder-endpoint=http://127.0.0.1:18550
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_BUILDER_ENDPOINT=http://127.0.0.1:18550
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
builder-endpoint: "http://127.0.0.1:18550"
```

  </TabItem>
</Tabs>

The address for an external [builder endpoint](../../how-to/configure/builder-network.md).

### `builder-set-user-agent-header`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--builder-set-user-agent-header[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--builder-set-user-agent-header=true
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_BUILDER_SET_USER_AGENT_HEADER=true
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
builder-set-user-agent-header: true
```

  </TabItem>
</Tabs>

Enables or disables setting the User-Agent header to `teku/v<version>` (for example, `teku/v23.4.0`)
when making a builder bid request, to help builders identify clients and versions.
The default is `true`.

### `checkpoint-sync-url`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--checkpoint-sync-url=<URL>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--checkpoint-sync-url="https://beaconstate.ethstaker.cc"
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_CHECKPOINT_SYNC_URL="https://beaconstate.ethstaker.cc"
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
checkpoint-sync-url: "https://beaconstate.ethstaker.cc"
```

  </TabItem>
</Tabs>

The URL of a [Checkpointz](https://github.com/ethpandaops/checkpointz) endpoint used to
[start Teku from a recent state](../../get-started/checkpoint-start.md).

By default, Teku tries to download the finalized state from the endpoint.
If it can't download the finalized state, it tries to download the genesis state.

:::tip
See
[this community-maintained list of checkpoint state endpoints](https://eth-clients.github.io/checkpoint-sync-endpoints/).
:::

When this option is set, and `--deposit-snapshot-enabled` is also not set or disabled,
the `--checkpoint-sync-url` value will be used to determine the deposit snapshot.

### `config-file`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--config-file=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--config-file=/home/me/me_node/config.yaml
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_CONFIG_FILE=/home/me/me_node/config.yaml
```

  </TabItem>
</Tabs>

The path to the [YAML configuration file](../../how-to/configure/use-config-file.md).
The default is `none`.

### `data-base-path`, `data-path`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--data-base-path=<PATH>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--data-base-path=/home/me/me_node
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_DATA_BASE_PATH=/home/me/me_node
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
data-base-path: "/home/me/me_node"
```

  </TabItem>
</Tabs>

The path to the Teku data directory. The default directory is OS-dependent:

- macOS: `~/Library/teku`
- Unix/Linux: `$XDG_DATA_HOME/teku` if `$XDG_DATA_HOME` is set; otherwise `~/.local/share/teku`

The default Docker image location is `/root/.local/share/teku`.

### `data-beacon-path`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--data-beacon-path=<PATH>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--data-beacon-path=/home/me/me_beacon
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_DATA_BEACON_PATH=/home/me/me_beacon
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
data-beacon-path: "/home/me/me_beacon"
```

  </TabItem>
</Tabs>

The path to the beacon node data.
The default is `<data-base-path>/beacon` where `<data-base-path>` is specified using
[`--data-base-path`](#data-base-path-data-path).

### `data-storage-archive-frequency`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--data-storage-archive-frequency=<NUMBER>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--data-storage-archive-frequency=1028
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_DATA_STORAGE_ARCHIVE_FREQUENCY=1028
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
data-storage-archive-frequency: 1028
```

  </TabItem>
</Tabs>

The frequency (in slots) at which to store finalized states to disk.
The default is `2048`.

This option is ignored if [`--data-storage-mode`](#data-storage-mode) is not set to `archive`.

:::note

Specifying a higher number of slots has a potentially higher overhead for retrieving finalized
states, since Teku might need to regenerate more states to get to the requested state.
Specifying a lower number of slots increases the disk space usage.

:::

For example, with `--data-storage-archive-frequency=1`, Teku uses maximum disk space but has the
lowest response time for retrieving a finalized state since it saves every slot state.
With `--data-storage-archive-frequency=2048`, Teku uses less disk space but might need to
regenerate the state since it only saves every 2048th slot state.

### `data-storage-mode`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--data-storage-mode=<STORAGE_MODE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--data-storage-mode=archive
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_DATA_STORAGE_MODE=archive
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
data-storage-mode: "archive"
```

  </TabItem>
</Tabs>

The strategy for handling historical chain data. Valid options are:

- `archive` - Stores all blocks and states.

- `minimal` - Stores the minimal required data to follow the chain and run validators.
  Finalized states and historic blocks are pruned.

- `prune` - Stores all blocks, but finalized states are pruned.

The default is `minimal`.

### `data-storage-non-canonical-blocks-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--data-storage-non-canonical-blocks-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--data-storage-non-canonical-blocks-enabled=true
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_DATA_STORAGE_NON_CANONICAL_BLOCKS_ENABLED=true
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
data-storage-non-canonical-blocks-enabled: true
```

  </TabItem>
</Tabs>

Enables or disables storing non-canonical blocks and blob sidecars. The default is `false`.

### `data-validator-path`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--data-validator-path=<PATH>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--data-validator-path=/home/me/me_validator
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_DATA_VALIDATOR_PATH=/home/me/me_validator
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
data-validator-path: "/home/me/me_validator"
```

  </TabItem>
</Tabs>

The path to the validator client data.
The default is `<data-base-path>/validator` where `<data-base-path>` is specified using
[`--data-base-path`](#data-base-path-data-path).

### `deposit-snapshot-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--deposit-snapshot-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--deposit-snapshot-enabled=false
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_DEPOSIT_SNAPSHOT_ENABLED=false
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
deposit-snapshot-enabled: false
```

  </TabItem>
</Tabs>

Enables or disables using a deposit tree snapshot from checkpoint sync or distributed as part of
Teku's binary and persisting the tree after finalization.
The default is `true`.

Normally, at sync, Teku requests all deposit logs from the execution layer up to the head.
At each startup, Teku loads all deposits from the disk and replays them to recreate the Merkle tree.
Both operations consume peer resources and delay node availability on restart.
The feature enabled by this option dramatically decreases the time of both operations by bundling
deposit tree snapshots in the Teku distribution for all major networks (Mainnet, Gnosis, Hoodi,
and Sepolia) and persisting the current tree after finalization.
Instead of replaying thousands of deposits on startup, Teku loads the bundled tree or a saved one.

:::info Security considerations
If a malicious peer changes the bundled tree, Teku throws `InvalidDepositEventsException` on the
next deposit received from the execution layer.
The malicious peer can't follow up the chain, and so can't propose with an incorrect deposit tree snapshot.
:::

When this option is not set or is disabled, the `--checkpoint-sync-url` value will be used if
provided to find the deposit snapshot URL.

### `doppelganger-detection-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--doppelganger-detection-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--doppelganger-detection-enabled=true
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_DOPPELGANGER_DETECTION_ENABLED=true
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
doppelganger-detection-enabled: true
```

  </TabItem>
</Tabs>

Enables or disables [doppelganger detection](../../how-to/prevent-slashing/detect-doppelgangers.md).
The default is `false`.

### `ee-endpoint`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--ee-endpoint=<URL>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--ee-endpoint=http://localhost:8550
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_EE_ENDPOINT=http://localhost:8550
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
ee-endpoint: "http://localhost:8550"
```

  </TabItem>
</Tabs>

The URL of the [execution client's](../../concepts/node-types.md#execution-clients) Engine JSON-RPC APIs.
This replaces [`eth1-endpoint`](#eth1-endpoint-eth1-endpoints) after
[The Merge](../../concepts/node-types.md).

### `ee-jwt-claim-id`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--ee-jwt-claim-id=<STRING>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--ee-jwt-claim-id=foobar
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_EE_JWT_CLAIM_ID=foobar
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
ee-jwt-claim-id: "foobar"
```

  </TabItem>
</Tabs>

A unique identifier for the consensus layer client.
When using the JSON-RPC API engine, this identifier is added to JWT claims as an `id` claim.

### `ee-jwt-secret-file`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--ee-jwt-secret-file=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--ee-jwt-secret-file=ee-jwt-secret.hex
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_EE_JWT_SECRET_FILE=ee-jwt-secret.hex
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
ee-jwt-secret-file: "ee-jwt-secret.hex"
```

  </TabItem>
</Tabs>

The shared secret used to authenticate
[execution clients](../../concepts/node-types.md#execution-clients) when using the Engine JSON-RPC API.
Contents of file must be 32 hex-encoded bytes.
This can be a relative or absolute path.
See an [example of how to generate this](../../get-started/connect/mainnet.md#1-generate-the-shared-secret).

### `eth1-deposit-contract-address`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--eth1-deposit-contract-address=<ADDRESS>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--eth1-deposit-contract-address=0x77f7bED277449F51505a4C54550B074030d989bC
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_ETH1_DEPOSIT_CONTRACT_ADDRESS=0x77f7bED277449F51505a4C54550B074030d989bC
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
eth1-deposit-contract-address: "0x77f7bED277449F51505a4C54550B074030d989bC"
```

  </TabItem>
</Tabs>

The address of the deposit contract. Only required when creating a custom network.

The deposit contract address can also be defined in:

- The genesis file specified using [`--initial-state`](#initial-state)
- The predefined network supplied using [`--network`](#network).

### `eth1-deposit-contract-max-request-size`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--eth1-deposit-contract-max-request-size=<INTEGER>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--eth1-deposit-contract-max-request-size=8000
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_ETH1_DEPOSIT_CONTRACT_MAX_REQUEST_SIZE=8000
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
eth1-deposit-contract-max-request-size: 8000
```

  </TabItem>
</Tabs>

The maximum number of blocks to request deposit contract event logs for in a single request.
The default is `10000`.

Setting a smaller max size may help if your execution layer client is slow at loading deposit event
logs, or when receiving warnings that the execution layer client is unavailable.

### `eth1-endpoint`, `eth1-endpoints`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--eth1-endpoint=<URL>[,<URL>...]...
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--eth1-endpoint=http://localhost:8545,https://mainnet.infura.io/v3/d0e21ccd0b1e4eef7784422eabc51111
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_ETH1_ENDPOINT=http://localhost:8545,https://mainnet.infura.io/v3/d0e21ccd0b1e4eef7784422eabc51111
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
eth1-endpoint: ["http://localhost:8545","https://mainnet.infura.io/v3/d0e21ccd0b1e4eef7784422eabc51111"]
```

  </TabItem>
</Tabs>

A comma-separated list of JSON-RPC URLs of execution layer clients.
Each time Teku makes a call, it finds the first provider in the list that is available, on the right
chain, and in sync.
This option must be specified if running a validator.

If not specified (that is, you're running a beacon node only), then provide an initial state using
the [`--initial-state`](#initial-state) option, or start Teku from an existing database using
[`--data-path`](#data-base-path-data-path), which provides the initial state to work from.
You do not need to provide an initial state if running a public network which has already started
(for example, Mainnet or Hoodi).

:::caution

After [The Merge](../../concepts/node-types.md), you can't use `eth1-endpoint` to specify an
external execution layer provider.
This option is replaced by [`ee-endpoint`](#ee-endpoint) for each beacon node.

:::

### `exchange-capabilities-monitoring-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--exchange-capabilities-monitoring-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--exchange-capabilities-monitoring-enabled=true
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_EXCHANGE_CAPABILITIES_MONITORING_ENABLED=true
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
exchange-capabilities-monitoring-enabled: true
```

  </TabItem>
</Tabs>

Enables or disables querying the [execution client](../../concepts/node-types.md#execution-clients)
periodically for the Engine API methods it supports.
If enabled and incompatibility is detected, a warning is raised in the logs.
The default is `true`.

### `exit-when-no-validator-keys-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--exit-when-no-validator-keys-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--exit-when-no-validator-keys-enabled=true
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_EXIT_WHEN_NO_VALIDATOR_KEYS_ENABLED=true
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
exit-when-no-validator-keys-enabled: true
```

  </TabItem>
</Tabs>

Enables or disables automatically exiting when no validator keys are loaded.

If set to `false`, Teku continues running even when no validator keys are loaded.
If set to `true`, Teku automatically exits if no validator keys are loaded, or there are no active validators.

The default is `false`.

:::important

If running the validator client and beacon node separately, set this option only on the validator
client side.
This setting is meant for the client that loads and handles the validator keys.

:::

### `force-clear-db`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--force-clear-db[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--force-clear-db=true
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_FORCE_CLEAR_DB=true
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
force-clear-db: true
```

  </TabItem>
</Tabs>

When enabled, Teku deletes the beacon node's on-disk chain database on startup before loading. Use this  
when you want to start from a clean chain state (for example, before using  
[checkpoint sync](../../get-started/checkpoint-start.md) or after a failed migration).
The default is `false`.

:::caution

This option is destructive. The beacon chain database will be permanently deleted. Only use it when you
intend to clear the database and resync or load a new state. Avoid setting it in config files or environment
variables else the database will be deleted on every startup.

:::

### `genesis-state`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--genesis-state=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--genesis-state=/home/me/genesis.ssz
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_GENESIS_STATE=/home/me/genesis.ssz
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
genesis-state: "/home/me/genesis.ssz"
```

  </TabItem>
</Tabs>

The path or URL to an SSZ-encoded state file.
The state file can be used to specify the genesis state, or a
[recent finalized checkpoint state from which to sync].

This option does not need to be specified if the genesis state is provided by the network specified
using the [`--network`](#network) option.
It also is not required if the [`--reconstruct-historic-states`](#reconstruct-historic-states) is
not used.

:::note

If overriding the genesis state in a custom network, you must supply the genesis state file at each restart.

:::

:::tip

You can use [Infura](https://infura.io/) as the source of initial states using
`--genesis-state https://{projectid}:{secret}@eth2-beacon-mainnet.infura.io/eth/v2/debug/beacon/states/genesis`.

:::

### `help`

```bash title="Syntax"
-h, --help
```

Show the help message and exit.

### `ignore-weak-subjectivity-period-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--ignore-weak-subjectivity-period-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--ignore-weak-subjectivity-period-enabled=true
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_IGNORE_WEAK_SUBJECTIVITY_PERIOD_ENABLED=true
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
ignore-weak-subjectivity-period-enabled: true
```

  </TabItem>
</Tabs>

Enables or disables ignoring the [weak subjectivity](../../concepts/weak-subjectivity.md) period
verification that Teku performs at startup.
The default is `false`.

:::caution
Syncing from outside the weak subjectivity period is considered unsafe.
:::

### `initial-state`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--initial-state=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--initial-state=/home/me/genesis.ssz
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_INITIAL_STATE=/home/me/genesis.ssz
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
initial-state: "/home/me/genesis.ssz"
```

  </TabItem>
</Tabs>

The path or URL to an SSZ-encoded state file.
The state file can be used to specify the genesis state, or a
[recent finalized checkpoint state from which to sync].

This option does not need to be specified if the genesis state is provided by the network specified
using the [`--network`](#network) option.

:::note

If overriding the initial state in a custom network, you must supply the initial state file at each restart.

:::

:::tip

See
[this community-maintained list of checkpoint state endpoints](https://eth-clients.github.io/checkpoint-sync-endpoints/).

:::

### `log-color-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--log-color-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--log-color-enabled=false
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_LOG_COLOR_ENABLED=false
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
log-color-enabled: false
```

  </TabItem>
</Tabs>

Enables or disables including a console color display code in status and event log messages.
The default is `true`.

### `log-destination`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--log-destination=<LOG_DESTINATION>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--log-destination=CONSOLE
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_LOG_DESTINATION=CONSOLE
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
log-destination: "CONSOLE"
```

  </TabItem>
</Tabs>

The location to output log information. Valid options are:

- `BOTH`
- `CONSOLE`
- `DEFAULT_BOTH`
- `FILE`

The default is `DEFAULT_BOTH`.
When using `BOTH` or `DEFAULT_BOTH`, system updates such as blockchain events are displayed on the
console, and errors and other information are logged to a file.
Specify the log file with the [`--log-file`](#log-file) command-line option.

In production environments, we recommend using the `CONSOLE` or `FILE` options to ensure all log
information is available in one place.

:::note

Use `DEFAULT_BOTH` when using a
[custom Log4J2 configuration file](../../how-to/monitor/configure-logging.md#advanced-custom-logging).
Any other option applies the custom logging changes on top of its default settings.

:::

### `log-file`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--log-file=<FILENAME>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--log-file=teku_2020-01-01.log
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_LOG_FILE=teku_2020-01-01.log
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
log-file: "teku_2020-01-01.log"
```

  </TabItem>
</Tabs>

The relative or absolute location and filename of the log file.

The default directory is OS-dependent:

- macOS: `~/Library/teku/logs`
- Unix/Linux: `$XDG_DATA_HOME/teku/logs` if `$XDG_DATA_HOME` is set; otherwise `~/.local/share/teku/logs`

The default Docker image location is `/root/.local/share/teku/logs`.

### `log-file-name-pattern`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--log-file-name-pattern=<REGEX>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--log-file-name-pattern=tekuL_%d{yyyy-MM-dd}.log
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_LOG_FILE_NAME_PATTERN=tekuL_%d{yyyy-MM-dd}.log
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
log-file-name-pattern: "tekuL_%d{yyyy-MM-dd}.log"
```

  </TabItem>
</Tabs>

The filename pattern to apply when creating log files.
The default pattern is `teku_%d{yyyy-MM-dd}.log`.

### `log-include-events-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--log-include-events-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--log-include-events-enabled=false
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_LOG_INCLUDE_EVENTS_ENABLED=false
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
log-include-events-enabled: false
```

  </TabItem>
</Tabs>

Enables or disables logging frequent update events.
For example, every slot event with validators and attestations.
The default is `true`.

### `log-include-validator-duties-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--log-include-validator-duties-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--log-include-validator-duties-enabled=false
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_LOG_INCLUDE_VALIDATOR_DUTIES_ENABLED=false
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
log-include-validator-duties-enabled: false
```

  </TabItem>
</Tabs>

Enables or disables logging details of validator event duties.
The default is `true`.

:::note

Logs could become noisy when running many validators.

:::

### `logging`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
-l, --logging=<LEVEL>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--logging=DEBUG
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_LOGGING=DEBUG
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
logging: "DEBUG"
```

  </TabItem>
</Tabs>

The logging verbosity.
Log levels are `OFF`, `FATAL`, `ERROR`, `WARN`, `INFO`, `DEBUG`, `TRACE`, and `ALL`.
The default is `INFO`.

### `metrics-block-production-performance-tracking-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--metrics-block-production-performance-tracking-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--metrics-block-production-performance-tracking-enabled=false
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_METRICS_BLOCK_PRODUCTION_PERFORMANCE_TRACKING_ENABLED=false
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
metrics-block-production-performance-tracking-enabled: false
```

  </TabItem>
</Tabs>

Enables or disables block production performance metrics. The default is `false`.

### `metrics-block-timing-tracking-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--metrics-block-timing-tracking-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--metrics-block-timing-tracking-enabled=false
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_METRICS_BLOCK_TIMING_TRACKING_ENABLED=false
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
metrics-block-timing-tracking-enabled: false
```

  </TabItem>
</Tabs>

Enables or disables block timing metrics. The default is `true`.

### `metrics-categories`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--metrics-categories=<CATEGORY>[,<CATEGORY>...]...
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--metrics-categories=BEACON,JVM,PROCESS
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_METRICS_CATEGORIES=BEACON,JVM,PROCESS
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
metrics-categories: ["BEACON", "JVM", "PROCESS"]
```

  </TabItem>
</Tabs>

A comma-separated list of categories for which to track metrics.
Options are `JVM`, `PROCESS`, `BEACON`, `DISCOVERY`, `EVENTBUS`, `EXECUTOR`, `LIBP2P`, `NETWORK`,
`STORAGE`, `STORAGE_HOT_DB`, `STORAGE_FINALIZED_DB`, `VALIDATOR`,
`VALIDATOR_PERFORMANCE`, and `VALIDATOR_DUTY`.

When `metrics-categories` is used, only the categories specified in this option are enabled (all
other categories are disabled).

### `metrics-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--metrics-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--metrics-enabled=true
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_METRICS_ENABLED=true
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
metrics-enabled: true
```

  </TabItem>
</Tabs>

Enables or disables the metrics exporter. The default is `false`.

### `metrics-host-allowlist`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--metrics-host-allowlist=<hostname>[,<hostname>...]... or "*"
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--metrics-host-allowlist=medomain.com,meotherdomain.com
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_METRICS_HOST_ALLOWLIST=medomain.com,meotherdomain.com
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
metrics-host-allowlist: ["medomain.com", "meotherdomain.com"]
```

  </TabItem>
</Tabs>

A comma-separated list of hostnames to allow access to the [Teku metrics].
By default, Teku accepts access from `localhost` and `127.0.0.1`.

:::tip

To allow all hostnames, use `"*"`.
We don't recommend allowing all hostnames for production environments.

:::

### `metrics-interface`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--metrics-interface=<HOST>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--metrics-interface=192.168.10.101
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_METRICS_INTERFACE=192.168.10.101
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
metrics-interface: "192.168.10.101"
```

  </TabItem>
</Tabs>

The host on which Prometheus accesses Teku metrics. The default is `127.0.0.1`.

### `metrics-port`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--metrics-port=<PORT>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--metrics-port=6174
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_METRICS_PORT=6174
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
metrics-port: 6174
```

  </TabItem>
</Tabs>

The port (TCP) on which [Prometheus](https://prometheus.io/) accesses Teku metrics.
The default is `8008`.

### `metrics-publish-endpoint`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--metrics-publish-endpoint=<URL>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--metrics-publish-endpoint=https://beaconcha.in/api/v1/client/metrics?apikey={apikey}
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_METRICS_PUBLISH_ENDPOINT=https://beaconcha.in/api/v1/client/metrics?apikey={apikey}
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
metrics-publish-endpoint: "https://beaconcha.in/api/v1/client/metrics?apikey={apikey}"
```

  </TabItem>
</Tabs>

The endpoint URL of an external service such as [beaconcha.in](https://beaconcha.in/) to which Teku
publishes metrics for node monitoring.

### `metrics-publish-interval`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--metrics-publish-interval=<INTEGER>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--metrics-publish-interval=60
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_METRICS_PUBLISH_INTERVAL=60
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
metrics-publish-interval: "60"
```

  </TabItem>
</Tabs>

The interval between metric publications to the external service defined in
[metrics-publish-endpoint](#metrics-publish-endpoint), measured in seconds.
The default is `60`.

### `network`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--network=<NETWORK>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--network=mainnet
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_NETWORK=mainnet
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
network: "mainnet"
```

  </TabItem>
</Tabs>

The predefined network configuration.
Accepts a predefined network name, or file path or URL to a YAML configuration file.
See the [consensus specification] for examples.

The default is `mainnet`.

Possible values are:

| Network    | Chain           | Type       | Description                                                             |
|:-----------|:----------------|:-----------|:------------------------------------------------------------------------|
| `mainnet`  | Consensus layer | Production | Main network                                                            |
| `hoodi`    | Consensus layer | Test       | Multi-client testnet                                                    |
| `ephemery` | Consensus layer | Test       | Multi-client testnet                                                    |
| `sepolia`  | Consensus layer | Test       | Multi-client testnet                                                    |
| `minimal`  | Consensus layer | Test       | Used for local testing and development networks                         |
| `gnosis`   | Consensus layer | Production | Network for the [Gnosis chain](https://www.gnosis.io/)                  |
| `chiado`   | Consensus layer | Test       | Gnosis [testnet](https://docs.gnosischain.com/concepts/networks/chiado) |
| `lukso`    | Consensus layer | Production | Network for the [Lukso chain](https://lukso.network/)                   |

Predefined networks can provide defaults such as the initial state of the network, bootnodes, and
the address of the deposit contract.

### `p2p-advertised-ip`, `p2p-advertised-ips`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--p2p-advertised-ip=<IP_ADDRESS>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--p2p-advertised-ip=192.168.1.132
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_ADVERTISED_IP=192.168.1.132
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-advertised-ip: "192.168.1.132"
```

  </TabItem>
</Tabs>

The peer-to-peer IP address(es) to advertise.
You can define up to two addresses: one IPv4 and one
[IPv6](../../how-to/find-and-connect/configure-ipv6.md).
The default address is `127.0.0.1`.

### `p2p-advertised-port`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--p2p-advertised-port=<PORT>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--p2p-advertised-port=1789
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_ADVERTISED_PORT=1789
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-advertised-port: 1789
```

  </TabItem>
</Tabs>

The P2P port to advertise.
The default is the port specified in [`--p2p-port`](#p2p-port).

The advertised port can differ from the [`--p2p-port`](#p2p-port).
For example, you can set the advertised port to `9010`, and the `--p2p-port` value to `9009`, then
manually configure the firewall to forward external incoming requests on port `9010` to port `9009`
on the Teku node.

### `p2p-advertised-port-ipv6`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--p2p-advertised-port-ipv6=<PORT>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--p2p-advertised-port-ipv6=1790
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_ADVERTISED_PORT_IPV6=1790
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-advertised-port-ipv6: 1790
```

  </TabItem>
</Tabs>

The P2P [IPv6](../../how-to/find-and-connect/configure-ipv6.md) port to advertise.
Use this port only when advertising both IPv4 and IPv6 addresses.
The default is the port specified in [`--p2p-port-ipv6`](#p2p-port-ipv6).

### `p2p-advertised-quic-port`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--p2p-advertised-quic-port=<PORT>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--p2p-advertised-quic-port=1789
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_ADVERTISED_QUIC_PORT=1789
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-advertised-quic-port: 1789
```

  </TabItem>
</Tabs>

The P2P QUIC port to advertise.
The default is the port specified in [`--p2p-quic-port`](#p2p-quic-port).

The advertised port can differ from the [`--p2p-quic-port`](#p2p-quic-port).
For example, you can set the advertised QUIC port to `9010`, and the `--p2p-quic-port` value to `9009`, then
manually configure the firewall to forward external incoming requests on port `9010` to port `9009`
on the Teku node.

### `p2p-advertised-quic-port-ipv6`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--p2p-advertised-quic-port-ipv6=<PORT>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--p2p-advertised-quic-port-ipv6=1790
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_ADVERTISED_QUIC_PORT_IPV6=1790
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-advertised-quic-port-ipv6: 1790
```

  </TabItem>
</Tabs>

The P2P [IPv6](../../how-to/find-and-connect/configure-ipv6.md) QUIC port to advertise.
Use this port only when advertising both IPv4 and IPv6 addresses.
The default is the port specified in [`--p2p-quic-port-ipv6`](#p2p-quic-port-ipv6).

### `p2p-advertised-udp-port`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--p2p-advertised-udp-port=<PORT>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--p2p-advertised-udp-port=1789
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_ADVERTISED_UDP_PORT=1789
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-advertised-udp-port: 1789
```

  </TabItem>
</Tabs>

The UDP port to advertise to external peers.
The default is the port specified in [`--p2p-advertised-port`](#p2p-advertised-port) if it is set.
Otherwise, the default is the port specified in [`--p2p-port`](#p2p-port).

### `p2p-advertised-udp-port-ipv6`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--p2p-advertised-udp-port-ipv6=<PORT>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--p2p-advertised-udp-port-ipv6=1790
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_ADVERTISED_UDP_PORT_IPV6=1790
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-advertised-udp-port-ipv6: 1790
```

  </TabItem>
</Tabs>

The [IPv6](../../how-to/find-and-connect/configure-ipv6.md) UDP port to advertise to external peers.
This port is only used when advertising both IPv4 and IPv6 addresses.
The default is the port specified in [`--p2p-advertised-port-ipv6`](#p2p-advertised-port-ipv6) if it is set.
Otherwise, the default is the port specified in [`--p2p-port-ipv6`](#p2p-port-ipv6).

### `p2p-direct-peers`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--p2p-direct-peers=<ADDRESS>[,<ADDRESS>...]...
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--p2p-direct-peers=/ip4/151.150.191.80/tcp/9000/p2p/16Ui...aXRz,/ip4/151.150.191.80/tcp/9000/p2p/16Ui...q6f1
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_DIRECT_PEERS=/ip4/151.150.191.80/tcp/9000/p2p/16Ui...aXRz,/ip4/151.150.191.80/tcp/9000/p2p/16Ui...q6f1
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-direct-peers: ["/ip4/151.150.191.80/tcp/9000/p2p/16Ui...aXRz",
                    "/ip4/151.150.191.80/tcp/9000/p2p/16Ui...q6f1"]
```

  </TabItem>
</Tabs>

A comma-separated list of
[multiaddresses](https://libp2p.io/guides/addressing/) of direct peers with
which to establish and maintain connections.
Direct peers are static peers with which this node will always exchange full messages, regardless of
peer scoring mechanisms.
Your direct peers also need to enable your node as direct peer in order to work.

### `p2p-discovery-bootnodes`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--p2p-discovery-bootnodes=<ENR_ADDRESS>[,<ENR_ADDRESS>...]...
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--p2p-discovery-bootnodes=enr:-Iu4QG...wgiMo,enr:-Iu4QL...wgiMo
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_DISCOVERY_BOOTNODES=enr:-Iu4QG...wgiMo,enr:-Iu4QL...wgiMo
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-discovery-bootnodes: ["enr:-Iu4QG...wgiMo",
                          "enr:-Iu4QL...wgiMo"]
```

  </TabItem>
</Tabs>

A comma-separated list of Ethereum Node Records (ENRs) for P2P discovery bootstrap.

### `p2p-discovery-bootnodes-url`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--p2p-discovery-bootnodes-url=<URL>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--p2p-discovery-bootnodes-url=/etc/bootnodes.txt
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_DISCOVERY_BOOTNODES_URL=/etc/bootnodes.txt
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-discovery-bootnodes-url: "/etc/bootnodes.txt"
```

  </TabItem>
</Tabs>

A URL or file that contains a list of [Ethereum Node Records (ENRs)](https://ethereum.org/en/developers/docs/networking-layer/network-addresses/) for P2P discovery bootstrap.
The file should have one ENR per line.

:::note
If the URL or file is unable to load, Teku will fail to start up.
:::

### `p2p-discovery-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--p2p-discovery-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--p2p-discovery-enabled=false
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_DISCOVERY_ENABLED=false
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-discovery-enabled: false
```

  </TabItem>
</Tabs>

Enables or disables P2P peer discovery.
If disabled, [`p2p-static-peers`](#p2p-static-peers) or [`p2p-static-peers-url`](#p2p-static-peers-url) defines the peer connections.
The default is `true`.

### `p2p-discovery-site-local-addresses-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--p2p-discovery-site-local-addresses-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--p2p-discovery-site-local-addresses-enabled
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_DISCOVERY_SITE_LOCAL_ADDRESSES_ENABLED=true
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-discovery-site-local-addresses-enabled: true
```

  </TabItem>
</Tabs>

Enables or disables discovery of the following local network (RFC1918) addresses.
The default is `false`.

```text
10.0.0.0      -   10.255.255.255  (10/8 prefix)
172.16.0.0    -   172.31.255.255  (172.16/12 prefix)
192.168.0.0   -   192.168.255.255 (192.168/16 prefix)
```

Normal Teku operation shouldn't send traffic to these local network addresses.

In test or private networks, operators might need to enable discovery of local addresses.
For example, when you run multiple consensus layer nodes in one local network, these nodes are not
discovered on the public internet and are advertised with local (RFC1918) addresses.

### `p2p-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--p2p-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--p2p-enabled=false
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_ENABLED=false
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-enabled: false
```

  </TabItem>
</Tabs>

Enables or disables all P2P communication. The default is `true`.

### `p2p-interface`, `p2p-interfaces`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--p2p-interface=<HOST>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--p2p-interface=192.168.1.132
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_INTERFACE=192.168.1.132
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-interface: "192.168.1.132"
```

  </TabItem>
</Tabs>

The network interfaces on which the node listens for P2P communication.
The default is `0.0.0.0` (all interfaces).
You can define up to two interfaces, with one being IPv4 and the other IPv6.

### `p2p-nat-method`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--p2p-nat-method=<STRING>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--p2p-nat-method=UPNP
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_NAT_METHOD=UPNP
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-nat-method: "UPNP"
```

  </TabItem>
</Tabs>

The method for handling [NAT environments](../../how-to/find-and-connect/specify-nat.md).
Valid options are `NONE` and `UPNP`.

The default is `NONE`, which disables NAT functionality.

:::tip

UPnP support is often disabled by default in networking firmware.
If disabled by default, explicitly enable UPnP support.

:::

### `p2p-peer-lower-bound`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--p2p-peer-lower-bound=<INTEGER>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--p2p-peer-lower-bound=25
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_PEER_LOWER_BOUND=25
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-peer-lower-bound: 25
```

  </TabItem>
</Tabs>

The lower bound on the target number of peers.
Teku actively seeks new peers if the number of peers falls below this value.
The default is `64`.

### `p2p-peer-upper-bound`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--p2p-peer-upper-bound=<INTEGER>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--p2p-peer-upper-bound=40
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_PEER_UPPER_BOUND=40
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-peer-upper-bound: 40
```

  </TabItem>
</Tabs>

The upper bound on the target number of peers.
Teku refuses new peer requests that would cause the number of peers to exceed this value.
The default is `100`.

### `p2p-port`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--p2p-port=<PORT>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--p2p-port=1789
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_PORT=1789
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-port: 1789
```

  </TabItem>
</Tabs>

The P2P listening ports (UDP and TCP). The default is `9000`.

### `p2p-port-ipv6`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--p2p-port-ipv6=<PORT>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--p2p-port-ipv6=1790
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_PORT_IPV6=1790
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-port-ipv6: 1790
```

  </TabItem>
</Tabs>

The P2P listening ports (UDP and TCP) for [IPv6](../../how-to/find-and-connect/configure-ipv6.md)
when listening over both IPv4 and IPv6.
The default is `9090`.

### `p2p-private-key-file`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--p2p-private-key-file=<PATH_TO_FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--p2p-private-key-file=/home/me/me_node/key
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_PRIVATE_KEY_FILE=/home/me/me_node/key
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-private-key-file: "/home/me/me_node/key"
```

  </TabItem>
</Tabs>

The file containing the [node's private key](../../concepts/p2p-networking.md#node-identity-and-private-key).

If a file doesn't exist at the specified path, Teku creates a new file and P2P private key to store inside.

If you don't specify this option, Teku looks for a `generated-node-key.dat` file in the
`<data-beacon-path>/kvstore` directory, where `<data-beacon-path>` is set using the
[`--data-beacon-path`](#data-beacon-path) option.
If the file doesn't exist, Teku generates a P2P private key and writes it to that file.
If the file already exists, Teku uses the stored key.

:::important

Ensure you specify the complete file path, including the file name, and not only the directory location.

:::

### `p2p-quic-port`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--p2p-quic-port=<PORT>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--p2p-quic-port=1801
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_QUIC_PORT=1801
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-quic-port: 1801
```

  </TabItem>
</Tabs>

The P2P QUIC listening port (UDP).
The default is `9001`.

### `p2p-quic-port-ipv6`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--p2p-quic-port-ipv6=<PORT>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--p2p-quic-port-ipv6=1802
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_QUIC_PORT_IPV6=1802
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-quic-port-ipv6: 1802
```

  </TabItem>
</Tabs>

The P2P QUIC listening port (UDP) for [IPv6](../../how-to/find-and-connect/configure-ipv6.md) when
listening over both IPv4 and IPv6.
The default is `9091`.

### `p2p-static-peers`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--p2p-static-peers=<ADDRESS>[,<ADDRESS>...]...
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--p2p-static-peers=/ip4/151.150.191.80/tcp/9000/p2p/16Ui...aXRz,/ip4/151.150.191.80/tcp/9000/p2p/16Ui...q6f1
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_STATIC_PEERS=/ip4/151.150.191.80/tcp/9000/p2p/16Ui...aXRz,/ip4/151.150.191.80/tcp/9000/p2p/16Ui...q6f1
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-static-peers: ["/ip4/151.150.191.80/tcp/9000/p2p/16Ui...aXRz",
                    "/ip4/151.150.191.80/tcp/9000/p2p/16Ui...q6f1"]
```

  </TabItem>
</Tabs>

A comma-separated list of
[multiaddresses](https://libp2p.io/guides/addressing/) of static peers with
which to establish and maintain connections.

### `p2p-static-peers-url`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--p2p-static-peers-url=<URL>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--p2p-static-peers-url=https://my-peers-url
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_STATIC_PEERS_URL=https://my-peers-url
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-static-peers-url: "https://my-peers-url"
```

  </TabItem>
</Tabs>

A URL or file that contains a list of
[multiaddresses](https://libp2p.io/guides/addressing/) of static peers with
which to establish and maintain connections. The file should have one peer per line.

:::note
If the URL or file is unable to load, Teku will fail to start up.
:::

### `p2p-subscribe-all-custody-subnets-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--p2p-subscribe-all-custody-subnets-enabled=<BOOLEAN>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--p2p-subscribe-all-custody-subnets-enabled=true
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_SUBSCRIBE_ALL_CUSTODY_SUBNETS_ENABLED=true
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-subscribe-all-custody-subnets-enabled: true
```

  </TabItem>
</Tabs>

Enables or disables forcing the beacon node to stay subscribed to all custody
subnets, storing and providing all custody sidecars regardless of the
number of validators.
The default is `false`.

When set to `false`, Teku subscribes to the number of persistent subnets
required by the protocol, which is calculated by the number of validators and
the balance of consolidated validators: 1 subnet per each 32 ETH of balance,
but no less than 8 subnets.

This option is a mostly altruistic feature for a node with an excess of resources
that could be dedicated to serving network stability. When enabled, the option turns the node
into a [supernode](https://github.com/ethereum/consensus-specs/blob/master/specs/fulu/p2p-interface.md#supernodes).
If the node is required to provide blob data via the Beacon API, it's required
to be a supernode; otherwise, the node doesn't have all data for blob
reconstruction.

:::caution

When this option is set to `true`, Teku uses significantly more storage, bandwidth and CPU.
Most users don't need to use this option.

:::

### `p2p-subscribe-all-subnets-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--p2p-subscribe-all-subnets-enabled=<BOOLEAN>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--p2p-subscribe-all-subnets-enabled=true
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_SUBSCRIBE_ALL_SUBNETS_ENABLED=true
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-subscribe-all-subnets-enabled: true
```

  </TabItem>
</Tabs>

Enables or disables forcing the beacon node to stay subscribed to all subnets regardless of the
number of validators.
The default is `false`.

When set to `false`, Teku subscribes to two persistent subnets regardless of the number of validators.
Teku also subscribes and unsubscribes from subnets as needed for the running validators.

This option is primarily for users running an external validator client and load balancing it across
multiple beacon nodes.
Without this flag, depending on how requests are load balanced, the beacon nodes may not have
subscribed to the required subnets and be unable to produce aggregates.

:::caution

When set to `true`, Teku uses more CPU and bandwidth, and for most users there's no need to use this option.

:::

### `p2p-udp-port`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--p2p-udp-port=<PORT>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--p2p-udp-port=1789
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_UDP_PORT=1789
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-udp-port: 1789
```

  </TabItem>
</Tabs>

The UDP port used for discovery. The default is the port specified in [`--p2p-port`](#p2p-port).

### `p2p-udp-port-ipv6`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--p2p-udp-port-ipv6=<PORT>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--p2p-udp-port-ipv6=1790
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_P2P_UDP_PORT_IPV6=1790
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
p2p-udp-port-ipv6: 1790
```

  </TabItem>
</Tabs>

The [IPv6](../../how-to/find-and-connect/configure-ipv6.md) UDP port used for discovery.
Use this port only when listening over both IPv4 and IPv6.
The default is the port specified in [`--p2p-port-ipv6`](#p2p-port-ipv6).

### `reconstruct-historic-states`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--reconstruct-historic-states=<BOOLEAN>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--reconstruct-historic-states=true
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_RECONSTRUCT_HISTORIC_STATES=true
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
reconstruct-historic-states: true
```

  </TabItem>
</Tabs>

Enables or disables [reconstructing historical states](../../how-to/reconstruct-historical-states.md).

When set to `true`, an archive node can reconstruct historical states from genesis up to the current
checkpoint, running during start up.
When set to `false`, this function is disabled.

### `rest-api-cors-origins`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--rest-api-cors-origins[=<url>[,<url>...]...] or "*"
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--rest-api-cors-origins="http://medomain.com","https://meotherdomain.com"
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_REST_API_CORS_ORIGINS="http://medomain.com","https://meotherdomain.com"
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
rest-api-cors-origins: ["http://medomain.com","https://meotherdomain.com"]
```

  </TabItem>
</Tabs>

A list of domain URLs for CORS validation.
You must enclose the URLs in double quotes and separate them with commas.

Listed domains can access the node using HTTP REST API calls.
If your client interacts with Teku using a browser app (such as a block explorer), add the client
domain to the list.

The default is `none`.
If you don't list any domains, browser apps can't interact with your Teku node.

:::tip

For testing and development purposes, use `*` to accept requests from any domain.
We don't recommend accepting requests from any domain for production environments.

:::

### `rest-api-docs-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--rest-api-docs-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--rest-api-docs-enabled=true
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_REST_API_DOCS_ENABLED=true
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
rest-api-docs-enabled: true
```

  </TabItem>
</Tabs>

Enables or disables the REST API documentation. The default is `false`.

The documentation can be accessed at `http://<interface>:<port>/swagger-ui` where:

- `interface` is specified using [`--rest-api-interface`](#rest-api-interface)
- `port` is specified using [`--rest-api-port`](#rest-api-port)

### `rest-api-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--rest-api-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--rest-api-enabled=true
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_REST_API_ENABLED=true
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
rest-api-enabled: true
```

  </TabItem>
</Tabs>

Enables or disables the [REST API service](../rest.md).
The default is `false`.

If set to `true`, use [`--rest-api-host-allowlist`](#rest-api-host-allowlist) to limit access to
trusted parties.

### `rest-api-getblobs-sidecars-download-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--rest-api-getblobs-sidecars-download-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--rest-api-getblobs-sidecars-download-enabled=true
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
REST_API_GETBLOBS_SIDECARS_DOWNLOAD_ENABLED=true
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
rest-api-getblobs-sidecars-download-enabled: true
```

  </TabItem>
</Tabs>

Enables the `getBlobs` REST API to retrieve missing blob sidecars from the P2P network via RPC.

When set to `true`, if required sidecars are not available locally, the node attempts to fetch them from peers.
Successfully retrieved sidecars are persisted to the local database to satisfy subsequent requests.
This allows nodes to serve blob data without being configured for full custody, while custody backfill is in progress,
or for requests outside the local retention period (if peers still hold the data).

:::note

Retrieved sidecars are treated as standard custody data and are subject to the network pruning [retention limits](https://github.com/ethereum/consensus-specs/blob/master/specs/fulu/validator.md#sidecar-retention).

:::

### `rest-api-getblobs-sidecars-download-timeout`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--rest-api-getblobs-sidecars-download-timeout=<INTEGER>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--rest-api-getblobs-sidecars-download-timeout=10
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
REST_API_GETBLOBS_SIDECARS_DOWNLOAD_TIMEOUT=10
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
rest-api-getblobs-sidecars-download-timeout: 10
```

  </TabItem>
</Tabs>

Specifies the maximum time in seconds to wait for blob sidecars to be retrieved from the P2P network when serving `getBlobs` requests.

If the timeout is reached before the required sidecars are retrieved, the reconstruction attempt is aborted.
This option is only effective when [`--rest-api-getblobs-sidecars-download-enabled`](#rest-api-getblobs-sidecars-download-enabled) is set to `true`. The default is `5`.

### `rest-api-host-allowlist`

<Tabs>
 <TabItem value="Syntax" label="Syntax" default>

```bash
--rest-api-host-allowlist=<hostname>[,<hostname>...]... or "*"
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--rest-api-host-allowlist=localhost,127.0.0.1,10.0.0.1
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_REST_API_HOST_ALLOWLIST=localhost,127.0.0.1,10.0.0.1
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
rest-api-host-allowlist: ["localhost", "127.0.0.1", "10.0.0.1"]
```

  </TabItem>
</Tabs>

A comma-separated list of hostnames or IP addresses from which the REST API server will respond.
This flag restricts the server's responding addresses, but not the client access.

By default, Teku's REST API server responds only to requests where the `Host` header matches `localhost` or `127.0.0.1`.
If you specify values, the server will only respond to requests where the `Host` header matches one of the specified hosts or IP addresses.

You can configure the API to listen on all network interfaces using [`rest-api-interface="0.0.0.0"`](#rest-api-interface)
and allow connections from specific addresses by setting `rest-api-host-allowlist`.
See [configure the API for network interfaces and host allowlist](../rest.md#configure-the-api-for-network-interfaces-and-host-allowlist)
for more information.

:::tip

To allow all hostnames, use "*". We don't recommend allowing all hostnames for production environments.

:::

:::warning

Only trusted parties should access the REST API.
Do not directly expose these APIs publicly on production nodes.

:::

### `rest-api-interface`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--rest-api-interface=<HOST>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
# to listen on all interfaces
--rest-api-interface=0.0.0.0
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_REST_API_INTERFACE=0.0.0.0
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
rest-api-interface: "0.0.0.0"
```

  </TabItem>
</Tabs>

The interface on which the REST API listens. The default is `127.0.0.1`.

### `rest-api-port`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--rest-api-port=<PORT>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
# to listen on port 3435
--rest-api-port=3435
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_REST_API_PORT=3435
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
rest-api-port: 3435
```

  </TabItem>
</Tabs>

The REST API listening port (HTTP). The default is `5051`.

### `sentry-config-file`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--sentry-config-file=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--sentry-config-file=/etc/sentry-node-config.json
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_SENTRY_CONFIG_FILE=/etc/sentry-node-config.json
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
sentry-config-file: "/etc/sentry-node-config.json"
```

  </TabItem>
</Tabs>

The path to the [sentry node](../../how-to/use-sentry-nodes.md) configuration file.
The default is `none`.

:::caution

You can't use this option with
[`--beacon-node-api-endpoint`](subcommands/validator-client.md#beacon-node-api-endpoint-beacon-node-api-endpoints).

:::

### `shut-down-when-validator-slashed-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--shut-down-when-validator-slashed-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--shut-down-when-validator-slashed-enabled=true
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_SHUT_DOWN_WHEN_VALIDATOR_SLASHED_ENABLED=true
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
shut-down-when-validator-slashed-enabled: true
```

  </TabItem>
</Tabs>

Enables or disables [validators slashing detection](../../how-to/prevent-slashing/detect-slashing.md).
The default is `false`.

### `validator-api-bearer-file`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validator-api-bearer-file=<PATH>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--validator-api-bearer-file=/etc/teku/validator-api-bearer-file
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATOR_API_BEARER_FILE=/etc/teku/validator-api-bearer-file
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validator-api-bearer-file: "/etc/teku/validator-api-bearer-file"
```

  </TabItem>
</Tabs>

The path to the file containing the [validator client API](../rest.md#enable-the-validator-client-api) bearer token.
If the file exists, the password is loaded from this file.
If the file does not exist and the path is writeable, a bearer token is automatically generated.

By default, the bearer file is generated as `validator-api-bearer` in the `validator/key-manager` path.

### `validator-api-cors-origins`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validator-api-cors-origins="<URL>"[,"<URL>",...] or "*"
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--validator-api-cors-origins="http://medomain.com","https://meotherdomain.com"
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATOR_API_CORS_ORIGINS="http://medomain.com","https://meotherdomain.com"
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validator-api-cors-origins: ["http://medomain.com","https://meotherdomain.com"]
```

  </TabItem>
</Tabs>

A comma-separated list of domain URLs for CORS validation.

Listed domains can access the node using validator API calls.
If your client interacts with Teku using a browser app (such as a block explorer), add the client
domain to the list.

The default is `none`.
If you don't list any domains, browser apps can't interact with your Teku node.

:::tip

For testing and development purposes, use `*` to accept requests from any domain.
We don't recommend accepting requests from any domain for production environments.

:::

### `validator-api-docs-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validator-api-docs-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--validator-api-docs-enabled=true
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATOR_API_DOCS_ENABLED=true
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validator-api-docs-enabled: true
```

  </TabItem>
</Tabs>

Enables or disables the [validator client API](../rest.md#enable-the-validator-client-api) documentation.
The default is `false`.

When enabling the API documentation endpoint, you must also specify:

- `interface` by using [`--validator-api-interface`](#validator-api-interface).
- `port` by using [`--validator-api-port`](#validator-api-port).

### `validator-api-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validator-api-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--validator-api-enabled=true
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATOR_API_ENABLED=true
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validator-api-enabled: true
```

  </TabItem>
</Tabs>

Set to `true` to enable the [validator client API](../rest.md#enable-the-validator-client-api).
The default is `false`.

If set to `true`, then use [`--validator-api-host-allowlist`](#validator-api-host-allowlist) to
limit access to trusted parties.

### `validator-api-host-allowlist`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validator-api-host-allowlist=<hostname>[,<hostname>...]... or "*"
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--validator-api-host-allowlist=medomain.com,meotherdomain.com
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATOR_API_HOST_ALLOWLIST=medomain.com,meotherdomain.com
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validator-api-host-allowlist: ["medomain.com", "meotherdomain.com"]
```

  </TabItem>
</Tabs>

A comma-separated list of hostnames to allow access to the
[validator client API](../rest.md#enable-the-validator-client-api).
By default, Teku accepts access from `localhost` and `127.0.0.1`.

:::warning

Only trusted parties should access the API.
Do not directly expose these APIs publicly on production nodes.

We don't recommend allowing all hostnames (`"*"`) for production environments.

:::

### `validator-api-interface`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validator-api-interface=<HOST>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
# to listen on all interfaces
--validator-api-interface=0.0.0.0
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATOR_API_INTERFACE=0.0.0.0
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validator-api-interface: "0.0.0.0"
```

  </TabItem>
</Tabs>

The interface on which the [validator client API](../rest.md#enable-the-validator-client-api) listens.
The default is `127.0.0.1`.

### `validator-api-keystore-file`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validator-api-keystore-file=<keystoreFile>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--validator-api-keystore-file=validator_keystorstore.p12
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATOR_API_KEYSTORE_FILE=validator_keystore.p12
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validator-api-keystore-file: "validator_keystore.p12"
```

  </TabItem>
</Tabs>

The keystore file for the [validator client API](../rest.md#enable-the-validator-client-api).
Teku can use PKCS12 or JKS keystore types.
You must [create a keystore](../../how-to/use-external-signer/manage-keys.md#create-a-keystore) to
enable access.

### `validator-api-keystore-password-file`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validator-api-keystore-password-file=<keystorePasswordFile>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--validator-api-keystore-password-file=validator_keystore_pass.txt
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATOR_API_KEYSTORE_PASSWORD_FILE=validator_keystore_pass.txt
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validator-api-keystore-password-file: "validator_keystore_pass.txt"
```

  </TabItem>
</Tabs>

The password used to decrypt the keystore for the [validator REST API](../rest.md#enable-the-validator-client-api).

### `validator-api-port`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validator-api-port=<PORT>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--validator-api-port=5052
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATOR_API_PORT=5052
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validator-api-port: 5052
```

  </TabItem>
</Tabs>

The [validator client API](../rest.md#enable-the-validator-client-api) listening port (HTTP).
The default is `5052`.

### `validators-builder-registration-default-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validators-builder-registration-default-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--validators-builder-registration-default-enabled=true
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_BUILDER_REGISTRATION_DEFAULT_ENABLED=true
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-builder-registration-default-enabled: true
```

  </TabItem>
</Tabs>

Enables or disables registering all validators managed by the validator client to the
[builder endpoint](../../how-to/configure/builder-network.md) when proposing a block.

### `validators-builder-registration-default-gas-limit`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validators-builder-registration-default-gas-limit=<NUMBER>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--validators-builder-registration-default-gas-limit=40000000
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_BUILDER_REGISTRATION_DEFAULT_GAS_LIMIT=40000000
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-builder-registration-default-gas-limit: 40000000
```

  </TabItem>
</Tabs>

The gas limit used for [registering validators to the builder endpoint](../../how-to/configure/builder-network.md#2-register-the-validator).
The default is `60000000`.

### `validators-early-attestations-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validators-early-attestations-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--validators-early-attestations-enabled=false
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_EARLY_ATTESTATIONS_ENABLED=false
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-early-attestations-enabled: false
```

  </TabItem>
</Tabs>

Enables or disables using Teku's built-in early attestation production, which creates an attestation
as soon as a block is received.
The default is `true`.

Set this option to `false` if running a validator client connected to a load balanced beacon node
(including most hosted beacon nodes such as [Infura]), and validator effectiveness is poor.

:::note

Delaying attestation production increases the chances of generating a correct attestation when using
a load balanced beacon node, but it increases the risk of inclusion delays.

:::

### `validators-external-signer-keystore`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validators-external-signer-keystore=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--validators-external-signer-keystore=teku_client_keystore.p12
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_EXTERNAL_KEYSTORE=teku_client_keystore.p12
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-external-signer-keystore: "teku_client_keystore.p12"
```

  </TabItem>
</Tabs>

The keystore that Teku presents to the external signer for TLS authentication.
Teku can use PKCS12 or JKS keystore types.

Use the PKCS12 keystore type if connecting to Web3Signer.

### `validators-external-signer-keystore-password-file`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validators-external-signer-keystore-password-file=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--validators-external-signer-keystore-password-file=keystore_pass.txt
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_EXTERNAL_KEYSTORE_PASSWORD_FILE=keystore_pass.txt
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-external-signer-keystore-password-file: "keystore_pass.txt"
```

  </TabItem>
</Tabs>

The password file used to decrypt the keystore.

### `validators-external-signer-public-keys`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validators-external-signer-public-keys=<KEY>[,<KEY>...]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--validators-external-signer-public-keys=0xa99a...e44c,0xb89b...4a0b
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_EXTERNAL_SIGNER_PUBLIC_KEYS=0xa99a...e44c,0xb89b...4a0b
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-external-signer-public-keys: ["0xa99a...e44c","0xb89b...4a0b"]
```

  </TabItem>
</Tabs>

A list or URL of validator public keys used by an external signer (for example, Web3Signer).

Use the URL to load the public keys from a remote service. For example:

```bash
--validators-external-signer-public-keys=http://localhost:9900/api/v1/eth2/publicKeys
```

Use the value `external-signer` to load all public keys managed by the external signer.
Teku automatically queries the external signer's
[public keys endpoint](https://consensys.github.io/web3signer/#tag/Public-Key).

```bash
--validators-external-signer-public-keys=external-signer
```

:::tip

You can [load new validators without restarting Teku] if you specify a URL from which to load the
public keys.

:::

Ensure the external signer is running before starting Teku.

### `validators-external-signer-slashing-protection-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validators-external-signer-slashing-protection-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--validators-external-signer-slashing-protection-enabled=false
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_EXTERNAL_SIGNER_SLASHING_PROTECTION_ENABLED=false
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-external-signer-slashing-protection-enabled: false
```

  </TabItem>
</Tabs>

Enables or disables using Teku's built-in [slashing protection] when using an external signer such
as [Web3Signer].
The default is `true`.

Set this option to `false` if using the slashing protection implemented by an external signer.

:::warning

Ensure the external signer has slashing protection enabled before disabling Teku slashing
protection, otherwise a validator may get slashed.

:::

Built-in slashing protection can only be disabled for validators using external signers.
Validators using Teku to sign blocks and attestations always uses its built-in slashing protection.

### `validators-external-signer-timeout`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validators-external-signer-timeout=<INTEGER>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--validators-external-signer-timeout=2000
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_EXTERNAL_SIGNER_TIMEOUT=2000
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-external-signer-timeout: 2000
```

  </TabItem>
</Tabs>

The timeout in milliseconds for requests to the external signer. The default is `5000`.

### `validators-external-signer-truststore`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validators-external-signer-truststore=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--validators-external-signer-truststore=websigner_truststore.p12
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_EXTERNAL_TRUSTSTORE=websigner_truststore.p12
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-external-signer-truststore: "websigner_truststore.p12"
```

  </TabItem>
</Tabs>

The PKCS12 or JKS keystore used to trust external signer's self-signed certificate or CA certificate
which signs the external signer's certificate.

### `validators-external-signer-truststore-password-file`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validators-external-signer-truststore-password-file=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--validators-external-signer-truststore-password-file=truststore_pass.txt
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_EXTERNAL_TRUSTSTORE_PASSWORD_FILE=truststore_pass.txt
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-external-signer-truststore-password-file: "truststore_pass.txt"
```

  </TabItem>
</Tabs>

The password file used to decrypt the keystore.

### `validators-external-signer-url`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validators-external-signer-url=<URL>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--validators-external-signer-url=http://localhost:9000
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_EXTERNAL_SIGNER_URL=http://localhost:9000
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-external-signer-url: "http://localhost:9000"
```

  </TabItem>
</Tabs>

The URL on which the external signer (for example, Web3Signer) is running.

### `validators-graffiti`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validators-graffiti=<STRING>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--validators-graffiti="Teku validator"
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_GRAFFITI="Teku validator"
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-graffiti: "Teku validator"
```

  </TabItem>
</Tabs>

The graffiti to add when creating a block.
This is converted to bytes and padded to `Bytes32`.

The same graffiti is used for all validators started with this beacon node.

[`--validators-graffiti-file`](#validators-graffiti-file) takes precedence if both options are set.

### `validators-graffiti-file`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validators-graffiti-file=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--validators-graffiti-file=/Users/me/mynode/graffiti.txt
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_GRAFFITI_FILE=/Users/me/mynode/graffiti.txt
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-graffiti-file: "/Users/me/mynode/graffiti.txt"
```

  </TabItem>
</Tabs>

The file containing the validator graffiti to add when creating a block.
The file contents are converted to bytes and padded to `Bytes32`.
The same graffiti is used for all validators started with this beacon node.

You can overwrite the file while Teku is running to update the graffiti.

This option takes precedence over [`--validators-graffiti`](#validators-graffiti).

### `validators-graffiti-client-append-format`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validators-graffiti-client-append-format=<STRING>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--validators-graffiti-client-append-format=CLIENT_CODES
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_GRAFFITI_CLIENT_APPEND_FORMAT=CLIENT_CODES
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-graffiti-client-append-format: CLIENT_CODES
```

  </TabItem>
</Tabs>

Appends consensus layer (CL) and execution layer (EL) clients' information to the validator graffiti.
When running a beacon node and validator client separately, set this option on the beacon node.
This feature helps developers and community members analyze client diversity and block anomalies.

The default is `AUTO`.

Possible values are:

- `AUTO`: If validator graffiti is empty, it automatically updates to include information about the
  CL/EL clients, including their codes and build commits.
  For example, `TK508459f2BUbb9ba13c`:

  - `TK` represents the Teku consensus layer client.
  - `508459f2` is the Teku build commit.
  - `BU` represents the Besu execution layer client.
  - `bb9ba13c` is the Besu build commit.

  If the graffiti is set, this option calculates the space left (graffiti size is 32 bytes).
  If there are more than four characters left, it appends either the full CL/EL version information
  or one of its compact forms up to four characters (client codes only).
  For example, if the graffiti is `It's my first block`, it's updated to something similar to
  `It's my first block TK50BUbb`.

- `CLIENT_CODES`: Appends only CL/EL client codes such as `TKBU`.
  This option is useful if you're not sure if version information can be used to exploit
  vulnerabilities, or if you just don't want to share any extra information.

- `DISABLED`: Client information is not appended.
  If the graffiti is set, it goes as-is in a block, otherwise empty graffiti is used.

### `validator-is-local-slashing-protection-synchronized-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validator-is-local-slashing-protection-synchronized-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--validator-is-local-slashing-protection-synchronized-enabled=true
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATOR_IS_LOCAL_SLASHING_PROTECTION_SYNCHRONIZED_ENABLED=true
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validator-is-local-slashing-protection-synchronized-enabled: true
```

  </TabItem>
</Tabs>

Enables or disables performing slashing protection checks in a sequential manner.

When set to `true`, Teku performs slashing protection checks sequentially.
Sequential checks restrict the throughput of duties, and under some scenarios, can improve
performance to allow more granular in-process locking of slashing protection data.

When set to `false`, Teku performs slashing protection checks concurrently.
The local slashing protection process can check if signing is safe for multiple
keys concurrently, reducing latencies experienced while performing these checks.

The default is `true`.

### `validator-keys`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validator-keys=<KEY_DIR>:<PASS_DIR> | <KEY_FILE>:<PASS_FILE>[,<KEY_DIR>:<PASS_DIR> | <KEY_FILE>:<PASS_FILE>...]...
```

  </TabItem>
  <TabItem value="Example for directory" label="Example for directory" >

```bash
--validator-keys=/home/validator/keys:home/validator/passwords
```

  </TabItem>
  <TabItem value="Example for file" label="Example for file" >

```bash
--validator-keys=/home/validator/keys/validator_217179e.json:/home/validator/passwords/validator_217179e.txt
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATOR_KEYS=/home/validator/keys:home/validator/passwords
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validator-keys: "/home/validator/keys:home/validator/passwords"
```

  </TabItem>
</Tabs>

The directory or file to load the encrypted keystore files and associated password files from.
Keystore files must use the `.json` file extension, and password files must use the `.txt` file extension.

When specifying directories, Teku expects to find identically named keystore and password files.
For example `validator_217179e.json` and `validator_217179e.txt`.

:::tip

You can [load new validators without restarting Teku] if you specify a directory from which to load
the keystore files.

:::

When specifying file names, Teku expects that the files exist.

### `validators-keystore-locking-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validators-keystore-locking-enabled=<BOOLEAN>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--validators-keystore-locking-enabled=true
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_KEYSTORE_LOCKING_ENABLED=true
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-keystore-locking-enabled: true
```

  </TabItem>
</Tabs>

Enables or disables locking the keystore files listed in [`--validator-keys`](#validator-keys).
The default is `true`.

Attempts to lock all keystores in a directory if a directory is specified in [`--validator-keys`](#validator-keys).

### `validators-performance-tracking-mode`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validators-performance-tracking-mode=<STRING>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--validators-performance-tracking-mode=LOGGING
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_PERFORMANCE_TRACKING_MODE=LOGGING
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-performance-tracking-mode: LOGGING
```

  </TabItem>
</Tabs>

The validator performance tracking strategy.
Valid options are `LOGGING`, `METRICS`, `ALL`, and `NONE`.
The default is `ALL`.

When set to `LOGGING`, attestation and block performance are reported as log messages.
When set to `METRICS`, attestation and block performance are reported using [metrics] in the
[`VALIDATOR_PERFORMANCE`](#metrics-categories) metrics category.

### `validators-proposer-config`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validators-proposer-config=<STRING>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--validators-proposer-config=/home/me/node/proposerConfig.json
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_PROPOSER_CONFIG=/home/me/node/proposerConfig.json
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-proposer-config: "/home/me/node/proposerConfig.json"
```

  </TabItem>
</Tabs>

The remote URL or local file path to the
[proposer configuration file](../../how-to/configure/use-proposer-config-file.md).

### `validators-proposer-config-refresh-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validators-proposer-config-refresh-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--validators-proposer-config-refresh-enabled=true
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_PROPOSER_CONFIG_REFRESH_ENABLED=true
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-proposer-config-refresh-enabled: true
```

  </TabItem>
</Tabs>

Enables or disables reloading the
[proposer configuration](../../how-to/configure/use-proposer-config-file.md) on every proposer
preparation (once per epoch).
The default is `false`.

### `validators-proposer-default-fee-recipient`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--validators-proposer-default-fee-recipient=<ADDRESS>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--validators-proposer-default-fee-recipient=0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_VALIDATORS_PROPOSER_DEFAULT_FEE_RECIPIENT=0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
validators-proposer-default-fee-recipient: "0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73"
```

  </TabItem>
</Tabs>

The default recipient of transaction fees for all validator keys.
When running a validator, this is an alternative to the `fee_recipient` in the
[default proposer configuration](../../how-to/configure/use-proposer-config-file.md).

:::tip

We recommend using this option when running a beacon node serving APIs to other validator clients.

The specified fee recipient is used in rare cases when a validator requests a block production but
its fee recipient is still unknown for the beacon node.

:::

### `version`

```bash title="Syntax"
-V, --version
```

Displays the version and exits.

### `ws-checkpoint`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
--ws-checkpoint=<BLOCK_ROOT>:<EPOCH_NUMBER>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
--ws-checkpoint=0x5a642bb8f367e98c0d11426d98d28c465f8988fc960500886cb49faf0372883a:3600
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_WS_CHECKPOINT=0x5a642bb8f367e98c0d11426d98d28c465f8988fc960500886cb49faf0372883a:3600
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
ws-checkpoint: "0x5a642bb8f367e98c0d11426d98d28c465f8988fc960500886cb49faf0372883a:3600"
```

  </TabItem>
</Tabs>

A recent checkpoint within the [weak subjectivity period].
Accepts the checkpoint using `<blockRoot>:<epochNumber>`, where `<blockRoot>` must start with `0x`.

The weak subjectivity checkpoint is a recent, finalized checkpoint on the correct chain.
By supplying a weak subjectivity checkpoint, you ensure that nodes that have been offline for a long
period follow the correct chain.
It protects the node from long-range attacks by malicious actors.

Use the [`admin weak-subjectivity`](subcommands/admin.md#weak-subjectivity) subcommand to display or
clear your weak subjectivity settings.

<!-- links -->

[Infura]: https://infura.io/
[Teku metrics]: ../../how-to/monitor/use-metrics.md
[Web3Signer]: https://docs.web3signer.consensys.net/en/latest/
[slashing protection]: ../../concepts/slashing-protection.md
[weak subjectivity period]: ../../concepts/weak-subjectivity.md
[load new validators without restarting Teku]: ../../how-to/load-validators-without-restarting.md
[recent finalized checkpoint state from which to sync]: ../../get-started/checkpoint-start.md
[consensus specification]: https://github.com/ethereum/consensus-specs/tree/master/configs
[metrics]: ../../how-to/monitor/use-metrics.md
