import fs from "fs";
import {ethers} from "ethers";
// @ts-ignore
import csv from "async-csv";
import { BigNumber } from "ethers";
import { getMerkleTree, hashAccount } from "../helpers/merkle";
import { MerkleTree } from "merkletreejs";

const base_path = "./egps/egp-5/"

interface Account {
    address: string;
    value: BigNumber;
}
interface AccountProof {
    address: string,
    proof: string[]
}

async function importAccounts(csvPath?: string): Promise<Account[]> {
    const rawData: string = await fs.promises.readFile(`${base_path}egp-5.csv`, "utf-8");
    // row[0] = account
    // row[1] = amount
    const rows: string[][] = await csv.parse(rawData);
    
    return rows.map(row => { 
            // remove all commas
            return {address: row[0], value: row[1].replace(/,/g, '')} 
        })
        // remove zero values
        .filter(row => Number(row.value) > 0)
        .map(({address, value}) => {
            return {
                address,
                // Convert to 18 decimal palce
                value: ethers.utils.parseEther(value)
            }
        })
}

function writeToFile(data: any, path: string) {
    fs.writeFileSync(path, data);
}

async function createProofs(merkel: MerkleTree, accounts: Account[]): Promise<AccountProof[]> {
    return await Promise.all(
        accounts.map(async (account) => {
            return {
                address: account.address,
                proof: merkel.getHexProof(await hashAccount(account))
            }
        })
    )
}

(async () => {
    const accounts: Account[] = await importAccounts();
    const merkelTree = await getMerkleTree(accounts);

    // Store all the proofs so they can be accessed by the front-end
    const proofs = await createProofs(merkelTree, accounts);
    const data = {proofs, hexRoot: merkelTree.getHexRoot()};
    writeToFile(JSON.stringify(data), `${base_path}egp5Proofs.json`);
})()