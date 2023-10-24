import React, { useEffect, useState, type FunctionComponent, type ReactNode } from 'react'
import { Transfer, type SupportedChain } from '@argoplatform/transfer-sdk'

interface TokenNetworkSelectorPageProps {
  name: string
  supportedChains: SupportedChain[] | null
}
const transfer = new Transfer({ apiKey: 'xxx' })
export const TokenNetworkSelectorPage: FunctionComponent<TokenNetworkSelectorPageProps> = ({ name }): ReactNode => {
  const [chains, setChains] = useState<SupportedChain[] | null>(null)
  useEffect(() => {
    if (chains == null) {
      transfer.getSupportedChains().then((supportedChains) => {
        console.log(supportedChains)
        setChains(supportedChains)
      }
      ).catch((error) => {
        console.log(error)
      }
      )
    }
  }, [chains])

  return (
    <div>
        <h1>TokenNetworkSelectorPage</h1>
        {
        chains?.map((chain) => {
          return (
                <div key={chain.chainId}>
                <h2>{chain.name}</h2>
                <h3>{chain.chainId}</h3>
                <img src={chain.logoURI} alt={chain.name} />
                </div>
          )
        }
        )
        }
    </div>
  )
}
