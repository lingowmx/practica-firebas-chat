import { SearchFormShcema as formSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RoomDb, UserRoom } from "@/schemas/firestore-Schema";

export const FriendsSearch = () => {
  const auth = getAuth();
  const db = getFirestore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      if (auth.currentUser?.email === values.email) {
        form.setError("email", {
          type: "manual",
          message: "You can't add yourself as a friend",
        });   
        return; 
      }
      const q = query(
        collection(db, "users"),
        where("email", "==", values.email)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        form.setError("email", {
          type: "manual",
          message: "User not found",
        });
      }
      const friendsDb = snapshot.docs[0].data();
      const q2 = query(
        collection(db, "users"),
        where("uid", "==", auth.currentUser?.uid),
        where("friends", "array-contains", friendsDb.uid)
      );
      const snapshot2 = await getDocs(q2);
      if (!snapshot2.empty) {
        form.setError("email", {
          type: "manual",
          message: "User already added",
        });
        return;
      }
      
      //encontrar al amigo
      //crear el room
      const newRoomDb: RoomDb = {
        message: [],
        users: [auth.currentUser?.uid, friendsDb.uid],
      };

      const roomRef = await addDoc(collection(db, "rooms"), newRoomDb);
      //agregar los rooms a los usuarios

      console.log(" 1. Room added");
      const currentUserRoom: UserRoom = {
        roomId: roomRef.id,
        lastMessage: "",
        timeStamp: new Date().toISOString(),
        friendUid: friendsDb.uid,
      };
      const friendsRoom: UserRoom = {
        roomId: roomRef.id,
        lastMessage: "",
        timeStamp: new Date().toISOString(),
        friendUid: auth.currentUser!.uid,
      };

      const friendRoomRef = doc(db, "users", friendsDb.uid);
      const currentUserRoomRef = doc(db, "users", auth.currentUser!.uid);
      await updateDoc(friendRoomRef, {
        rooms: arrayUnion(friendsRoom),
        friends: arrayUnion(auth.currentUser!.uid),
      });

      console.log(" 2 . Current user room added");
      await updateDoc(currentUserRoomRef, {
        rooms: arrayUnion(currentUserRoom),
        friends: arrayUnion(friendsDb.uid),
      });
      form.reset()
      console.log(" 3. Friend room added");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter an email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Search friend
        </Button>
      </form>
    </Form>
  );
};
