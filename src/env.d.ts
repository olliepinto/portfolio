/// <reference path="../.astro/types.d.ts" />

interface NetworkInformation {
  saveData?: boolean;
}

interface Navigator {
  connection?: NetworkInformation;
}
