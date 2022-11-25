import { Injectable } from '@nestjs/common';
import { ItemInterface } from './app.controller';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import serviceAccount from '../service.json';

@Injectable()
export class AppService {
  firebase;
  db;

  constructor() {
    this.firebase = initializeApp({
      credential: cert(serviceAccount as any),
    });
    this.db = getFirestore();
  }

  getHello(): string {
    return 'Hello World!';
  }

  async getAllItems() {
    const resultArray = [];
    const querySnapshot = await this.db.collection('Inventory').get();
    querySnapshot.forEach((doc) => {
      resultArray.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    return resultArray;
  }

  async createItem(body) {
    const docRef = await this.db.collection('Inventory').add(body);
    return {
      message: 'successful',
      id: docRef.id,
    };
  }
  async cartItems(body) {
    const docRef = await this.db.collection('AddToCart').add(body);
    return {
      id: docRef.id,
    };
  }
}
