import { auth, signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function Home() {

  const session = await auth()

  return (
    <div>
      {
        session ?

          <form action={async () => {
            "use server"
            await signOut()
          }}>
            <Button type="submit" >Sign Out</Button>

          </form>
          :

          <form action={async () => {
            "use server"
            await signIn()
          }}>
            <Button type="submit" >SignIn</Button>

          </form>
      }

    </div>
  );
}
