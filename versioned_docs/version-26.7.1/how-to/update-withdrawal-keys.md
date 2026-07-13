---
title: Update your withdrawal credentials
description: Update your BLS withdrawal address to an Ethereum address.
sidebar_position: 11
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Update your withdrawal credentials

When you create a validator, it’s possible to set its
[withdrawal](../concepts/withdrawals.md) address to a BLS address, or an
Ethereum address.

You can update your BLS withdrawal address to an Ethereum address after the
Capella upgrade.

## Determine the withdrawal address type

**Prerequisites**:

- Access to the beacon node API endpoint.
  The default is `localhost:5051`.
- [`curl`](https://curl.se/) and [`jq`](https://stedolan.github.io/jq/) installed.

The following shell script allows you to determine the withdrawal address of a
given validator ID.

<Tabs>
  <TabItem value="Script" label="Script" default>

```bash
VALIDATOR=<VALIDATOR_INDEX> \
curl http://localhost:5051/eth/v1/beacon/states/finalized/validators/$VALIDATOR | jq '.data | .validator.withdrawal_credentials'
```

  </TabItem>
  <TabItem value="Example output" label="Example output" >
```
"0x00fc40352b0a186d83267fc1342ec5da49dbb78e1099a4bd8db16d2c0d223594"
```

  </TabItem>
</Tabs>

In the script, specify the `<VALIDATOR_INDEX>` (for example, `1`) that was
provided when you joined the network.
Alternatively, you can specify the validator's public key.

In the output, the first four characters of the string, in this case `0x00`,
indicates the key is a BLS withdrawal key.

## Update your withdrawal address

:::caution

Don't store your [validator keys](use-external-signer/manage-keys.md) and withdrawal
keys in the same location.

:::

### From a BLS withdrawal address to an Ethereum address

:::caution

Teku doesn't offer functionality to create a signed withdrawal credential change.
Tools such as
[`staking-deposit-cli`](https://github.com/ethereum/staking-deposit-cli#generate-bls-to-execution-change-arguments)
allow you to generate this signed message, which can be submitted directly to
your beacon node if your REST API is active.

:::

If your withdrawal address is a BLS key (starts with `0x00`), the Capella fork
provides a process to update your withdrawal address to a `0x01` withdrawal key
(Ethereum address).
You must have the BLS withdrawal address private key, or the seed phrase
(mnemonic) to sign the request to prove that you have access to the BLS
withdrawal key.

Tools such as
[`staking-deposit-cli`](https://github.com/ethereum/staking-deposit-cli#generate-bls-to-execution-change-arguments) or [`ethdo`](https://github.com/wealdtech/ethdo/blob/master/docs/changingwithdrawalcredentials.md) can sign the request correctly. You can then submit the signed withdrawal credential change to your own beacon node using the [`bls_to_execution_changes`](https://consensys.github.io/teku/#tag/Beacon/operation/postBlsToExecutionChange) API, or broadcast it using [`beaconcha.in`](https://beaconcha.in/tools/broadcast).

:::caution Important information about changing withdrawal credentials

- Once you update a validator to use a `0x01` withdrawal key (Ethereum address),
  you can't change it again.
- Updating your withdrawal credentials isn't available until the Capella fork is
  active.
- Ensure you update to the expected Ethereum address because the change is permanent.

:::

A maximum of 16 validator keys can update their withdrawal credentials per
block, so the process may be congested initially.
If you submit a request to update your key, and it hasn't been done in a period
of time, you might consider re-submitting the request.
It might take several epochs for the change to be included in a block, depending
on the number of requests in the queue.

Query the
[`bls_to_execution_changes`](https://consensys.github.io/teku/#tag/Beacon/operation/getBlsToExecutionChanges)
API see if your request is still in the pool.

### Update your Ethereum address

If your withdrawal credentials are set to an Ethereum address, and you wish to
update it to a different address, you must create a new validator key.
You can exit your current validator key as a voluntary exit, and use the funds
from the full withdrawal of that to create the new validator key.

The voluntary exit process takes while to complete, and the exiting validator
must remain active during that time to avoid inactivity penalties.

:::caution

Ensure that you own the current Ethereum address before exiting, otherwise you
can't access your funds.

:::
