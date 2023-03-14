pragma solidity ^0.8.18;

interface ELFI {
    function burn(address account, uint256 amount) external;

    function mint(address account, uint256 amount) external;

    function setOwner(address who) external;

    function balanceOf(address who) external returns (uint256);
}

contract AirdropReclaim {
    ELFI constant elfi = ELFI(0x5c6D51ecBA4D8E4F20373e3ce96a62342B125D6d);

    function reclaim() external {
        uint256 total = 0;
        address[] memory toDelete = new address[](7);
        toDelete[0] = 0xd04a459FFD3A5E3C93d5cD8BB13d26a9845716c2;
        toDelete[1] = 0x5ae69B714859A3C15281e0a227D9B8C82F03b966;
        toDelete[2] = 0x63A2548f0a3795a35Ff62121E5f8C24Ada9831F8;
        toDelete[3] = 0x72D3acDAd21dF959DB2C112A0a5982d03759a154;
        toDelete[4] = 0x508071cEEf3d24D94b6783c0808fe1A417DDa485;
        toDelete[5] = 0x805bb52e4D9795B44C1ecd191Bd31F1D4a9C2dA5;
        toDelete[6] = 0xb7726ee8d589fd3e74C0369aB8F08D5d847bC86A;

        for (uint256 i = 0; i < toDelete.length; i++) {
            uint256 toBeDeleted = elfi.balanceOf(toDelete[i]);
            elfi.burn(toDelete[i], toBeDeleted);
            total += toBeDeleted;
        }

        elfi.mint(0x82eF450FB7f06E3294F2f19ed1713b255Af0f541, total);
        elfi.setOwner(0x81758f3361A769016eae4844072FA6d7f828a651);
    }
}
