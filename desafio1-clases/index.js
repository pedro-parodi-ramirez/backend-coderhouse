class User{
    constructor(name, lastName, books, pets){
        this.name = name[0].toUpperCase() + name.slice(1);
        this.lastName = lastName[0].toUpperCase() + lastName.slice(1);;
        this.books = books;
        this.pets = pets;
    }

    getFullName(){
        return `${this.name} ${this.lastName}`;
    }

    addPet(petName){
        this.pets.push(petName[0].toUpperCase() + petName.slice(1));
    }

    countPets(){
        return this.pets.length;
    }

    addBook(name, author){
        this.books.push({name, author});
    }

    getBookNames(){
        let bookNames = [];
        this.books.forEach( b => bookNames.push(b.name) );
        return bookNames;
    }
}

userOne = new User('pedro', 'parodi', [], []);
userOne.addPet('pelusa');
userOne.addPet('nieve');
userOne.addBook('The Lord of the Rings', 'J. R. R. Tolkien');
userOne.addBook('A Song of Ice and Fire', 'George R. R. Martin');
console.log('Full name: ' + userOne.getFullName());
console.log('Pet count: ' + userOne.countPets());
console.log('Book names: ' + userOne.getBookNames());