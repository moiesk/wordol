const fetch = require('node-fetch')
const WORD = 'turbo'

// https://www.dictionaryapi.com/api/v3/references/collegiate/json/test?key={DICTIONARY_API_KEY}
const DICTIONARY_API_KEY = process.env.DICTIONARY_API_KEY

module.exports.main = (() => {
  if (!DICTIONARY_API_KEY) {
    return error('internal error, configuration invalid', 500)
  }

  const { wordlist } = require('./words')
  const today = new Date()
  const skew = parseInt(process.env.SKEW) || 7
  const stride = parseInt(process.env.STRIDE) || 41
  const pick = (today.getFullYear() + today.getMonth() + today.getDay() + skew) * stride
  wordOfTheDay = wordlist[pick % wordlist.length]
  console.log(wordOfTheDay)
  return (args) => check(args, wordOfTheDay)
})()

const error = (msg, code) => ({
  statusCode: code || 400,
  body: {
    error: msg
  }
})

const check = async ({ word }, WORD) => {
  console.log(word)

  if (word.length != WORD.length) {
    return error(`guess must be ${WORD.length} characters`, 404)
  }

  word = word.toLowerCase()
  // if the word doesn't match, assert it's a dictionary word
  if (word !== WORD) {
    let matchingWords
    try {
      const wordsRes = await fetch(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${encodeURIComponent(
          word
        )}?key=${encodeURIComponent(DICTIONARY_API_KEY)}`
      )
      matchingWords = await wordsRes.json()
    } catch (err) {
      console.error('api error', err.stack);
      return error('api error', 500)
    }

    if (!matchingWords.length || matchingWords[0].shortdef === undefined) {
      return error('unknown word', 500)
    }
  }

  const lettersToCheck = WORD.split('')
  const letters = word.split('')
  const match = letters.map((letter) => ({
    letter: letter,
    score: 'bad'
  }))
  for (let i = letters.length - 1; i >= 0; i--) {
    if (WORD[i] === letters[i]) {
      match[i].score = 'good'
      lettersToCheck.splice(i, 1)
    }
  }
  letters.forEach((letter, i) => {
    if (lettersToCheck.includes(letter) && match[i].score !== 'good') {
      match[i].score = 'off'
      lettersToCheck.splice(lettersToCheck.indexOf(letter), 1)
    }
  })

  return { body: { match } }
}

if (process.env.TEST) {
  module.exports.main({ word: process.argv[2] }).then(JSON.stringify).then(console.log).catch(console.log)
}
