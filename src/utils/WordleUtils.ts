import CryptoJS from "crypto-js";
import { generate } from "random-words";
import { SavedGame, TWordleGame } from "@/stores/wordle-game";

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY as string;

// 단어 암호화 함수
function encryptWordle(word: string = ""): string {
  // 대문자로 통일
  const upperWord = word.toUpperCase();

  // 단어를 WordArray로 변환
  const wordArray = CryptoJS.enc.Utf8.parse(upperWord);
  const keyArray = CryptoJS.enc.Utf8.parse(SECRET_KEY);

  // XOR 연산 수행
  const result = wordArray.clone();
  const words = result.words;
  const keyWords = keyArray.words;

  for (let i = 0; i < words.length; i++) {
    words[i] ^= keyWords[i % keyWords.length];
  }

  // Base64로 인코딩
  return CryptoJS.enc.Base64url.stringify(result);
}

// 단어 복호화 함수
function decryptWordle(encrypted: string): string {
  try {
    // Base64 디코딩
    const wordArray = CryptoJS.enc.Base64url.parse(encrypted);
    const keyArray = CryptoJS.enc.Utf8.parse(SECRET_KEY);

    // XOR 복호화 (XOR은 두 번 적용하면 원래 값으로 돌아옴)
    const result = wordArray.clone();
    const words = result.words;
    const keyWords = keyArray.words;

    for (let i = 0; i < words.length; i++) {
      words[i] ^= keyWords[i % keyWords.length];
    }

    // 결과를 문자열로 변환
    return CryptoJS.enc.Utf8.stringify(result);
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Invalid encrypted word");
  }
}

export type ExtendSavedGame = SavedGame & {
  puzzleId: string;
};

export default class WordleUtils {
  private static readonly GAME_SAVE_KEY = "game-state-wordle";

  static encrypt(toWord: string) {
    return encryptWordle(toWord);
  }

  static decrypt(fromWord: string) {
    return decryptWordle(fromWord);
  }

  static getTutorialWord() {
    return WordleUtils.encrypt("WORLD");
  }

  static getRandomWord() {
    const word = generate({
      minLength: 5,
      maxLength: 5,
    }) as string;

    return WordleUtils.encrypt(word.toUpperCase());
  }

  static saveGame(game: ExtendSavedGame) {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem(WordleUtils.GAME_SAVE_KEY, JSON.stringify(game));
  }

  static readSavedGame(): ExtendSavedGame | null {
    if (typeof window === "undefined") {
      return null;
    }

    return JSON.parse(localStorage.getItem(WordleUtils.GAME_SAVE_KEY) || "{}");
  }
}
