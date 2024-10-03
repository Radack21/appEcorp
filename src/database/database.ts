import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { appSchema } from '@nozbe/watermelondb';
import { permissionsSchema } from './schemas';
import { PermissionModel } from './model';

const adapter = new SQLiteAdapter({
  schema: appSchema({
    version: 1,
    tables: [
      permissionsSchema
    ],
  }),
});

export const database = new Database({
  adapter,
  modelClasses: [ PermissionModel ],
});
