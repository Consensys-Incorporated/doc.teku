---
description: Repair or create slashing protection files so validators can't sign before a given slot.
sidebar_position: 2
---

# Repair slashing protection files

Use [`teku slashing-protection repair`](../../reference/cli/subcommands/slashing-protection.md#repair) to fix [slashing protection] files that are damaged or missing.
It writes a minimum slot into each validator's file, so the validator can't sign a block or attestation from before that slot.

Use `repair` when:

- Teku reports that a slashing protection file is empty or can't be read, and refuses to sign for that validator.
- You moved validator keys to Teku without their slashing protection data, and can't [import a slashing protection file].
- You want to make sure your validators can't sign anything before a given slot, for example after restoring a backup.

:::warning

A validator key with no slashing protection file is treated as never having signed anything, so Teku will sign any block or attestation for it.
If you moved keys without their slashing protection data, add them to the Teku configuration and run `repair` with [`--update-all-enabled`](#update-all-files-and-create-missing-ones) before starting the validator client.

:::

## How `repair` works

`repair` reads the `<validator-pubkey>.yml` files in the `slashprotection` directory under the validator client data directory (by default `<data-path>/validator/slashprotection/`).
It ignores files whose name isn't a validator public key.

`repair` uses a repair slot to update files:

- `lastSignedBlockSlot` is set to the repair slot.
- `lastSignedAttestationSourceEpoch` and `lastSignedAttestationTargetEpoch` are set to the epoch of the repair slot.

By default, Teku uses the current slot plus one epoch as the repair slot, so validators miss at most one epoch of duties.
Teku determines the current slot from the network's initial state, or its genesis state if it has no initial state.
You can set the repair slot with [`--slot`](../../reference/cli/subcommands/slashing-protection.md#slot).

`repair` only ever raises values.
If a file already has a higher value, `repair` keeps it.
This means you can't use `repair` to undo a repair slot that was too high.

When Teku determines the repair slot, it also checks that existing files belong to the network you're repairing, using their `genesisValidatorsRoot`.
If any file belongs to a different network, `repair` stops without changing anything.

## Prerequisites

- Stop the validator client.
  A running validator client caches its slashing protection records and overwrites the repaired files.
- Make sure the validators aren't running anywhere else.
  `repair` only protects against signing on this node.
- Use the same configuration as the node you're repairing, ideally with [`--config-file`](../../reference/cli/subcommands/slashing-protection.md#config-file-2).
  `repair` uses the network, data path, and validator keys from it.

:::caution

`--network` defaults to `mainnet`.
If you repair a testnet validator without specifying its network, the repair slot is mainnet's current slot, which can be years ahead of the testnet.
The validator then can't sign until the testnet reaches that slot.

:::

## Check for problems

Use [`--check-only-enabled`](../../reference/cli/subcommands/slashing-protection.md#check-only-enabled) to see what `repair` would change without changing anything:

```bash
teku slashing-protection repair --config-file=/home/me/me_node/config.yaml --check-only-enabled
```

Teku lists the files it can't read, and the validator keys that have no slashing protection file:

```text
Found 2 validator keys from keystores given by --validator-keys
a3a32b0f...7e4a9b: no slashing protection record
1 validator key has no slashing protection record, so the validator client will treat it as never having signed. --update-all-enabled would create the missing record.
Updates have been skipped as --check-only-enabled was set.
```

See [Which validator keys are checked](#which-validator-keys-are-checked) for where Teku finds the keys.

## Repair damaged files

Run `repair` with the configuration file of the node:

```bash
teku slashing-protection repair --config-file=/home/me/me_node/config.yaml
```

Teku rewrites files that are empty, can't be read, or are missing a value.
Rewritten files don't keep their `genesisValidatorsRoot`; Teku adds it again the next time the validator signs.
Valid files aren't changed.

Teku displays the repair slot and its epoch, and asks you to confirm:

```text
Computed hoodi slot 4337768, which will set attestation source/target to epoch 135555
b89bebc6...874a0b: Incomplete or invalid slashing protection data

REMINDER! If the validator is running, you should not be updating slashing protection records.
block slot -> 4337768
attestation source/target -> 135555
Are you sure you wish to continue (yes/no)?
```

Type `yes` to update the files.
Any other answer cancels the repair without changing anything.

Teku also lists validator keys that have no slashing protection file, but doesn't create files for them without `--update-all-enabled`.
If those are the only problems, Teku doesn't ask for confirmation and changes nothing.

## Update all files and create missing ones

Use [`--update-all-enabled`](../../reference/cli/subcommands/slashing-protection.md#update-all-enabled) to make sure every validator is protected up to the repair slot:

```bash
teku slashing-protection repair --config-file=/home/me/me_node/config.yaml --update-all-enabled
```

In addition to rewriting damaged files, Teku:

- Raises each value in a valid file that's lower than the repair slot or its epoch.
  Files keep their `genesisValidatorsRoot`.
- Creates a file for each [validator key it finds](#which-validator-keys-are-checked) that has none.
  If the `slashprotection` directory doesn't exist, Teku creates it, as long as it found at least one validator key.

The confirmation shows how many files Teku will create:

```text
All valid slashing protection files will also be updated.
2 new slashing protection records will be created for validator keys that don't have one.
block slot -> 4337768
attestation source/target -> 135555
Are you sure you wish to continue (yes/no)?
```

Without `--update-all-enabled`, Teku doesn't create missing files, because Teku normally creates a validator's file the first time it signs.

### Which validator keys are checked

Teku finds validator keys in:

- Keystores imported with the [key manager API](https://ethereum.github.io/keymanager-APIs/), in the `key-manager/local` directory under the validator client data directory.
- External signer keys imported with the key manager API, in the `key-manager/remote` directory under the validator client data directory.
- Keystores listed by [`--validator-keys`](../../reference/cli/subcommands/slashing-protection.md#validator-keys).
  Teku reads each keystore's public key without decrypting it.
  The password files must still exist, but Teku doesn't read them.
- Public keys listed by [`--validators-external-signer-public-keys`](../../reference/cli/subcommands/slashing-protection.md#validators-external-signer-public-keys).

Teku displays how many keys it found in each place.

Teku doesn't check some keys, and lists them as not checked:

- External signer keys given as a URL, or with the `external-signer` keyword, because Teku doesn't fetch them.
- Keys in keystores or key manager files that Teku can't read, and invalid public keys.

Make sure those keys have slashing protection files, or [import a slashing protection file] for them.

If Teku finds no validator keys, it doesn't check for missing files, and displays a message saying so.

## Use a specific slot

Use [`--slot`](../../reference/cli/subcommands/slashing-protection.md#slot) to set the repair slot yourself, for example on a network without an initial or genesis state such as `minimal`:

```bash
teku slashing-protection repair --config-file=/home/me/me_node/config.yaml --slot=1234 --update-all-enabled
```

Choose a slot after the validators last signed anything, on any machine.
When you specify a slot, Teku doesn't check that existing files belong to the network, so check the network yourself.

## Fix a repair slot that's too high

`repair` can't lower values.
If the repair slot was too high, the validators can't sign until the network reaches that slot.

To recover, stop the validator client and edit the affected files by hand, setting the values to those of the last block and attestation each validator signed.
See [Validator slashing protection file](../../concepts/slashing-protection.md#validator-slashing-protection-file) for the file format.

<!-- links -->

[slashing protection]: ../../concepts/slashing-protection.md
[import a slashing protection file]: use-a-slashing-protection-file.md#import-a-slashing-protection-file
