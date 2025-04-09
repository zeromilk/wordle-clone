import WordleUtils from "@/utils/WordleUtils";
import { useParams } from "next/navigation";

const useOriginWord = () => {
  const params = useParams<{ "encrypt-word": string }>();
  const { ["encrypt-word"]: encryptWord } = params;

  return WordleUtils.decrypt(encryptWord);
};

export default useOriginWord;
