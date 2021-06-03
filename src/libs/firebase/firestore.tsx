import * as firebaseAdmin from "firebase-admin";

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      projectId: process.env.PROJECT_ID,
      privateKey: process.env.PRIVATE_KEY,
      clientEmail: process.env.CLIENT_EMAIL,
    }),
    databaseURL: `https://${process.env.PROJECT_ID}.firebaseio.com`,
  });
}

const firestore = firebaseAdmin.firestore();

export { firestore };
