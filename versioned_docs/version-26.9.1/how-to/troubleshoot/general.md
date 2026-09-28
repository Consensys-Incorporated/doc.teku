---
description: Solve common problems encountered with Teku.
sidebar_position: 14
---

# General issues

## Out of memory error

If Teku exits with a `java.lang.OutOfMemoryError: Java heap space` error, it could mean that Teku's Java Virtual Machine (JVM) ran out of memory.

To fix this, you can try [setting a maximum heap size].

## P2P port conflicts

If Teku fails to start with a `P2P Port 9000 (TCP/UDP) is already in use. Check for other processes using this port.` error, it means that Teku is trying to use a network port that is already in use.

For example, Teku and Lighthouse both use port 9000 by default for P2P traffic. You can change Teku's default port number with the [`--p2p-port`](../../reference/cli/index.md#p2p-port) option.

## Unable to lock a keystore file

If Teku fails to start with an `Unexpected error when trying to lock a keystore file` error, this could be because the directory containing the keystores is not writable by Teku.

Teku uses a file locking mechanism for the keystores to prevent two validator clients using the same keystores at the same time.

To resolve this issue, try one of the following:

- Set the permissions of the directory holding the keystores so that it is writable by Teku.
- Set [`--validators-keystore-locking-enabled`](../../reference/cli/index.md#validators-keystore-locking-enabled) to `false` to disable the locking functionality.

:::warning

Ensure no other process or clients are using your keys. If they are, you could get [slashed].

:::

## Keystore file already in use

If Teku fails to start with a `Keystore file <keystore_file>.lock already in use.` error,
this could mean the keystore file is already being used by a validator client, or Teku has exited unexpectedly and did not remove the lock.

Teku uses a file locking mechanism for the keystores to prevent two validator clients using the same keystores at the same time.

To resolve this issue, try one of the following:

- Manually remove the lock files that are created alongside your keystore files, with `.lock` appended to the filename. Take care not to delete your keystores.
- Set [`--validators-keystore-locking-enabled`](../../reference/cli/index.md#validators-keystore-locking-enabled) to `false` to disable the locking functionality.

:::warning

Ensure no other process or clients are using your keys. If they are, you could get [slashed].

:::

## Keystore files are loading slowly

Teku supports `scrypt` or `pbkdf2` formatted keystores. Both keystore formats are supported by [EIP-2335].

The `scrypt` formatted keystores load slower and require more memory to load, whereas `pbkdf2` formatted keystores load instantly.

The `scrypt` formatted keystores are more secure because they require more resources to crack. To improve the loading times of your keystores, you can convert them to the `pbkdf2` format.

## Unable to read YAML configuration

If Teku fails to start with the following:

```bash
Unable to read yaml configuration. Invalid yaml file [config.yaml]:
java.io.CharConversionException: Invalid UTF-8 start byte 0x93 (at char #11, byte #-1) at [Source: (File); line: 1, column: 1]
```

This could mean that the word processor has inserted smart quotes instead of straight quotes. Use straight quotes only.

## Validators not making attestations

Check whether your validator's attestations are being included in blocks at [`BeaconCha.in`](https://beaconcha.in/).

:::note

Occasional missed attestations are normal on a P2P network, but they should be a few percent.

:::

If all recent attestations are marked as missed, check the following:

- **Did the validators load correctly?**

  Check the logs when Teku started for the line, `teku-status-log | Loaded N Validators: <validator_pubkey>[, <validator_pubkey>]`, where `N` is the number of expected validators.
  Each validator's truncated public key is also listed.

  If the validator did not load, check for any errors loading the validator, and that the [`--validator-keys`](../../reference/cli/index.md#validator-keys) option is correct.

- **Is the beacon node still syncing?**

  Validators can only attest when the beacon node is in sync. If you see lines similar to,

  `teku-event-log | Syncing *** Target slot: 2017218, Head slot: 123456, Remaining slots: 2015500, Connecting peers: 12`, then the node is still syncing.

  Syncing is complete when the head slot reaches the current slot. If the node is synced, the messages are similar to, `teku-event-log | Slot Event *** Slot: 716614, Block: acef76..c61b, Epoch: 22394...`.

- **Is the beacon node reporting attestations?**

  Each validator that you run prints the message, `teku-validator-log | Validator *** Published attestation Count: 1, Slot: 48539, Root: 5e1bf5..cee8` once each epoch.
  If you do not see this for your validator then check that it loaded correctly.

  To see this message, ensure [`log-include-validator-duties-enabled`](../../reference/cli/index.md#log-include-validator-duties-enabled) is `true`.

- **Do you have peers?**

  The nodes's peer count is printed at the end of each slot event in the log. [Ensure your local network is configured correctly] to allow the node to listen for incoming P2P connections and discover peers.

## UnsatisfiedLinkError when starting Teku

If Teku fails to start with the following error:

```bash
Teku failed to start.
java.util.concurrent.CompletionException: java.lang.UnsatisfiedLinkError: /tmp/librocksdbjni8697586722914603821.so...
```

This could be due to your `/tmp` directory being marked non-executable (`noexec`).

To resolve this, try one of the following:

- Remove `noexec` on the `/tmp` mount. This can be done permanently in the file systems table (`fstab`), or temporarily using the command `sudo mount /tmp -o remount,exec`

- Create a new temporary folder for applications to use within the shell.

  ```bash
  mkdir tmp
  export TMPDIR=`pwd`/tmp
  ```

## Command line options

On Linux, shell processing of paths do not work when specified like this:

```bash
./teku --config-file=~/config.yaml
```

The shell does not see the tilde (~) in the command. To fix this, omit the equals sign (=).

```bash
./teku --config-file ~/config.yaml
```

<!-- links -->

[Ensure your local network is configured correctly]: ../find-and-connect/improve-connectivity.md
[EIP-2335]: https://eips.ethereum.org/EIPS/eip-2335
[slashed]: ../../concepts/slashing-protection.md
[setting a maximum heap size]: ../../get-started/manage-memory.md
