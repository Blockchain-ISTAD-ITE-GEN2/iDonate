import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();
  console.log("session<>", session);
  console.log("status<>", status);

  const handleSignin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signIn();
  };

  const handleSignout = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signOut();
  };

  return (
    <div className="header mb-3">
      {session ? (
        <a href="#" onClick={handleSignin} className="btn-signin">
          <button className="bg-blue-500 rounded-md p-2">Sign in</button>
        </a>
      ) : (
        <a href="#" onClick={handleSignout} className="btn-signin">
          <button className="bg-blue-500 rounded-md p-2">Sign out</button>
        </a>
      )}
    </div>
  );
}
