export default class ContainerMemory {
    constructor(array) {
        this.array = array || [];
    }

    /* Return all elements */
    getAll() {
        return this.array;
    }

    /* Search element based on ID */
    getById(id) {
        try {
            // Search element
            const elementRequested = this.array.find(e => e._id === id);

            // Return element
            if (elementRequested !== undefined) { return [elementRequested]; }
            else { return []; }
        }
        catch (e) {
            throw new Error('📁❌ Error searching in DB ❌📁');
        }
    }

    /* Add element */
    create(data) {
        try {
            // Generate next ID
            let nextID = getNextID(this.array);

            // Add new element
            const newElement = {
                _id: nextID,
                ...data
            }
            this.array.push(newElement);

            return nextID;
        }
        catch (e) {
            throw new Error('📁❌ Error adding to DB ❌📁');
        }
    }

    /* Update based on ID */
    update(id, data) {
        try {
            let modifiedCount = 0;

            // Search and update
            this.array.forEach(e => {
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

            return modifiedCount;
        }
        catch (e) {
            throw new Error('📁❌ Error updating in DB ❌📁');
        }
    }

    /* Delete element based on ID */
    deleteById(id) {
        try {
            let found = this.array.some(e => e._id === id);

            // Delete element if it exists
            if (found) { this.array = this.array.filter(e => e._id !== id); }
            return found;
        }
        catch (e) {
            throw new Error('📁❌ Error deleting from DB ❌📁');
        }
    }
}

// Generate new ID
function getNextID(array) {
    const arrayID = array.map(e => e._id);
    let nextID;
    nextID = Math.max(...arrayID) + 1;
    ((nextID === -Infinity) || (nextID === null)) && (nextID = 1);
    return nextID.toString();
}