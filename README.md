# web-01

## Name
Web-01

## Description
1. `npm install` command also generated a package-lock.json file along with package.json. What is the purpose of this file?

This file ensure that on each machine that will run the project, a same packages'versions and their dependencies are installed. This is useful when working with others developpers or  deploying the project to different environments.

2. By convention, all NPM dependencies use a 3-digit format for
version numbers. How do you call this?

It is called semantic versioning. It's indicates the level of changes made in each version of a package. It's helps developers to manage their dependencies in the projects and avoid compatibility issues.

3. What is a devDependency exactly? What are the differences with a
dependency?

It's a package that are required to build, test and deploy the application. it's only used during the developement and not during the production use, whereas the dependency is useful during the whole app's production.  

4. What is a closure/iife ? What was it used for ? What replaced it?

A closure is a function in JavaScript that preserves the outer scope in its inner scope. Is it used to access variables that are in the function's outer lexical scope, even after the outer function has returned. With this feature, developpers can create functions with persistent state and private variables. 
An IIFE (Immediately Invoked Function Expression) is a JavaScript function that is defined and immediately invoked. It is commonly used to create a private scope and prevent naming collisions.
Closures and IIFE have been replaced by modules that provides a standardized way of encapsulating functionality and creating private scopes.

5. What is the difference between import * from './utils' and import
{ parseUrl } from './utils'? What can be the consequences of
using one instead of the other?

import * imports everything form the utils module into a single object, whereas import {parseURL} will import only the parseURL function from the utils module.
The second import is more precise, and allows to avoid naming collisions. In addition to that, using import * can lead to some confusions for the origin of each property and it's purposes because it's all bundled into a single object.

6. Can you think of at least 2 things that are possible with Java
classes, but cannot be done with ES6 classes?
With Java classes, you can specify the access of each class (private,public,protected) to control the properties and methods within the class. And you can overload methods by establishing different parameter lists.

7. What are the differences between var and let;

"var" allows you to declare a variable in the global scope, while "let" and "const" only live in the scopes in which they are declared. "const" allows you to declare a constant whose value cannot be modified.

8. What is the .bind(this) stuff? What happens if you delete it? Is
it needed when using an arrow function ? why ?
It's to ensure that a function is called with the correct value for the keyword this. Whenever you delete it, the value of keyword this can be a value you didn't expected.
It isn't needed when using an arrow function because for an arrow function, the this value within the function is the same as the one outside the arrow function.

9. What does the @ symbol mean in @babel/***?
the @ symbol is used to denote a scoped package name in the context of package managers.

10. What are the advantages of Promises?

It allows to clarify the code, and to wait for the result of the asynchronous function before executing the next function. There is a .then() method to store the returned value and since .then() returns a promise, we can combine promises."

11. What version of ECMAScript async / await was released in ?

It was released in the 2017 version.

12. Component-oriented programming for the web is considered more
maintainable. Why?

It is considered more maintainable because of components reusability, easier control and management of the application, components' encapsulation, easier testing of each components and separation of concerns. With this maintanability, the developer productivity and the web application robustness improve. 

13. What is Functional programming?

It's a way of writing computer programs that focuses on using functions to perform operations on data, instead of relying on changing values in variables.
It leads to a more robust and maintainable code, because programs are more predictable and easier to reason about.

14. Explain what the map() function does ?

map is a function that takes a callback function as argument and returns a new array that contains the results of calling the callback function on each element.

15. Explain what the filter() function does ?

It allow to filter an array. For example, if we have an array [0, 4, 6, 7] and we want a new array with values higher than 5, we could use array.filter(element => element > 5);

16. Explain what the reduce() function does ?

It allow to reduce the an iterable to a single value by applying a function to each element of the iterable.

17. What is the difference between .then() and async/await when
handling asynchronous functions?

The differences are the syntax, the error handling and the control flow. async/await is considered to be more readable an easier to reason.

18. What does the _ prefix mean on a sass file?

It is used to indicate that a file is a partial file. It's a file that can be imported into other sass file with the @import keyword.



## Badges 
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
