# Quizlet

This module allows you to interact with a subset of the Quizlet API, currently:

- Get users
  - Get a full list of the user's sets
- Get a set
  - Get the creator of that set

More operations will be added.

## Example

```js
const Quizlet = require('quizlet')

const q = new Quizlet({
  clientId: "your client id"
})

const user = await q.user("tjhorner")

console.log(user)

const sets = await user.allSets()

console.log(sets)

const aCoolSet = await q.set(1)

console.log(aCoolSet)

const creator = await aCoolSet.creator()

console.log(creator)

const terms = await aCoolSet.terms()

console.log(terms)
```