---
title: slashing-protection
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# `slashing-protection`

Manage the local [slashing protection data] used by the validator.

## `export`

Exports the slashing protection database in the [validator client interchange format].

### `config-file`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku slashing-protection export --config-file=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku slashing-protection export --config-file=/home/me/me_node/config.yaml
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_CONFIG_FILE=/home/me/me_node/config.yaml
```

  </TabItem>
</Tabs>

Path to the YAML configuration file. The default is `none`.

### `data-path`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku slashing-protection export --data-path=<PATH>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku slashing-protection export --data-path=/home/me/me_node
```

  </TabItem>
</Tabs>

Path to the Teku data directory. The default directory is OS-dependent:

- macOS: `~/Library/teku`
- Unix/Linux: `$XDG_DATA_HOME/teku` if `$XDG_DATA_HOME` is set; otherwise `~/.local/share/teku`

### `data-validator-path`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku slashing-protection export --data-validator-path=<PATH>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku slashing-protection export --data-validator-path=/home/me/me_validator
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

Path to the validator client data. The default is `<data-path>/validator` where `<data-path>` is specified using [`--data-path`](#data-path).

:::info

Teku exports slashing protection data from the `slashprotection` directory under the validator client data directory.

:::

### `to`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku slashing-protection export --to=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku slashing-protection export --to=/home/slash/b845...23bed.json
```

  </TabItem>
</Tabs>

The file to export the slashing protection database to.

Exports the database in the [validator client interchange format].

## `import`

Imports the slashing protection database using the [validator client interchange format].

:::caution

Before running the import, you must stop the validator and confirm the process has fully exited and won't be restarted.

:::

### `config-file`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku slashing-protection import --config-file=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku slashing-protection import --config-file=/home/me/me_node/config.yaml
```

  </TabItem>
  <TabItem value="Environment variable" label="Environment variable" >

```bash
TEKU_CONFIG_FILE=/home/me/me_node/config.yaml
```

  </TabItem>
</Tabs>

Path to the YAML configuration file. The default is `none`.

### `data-path`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku slashing-protection import --data-path=<PATH>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku slashing-protection import --data-path=/home/me/me_node
```

  </TabItem>
</Tabs>

Path to the Teku data directory. The default directory is OS-dependent:

- macOS: `~/Library/teku`
- Unix/Linux: `$XDG_DATA_HOME/teku` if `$XDG_DATA_HOME` is set; otherwise `~/.local/share/teku`

### `data-validator-path`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku slashing-protection import --data-validator-path=<PATH>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku slashing-protection import --data-validator-path=/home/me/me_validator
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

Path to the validator client data. The default is `<data-path>/validator` where `<data-path>` is specified using [`--data-path`](#data-path).

:::info

Teku imports slashing protection data into a `slashprotection` directory under the validator client data directory.

:::

### `from`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku slashing-protection import --from=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku slashing-protection import --from=/home/slash/b845...23bed.json
```

  </TabItem>
</Tabs>

The file to import the slashing protection database from.

Teku imports the file to the `<data-path>/validators/slashprotection/` directory in the format `<validator-pubkey>.yml` (with no 0x prefix).

`<data-path>` is defined using [`--data-path`](#data-path).

## `repair`

Repairs corrupted slashing protection data files used by Teku.

### `check-only-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku slashing-protection repair --checking-only-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku slashing-protection repair --checking-only-enabled=false
```

  </TabItem>
</Tabs>

Reads and reports potential slashing protection file problems, but doesn't update any files. You can specify which files are checked using [`--config-file`](#config-file-2), [`--data-path`](#data-path-2).

### `config-file`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku slashing-protection repair --config-file=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku slashing-protection repair --config-file=/home/me/me_node/config.yaml
```

  </TabItem>
</Tabs>

Path to the YAML configuration file. The default is `none`.

### `data-path`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku slashing-protection repair --data-path=<PATH>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku slashing-protection repair --data-path=/home/me/me_node
```

  </TabItem>
</Tabs>

Path to the Teku data directory. The default directory is OS-dependent:

- macOS: `~/Library/teku`
- Unix/Linux: `$XDG_DATA_HOME/teku` if `$XDG_DATA_HOME` is set; otherwise `~/.local/share/teku`

The default Docker image location is `/root/.local/share/teku`.

### `data-validator-path`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku slashing-protection repair --data-validator-path=<PATH>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku slashing-protection repair --data-validator-path=/home/me/me_validator
```

  </TabItem>
</Tabs>

Path to validator client data. The default is `<data-path>/validator` where `<data-path>` is specified using [`--data-path`](#data-path).

:::info

The slashing protection data is stored in a `slashprotection` directory under the validator client data directory.

:::

### `network`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku slashing-protection repair --network=<NETWORK>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku slashing-protection repair --network=mainnet
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

Predefined networks can provide defaults such as the initial state of the network, bootnodes, and the address of the deposit contract.

### `slot`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku slashing-protection repair --slot=<INTEGER>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku slashing-protection repair --slot=1028
```

  </TabItem>
</Tabs>

Updates slashing protection files to contain the specified slot as a minimum. The value should be a future slot, or after when the validators stopped performing duties.

:::note

This can be automatically calculated for most networks, and is generally not required.

:::

### `update-all-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku slashing-protection repair --update-all-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku slashing-protection repair --update-all-enabled=false
```

  </TabItem>
</Tabs>

Enables all slashing protection records to be updated. The default is `false`.

<!-- links -->

[slashing protection data]: ../../../concepts/slashing-protection.md
[validator client interchange format]: https://eips.ethereum.org/EIPS/eip-3076
