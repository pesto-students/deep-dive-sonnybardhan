const { MongoClient, ObjectId } = require('mongodb');
const moment = require('moment');

class SimpleODM {
  constructor(mongoUrl, databaseName, collectionName) {
    this.mongoUrl = mongoUrl;
    this.databaseName = databaseName;
    this.collectionName = collectionName;
  }
  error(errMsg) {
    throw new Error(errMsg);
  }

  async init() {
    global.connectionInstance = await this.connect();
    global.databaseInstance = await this.getDb();
  }

  async connect() {
    if (!this.mongoUrl) {
      this.error(`Incorrect database url`);
    }
    if (!global.connectionInstance) {
      return await MongoClient.connect(this.mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    return global.connectionInstance;
  }

  async disconnect() {
    let isDisconnected = false;
    if (global.connectionInstance) {
      try {
        await global.connectionInstance.close();
        isDisconnected = true;
      } catch (err) {
        console.log(err);
      } finally {
        console.log('disconnected: ', isDisconnected);
      }
    }
  }

  async getDb() {
    if (!global.connectionInstance) {
      this.error(`Database not connected`);
    }

    return await global.connectionInstance.db(this.databaseName);
  }

  async all() {
    const response = await global.databaseInstance
      .collection(this.collectionName)
      .find()
      .toArray();
    return response;
  }

  async deleteById(id) {
    const response = await global.databaseInstance
      .collection(this.collectionName)
      .deleteOne({ _id: ObjectId(id) });

    if (response.deletedCount) {
      return { status: 'success' };
    } else {
      return { status: 'failed' };
    }
  }

  async updateById(id, newData) {
    const response = await global.databaseInstance
      .collection(this.collectionName)
      .updateOne({ _id: ObjectId(id) }, { $set: newData });

    if (response.result.nModified) {
      return { status: 'success' };
    } else {
      return { status: 'failed' };
    }
  }

  async addNew(obj) {
    const response = await global.databaseInstance
      .collection(this.collectionName)
      .insertOne({ ...obj, createdAt: moment().format() });

    if (response.result.ok) {
      return { todo: response.ops[0], status: 'success' };
    } else {
      return { status: 'failed' };
    }
  }
}

module.exports = SimpleODM;
