export const errors = (err: any, req: any, res: any, next: any) => {
  // console.log({ statusCode: err.statusCode });
  // console.log({ test: Object.keys(err) });
  // const something = { ...err };
  // console.log({ something });
  console.log({ error: err });
  res.status(err.statusCode || 500).json({ error: err });
};
