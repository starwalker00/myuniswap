const Factory = artifacts.require('UniswapV2Factory.sol');
const Token1 = artifacts.require('Token1.sol');
const Token2 = artifacts.require('Token2.sol');

module.exports = async function (deployer, network, accounts) {

  await deployer.deploy(Factory, accounts[0]);
  const factory = await Factory.deployed();

  // Deploy ERC-20 only when using local development blockchain
  if (network === 'development')
  {
    await deployer.deploy(Token1);
    await deployer.deploy(Token2);
    const token1 = await Token1.deployed();
    const token2 = await Token2.deployed();
  }
  else{
    throw 'No token addresses set for uniswap factory when creating pairs';
  }

  await factory.createPair(token1.address, token2.address);

};
