### Resoources
-[React Icons](https://react-icons.github.io/react-icons/)
=[Emoji picker](https://www.npmjs.com/package/emoji-picker-react)
-[zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)

### Input File
-[Input File](https://github.com/shadcn-ui/ui/discussions/2137)

### Users
-[Random User](https://randomuser.me/api)
-[Random 15 Mex User](https://randomuser.me/api/?results=15&nat=mx)

### Custom scrollbar
-Its already included in tailwind

### tips
Uso de pomise all para traer todos los friends
 '''useEffect(() => {
    const userRef = doc(db, "users", auth.currentUser!.uid);
    const unsubscribe = onSnapshot(userRef, (document) => {
      console.log("current data", document.data()?.rooms);
      const friendPromises = document.data()?.rooms.map(async(rooms:UserRoom) => {
        console.log("room", rooms);
        const friendRef = doc(db, "users", rooms.friendUid)
        return getDoc(friendRef);
      })
      //Uso de Promise.all para esperar a que todos los friends se carguen
      Promise.all(friendPromises).then((friends) => {
        const data = friends.map((friend) => {
          const data = friend.data();
          return {
            uid: data.uid,
            displayName: data.displayName,
            imageURL: data.photoURL,
            lastMessage: data.rooms[0].lastMessage,
          };
        })
        setFriends(data);
      });
    });
    return unsubscribe;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);'''