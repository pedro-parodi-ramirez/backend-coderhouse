import fs from 'fs';

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
            throw new Error('📁❌ Error a leer archivo en DB ❌📁');
        }
    }

    /* Retornar elemento según ID */
    async getById(id) {
        try {
            // Lectura de elementos existentes
            const data = await readFileJSON(this.path);

            // Búsqueda de elemento
            const elementRequested = data.find(e => e._id === id);

            // Retorno de elemento
            if (elementRequested !== undefined) { return [elementRequested]; }
            else { return []; }
        }
        catch (e) {
            throw new Error('📁❌ Error al buscar en DB ❌📁');
        }
    }

    /* Agregar elemento */
    async create(data) {
        try {
            // Lectura de elementos existentes
            const array = await readFileJSON(this.path);

            // Se genera el siguiente ID del elemento
            let nextID = getNextID(array);

            // Se agrega nuevo elemento
            const newElement = {
                _id: nextID,
                ...data
            }
            array.push(newElement);

            // Se almacena nuevo elemento en archivo
            await fs.promises.writeFile(this.path, JSON.stringify(array, null, 2));

            return nextID;
        }
        catch (e) {
            throw new Error('📁❌ Error al agregar elemento en DB ❌📁');
        }
    }

    /* Actualizar elemento según ID */
    async update(id, data) {
        try {
            // Lectura de elementos existentes
            const array = await readFileJSON(this.path);
            let modifiedCount = 0;
            
            // Búsqueda y actualización de elemento
            array.forEach(e => {
                if (e._id === id) {
                    // Se almacenan nuevos valores
                    e.timestamp = data.timestamp,
                    e.name = data.name,
                    e.description = data.description,
                    e.code = data.code,
                    e.image = data.image,
                    e.price = data.price,
                    e.stock = data.stock

                    modifiedCount++;
                }
            });

            if (modifiedCount) {
                // Se almacenan modificaciones en archivo
                await fs.promises.writeFile(this.path, JSON.stringify(array, null, 2));
            }
            return modifiedCount;
        }
        catch (e) {
            throw new Error('📁❌ Error al modificar elemento en DB ❌📁');
        }
    }

    /* Eliminar elemento según ID */
    async deleteById(id) {
        try {
            // Lectura de elementos existentes
            let array = await readFileJSON(this.path);
            let found = array.some(e => e._id === id);

            if (found) {
                // Se elimina elemento
                array = array.filter(e => e._id !== id);

                // Se almacenan modificaciones en archivo
                await fs.promises.writeFile(this.path, JSON.stringify(array, null, 2));
            }
            return found;
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

// Buscar nuevo ID para elemento
function getNextID(array) {
    const arrayID = array.map(e => e._id);
    let nextID;
    nextID = Math.max(...arrayID) + 1;
    ((nextID === -Infinity) || (nextID === null)) && (nextID = 1);
    return nextID.toString();
}