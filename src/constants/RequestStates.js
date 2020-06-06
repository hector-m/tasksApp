import keyMirror from "keymirror";

export const RequestStates = keyMirror({
  UNATTEMPTED: null,
  REQUESTING: null,
  SUCCEEDED: null,
  FAILED: null,
  FAILED_EXPIRED: null
});

export const requestWasAttempted = state =>
  [
    RequestStates.FAILED,
    RequestStates.FAILED_EXPIRED,
    RequestStates.SUCCEEDED
  ].indexOf(state) >= 0;

export const requestIsRequesting = state => state === RequestStates.REQUESTING;

export const requestSucceeded = state => state === RequestStates.SUCCEEDED;

export const requestFailed = state => state === RequestStates.FAILED;

export const requestFailedExpired = state =>
  state === RequestStates.FAILED_EXPIRED;
