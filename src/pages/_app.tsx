import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import "react-toastify/dist/ReactToastify.css";

import "./legacy_styles.css";

import theme from "../theme";

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      {/* <ColorModeProvider> */}
      <CSSReset />
      <Component {...pageProps} />
      {/* </ColorModeProvider> */}
    </ThemeProvider>
  );
}

export default App;
