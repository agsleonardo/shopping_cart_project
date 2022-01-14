require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  
  it('Teste se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');

  })

  // it('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', async () => {
  //   await expect(fetchProducts(url)).toHaveBeenCalled();

  // })

  // it('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador";', () => {
  //   expect(typeof fetchProducts).toBe('function')

  // })

  it('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    const data = await fetchProducts('computador'); 
    expect(data).toEqual(computadorSearch);

  })

  // it('Teste se fetchProducts é uma função', () => {
  //   expect(typeof fetchProducts).toBe('function')

  // })
});
