---
title: Slashing protection
description: Learn about Teku's slashing protection.
sidebar_position: 7
---

# Slashing protection

Teku implements slashing protection to prevent validators from signing blocks or attestations based on what it has already signed.

By default, Teku also locks keystore files listed in the [`--validator-keys`](../reference/cli/index.md#validator-keys) option to prevent other processes from using it.
You can enable and disable this functionality using the [`--validators-keystore-locking-enabled`](../reference/cli/index.md#validators-keystore-locking-enabled) option.

:::warning

Teku's slashing protection does not provide protection if the same validator key is being used by multiple nodes.

:::

To protect validators from slashable offenses, Teku stores a record of the most recently signed blocks for each validator in the `<data-path>/validator/slashprotection/` directory.
One [YAML file is stored per validator] in the format `<validator-pubkey>.yml` (with no `0x` prefix).

:::note

Set `<data-path>` using the [`--data-path`](../reference/cli/index.md#data-base-path-data-path) command line option.

:::

Teku provides command line options to [import] or [export] the slashing protection file, and to [repair] slashing protection files.

:::warning

If a validator has no slashing protection file, Teku treats it as never having signed anything.
Teku creates the file the first time the validator signs.
When you move validator keys to Teku, import or create their slashing protection files before you start the validator client.

:::

:::tip

Teku also supports [doppelganger detection](../how-to/prevent-slashing/detect-doppelgangers.md)
and [validator slashing detection](../how-to/prevent-slashing/detect-slashing.md) to help
prevent slashing.
These are early access features.

:::

## Validator slashing protection file

The slashing protection file records multiple values that protects the validator from incorrectly signing blocks or attestations.

```yaml title="Example"
---
genesisValidatorsRoot: "0x9436e8a630e3162b7ed4f449b12b8a5a368a4b95bc46b941ae65c11613bfa4c1"
lastSignedBlockSlot: 71090
lastSignedAttestationSourceEpoch: 2290
lastSignedAttestationTargetEpoch: 3247
```

The following rules apply to the file:

- A validator signs a block only if the slot number is greater than `lastSignedBlockSlot`.
- A validator signs an attestation when the source epoch of the attestation is equal to or exceeds `lastSignedAttestationSourceEpoch`, and the target epoch of the attestation is greater than `lastSignedAttestationTargetEpoch`.
- `genesisValidatorsRoot` is a hash of the validators active at genesis, and is used to differentiate between different chains.
  Teku does not require this field to be present, but if it is present and differs from the required value, then Teku returns an error.

:::info

You can obtain the `genesisValidatorsRoot` value by using the [`/eth/v1/beacon/genesis`](https://consensys-incorporated.github.io/teku/#tag/Beacon/operation/getGenesis) API.

:::

These rules guarantee the validator does not sign anything that is slashable.

## Repair slashing protection files

Use the [`repair`](../how-to/prevent-slashing/repair-slashing-protection.md) command line option to
fix a damaged slashing protection file by writing a minimum slot into it.
The validator can't sign a block or attestation from before that slot.
That protects the validator when Teku has no reliable record of what the validator has already signed.
With [`--update-all-enabled`](../reference/cli/subcommands/slashing-protection.md#update-all-enabled), `repair` also creates a file for a validator key that has none.

The [`repair`](../reference/cli/subcommands/slashing-protection.md#repair) subcommand reads the `<validator-pubkey>.yml` files in the `slashprotection` directory under the validator client data directory.
It ignores files whose name isn't a validator public key.

`repair` sets a repair slot in each file it updates:

- `lastSignedBlockSlot` is set to the repair slot.
- `lastSignedAttestationSourceEpoch` and `lastSignedAttestationTargetEpoch` are set to the epoch of the repair slot.

By default, the repair slot is the current slot plus one epoch, so your validators miss at most one epoch of duties.
Teku determines the current slot from the network's initial state, or from its genesis state if the network has no initial state.
You can set the repair slot yourself with the [`--slot`](../reference/cli/subcommands/slashing-protection.md#slot) option.

`repair` only raises values.
If a file already has a higher value, `repair` keeps it.
This means `repair` can't undo a repair slot that was too high.
To lower the values, [edit the slashing protection files](../how-to/prevent-slashing/repair-slashing-protection.md#lower-the-repair-slot-values).

When Teku determines the repair slot from the network, it also checks that existing files belong to that network.
Teku uses each file's `genesisValidatorsRoot` for that check.
If any file belongs to a different network, `repair` stops without changing anything.

## Migrate the slashing protection file

Use the Teku command line options to [import] or [export] the slashing protection file. Alternatively, you can manually migrate or create the database.

### Between Teku nodes

If moving a validator from one Teku node to another, you can manually migrate the slashing protection file.

For example, to manually move the file from node A to node B:

1. Stop Teku node A and confirm the process has fully exited and won't be restarted.
1. Remove the validator key from node A, for example from the [`--validator-keys`](../reference/cli/index.md#validator-keys) option.
1. Copy the file from `<nodeA-data-path>/validator/slashprotection/` to `<nodeB-data-path>/validator/slashprotection/`.
1. Start node B with the migrated validator key.
1. Restart node A if required.

### From a non-Teku node

If you move a validator from a different client to Teku, do one of the following:

- [Import] the slashing protection file.
- Add the validator keys to the Teku configuration and, before you start the validator client, [repair] with `--update-all-enabled` to create a file for each key.
  This blocks your validators from signing until about one epoch after the repair.
- Manually [create a new slashing protection file] by setting the values based on the validator's last signing details.

To manually create the file, stop the other client to ensure it isn't signing, then set the following:

- Set `lastSignedBlockSlot` to the current chain head slot + 1.
- Set `lastSignedAttestationSourceEpoch` to the current justified checkpoint.
- Set `lastSignedAttestationTargetEpoch` to the current epoch + 1.

Start the Teku node with the validator key.

<!-- links -->

[YAML file is stored per validator]: #validator-slashing-protection-file
[repair]: ../how-to/prevent-slashing/repair-slashing-protection.md
[create a new slashing protection file]: #validator-slashing-protection-file
[import]: ../how-to/prevent-slashing/use-a-slashing-protection-file.md#import-a-slashing-protection-file
[export]: ../how-to/prevent-slashing/use-a-slashing-protection-file.md#export-a-slashing-protection-file
