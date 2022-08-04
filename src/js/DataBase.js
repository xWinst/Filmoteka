import { getDatabase, ref, set, child, get } from 'firebase/database';
class DataBase {
    async readUserData(userId) {
        const dbRef = ref(getDatabase());
        let dataUser;
        try {
            dataUser = await get(child(dbRef, `users/${userId}`));
            if (dataUser.exists()) {
                return dataUser.val();
            }
        } catch (error) {
            console.log(error);
        }
        return null;
    }
    writeUserData(userId, watched, queue) {
        const db = getDatabase();
        set(ref(db, 'users/' + userId), {
            watched: watched,
            queue: queue,
        });
    }
}
export default function getDataBase() {
    return new DataBase();
}
