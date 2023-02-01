/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Theme, ThemeConfig } from "@chakra-ui/react";
import {
  extendTheme,
  theme as baseTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export default theme;
