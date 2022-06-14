export const chains = [
    {
        value:'ETH',
        name: 'ETH Mainnet',
        chainId: '1',
        derpUrl: "/rpc/eth/mainnet",
//        originalUrl: "https://eth-erigon.lsotech.net/";
        originalUrl: "https://eth-mainnet.gateway.pokt.network/v1/lb/61dc3e545a6d110038222645"

    },
    {
        value: 'xDai',
        name: 'Gnosis Chain',
        chainId: '100',
        derpUrl: "/rpc/xdai/mainnet",
//        originalUrl: "https://dai.poa.network/",
        originalUrl: "https://rpc.gnosischain.com/",
    },
    {
        value:'arbitrum',
        name: 'Arbitrum One',
        chainId: '42161',
        derpUrl: '/rpc/arbitrum/mainnet',
        originalUrl: 'https://arb1.arbitrum.io/rpc',
    },
    {
        value: 'avalanche',
        name: 'Avalanche Mainnet',
        chainId: '43114',
        derpUrl: '/rpc/avax/avalanche',
        originalUrl: 'https://api.avax.network/ext/bc/C/rpc',
    },
    {
        value:'neonlabs',
        name: 'NeonLabs Solana Devnet Proxy',
        chainId: '245022926',
        derpUrl: '/rpc/sol/solana-neonlabs',
        originalUrl: 'https://proxy.devnet.neonlabs.org/solana'
    },
]
