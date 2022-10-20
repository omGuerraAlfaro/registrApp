/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Scan, Register } from '../interfaces/register';

const ITEMS_KEY = 'my-items';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private storage: Storage) {
  }

  // Create
  addScan(reg: Register): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((regs: Register[]) => {
      if (regs) {
        regs.push(reg);
        return this.storage.set(ITEMS_KEY, regs);
      } else {
        return this.storage.set(ITEMS_KEY, [reg]);
      }
    });
  }

  // Read
  getRegs(): Promise<Register[]> {
    /* this.storage.clear(); */
    return this.storage.get(ITEMS_KEY);
  }

  /* addReg(scan: Scan): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((scans: Scan[]) => {
      if (scans){
        scans.push(scan);
        return this.storage.set(ITEMS_KEY, scans);
      } else {
        return this.storage.set(ITEMS_KEY, [scans]);
      }
    });
  } */

  // Read
  /* getRegs(): Promise<Scan[]> {
    return this.storage.get(ITEMS_KEY);
  } */

  // Wipe Storage
  wipe() {
    this.storage.clear();
  }

  /*   //  Update
    updateReg(register: Register){
      return this.storage.get(ITEMS_KEY).then((registers: Register[]) => {
        if(!registers || registers.length === 0){
          return null;
        }
        const newRegs: Register[] = [];

        for(const i of registers) {
          if(i.id === register.id) {
            newRegs.push(register);
          } else {
            newRegs.push(i);
          }
        }
      });
    }

    // Delete
    deleteItem(id: number): Promise<Register> {
      return this.storage.get(ITEMS_KEY).then((registers: Register[]) => {
        if(!registers || registers.length === 0 ){
          return null;
        }

        const toKeep: Register[] = [];

        for (const i of registers) {
          if(i.id !== id){
            toKeep.push(i);
          }
        }
        return this.storage.set(ITEMS_KEY, toKeep);
      });
    } */
}
