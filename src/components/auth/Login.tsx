import { z } from "zod";
import { LoginFormSchema as formSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { signInWithEmailAndPassword, AuthError } from "firebase/auth";
import { useAuth } from "reactfire";
import { useLoadingStore } from "@/store/LoadingStore";
import { useChatStore } from "@/store/chat-store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "../ui/card";

const Login = () => {
  const auth = useAuth();
  const { resetFriend } = useChatStore();
  const { loading, setIsLoading } = useLoadingStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true); //activar el loading
      await signInWithEmailAndPassword(auth, values.email, values.password);
      resetFriend()
    } catch (error) {
      const firebaseError = error as AuthError;
      if (firebaseError.code === "auth/invalid-login-credentials") {
        form.setError("email", {
          type: "manual",
          message: "Invalid credentials",
        });
        if (firebaseError.code === "auth/invalid-login-credentials") {
          form.setError("password", {
            type: "manual",
            message: "Invalid credentials",
          });
        }
      }
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <div className=" p-8 rounded-sm">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Welcome back!</CardDescription>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="user@firebase.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="*******"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={loading}>
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Login;
