// Words that are in lots of album titles and only add noise to a search
const IGNORED_WORDS = ['the', 'of', 'and', 'original', 'soundtrack', 'ost']

// Lowercase words without accents or punctuation: "Pokémon Gold & Silver OST" -> ['pokemon', 'gold', 'silver']
export function getWords(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .normalize('NFC') // put back together what the line above left alone, like Japanese ポ
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter((word) => word && !IGNORED_WORDS.includes(word))
}

// How well a title matches the searched words, higher is better
function getScore(titleWords: string[], words: string[]) {
  let score = 0

  for (const word of words) {
    // A whole word ("gold" in "Pokémon Gold") beats the start of a word ("Golden Sun"), which beats the middle of one ("HeartGold")
    if (titleWords.includes(word)) score += 3
    else if (titleWords.some((titleWord) => titleWord.startsWith(word))) score += 2
    else if (titleWords.some((titleWord) => titleWord.includes(word))) score += 1
  }

  // Bonus when the words show up together and in order. The spaces stop "vii" from matching "viii"
  const title = ` ${titleWords.join(' ')} `
  const search = ` ${words.join(' ')} `
  if (title === search) score += 5
  else if (title.startsWith(search)) score += 3
  else if (title.includes(search)) score += 2

  return score
}

// Best matches first. On a tie the shorter title wins, as it's closer to what was searched
export function sortByRelevance<T>(items: T[], words: string[], getTitle: (item: T) => string | null) {
  return items
    .map((item) => {
      const titleWords = getWords(getTitle(item) ?? '')
      return { item, score: getScore(titleWords, words), wordCount: titleWords.length }
    })
    .sort((a, b) => b.score - a.score || a.wordCount - b.wordCount)
    .map(({ item }) => item)
}
