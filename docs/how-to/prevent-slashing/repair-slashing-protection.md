---
description: Repair empty or invalid slashing protection files for your validator.
keywords: [slashing protection, repair, validator, Teku]
sidebar_position: 2
---

# Repair slashing protection data

Use the [`slashing-protection repair`] subcommand to repair empty or invalid [slashing protection] files.
Teku writes a minimum block slot and attestation epoch to each repaired file.
Your validator cannot sign a block at or before that slot.
It also cannot sign an attestation whose target epoch is at or before that epoch.

Repair slashing protection data when:

- Your slashing protection files exist, but they're empty or invalid.
- You want every record, including records Teku can already read, to block signing up to a slot you choose.
  See [Update all slashing protection records](#update-all-slashing-protection-records).

:::warning

If a validator key has no slashing protection file, repair leaves it unchanged.
Teku then has no record of what that validator has signed.
[Create or import the file](../../concepts/slashing-protection.md#migrate-the-slashing-protection-file) before starting your validator client.

:::

## Prerequisites

- Stop your validator client and confirm the process has fully exited.
  Keep it stopped until the repair finishes, including preventing a service manager from starting it.
  Teku keeps slashing protection records in memory while it runs.
  Repair writes the files on disk, and a running validator client does not reload them.
  The running client can also overwrite the repaired files the next time it signs.
  Start it again after you verify the repaired files.

## Repair slashing protection files

1. Check for problems without updating any files:

   ```bash
   teku slashing-protection repair --network=<NETWORK> --data-path=<PATH> --check-only-enabled=true
   ```

   In the command line:

   - [`--network`](../../reference/cli/subcommands/slashing-protection.md#network) specifies the network Teku uses to calculate the slot.
   - [`--data-path`](../../reference/cli/subcommands/slashing-protection.md#data-path-2) specifies the location of the Teku data directory.
   - [`--check-only-enabled`](../../reference/cli/subcommands/slashing-protection.md#check-only-enabled) reports problems without updating any files.

   Teku displays the slot and epoch it would write, and reports the files that need repair.

   :::tip

   If your node uses a configuration file, specify it with
   [`--config-file`](../../reference/cli/subcommands/slashing-protection.md#config-file-2)
   instead of `--network` and `--data-path`.

   :::

1. Run the repair:

   ```bash
   teku slashing-protection repair --network=<NETWORK> --data-path=<PATH>
   ```

   Teku calculates the slot as the current slot plus one epoch.
   To set a specific slot, add [`--slot`](../../reference/cli/subcommands/slashing-protection.md#slot).

   :::warning

   Teku writes the slot you supply to each repaired file as-is.
   If the slot is earlier than your validator's last signed duty,
   your validator can sign duties it has already signed, which can result in slashing.
   To preview a supplied slot, add `--slot` to the check in the previous step.

   :::

1. Review the block slot and attestation epoch that Teku displays, and type `yes` to confirm.
   For example:

   ```text
   Computed mainnet slot 15583266, which will set attestation source/target to epoch 486977
   872c6...1b4db98f: Incomplete or invalid slashing protection data

   REMINDER! If the validator is running, you should not be updating slashing protection records.
   block slot -> 15583266
   attestation source/target -> 486977
   Are you sure you wish to continue (yes/no)?
   ```

1. Verify a repaired file in the `<data-path>/validator/slashprotection/` directory.
   For example:

   ```yaml
   ---
   lastSignedBlockSlot: 15583266
   lastSignedAttestationSourceEpoch: 486977
   lastSignedAttestationTargetEpoch: 486977
   ```

1. Start the validator.

## Update all slashing protection records

By default, Teku only repairs empty or invalid files.
Update all records when Teku can read the files,
but they might not include your validator's most recent duties, for example:

- You restored your validator data from a backup,
  and your validator signed duties after the backup was taken.
- Your validator keys previously ran on another node,
  and your local records don't include the duties signed there.

Choose a slot after the last duty your validator signed on any node.
Teku will not sign that slot, or any earlier slot.
If the slot is too early, Teku can still sign the later duties.

To update all records, use
[`--update-all-enabled`](../../reference/cli/subcommands/slashing-protection.md#update-all-enabled):

```bash
teku slashing-protection repair --network=<NETWORK> --data-path=<PATH> --slot=<SLOT> --update-all-enabled=true
```

Teku raises each existing record to at least the specified slot and epoch.
Teku doesn't lower existing values, so records already beyond the slot are unchanged.

Teku displays the values to write and asks you to confirm:

```text
REMINDER! If the validator is running, you should not be updating slashing protection records.
All valid slashing protection files will also be updated.
block slot -> 15583266
attestation source/target -> 486977
Are you sure you wish to continue (yes/no)?
```

<!-- links -->

[`slashing-protection repair`]: ../../reference/cli/subcommands/slashing-protection.md#repair
[slashing protection]: ../../concepts/slashing-protection.md
