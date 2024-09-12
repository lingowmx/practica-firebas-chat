### Resoources
-[React Icons](https://react-icons.github.io/react-icons/)
=[Emoji picker](https://www.npmjs.com/package/emoji-picker-react)
-[zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)
-[timeago.js](https://github.com/hustcc/timeago.js)

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

### comments
Estuve teniendo mucho problema con los mensajes de los amigos, Lo que en verdad sucedia es que como no tenia mensajes con algunos amigos, me marcaba error. Lo que hice fue crear una verificacion
if (roomData?.messages && Array.isArray(roomData.messages)) {
        setMessages(roomData.messages); // Asigna los mensajes solo si es un array
      } else {
        setMessages([]); // Si no hay mensajes, asignar un array vacío
      }
    });

