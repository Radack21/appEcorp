import { Q } from "@nozbe/watermelondb";
import { database } from "../database";
import { PermissionModel } from "../model";
import { PermissionType } from "../model/permissionModel";
import { Observable } from "@nozbe/watermelondb/utils/rx";


export const savePermissions = async (permissions: PermissionType) => {
    try {
        await database.write(async () => {
            await database.collections.get<PermissionModel>('permissions').create((permission) => {
                permission.view = permissions.view;
                permission.read = permissions.read;
                permission.write = permissions.write;
                permission.edit = permissions.edit;
                permission.delete = permissions.delete;
            });
        });

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const getPermisionsView = async (ViewName: string) => {
    try {
        const permissions = await database.collections.get<PermissionModel>('permissions').query(
            Q.where('view', ViewName)
        ).fetch();  

        return permissions;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const getAllPermisions = async () => {
    try {
        const permissions = await database.collections.get<PermissionModel>('permissions').query().fetch();
        const permissionsArray = permissions.map((permission) => permission._raw);
        return permissionsArray;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const observePermissions = (): Observable<PermissionModel[]> => {
   return database.collections.get<PermissionModel>('permissions').query().observe();
}