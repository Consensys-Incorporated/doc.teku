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

Teku provides command line options to [import] or [export] the slashing protection file.

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

You can obtain the `genesisValidatorsRoot` value by using the [`/eth/v1/beacon/genesis`](https://consensys.github.io/teku/#tag/Beacon/operation/getGenesis) API.

:::

These rules guarantee the validator does not sign anything that is slashable.

## Migrate the slashing protection file

Use the Teku command line options to [import] or [export] the slashing protection file. Alternatively, you can manually migrate or create the database.

### Between Teku nodes

If moving a validator from one Teku node to another, you can manually migrate the slashing protection file.

For example, to manually move the file from node A to node B:

1. Stop Teku node A and confirm the process has fully exited and won't be restarted.
1. Remove the validator key from node A, for example from the [`--validator-keys`](../reference/cli/index.md#validator-keys) option.
1. Copy the file from `<nodeA-data-path>/validators/slashprotection/` to `<nodeB-data-path>/validators/slashprotection/`.
1. Start node B with the migrated validator key.
1. Restart node A if required.

### From a non-Teku node

If moving a validator from a different client to Teku, you can do either of the following:

- Manually [create a new slashing protection file] by setting the values based on the validator's last signing details.
- [Import] the slashing protection file.

To manually create the file, stop the other client to ensure it isn't signing, then set the following:

- Set `lastSignedBlockSlot` to the current chain head slot + 1.
- Set `lastSignedAttestationSourceEpoch` to the current justified checkpoint.
- Set `lastSignedAttestationTargetEpoch` to the current epoch + 1.

Start the Teku node with the validator key.

<!-- links -->

[YAML file is stored per validator]: #validator-slashing-protection-file
[create a new slashing protection file]: #validator-slashing-protection-file
[import]: ../how-to/prevent-slashing/use-a-slashing-protection-file.md#import-a-slashing-protection-file
[export]: ../how-to/prevent-slashing/use-a-slashing-protection-file.md#export-a-slashing-protection-file
