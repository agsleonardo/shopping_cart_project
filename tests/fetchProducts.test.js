require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  
  it('Teste se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function')
    // console.log();
  })
});
