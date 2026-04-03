// ERC721 NFT元数据生成器（链上存储格式）
class NFTMetadataGenerator {
  constructor(collectionName) {
    this.collection = collectionName;
    this.traits = ['Fire', 'Water', 'Earth', 'Air', 'Dark', 'Light'];
    this.rarities = ['Common', 'Rare', 'Epic', 'Legendary'];
  }

  // 生成随机NFT元数据
  generateMetadata(tokenId) {
    return {
      name: `${this.collection} #${tokenId}`,
      description: `Generated on-chain NFT metadata for Web3`,
      image: `ipfs://Qm${Math.random().toString(36).slice(2,24)}`,
      attributes: [
        { trait_type: 'Element', value: this.traits[Math.floor(Math.random()*this.traits.length)] },
        { trait_type: 'Rarity', value: this.rarities[Math.floor(Math.random()*this.rarities.length)] },
        { trait_type: 'Chain', value: 'Ethereum' },
        { trait_type: 'Standard', value: 'ERC721' }
      ],
      tokenId,
      timestamp: new Date().toISOString()
    };
  }
}

const nftMeta = new NFTMetadataGenerator('ChainGenesisNFT');
console.log('✅ 生成NFT元数据:', nftMeta.generateMetadata(1001));
module.exports = NFTMetadataGenerator;
