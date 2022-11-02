export default class ContainerMemory {
    constructor(array) {
        this.array = array || [];
    }

    /* Retornar todos los elementos */
    getAll() {
        return this.array;
    }

    /* Retornar elemento según ID */
    getById(id) {
        try {
            // Búsqueda de elemento
            const elementRequested = this.array.find(e => e._id === id);

            // Retorno de elemento
            if (elementRequested !== undefined) { return [elementRequested]; }
            else { return []; }
        }
        catch (e) {
            throw new Error('📁❌ Error al buscar en DB ❌📁');
        }
    }

    /* Agregar elemento */
    create(data) {
        try {
            // Se genera el siguiente ID del elemento
            let nextID = getNextID(this.array);

            // Se agrega nuevo elemento
            const newElement = {
                _id: nextID,
                ...data
            }
            this.array.push(newElement);

            return nextID;
        }
        catch (e) {
            throw new Error('📁❌ Error al agregar elemento en DB ❌📁');
        }
    }

    /* Actualizar elemento según ID */
    update(id, data) {
        try {
            let modifiedCount = 0;

            // Búsqueda y actualización de elemento
            this.array.forEach(e => {
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

            return modifiedCount;
        }
        catch (e) {
            throw new Error('📁❌ Error al modificar elemento en DB ❌📁');
        }
    }

    /* Eliminar elemento según ID */
    deleteById(id) {
        try {
            // Check si elemento existe en array
            let found = this.array.some(e => e._id === id);

            if (found) {
                // Se elimina elemento
                this.array = this.array.filter(e => e._id !== id);
            }
            return found;
        }
        catch (e) {
            throw new Error('📁❌ Error al eliminar elemento en DB ❌📁');
        }
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