import fs from 'fs';

export default class ContainerMongoDB {
    constructor(path) {
        this.path = path;
    }

    /* Return all elements */
    async getAll() {
        try {
            // Read DB
            const data = await readFileJSON(this.path);

            // Return all elements
            if (data != null) {
                return data;
            }
            else {
                return [];
            }
        }
        catch (e) {
            throw new Error('📁❌ Error searching in DB ❌📁');
        }
    }

    /* Search element based on ID */
    async getById(id) {
        try {
            // Read all elements
            const data = await readFileJSON(this.path);

            // Search element
            const elementRequested = data.find(e => e._id === id);

            // Return element
            if (elementRequested !== undefined) { return [elementRequested]; }
            else { return []; }
        }
        catch (e) {
            throw new Error('📁❌ Error searching in DB ❌📁');
        }
    }

    /* Add element */
    async create(data) {
        try {
            // Read all elements
            const array = await readFileJSON(this.path);
            
            // Generate new ID
            let nextID = getNextID(array);
            
            // Add element to DB
            const newElement = {
                _id: nextID,
                ...data
            }
            array.push(newElement);

            // Save DB
            await fs.promises.writeFile(this.path, JSON.stringify(array, null, 2));

            return nextID;
        }
        catch (e) {
            throw new Error('📁❌ Error adding to DB ❌📁');
        }
    }

    /* Update based on ID */
    async update(id, data) {
        try {
            // Read all elements
            const array = await readFileJSON(this.path);
            let modifiedCount = 0;

            // Search element and update
            array.forEach(e => {
                if (e._id === id) {
                    // Update with new values
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
                // Save DB
                await fs.promises.writeFile(this.path, JSON.stringify(array, null, 2));
            }
            return modifiedCount;
        }
        catch (e) {
            throw new Error('📁❌ Error updating in DB ❌📁');
        }
    }

    /* Delete element based on ID */
    async deleteById(id) {
        try {
            // Read all elements
            let array = await readFileJSON(this.path);
            
            // Search element
            let found = array.some(e => e._id === id);

            if (found) {
                // Delete element
                array = array.filter(e => e._id !== id);

                // Save DB
                await fs.promises.writeFile(this.path, JSON.stringify(array, null, 2));
            }
            return found;
        }
        catch (e) {
            throw new Error('📁❌ Error deleting from DB ❌📁');
        }
    }
}

async function readFileJSON(path) {
    try {
        // Read file
        const data = await fs.promises.readFile(path, 'utf-8');
        return JSON.parse(data);
    }
    catch (e) {
        throw new Error();
    }
}

// Generate new ID
function getNextID(array) {
    const arrayID = array.map(e => e._id);
    let nextID;
    nextID = Math.max(...arrayID) + 1;
    ((nextID === -Infinity) || (nextID === null) || (isNaN(nextID))) && (nextID = 1);
    return nextID.toString();
}