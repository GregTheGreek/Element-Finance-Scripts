import { ethers } from 'ethers'

export async function getExpiry(provider: ethers.providers.Provider, daysOpen: number = 7) {
  const secondsPerDay = 60 * 60 * 24 // seconds per minute * minutes per hour * hours per day
  const secondsPerBlock = 13.3 // eth mainnet
  const blocksPerDay = Math.round(secondsPerDay / secondsPerBlock)
  const latestBlock = await provider.getBlock('latest')
  return latestBlock.number + blocksPerDay * daysOpen
}
