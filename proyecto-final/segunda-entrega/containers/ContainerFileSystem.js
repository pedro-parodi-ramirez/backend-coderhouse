import fs, { readFile } from 'fs';

export default class ContainerMongoDB {
    constructor(path) {
        this.path = path;
    }

    /* Retornar todos los elementos */
    async getAll() {
        try {
            // Lectura de archivo
            const data = await readFileJSON(this.path);

            // Retorno de elementos
            if (data != null) {
                return data;
            }
            else {
                return [];
            }
        }
        catch (e) {
            throw new Error('📁❌ Error a leer archivo en DB ❌📁\n');
        }
    }

    /* Retornar elemento según ID */
    async getById(id) {
        try {
            // Lectura de archivo
            const data = await readFileJSON(this.path);

            // Búsqueda de elemento
            const elementRequested = data.find(p => p._id === id);
            
            // Retorno de elemento
            if (elementRequested != undefined) { return [elementRequested]; }
            else { return []; }
        }
        catch (e) {
            throw new Error('📁❌ Error al buscar en DB ❌📁');
        }
    }

    /* Agregar elemento */
    async create(obj) {
        try {
            const response = await this.collection.create(obj);
            return response.id;
        }
        catch (e) {
            throw new Error('📁❌ Error al agregar elemento en DB ❌📁');
        }
    }

    /* Actualizar elemento según ID */
    async update(id, data) {
        try {
            // Intento de modificar elemento
            const response = await this.collection.updateOne({ _id: id }, { $set: data });
            return response;
        }
        catch (e) {
            throw new Error('📁❌ Error al modificar elemento en DB ❌📁');
        }
    }

    /* Eliminar elemento según ID */
    async deleteById(id) {
        try {
            // Intento de eliminar elemento
            const response = await this.collection.deleteOne({ _id: id });
            return response;
        }
        catch (e) {
            throw new Error('📁❌ Error al eliminar elemento en DB ❌📁');
        }
    }
}

async function readFileJSON(path) {
    try {
        // Lectura de archivo
        const data = await fs.promises.readFile(path, 'utf-8');
        return JSON.parse(data);
    }
    catch (e) {
        throw new Error();
    }
}