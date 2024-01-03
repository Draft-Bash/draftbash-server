# Code Style Standards

## Airbnb Coding Standards

For this project, we are following the coding standards outlined in the Airbnb Coding standard[https://github.com/airbnb/javascript].
These standards cover things like class naming, variable naming, comments, whitespace, and so on.

This standard will be enforced by eslint. If you have the eslint extension installed for VS Code, you should receive intellisense when
you write poorly formatted code.

To access the Prettier format settings, you can check the out the .prettierrc file in the root folder.

Along with the Airbnb code style, we expected some other standards. Files should not be more than 400-500 words long, and methods should be at most 20 lines long (not including whitespace).
Although we uses object-oriented concepts, we believe in certain benefits from functional programming. Data should be immutable and functions should have no side effects.

Only use the 'any' type where it is actually appropriate. If you are uncertain about what type to use, utilize the 'unknown' type.
