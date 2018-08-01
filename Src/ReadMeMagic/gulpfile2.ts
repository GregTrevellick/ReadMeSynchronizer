import * as gulp from 'gulp';

gulp.task('typscr2b', () => {
    console.log('Gulp is running!');
});

class Student {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

dummy();
function dummy() {
    let user = new Student("Jane", "M.", "User");
    console.log('Gulp is running!' + greeter(user));
}