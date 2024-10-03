import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';


export interface PermissionType {
    view: string;
    read: boolean;
    write: boolean;
    edit: boolean;
    delete: boolean;
}

export class PermissionModel extends Model {
  static table = 'permissions';

  @field('view') view!: string;
  @field('read') read!: boolean;
  @field('write') write!: boolean;
  @field('edit') edit!: boolean;
  @field('delete') delete!: boolean;
}
