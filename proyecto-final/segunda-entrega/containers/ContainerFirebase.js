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
      // Búsqueda de elementos
      const snapshot = await this.collection.get();
      const array = snapshot.docs.map(e => ({ _id: e.id, ...e.data() }));
      return array;
    }
    catch (e) {
      console.log(e);
      throw new Error('📁❌ Error al buscar en DB ❌📁');
    }
  }

  /* Retornar elemento según ID */
  async getById(id) {
    try {
      // Búsqueda de elemento
      const doc = await this.collection.doc(id);
      const snapshot = await doc.get();

      // Se convierte el resultado a formato requerido
      const elementRequested = [{ _id: snapshot.id, ...snapshot.data() }];

      // Retorno de elemento
      if (snapshot.exists) { return elementRequested; }
      else { return []; }
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
      // Búsqueda de elemento
      const doc = await this.collection.doc(id);
      const snapshot = await doc.get();

      // Si existe, se modifica
      if (snapshot.exists) {
        await doc.set(data);
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
      let succeed = false;
      // Búsqueda de elemento
      const doc = await this.collection.doc(id);
      const snapshot = await doc.get();

      // Si existe, se modifica
      if (snapshot.exists) {
        await doc.delete();
        succeed = true;
      }
      return succeed;
    }
    catch (e) {
      throw new Error('📁❌ Error al eliminar elemento en DB ❌📁');
    }
  }
}