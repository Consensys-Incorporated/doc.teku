---
description: Shut down Teku if a validator is slashed.
sidebar_position: 3
---

# Stop Teku when a validator is slashed

Validator slashing detection monitors slashing events and shuts down Teku when any owned validator
is slashed.
This can help prevent further slashing offenses.

When a validator is slashed, the Teku validator client shuts down with exit code `2`.
When this happens, you should not restart Teku by default because validators will likely continue to
be slashed.
We recommend restarting Teku with [doppelganger detection](detect-doppelgangers.md) enabled.

If you are using `systemd` to manage the Teku service, you might need to add `Restart=on-success` to
your service config in order to prevent the auto restart.  
Please check [the systemd config documentation](https://www.freedesktop.org/software/systemd/man/latest/systemd.service.html#Restart=) for more details.

:::warning

This feature is imperfect and might fail to detect slashing events rapidly.
Use it as a last resort option that might prevent validators from being slashed.

:::

## Enable validator slashing detection

Enable validator slashing detection by setting the `--shut-down-when-validator-slashed-enabled`
option to `true`.

When a validator is slashed, you must remove it from the owned validators before restarting Teku with validator slashing detection enabled.
Otherwise, the validator will still be detected as slashed and Teku will shut down again.
The duties performed by a slashed validator are ignored, and it's queued for exit after being slashed.
If you wish to keep it running, you should disable validator slashing detection before restarting Teku.

:::warning

When running a separate validator client, it must be connected to a beacon node that supports the
`proposer_slashing` and `attester_slashing` SSE event streams (both supported by the Teku beacon node).

:::

## Side effects

The purpose of shutting down Teku when a validator is slashed is to prevent a massive slashing.  
When triggered, the Teku validator client terminates and all its running validators stop performing
their duties.

:::warning

Stopping the validators might cause:

- Missed attestations.
- Missed sync committee contributions.
- Missed block proposals.

These side effects result in penalties and missed rewards.

:::

You might still consider these side effects a worthwhile trade-off of validator slashing detection,
since it can prevent a massive slashing.

## Logs

When validator slashing detection is enabled, Teku will print logs when any owned validator is slashed.
For example:

```bash
Validator(s) with public key(s) 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001, 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002 got slashed.  Shutting down...
```
