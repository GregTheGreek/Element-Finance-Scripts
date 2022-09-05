set -e

cd contract-repo
yarn
yarn build
cp -r ./artifacts ../
cp -r ./typechain ../