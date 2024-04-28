import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect } from "react";
import { DataState, errorState, loadingState } from "@/atoms/ContestAtom";
import { useRecoilState } from "recoil";
import axios from "axios";
import ContestCard from "@/components/ContestCard";

const Home = () => {
  const [loading, setloading] = useRecoilState(loadingState);
  const [error, settError] = useRecoilState(errorState);
  const [data, setData] = useRecoilState(DataState);

  console.log(data);
  console.log(error);
  console.log(loading);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      // seting

      const res = await axios.get("https://codeforces.com/api/contest.list");

      const upcomingEvents = res.data.result.filter(
        (contest) => contest.phase === "BEFORE"
      );

      setData(upcomingEvents);
    } catch (error) {
      settError(true);
    } finally {
      setloading(false);
    }
  }

  return (
    <section className="w-screen h-screen bg-slate-900 text-white overflow-x-hidden">
      <header className="flex justify-between items-center py-10 px-10 md:px-20">
        <p className="md:text-2xl text-lg cursor-pointer">Contest Raders</p>

        <div className=" hidden md:flex gap-5 items-center">
          <p className=" cursor-pointer">Contest</p>
          <p className=" cursor-pointer">About us</p>
          <div className="flex items-center">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>

        <div className="md:hidden flex items-center gap-6">
          <Sheet>
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="mt-10 text-center">
                  Code Reders
                </SheetTitle>
              </SheetHeader>
              <div className=" mt-11 flex px-10 flex-col gap-5 text-lg text-black">
                <p className=" cursor-pointer">About us</p>
                <p className=" cursor-pointer">Contest</p>
              </div>
            </SheetContent>
          </Sheet>
          <div className="md:hidden">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>
      <div className=" flex flex-col flex-wrap text-center text-white p-10">
        <h1 className="text-2xl font-medium">
          Welcome to Coding Contest Radar!
        </h1>
        <p className="mt-3">
          Discover and participate in exciting coding contests from top
          platforms.
        </p>

        <p className="text-3xl mt-10 font-semibold text-center px-10">
          Going on Contests
        </p>
        <div className=" flex items-center justify-center mx-auto gap-10 flex-wrap max-w-[1000px] h-full ">
          {loading ? (
            <p>Loading...</p>
          ) : data && data?.length > 0 ? (
            data.map((item) => <ContestCard key={item.id} contest={item} />)
          ) : (
            <p>No contests available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
