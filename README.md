# Element Finance Scripts

This repository contains a collection of scripts that are used to execute EGP (Element Governance Proposals). This repositroy aims to be *simple* by using as simple scripts, and staying away from *magical* frameworks. 

### Available EGPs
| EGP # | Live | Notes |
|-------|------|-------|
| 2 | Yes | Not fully functioning in this repo, was executed in a hackier manner in the early days of the DAO. Preserved for historical purposes. |
| 5 | No | n/a |

### Setup
#### Prerequisites
- node >16

#### Instalation
1. `yarn` # install packages
2. `yarn run compile` # Compiles contracts & copies artifacts to root directory.

### Creating a new EGP
1. `yarn run new-egp <egp_number>`
2. Navigate to `./egps/egp-<number>/`
3. Write core logic in `egp-<number>.ts` and place any helper files in that directory (documentation, additional contracts, etc...)