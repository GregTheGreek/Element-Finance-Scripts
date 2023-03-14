set -e

# cleanup
echo "cleaning..."
npx hardhat clean

# compile egp contracts
echo "compiling egp contracts..."
yarn
yarn run compile

# council repo
echo "compiling council..."
cd council
npm install --legacy-peer-dep
npx hardhat clean
npm run build

# get back to last directory
cd -

# elf-contracts repo
echo "compiling elf-contracts..."
cd elf-contracts
npm install
npx hardhat clean
npm run load-contracts
npm run build


