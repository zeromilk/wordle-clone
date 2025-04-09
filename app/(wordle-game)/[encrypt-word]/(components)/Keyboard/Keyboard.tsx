import { Keyboard as _Keyboard } from "@/ui/inputs/Keyboard";
import { TKey } from "@/ui/inputs/Keyboard/Key";
import BackspaceSVG from "@/images/icon/BackspaceSVG";
import Key from "./Key";
import KeyboardProvider from "./providers";

const KeyboardSet: TKey[][] = [
  [
    { value: "Q", label: "Q" },
    { value: "W", label: "W" },
    { value: "E", label: "E" },
    { value: "R", label: "R" },
    { value: "T", label: "T" },
    { value: "Y", label: "Y" },
    { value: "U", label: "U" },
    { value: "I", label: "I" },
    { value: "O", label: "O" },
    { value: "P", label: "P" },
  ],
  [
    { value: "A", label: "A" },
    { value: "S", label: "S" },
    { value: "D", label: "D" },
    { value: "F", label: "F" },
    { value: "G", label: "G" },
    { value: "H", label: "H" },
    { value: "J", label: "J" },
    { value: "K", label: "K" },
    { value: "L", label: "L" },
  ],
  [
    { value: "Enter", label: "Enter" },
    { value: "Z", label: "Z" },
    { value: "X", label: "X" },
    { value: "C", label: "C" },
    { value: "V", label: "V" },
    { value: "B", label: "B" },
    { value: "N", label: "N" },
    { value: "M", label: "M" },
    { value: "Backspace", label: <BackspaceSVG /> },
  ],
];

const Keyboard = () => {
  return (
    <KeyboardProvider>
      <_Keyboard>
        {KeyboardSet.map((keyset, index) => {
          return (
            <_Keyboard.Row key={index}>
              {keyset.map((key, index) => {
                return <Key key={index} keyObj={key} />;
              })}
            </_Keyboard.Row>
          );
        })}
      </_Keyboard>
    </KeyboardProvider>
  );
};
export default Keyboard;
