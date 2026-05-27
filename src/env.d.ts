/// <reference path="../.astro/types.d.ts" />

interface NetworkInformation {
  saveData?: boolean;
}

interface Navigator {
  connection?: NetworkInformation;
}

declare module "@fontsource/abril-fatface";
declare module "@fontsource/poppins";
