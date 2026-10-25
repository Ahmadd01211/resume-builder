import Dexie, { type Table } from 'dexie';
import type { Resume } from './resume';
class ClearCvDatabase extends Dexie {
  resumes!: Table<Resume, string>;
  constructor() { super('clearcv-local'); this.version(1).stores({ resumes: 'id, name, updatedAt' }); }
}
export const db = new ClearCvDatabase();
