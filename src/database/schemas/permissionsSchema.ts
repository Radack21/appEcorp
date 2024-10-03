import { tableSchema } from "@nozbe/watermelondb";

export const permissionsSchema = tableSchema({
    name: 'permissions',
    columns: [
        { name: 'view', type: 'string' },  
        { name: 'read', type: 'boolean' }, 
        { name: 'write', type: 'boolean' }, 
        { name: 'edit', type: 'boolean' },  
        { name: 'delete', type: 'boolean' }, 
    ],
});