---
description: Check if your validators' keys are already active.
sidebar_position: 3
---

# Detect doppelgangers

Doppelganger detection checks if the validators' keys are already active before scheduling any of
their duties. The validators remain inactive until detection completes. This can help prevent slashing offenses.

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
On that beacon node, enable validator liveness tracking by setting the
[`--beacon-liveness-tracking-enabled`](../../reference/cli/index.md#beacon-liveness-tracking-enabled)
option to `true`.

## Side effects

Doppelganger detection runs until one of the following occurs:

- All the loaded keys are detected as active.
- The two-epoch observation window ends, and the final checks succeed.

The observation window begins with the first successful check for validator activity.
If the beacon node can't provide the required data, Teku keeps doppelganger detection pending,
retries every 12 seconds, and doesn't schedule duties for the affected validators.
Teku imposes no overall detection timeout.

If a check can't be completed, Teku resets the observation window. When checks succeed again, it
starts a new two-epoch window while retaining any doppelgangers already detected. At the end of the
window, Teku checks the previous and current epochs before completing detection. The validators
might therefore remain inactive for longer than two epochs.

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

```bash title="Example logs when a check is performed"
Performing doppelganger check at epoch 148220 for public keys b28ab22, c2bab15, cd26f5e
```

```bash title="Example logs when required beacon node data is unavailable"
Doppelganger detection is temporarily unavailable for public keys b28ab22, c2bab15, cd26f5e. Duties for these public keys remain disabled while Teku retries. Reason: Unable to get validator indices: Request timeout
```

```bash title="Example logs when detection resumes"
Beacon node is available. Resuming doppelganger detection for public keys b28ab22, c2bab15, cd26f5e.
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
