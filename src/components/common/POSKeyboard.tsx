import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

function POSKeyboard({ onKeyPress }: { onKeyPress: (button: string) => void }) {
  return (
    <Keyboard
      layout={{
        default: ["1 2 3", "4 5 6", "7 8 9", ". 0 {bksp}", ],
      }}
      onKeyPress={onKeyPress}
      theme={"hg-theme-default myTheme"}
      buttonTheme={[
        {
          class: "hg-highlight",
          buttons: "{bksp}",
        },
      ]}
    />
  );
}

export default POSKeyboard;
