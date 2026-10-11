import {
  CognitoUserPool,
  CognitoUser,
  CognitoUserAttribute,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import { config } from "../config.js";

const userPool = new CognitoUserPool({
  UserPoolId: config.userPoolId,
  ClientId: config.clientId,
});

const makeUser = (email) => new CognitoUser({ Username: email, Pool: userPool });

export function signUp(email, password) {
  const attributes = [new CognitoUserAttribute({ Name: "email", Value: email })];
  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, attributes, [], (err, result) =>
      err ? reject(err) : resolve(result)
    );
  });
}

export function confirmSignUp(email, code) {
  return new Promise((resolve, reject) => {
    makeUser(email).confirmRegistration(code, true, (err, result) =>
      err ? reject(err) : resolve(result)
    );
  });
}

export function resendCode(email) {
  return new Promise((resolve, reject) => {
    makeUser(email).resendConfirmationCode((err, result) =>
      err ? reject(err) : resolve(result)
    );
  });
}

export function signIn(email, password) {
  const details = new AuthenticationDetails({ Username: email, Password: password });
  return new Promise((resolve, reject) => {
    makeUser(email).authenticateUser(details, {
      onSuccess: (session) => resolve(session),
      onFailure: (err) => reject(err),
    });
  });
}

export function signOut() {
  const current = userPool.getCurrentUser();
  if (current) current.signOut();
}

export function getSession() {
  return new Promise((resolve, reject) => {
    const current = userPool.getCurrentUser();
    if (!current) return reject(new Error("No user"));
    current.getSession((err, session) => {
      if (err || !session || !session.isValid()) return reject(err || new Error("Invalid session"));
      resolve(session);
    });
  });
}

export async function getAccessToken() {
  const session = await getSession();
  return session.getAccessToken().getJwtToken();
}