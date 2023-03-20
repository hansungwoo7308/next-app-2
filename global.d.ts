declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
    }
    interface Global {
      _mongoClientPromise: Promise<MongoClient> | undefined | null;
    }
  }
}

export {};
