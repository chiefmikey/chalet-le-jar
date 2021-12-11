/* eslint-disable unicorn/no-keyword-prefix */

interface GoogleUser {
  getAuthResponse: () => {
    id_token: string;
  };
  getBasicProfile: () => {
    getEmail: () => string;
  };
}

interface StateType {
  loggedIn: boolean;
  token: string;
  statement: string;
  modal: boolean;
  selectedBranch: PreviousElement | undefined;
  allBranches: string[];
  previousSelection: PreviousElement | undefined;
  sure: boolean;
  submitFunction: SubmitFunction;
  pressedButton: PreviousElement | undefined;
}

interface HTMLElement extends EventTarget {
  target: {
    classList: {
      includes: (argument: string) => boolean;
      add: (argument: string) => void;
      remove: (argument: string) => void;
      [Symbol.iterator]: () => IterableIterator<string>;
    };
    id: string;
    textContent: string;
  };
}

interface PreviousElement {
  classList: {
    remove: (argument: string) => void;
    add: (argument: string) => void;
  };
}

type EndType = (command?: string, token?: string) => Promise<void> | void;

type LightOff = (event_: MouseEvent) => void;

type LightUp = (event_: MouseEvent) => void;

type ToggleSure = (
  submitFunction?: SubmitFunction | SubmitRewind,
  event_?: MouseEvent,
  no?: boolean,
) => void;

type ToggleModal = (
  token: string,
  event_: MouseEvent,
  clear: boolean,
) => Promise<void>;

type SubmitFunction = (
  token: string,
  selectedBranch?: PreviousElement,
) => Promise<void> | void;

type SubmitRewind = (token: string, branch: string) => Promise<void>;
