import { DBSchema } from '@ngrx/db';
import { environment } from '../environments/environment';
export const schema: DBSchema = {
  version: 1,
  name: environment.schemaName,
  stores: {
    [environment.cartDBName]: {
      autoIncrement: true,
      primaryKey: 'id'
    }
  }
};
