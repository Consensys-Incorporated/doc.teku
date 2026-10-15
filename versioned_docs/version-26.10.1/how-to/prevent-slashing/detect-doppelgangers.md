---
description: Check if your validators' keys are already active.
sidebar_position: 2
---

# Detect doppelgangers

Doppelganger detection checks if the validators' keys are already active before scheduling any of their duties (the validators stay inactive for at most two epochs). This can help prevent slashing offenses.

When enabled, doppelganger detection is triggered from two entry points:

1. At [validator client startup](../../get-started/start-teku.md): If at least one
    doppelganger is detected, the Teku validator client shuts down after it finishes the check with
    exit code `2`.
    When this happens, you should not restart Teku by default because validators will likely be slashed.
2. When importing keys via the [key manager API](https://ethereum.github.io/keymanager-APIs/): Any detected
    doppelganger's keys are ignored (not imported).
    The other keys are imported and the validators start performing their duties after it finishes the check.

:::warning

Doppelganger detection is imperfect and might fail to detect doppelgangers.
Use this as a last resort option that might prevent validators from being slashed.

:::

## Enable doppelganger detection

Enable doppelganger detection by setting the
[`--doppelganger-detection-enabled`](../../reference/cli/index.md#doppelganger-detection-enabled)
option to `true`.

Your validator client must be connected to a beacon node with validator liveness tracking enabled.
Enable validator liveness tracking by setting the [`--beacon-liveness-tracking-enabled`](../../reference/cli/index.md#beacon-liveness-tracking-enabled) option to `true`.

## Side effects

Doppelganger detection runs until one of the following occurs:

- All the loaded keys are detected as active.
- The check runs for two epochs.

This means that the validators being checked are inactive for at most two epochs.

:::warning

Keeping the validators inactive might cause:

- Missed attestations.
- Missed sync committee contributions.
- Missed block proposals.

These side effects result in penalties and missed rewards.

:::

You might still consider these side effects a worthwhile trade-off of doppelganger detection, since it can prevent slashing.

## Logs

When running, doppelganger detection prints various logs.

```bash title="Example startup logs"
Starting doppelganger detection for public keys: b28ab22, c2bab15, cd26f5e
```

```bash title="Example logs when a check is performed (every 12 seconds)"
Performing doppelganger check. Epoch 148220, Public keys b28ab22, c2bab15, cd26f5e
```

```bash title="Example logs when a doppelganger is detected"
Detected 2 validators doppelganger:
Index: xxxxxx, Public key: 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001
Index: xxxxxx, Public key: 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002
```

```bash title="Example logs: list of detected doppelgangers"
Detected 5 validators doppelganger:
  Index: xxxxxx, Public key: 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001
  Index: xxxxxx, Public key: 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002
  Index: xxxxxx, Public key: 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003
  Index: xxxxxx, Public key: 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004
  Index: xxxxxx, Public key: 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005
```

```bash title="Example logs when doppelganger detection ends"
Doppelganger detection check finished. Stopping doppelganger detection for public keys b28ab22, c2bab15, cd26f5e
```
