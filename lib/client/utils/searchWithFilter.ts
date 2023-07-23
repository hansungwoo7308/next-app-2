export const searchWithFilter = (filter: any, router: any) => {
  console.log("\x1b[33m\n[client/utils/searchWithFilter]");
  // get
  const { category, search, sort } = filter;
  console.log("filter : ", filter);
  // set
  if (category) router.query.category = category;
  if (search) router.query.search = search;
  if (sort) router.query.sort = sort;
  // out
  return router.push({ pathname: router.pathname, query: router.query });
};
