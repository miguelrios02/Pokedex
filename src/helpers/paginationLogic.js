export const paginationLogic = (currentPage, pokemonsFilter) => {
  const pokemonsPerpage = 12;

  let pokemonsInPage = [];
  const sliceStart = (currentPage - 1) * pokemonsPerpage;
  const sliceEnd = currentPage * pokemonsPerpage;
  pokemonsInPage = pokemonsFilter.slice(sliceStart, sliceEnd);

  const arrayPages = [];
  const quantityPages = Math.ceil(pokemonsFilter.length / pokemonsPerpage);
  for (let i = 1; i <= quantityPages; i++) {
    arrayPages.push(i);
  }
  const lastPage = arrayPages[arrayPages.length - 1];

  let pagesInBlock = [];
  const pagesPerBlock = 5;
  let actualBlock = 1;
  for (let currentBlock = 1;currentBlock * pagesPerBlock < currentPage;currentBlock++) {
    actualBlock = currentBlock + 1;
  }

  const minPage = actualBlock * pagesPerBlock - pagesPerBlock;
  for (let currentPageInBlock = actualBlock * pagesPerBlock;currentPageInBlock > minPage;
    currentPageInBlock--) {
    if (currentPageInBlock <= lastPage) {
      pagesInBlock.unshift(currentPageInBlock);
    }
  }
  return{pagesInBlock,lastPage,pokemonsInPage}
};
