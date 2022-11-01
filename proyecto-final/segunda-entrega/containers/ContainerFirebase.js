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

  /* Retornar todos los elementos */
  async getAll() {
    try {
      const products = await this.collection.find({});
      return products;
    }
    catch (e) {
      throw new Error('📁❌ Error al buscar en DB ❌📁');
    }
  }

  /* Retornar elemento según ID */
  async getById(id) {
    try {
      // const productRequested = await this.collection.find({ _id: id });
      // return productRequested;
    }
    catch (e) {
      throw new Error('📁❌ Error al buscar en DB ❌📁');
    }
  }

  /* Agregar elemento */
  async create(obj) {
    try {
      let id = uuidv4();
      const doc = await this.collection.doc(id);
      doc.create(obj)
      return id;
    }
    catch (e) {
      throw new Error('📁❌ Error al agregar elemento en DB ❌📁');
    }
  }

  /* Actualizar elemento según ID */
  async update(id, data) {
    try {
      let succeed = false;
      // Intento de modificar elemento
      const doc = await this.collection.doc(id);
      const snapshot = await doc.get();
      console.log(snapshot);
      if (snapshot.exist) {
        const response = await doc.set(data);
        console.log(response);
        succeed = true;
      }
      return succeed;
    }
    catch (e) {
      console.log(e);
      throw new Error('📁❌ Error al modificar elemento en DB ❌📁');
    }
  }

  /* Eliminar elemento según ID */
  async deleteById(id) {
    try {
      // // Intento de eliminar elemento
      // const response = await this.collection.deleteOne({ _id: id });
      // return response.deletedCount;
    }
    catch (e) {
      throw new Error('📁❌ Error al eliminar elemento en DB ❌📁');
    }
  }
}