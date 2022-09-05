import {BytesLike, ethers} from "ethers";

// helper callhash function
export async function createCallHash(calldata: BytesLike[], targets: string[]) {
    const toBeHashed = ethers.utils.defaultAbiCoder.encode(
        ["address[]", "bytes[]"],
        [targets, calldata]
    );
    return ethers.utils.keccak256(toBeHashed);
}