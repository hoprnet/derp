export const chains = [
    {
        value:'ETH',
        name: 'ETH Mainnet',
        chainId: '1',
        coin: 'ETH',
        derpUrl: "/rpc/eth/mainnet",
//        originalUrl: "https://eth-erigon.lsotech.net/";
        originalUrl: "https://eth-mainnet.gateway.pokt.network/v1/lb/61dc3e545a6d110038222645"

    },
    {
        value: 'xDai',
        name: 'Gnosis Chain',
        chainId: '100',
        coin: 'XDAI',
        derpUrl: "/rpc/xdai/mainnet",
//        originalUrl: "https://dai.poa.network/",
        originalUrl: "https://rpc.gnosischain.com/",
    },
    {
        value:'arbitrum',
        name: 'Arbitrum One',
        chainId: '42161',
        coin: 'AETH',
        derpUrl: '/rpc/arbitrum/mainnet',
        originalUrl: 'https://arb1.arbitrum.io/rpc',
    },
    {
        value: 'avalanche',
        name: 'Avalanche Mainnet',
        chainId: '43114',
        coin: 'AVAX',
        derpUrl: '/rpc/avax/avalanche',
        originalUrl: 'https://api.avax.network/ext/bc/C/rpc',
    },
    {
        value:'neonlabs',
        name: 'NeonLabs Solana Devnet Proxy',
        chainId: '245022926',
        coin: 'NEON',
        derpUrl: '/rpc/sol/solana-neonlabs',
        originalUrl: 'https://proxy.devnet.neonlabs.org/solana'
    },
    {
        value:'polygon',
        name: 'Polygon Mainnet',
        coin: 'MATIC',
        chainId: '137',
        derpUrl: '/rpc/matic/polygon',
        originalUrl: 'https://rpc.ankr.com/polygon'
    },
    {
        value:'bnb',
        name: 'BNB Chain',
        coin: 'BNB',
        chainId: '56',
        derpUrl: '/rpc/bnb/bsc',
        originalUrl: 'https://rpc.ankr.com/bsc'
    },
    {
        value:'fantom',
        name: 'Fantom Mainnet',
        coin: 'FTM',
        chainId: '250',
        derpUrl: '/rpc/ftm/fantom',
        originalUrl: 'https://rpc.ankr.com/fantom'
    },
    {
        value:'harmony',
        name: 'Harmony',
        coin: 'ONE',
        chainId: '1666600000',
        derpUrl: '/rpc/one/harmony',
        originalUrl: 'https://rpc.ankr.com/harmony'
    },
]
