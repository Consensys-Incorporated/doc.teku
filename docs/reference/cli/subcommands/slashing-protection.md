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

Path to the validator client data. The default is `<data-path>/validator` where `<data-path>` is specified using [`--data-path`](#data-path-1).

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

Teku imports the file to the `<data-path>/validator/slashprotection/` directory in the format `<validator-pubkey>.yml` (with no 0x prefix).

`<data-path>` is defined using [`--data-path`](#data-path-1).

## `repair`

Repairs the slashing protection files in the `slashprotection` directory under the validator client data directory, and creates them for validator keys that have none.

By default, `repair` only rewrites files that are empty, unreadable, or missing a value.
Each rewritten file records the repair slot as the last signed block, and that slot's epoch as the last signed attestation source and target epochs.
With [`--update-all-enabled`](#update-all-enabled), `repair` also raises valid files to the repair slot and creates files for validator keys that have none.
`repair` never lowers a value in a valid file.

`repair` displays the changes it will make and asks you to type `yes` before it writes any files.

:::warning

Stop the validator client before running `repair`.
A running validator client caches its slashing protection records and overwrites the repaired files.

:::

For examples, see [Repair slashing protection files](../../../how-to/prevent-slashing/repair-slashing-protection.md).

### `check-only-enabled`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku slashing-protection repair --check-only-enabled[=<BOOLEAN>]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku slashing-protection repair --check-only-enabled
```

  </TabItem>
</Tabs>

Reports the files `repair` would change, and validator keys that have no slashing protection file, without changing anything.
The default is `false`.

Without this option, `repair` also lists validator keys that have no file, but only creates files for them with [`--update-all-enabled`](#update-all-enabled).

Teku still determines the repair slot, so networks without an initial or genesis state need [`--slot`](#slot).
You can specify which files are checked using [`--config-file`](#config-file-2), [`--data-path`](#data-path-2), and [`--data-validator-path`](#data-validator-path-2).

### `checkpoint-sync-url`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku slashing-protection repair --checkpoint-sync-url=<URL>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku slashing-protection repair --checkpoint-sync-url=https://beaconstate.ethstaker.cc/
```

  </TabItem>
</Tabs>

URL of a checkpoint sync server.
If you don't specify [`--slot`](#slot), Teku downloads the finalized state from this server to determine the repair slot.

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

Use the configuration file of the node you're repairing so `repair` uses the same network, data path, and validator keys.

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

Path to the Teku data directory. `--data-base-path` is an alias for this option. The default directory is OS-dependent:

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

Path to validator client data. The default is `<data-path>/validator` where `<data-path>` is specified using [`--data-path`](#data-path-2).

:::info

The slashing protection data is stored in a `slashprotection` directory under the validator client data directory.

:::

### `genesis-state`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku slashing-protection repair --genesis-state=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku slashing-protection repair --genesis-state=/home/me/genesis.ssz
```

  </TabItem>
</Tabs>

Path or URL to an SSZ-encoded genesis state.
If you don't specify [`--slot`](#slot) and the network has no initial state, Teku uses this state to determine the repair slot.

### `initial-state`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku slashing-protection repair --initial-state=<FILE>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku slashing-protection repair --initial-state=/home/me/state.ssz
```

  </TabItem>
</Tabs>

Path or URL to an SSZ-encoded finalized checkpoint state.
If you don't specify [`--slot`](#slot), Teku uses this state to determine the repair slot.
Predefined networks provide a default.

### `network`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku slashing-protection repair --network=<NETWORK>
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku slashing-protection repair --network=hoodi
```

  </TabItem>
</Tabs>

Predefined network configuration. Accepts a predefined network name, or file path or URL to a YAML configuration file. The default is `mainnet`.

Possible values are:

| Network    | Chain           | Type       | Description                                                           |
| ---------- | --------------- | ---------- | --------------------------------------------------------------------- |
| `mainnet`  | Consensus layer | Production | Main network                                                          |
| `hoodi`    | Consensus layer | Test       | Multi-client testnet                                                  |
| `ephemery` | Consensus layer | Test       | Multi-client testnet                                                  |
| `sepolia`  | Consensus layer | Test       | Multi-client testnet                                                  |
| `minimal`  | Consensus layer | Test       | Used for local testing and development networks                       |
| `gnosis`   | Consensus layer | Production | Network for the [Gnosis chain](https://www.gnosis.io/)                |
| `chiado`   | Consensus layer | Test       | Gnosis [testnet](https://docs.gnosischain.com/about/networks/chiado/) |
| `lukso`    | Consensus layer | Production | Network for the [Lukso chain](https://lukso.network/)                 |

The network determines the slot timing and the state Teku uses to determine the repair slot.
When Teku determines the slot, it also checks that the existing files belong to this network, and stops without changing anything if any don't.

:::caution

Always specify the network of the node you're repairing, either with this option or with [`--config-file`](#config-file-2).
Repairing a testnet validator with the default `mainnet` slot would block it from signing until the testnet reaches that slot.

:::

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

The repair slot. Rewritten and created files record this slot as the last signed block, and its epoch as the last signed attestation source and target epochs.
With [`--update-all-enabled`](#update-all-enabled), valid files with a lower value are raised to it.

Use a slot after the validators last signed anything, on any machine.
If you don't specify a slot, Teku uses the current slot plus one epoch, using the network's initial state, or its genesis state if it has no initial state.
Networks without either, such as `minimal`, require this option.

:::caution

`repair` can't lower a value, so a slot that's too high can't be undone with `repair`.
When you specify a slot, Teku doesn't check that the existing files belong to the network.

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
teku slashing-protection repair --update-all-enabled
```

  </TabItem>
</Tabs>

Updates every validator's slashing protection to at least the repair [`--slot`](#slot). The default is `false`.

When enabled, `repair` also:

- Raises each value in a valid file that's lower than the repair slot or its epoch. Values that are already higher are kept, along with the file's `genesisValidatorsRoot`.
- Creates a file for each validator key that has none.
  Teku reads the keys imported with the [key manager API](https://ethereum.github.io/keymanager-APIs/), and those listed by [`--validator-keys`](#validator-keys) and [`--validators-external-signer-public-keys`](#validators-external-signer-public-keys), usually from the [configuration file](#config-file-2).
  Teku doesn't check external signer keys given as a URL or with the `external-signer` keyword, or keys it can't read, and lists them as not checked.
- Creates the `slashprotection` directory if it doesn't exist, as long as Teku found at least one validator key.

### `validator-keys`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku slashing-protection repair --validator-keys=<KEY_DIR>:<PASS_DIR> | <KEY_FILE>:<PASS_FILE> | <KEY_DIR>:<PASS_FILE>[,<KEY_DIR>:<PASS_DIR> | <KEY_FILE>:<PASS_FILE> | <KEY_DIR>:<PASS_FILE>...]...
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku slashing-protection repair --validator-keys=/home/validator/keys:/home/validator/passwords --update-all-enabled
```

  </TabItem>
</Tabs>

Keystores of the validators to check for a missing slashing protection file, in the same format as the node's [`--validator-keys`](../index.md#validator-keys) option.
Teku reads each keystore's public key without decrypting it.
The password files must exist, but Teku doesn't read them.

### `validators-external-signer-public-keys`

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
teku slashing-protection repair --validators-external-signer-public-keys=<KEY>[,<KEY>...]
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
teku slashing-protection repair --validators-external-signer-public-keys=0xa99a...e44c,0xb89b...4a0b --update-all-enabled
```

  </TabItem>
</Tabs>

Public keys of external signer validators to check for a missing slashing protection file, in the same format as the node's [`--validators-external-signer-public-keys`](../index.md#validators-external-signer-public-keys) option.
Teku doesn't fetch keys given as a URL or with the `external-signer` keyword, and lists them as not checked.

:::note

`repair` accepts other validator client options, for example from a configuration file, but ignores them.

:::

<!-- links -->

[slashing protection data]: ../../../concepts/slashing-protection.md
[validator client interchange format]: https://eips.ethereum.org/EIPS/eip-3076
