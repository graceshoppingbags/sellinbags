'use strict'

const db = require('../server/db')
const { Bags } = require('../server/db/models')

const seedStyle = [
  'Backpack',
  'Messenger',
  'Sling',
]

const seedColor = [
  'Jet Black',
  'Gunmetal',
  'Army',
  'TrueRed',
  'Ink',
  'Aquatic',
  'Golden',
  'Flare',
]

const seedMaterial = [
  'Cordura Canvas',
  'Sailcloth',
  'Matte Poplin',
  'Rain Resist',
]

console.log("SERVER -> SEED")

async function seed() {
  await db.sync({ force: true })
  console.log('seed database sync complete')

  console.log(`seed begin`)

  const total =
    seedStyle.length *
    seedMaterial.length *
    seedColor.length *
    seedColor.length *
    seedColor.length;

  for (let index = 0; index < total; index++) {

    let working = index;

    const indexStripeThreeColor = working % seedColor.length;
    working = Math.floor(working / seedColor.length);

    const indexStripeTwoColor = working % seedColor.length;
    working = Math.floor(working / seedColor.length);

    const indexStripeOneColor = working % seedColor.length;
    working = Math.floor(working / seedColor.length);

    const indexMaterial = working % seedMaterial.length;
    working = Math.floor(working / seedMaterial.length);

    const indexStyle = working % seedStyle.length;
    working = Math.floor(working / seedStyle.length);

    /*
    console.log(`Server -> Seed -> ${index}`);
    console.log(`style:${seedStyle[indexStyle]}`)
    console.log(`material:${seedMaterial[indexMaterial]}`)
    console.log(`stripeOneColor:${seedColor[indexStripeOneColor]}`)
    console.log(`stripeTwoColor:${seedColor[indexStripeTwoColor]}`)
    console.log(`stripeThreeColor:${seedColor[indexStripeThreeColor]}`)
*/

    await Bags.create({
      style: seedStyle[indexStyle],
      material: seedMaterial[indexMaterial],
      stripeOneColor: seedColor[indexStripeOneColor],
      stripeTwoColor: seedColor[indexStripeTwoColor],
      stripeThreeColor: seedColor[indexStripeThreeColor],
    })
  }

  console.log(`seed ${total} items`)
  console.log(`seed end`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
