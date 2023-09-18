## GSC Proposal
The GSC treasury lives in a gnosis safe. // 0x654be0b5556f8eadbc2d140505445fa32715ef2b
Fees on swaps were sent to the safe address. This proposal unwinds all assets >= $400 in value, which is a total of 17 positions. It withdraws from Balancer, redeems the associated principal token, then transfers the assets (base and CRV lp) to the DAO main treasury. This is accomplished in one multisend transaction through the gnosis safe. A tenderly transaction can be reviewed here:

https://www.tdly.co/shared/simulation/339a8426-8315-428a-976c-70eb1e5cabee

To generate the call data for the transaction to the multisend contract, run the gsc treasury test:
`npx hardhat test egps/egp-16/gsc-treasury-test.ts`

Running the test will generate all the necessary information to verify:
<img width="482" alt="image" src="https://github.com/GregTheGreek/Element-Finance-Scripts/assets/7415822/f8abc83a-9b0c-4571-8f12-f7ed502bc19d">

Transaction data is printed and is copied over to the constants.ts file to the `GSC_CALL_DATA` constant.

## Main Treasury Part 1
The main treasury received affiliate rewards via yearn. // 0x82ef450fb7f06e3294f2f19ed1713b255af0f541
We will need two subsequent votes and proposals after this one. The first step is to withdraw each of the yearn positions into associated CRV or base assets. Part 2 will withdraw from the remaining CRV positions. Part 3 will withdraw from curve meta pools and do any necessary swaps (EURS/BTC) via milkman.

To generate the transactions necessary for the call data:
`npx hardhat test  egps/egp-16/main-treasury-test.ts`

Running the test will generate all the necessary information to verify:
<img width="379" alt="image" src="https://github.com/GregTheGreek/Element-Finance-Scripts/assets/7415822/3e842534-fc86-42c2-b600-bc9815454b2f">

Transaction data is printed and is copied over to the constants.ts file to the `YEARN_WITHDRAWAL_TRANSACTIONS` constant.

## Running the proposal
Two scripts should be ran:
- `egp-16-gsc.ts`
- `egp-16-main-part-1.ts`

No particular ordering is necessary.