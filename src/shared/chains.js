export const chains = [
    {
        value: 'ETH',
        name: 'ETH Mainnet',
        chainId: '1',
        coin: 'ETH',
        derpUrl: "/rpc/eth/mainnet",
        originalUrl: "https://rpc.ankr.com/eth",
        blockExplorerUrl: 'https://etherscan.io'
    },
    {
        value: 'xDai',
        name: 'Gnosis Chain',
        chainId: '100',
        coin: 'xDAI',
        derpUrl: "/rpc/xdai/mainnet",
        originalUrl: "https://rpc.ankr.com/gnosis",
        blockExplorerUrl: 'https://gnosisscan.io'
    },
    {
        value:'arbitrum',
        name: 'Arbitrum One',
        chainId: '42161',
        coin: 'AETH',
        derpUrl: '/rpc/arbitrum/mainnet',
        originalUrl: 'https://arb1.arbitrum.io/rpc',
        blockExplorerUrl: 'https://arbiscan.io/'
    },
    {
        value: 'avalanche',
        name: 'Avalanche Mainnet',
        chainId: '43114',
        coin: 'AVAX',
        derpUrl: '/rpc/avax/avalanche',
        originalUrl: 'https://api.avax.network/ext/bc/C/rpc',
        blockExplorerUrl: 'https://snowtrace.io/'
    },
    {
        value:'neonlabs',
        name: 'NeonLabs Solana Devnet Proxy',
        chainId: '245022926',
        coin: 'NEON',
        derpUrl: '/rpc/sol/solana-neonlabs',
        originalUrl: 'https://proxy.devnet.neonlabs.org/solana',
        blockExplorerUrl: 'https://explorer.solana.com/'
    },
    {
        value:'polygon',
        name: 'Polygon Mainnet',
        coin: 'MATIC',
        chainId: '137',
        derpUrl: '/rpc/matic/polygon',
        originalUrl: 'https://rpc.ankr.com/polygon',
        blockExplorerUrl: 'https://polygonscan.com/'
    },
    {
        value:'bnb',
        name: 'BNB Chain',
        coin: 'BNB',
        chainId: '56',
        derpUrl: '/rpc/bnb/bsc',
        originalUrl: 'https://rpc.ankr.com/bsc',
        blockExplorerUrl: 'https://bscscan.com/'
    },
    {
        value:'fantom',
        name: 'Fantom Mainnet',
        coin: 'FTM',
        chainId: '250',
        derpUrl: '/rpc/ftm/fantom',
        originalUrl: 'https://rpc.ankr.com/fantom',
        blockExplorerUrl: 'https://ftmscan.com/'
    },
    {
        value:'harmony',
        name: 'Harmony',
        coin: 'ONE',
        chainId: '1666600000',
        derpUrl: '/rpc/one/harmony',
        originalUrl: 'https://rpc.ankr.com/harmony',
        blockExplorerUrl: 'https://explorer.harmony.one/'
    },
    {
        value: 'goerli',
        name: 'Goerli Testnet',
        coin: 'ETH',
        chainId: '5',
        derpUrl: '/rpc/eth/goerli',
        originalUrl: 'https://goerli.infura.io/v3/',
        blockExplorerUrl: 'https://goerli.etherscan.io/'
    },
    {
        value: 'optimism',
        name: 'Optimism Mainnet',
        coin: 'OP',
        chainId: '10',
        derpUrl: '/rpc/optimism/mainnet',
        originalUrl: 'https://rpc.ankr.com/optimism',
        blockExplorerUrl: 'https://optimistic.etherscan.io/'
    },
    {
        value: 'scroll',
        name: 'Scroll Mainnet',
        coin: 'ETH',
        chainId: '534352',
        derpUrl: '/rpc/scroll/mainnet',
        originalUrl: 'https://rpc.ankr.com/scroll',
        blockExplorerUrl: 'https://scrollscan.com/'
    },
    {
        value: 'polygon-zkevm',
        name: 'Polygon zkEVM Mainnet',
        coin: 'ETH',
        chainId: '1101',
        derpUrl: '/rpc/polygon-zkevm/mainnet',
        originalUrl: 'https://rpc.polygon-zkevm.gateway.fm',
        blockExplorerUrl: 'https://zkevm.polygonscan.com/'
    },
    {
        value: 'zksync-era',
        name: 'zkSync Era Mainnet',
        coin: 'ETH',
        chainId: '324',
        derpUrl: '/rpc/zksync-era/mainnet',
        originalUrl: 'https://mainnet.era.zksync.io',
        blockExplorerUrl: 'https://explorer.zksync.io/'
    }
]
