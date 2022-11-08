set -e

# council repo
echo "compiling council..."
cd council
npm install
npm run build
cp -r ./artifacts/* ../artifacts/council
cp -r ./typechain/* ../typechain/council

# get back to last directory
cd -

# elf-contracts repo
echo "compiling elf-contracts..."
cd elf-contracts
npm install
npm run load-contracts
npm run build
cp -r ./artifacts/* ../artifacts/elf-contracts
cp -r ./typechain/* ../typechain/elf-contracts