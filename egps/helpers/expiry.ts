import { ethers } from 'ethers'

export async function getExpiry(provider: ethers.providers.Provider, daysOpen: number = 14) {
  const secondsPerDay = 60 * 60 * 24 // seconds per minute * minutes per hour * hours per day
  const secondsPerBlock = 12 // eth mainnet
  const blocksPerDay = secondsPerDay / secondsPerBlock
  const latestBlock = await provider.getBlock('latest')
  return latestBlock.number + blocksPerDay * daysOpen
}
