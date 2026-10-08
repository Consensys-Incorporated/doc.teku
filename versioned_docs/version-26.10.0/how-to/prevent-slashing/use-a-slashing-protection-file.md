---
description: Use a slashing protection file to prevent validator slashing offenses.
sidebar_position: 1
---

# Use a slashing protection file

Teku implements [slashing protection] to prevent validators from signing incorrect blocks or attestations.

You can import and export the slashing protection file when migrating validator keys between validator clients.
Teku supports the [validator client interchange format] when importing or exporting the slashing protection file.

:::note

If using an external signer that implements its own slashing protection (for example [Web3Signer]), then you can disable Teku's built-in slashing protection using the
[`--validators-external-signer-slashing-protection-enabled`](../../reference/cli/index.md#validators-external-signer-slashing-protection-enabled) command line option.

:::

## Import a slashing protection file

When importing the slashing protection file, Teku imports the file to the `<data-path>/validators/slashprotection/` directory in the format `<validator-pubkey>.yml` (with no 0x prefix).

```bash title="Example"
teku slashing-protection import --data-path=/home/me/me_node --from=/home/slash/slashing-interchange-format.json
```

In the command line:

- [`--data-path`](../../reference/cli/subcommands/slashing-protection.md#data-path-1) specifies the location of the Teku `data` directory.
- [`--from`](../../reference/cli/subcommands/slashing-protection.md#from) specifies the location of the slashing protection file.

In this example, Teku imports the file to the `/home/me/me_node/data/validators/slashprotection/` directory.

## Export a slashing protection file

Export the slashing protection file when migrating a validator to a different Teku, or non-Teku node.

```bash title="Example"
teku slashing-protection export --data-path=/home/me/me_node --to=/home/slash/slashing-interchange-format-minimal.json
```

In the command line:

- [`--data-path`](../../reference/cli/subcommands/slashing-protection.md#data-path) specifies the location of the Teku `data` directory.
- [`--to`](../../reference/cli/subcommands/slashing-protection.md#to) specifies the file to export the slashing protection data to.

You can now import the slashing protection file in a Teku, or non-Teku node.

<!--links -->

[slashing protection]: ../../concepts/slashing-protection.md
[validator client interchange format]: https://eips.ethereum.org/EIPS/eip-3076
[Web3Signer]: https://docs.web3signer.consensys.net/en/latest/
