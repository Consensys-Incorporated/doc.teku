---
title: migrate-database
description: Database migration subcommand options
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# `migrate-database`

[Migrate the database to a RocksDB database](../../../how-to/migrate-database.md).

:::note

As of v26.2.0, new Teku installations use a RocksDB database. Previous Teku versions use LevelDB which has been deprecated and may be removed in a future release.

:::

:::caution

Before running the database migration, you must shut down the local Teku instance and confirm the process has fully exited and won't be restarted.

:::

## `config-file`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku migrate-database --config-file=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku migrate-database --config-file=/home/me/me_node/config.yaml
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_CONFIG_FILE=/home/me/me_node/config.yaml
```

  </TabItem>
</Tabs>

Path to the [YAML configuration file](../../../how-to/configure/use-config-file.md). The default is `none`.

## `data-base-path`, `data-path`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku migrate-database --data-base-path=<PATH>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku migrate-database --data-base-path=/home/me/me_node
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

Path to the Teku data directory. The default directory is OS-dependent:

- macOS: `~/Library/teku`
- Unix/Linux: `$XDG_DATA_HOME/teku` if `$XDG_DATA_HOME` is set; otherwise `~/.local/share/teku`

The default Docker image location is `/root/.local/share/teku`.

## `data-beacon-path`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku migrate-database --data-beacon-path=<PATH>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku migrate-database --data-beacon-path=/home/me/me_node
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_DATA_BEACON_PATH=/home/me/me_node
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
data-beacon-path: "/home/me/me_node"
```

  </TabItem>
</Tabs>

Path to the beacon node data. The default is `<data-base-path>/beacon` where `<data-base-path>` is specified using [`--data-base-path`](#data-base-path-data-path).

## `network`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku migrate-database --network=<NETWORK>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku migrate-database --network=mainnet
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

Predefined network configuration. Accepts a predefined network name, or file path or URL to a YAML configuration
file. See the [consensus specification](https://github.com/ethereum/consensus-specs/tree/master/configs) for examples.

The default is `mainnet`.

Possible values are:

| Network    | Chain           | Type       | Description                                                           |
|------------|-----------------|------------|-----------------------------------------------------------------------|
| `mainnet`  | Consensus layer | Production | Main network                                                          |
| `hoodi`    | Consensus layer | Test       | Multi-client testnet                                                  |
| `ephemery` | Consensus layer | Test       | Multi-client testnet                                                  |
| `sepolia`  | Consensus layer | Test       | Multi-client testnet                                                  |
| `minimal`  | Consensus layer | Test       | Used for local testing and development networks                       |
| `gnosis`   | Consensus layer | Production | Network for the [Gnosis chain](https://www.gnosis.io/)                |
| `chiado`   | Consensus layer | Test       | Gnosis [testnet](https://docs.gnosischain.com/about/networks/chiado/) |
| `lukso`    | Consensus layer | Production | Network for the [Lukso chain](https://lukso.network/)                 |
