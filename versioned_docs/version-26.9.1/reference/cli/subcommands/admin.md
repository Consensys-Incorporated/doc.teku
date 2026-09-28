---
title: admin
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# `admin`

Used to perform administrative tasks.

## `weak-subjectivity`

Display or clear weak subjectivity configuration.

### `clear-state`

Clears the stored weak subjectivity configuration.

#### `config-file`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku admin weak-subjectivity clear-state --config-file=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku admin weak-subjectivity clear-state --config-file=/home/me/me_node/config.yaml
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_CONFIG_FILE=/home/me/me_node/config.yaml
```

  </TabItem>
</Tabs>

Path to the YAML configuration file. The default is `none`.

#### `data-base-path`, `data-path`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku admin weak-subjectivity clear-state --data-base-path=<PATH>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku admin weak-subjectivity clear-state --data-base-path=/home/me/me_node
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

#### `data-beacon-path`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku admin weak-subjectivity clear-state --data-beacon-path=<PATH>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku admin weak-subjectivity clear-state --data-beacon-path=/home/me/me_beacon
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_DATA_BEACON_PATH=/home/me/me_beacon
```

  </TabItem>
  <TabItem value="Configuration file" label="Configuration file" >

```bash
data-beacon-path: "/home/me/me_beaon"
```

  </TabItem>
</Tabs>

Path to the beacon node data. The default is `<data-base-path>/beacon` where `<data-base-path>` is specified using [`--data-base-path`](#data-base-path-data-path).

#### `data-storage-archive-frequency`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku admin weak-subjectivity clear-state --data-storage-archive-frequency=<NUMBER>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku admin weak-subjectivity clear-state --data-storage-archive-frequency=1028
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

Set the frequency (in slots) at which to store finalized states to disk. The default is 2048.

This option is ignored if [`--data-storage-mode`](#data-storage-mode) is set to `minimal`.

:::note

Specifying a larger number of slots as the archive frequency has a potentially higher overhead for retrieving
finalized states since more states may need to be regenerated to get to the requested state. Specifying a lower
number of slots as the frequency increases the disk space usage.

:::

For example, `--data-storage-archive-frequency=1` uses maximum disk space but has the lowest response time for
retrieving a finalized state since each slot state is saved, whereas `--data-storage-archive-frequency=2048` uses
less disk space, but may need to regenerate the state because every 2048th slot state is saved.

#### `data-storage-mode`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku admin weak-subjectivity clear-state --data-storage-mode=<STORAGE_MODE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku admin weak-subjectivity clear-state --data-storage-mode=archive
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

Set the strategy for handling historical chain data. Valid options are `archive`, `minimal` and `prune`. The default is [`minimal`](#data-storage-mode).

#### `data-validator-path`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku admin weak-subjectivity clear-state --data-validator-path=<PATH>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku admin weak-subjectivity clear-state --data-validator-path=/home/me/me_validator
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

Path to the validator client data. The default is `<data-base-path>/validator` where `<data-base-path>` is specified using [`--data-base-path`](#data-base-path-data-path).

#### `eth1-deposit-contract-address`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku admin weak-subjectivity clear-state --eth1-deposit-contract-address=<ADDRESS>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku admin weak-subjectivity clear-state --eth1-deposit-contract-address=0x77f7bED277449F51505a4C54550B074030d989bC
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

#### `network`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku admin weak-subjectivity clear-state --network=<NETWORK>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku admin weak-subjectivity clear-state --network=mainnet
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

Predefined network configuration. Accepts a predefined network name, or file path or URL to a YAML configuration file. The default is `mainnet`.

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

Predefined networks can provide defaults such the initial state of the network, bootnodes, and the address of the deposit contract.

### `display-state`

Displays the stored weak subjectivity configuration.

#### `config-file`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku admin weak-subjectivity display-state --config-file=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku admin weak-subjectivity display-state --config-file=/home/me/me_node/config.yaml
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_CONFIG_FILE=/home/me/me_node/config.yaml
```

  </TabItem>
</Tabs>

Path to the YAML configuration file. The default is `none`.

#### `data-base-path`, `data-path`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku admin weak-subjectivity display-state --data-base-path=<PATH>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku admin weak-subjectivity display-state --data-base-path=/home/me/me_node
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

#### `data-beacon-path`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku admin weak-subjectivity display-state --data-beacon-path=<PATH>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku admin weak-subjectivity display-state --data-beacon-path=/home/me/me_beacon
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

Path to the beacon node data. The default is `<data-base-path>/beacon` where `<data-base-path>` is specified using [`--data-base-path`](#data-base-path-data-path).

#### `data-storage-archive-frequency`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku admin weak-subjectivity display-state --data-storage-archive-frequency=<NUMBER>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku admin weak-subjectivity display-state --data-storage-archive-frequency=1028
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

Set the frequency (in slots) at which to store finalized states to disk. The default is 2048.

This option is ignored if [`--data-storage-mode`](#data-storage-mode) is not set to `archive`.

:::note

Specifying a larger number of slots as the archive frequency has a potentially higher overhead for retrieving
finalized states since more states may need to be regenerated to get to the requested state. Specifying a lower
number of slots as the frequency increases the disk space usage.

:::

For example, `--data-storage-archive-frequency=1` uses maximum disk space but has the lowest response time for
retrieving a finalized state since each slot state is saved, whereas `--data-storage-archive-frequency=2048` uses
less disk space, but may need to regenerate the state because every 2048th slot state is saved.

#### `data-storage-mode`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku admin weak-subjectivity display-state --data-storage-mode=<STORAGE_MODE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku admin weak-subjectivity display-state --data-storage-mode=archive
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

Set the strategy for handling historical chain data. Valid options are `archive`, `minimal`, and `prune`. The default is `minimal`.

#### `data-validator-path`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku admin weak-subjectivity display-state --data-validator-path=<PATH>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku admin weak-subjectivity display-state --data-validator-path=/home/me/me_validator
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

Path to the validator client data. The default is `<data-base-path>/validator` where `<data-base-path>` is specified using [`--data-base-path`](#data-base-path-data-path).

#### `eth1-deposit-contract-address`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku admin weak-subjectivity display-state --eth1-deposit-contract-address=<ADDRESS>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku admin weak-subjectivity display-state --eth1-deposit-contract-address=0x77f7bED277449F51505a4C54550B074030d989bC
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

#### `network`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku admin weak-subjectivity display-state --network=<NETWORK>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku admin weak-subjectivity display-state --network=mainnet
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

Predefined network configuration. Accepts a predefined network name, or file path or URL to a YAML configuration file. The default is `mainnet`.

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

Predefined networks can provide defaults such the initial state of the network, bootnodes, and the address of the deposit contract.
