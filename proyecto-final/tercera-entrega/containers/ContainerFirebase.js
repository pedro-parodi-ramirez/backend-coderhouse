import { readFile } from 'fs/promises';
import FirebaseAdmin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';

const credential = JSON.parse(
  await readFile(
    new URL('../config/firebase-credential.json', import.meta.url)
  )
);
FirebaseAdmin.initializeApp({
  credential: FirebaseAdmin.credential.cert(credential)
});

const dbFirebase = FirebaseAdmin.firestore();

export default class ContainerFirebase {
  constructor(collectionName) {
    this.collection = dbFirebase.collection(collectionName);
  }

  /* Return all elements */
  async getAll() {
    try {
      // Read DB
      const snapshot = await this.collection.get();
      const array = snapshot.docs.map(e => ({ _id: e.id, ...e.data() }));
      return array;
    }
    catch (e) {
      console.log(e);
      throw new Error('📁❌ Error searching in DB ❌📁');
    }
  }

  /* Search element based on ID */
  async getById(id) {
    try {
      // Search element
      const doc = await this.collection.doc(id);
      const snapshot = await doc.get();

      // Fix format
      const elementRequested = [{ _id: snapshot.id, ...snapshot.data() }];

      // Return element
      if (snapshot.exists) { return elementRequested; }
      else { return []; }
    }
    catch (e) {
      throw new Error('📁❌ Error searching in DB ❌📁');
    }
  }

  /* Add element */
  async create(obj) {
    try {
      let id = uuidv4();
      const doc = await this.collection.doc(id);
      doc.create(obj)
      return id;
    }
    catch (e) {
      throw new Error('📁❌ Error adding to DB ❌📁');
    }
  }

  /* Update based on ID */
  async update(id, data) {
    try {
      let succeed = false;
      
      // Search element
      const doc = await this.collection.doc(id);
      const snapshot = await doc.get();

      // Update element if it exists
      if (snapshot.exists) {
        await doc.set(data);
        succeed = true;
      }
      return succeed;
    }
    catch (e) {
      console.log(e);
      throw new Error('📁❌ Error updating in DB ❌📁');
    }
  }

  /* Delete element based on ID */
  async deleteById(id) {
    try {
      let succeed = false;
      
      // Search element
      const doc = await this.collection.doc(id);
      const snapshot = await doc.get();

      // Delete it, if it exists
      if (snapshot.exists) {
        await doc.delete();
        succeed = true;
      }
      return succeed;
    }
    catch (e) {
      throw new Error('📁❌ Error deleting from DB ❌📁');
    }
  }
}