// Reference from: https://github.com/bvaughn/react-highlight-words

const findMatchedChunks = ({ text, keywords }) => {
  const chunks = [];
  const textLow = text.toLowerCase();
  // Match at the beginning of each new word
  // New word start after whitespace or - (hyphen)
  const sep = /[-\s]+/;

  // Match at the beginning of each new word
  // New word start after whitespace or - (hyphen)
  const singleTextWords = textLow.split(sep);

  // It could be possible that there are multiple spaces between words
  // Hence we store the index (position) of each single word with text
  let fromIndex = 0;
  const singleTextWordsWithPos = singleTextWords.map((s) => {
    const indexInWord = textLow.indexOf(s, fromIndex);
    fromIndex = indexInWord;
    return {
      word: s,
      index: indexInWord,
    };
  });

  // Add chunks for every searchWord
  keywords.forEach((sw) => {
    const swLow = sw.word.toLowerCase();
    const swColor = sw.color;

    // Do it for every single text word
    singleTextWordsWithPos.forEach((s) => {
      if (s.word.startsWith(swLow)) {
        const start = s.index;
        const end = s.index + swLow.length;
        chunks.push({
          start: start,
          end: end,
          color: swColor,
        });
      }
    });

    // The complete word including whitespace should also be handled, e.g.
    // searchWord='Angela Mer' should be highlighted in 'Angela Merkel'
    // if (textLow.startsWith(swLow)) {
    //   const start = 0;
    //   const end = swLow.length;
    //   chunks.push({
    //     start: start,
    //     end: end,
    //     color: swColor,
    //   });
    // }
  });

  return chunks.sort((a, b) => a.start - b.start);
};

export const findAllChunks = ({ text, keywords }) => {
  const searchedChunks = findMatchedChunks({ text, keywords });

  const ret = [];
  if (searchedChunks[0].start !== 0) {
    ret.push({
      start: 0,
      end: searchedChunks[0].start,
      highlight: false,
    });
  }

  searchedChunks.forEach((ele) => {
    if (ret.length !== 0 && ret[ret.length - 1].end !== ele.start) {
      ret.push({
        start: ret[ret.length - 1].end,
        end: ele.start,
        highlight: false,
      });
    }
    ret.push({
      ...ele,
      highlight: true,
    });
  });

  if (searchedChunks[searchedChunks.length - 1].end !== text.length) {
    ret.push({
      start: searchedChunks[searchedChunks.length - 1].end,
      end: text.length,
      highlight: false,
    });
  }

  return ret;
};
