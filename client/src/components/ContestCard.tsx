import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const ContestCard = ({ contest }) => {
  const [remainingTime, setRemainingTime] = useState<string | undefined>("");
  const user = useUser();
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      const timeDifference = contest.startTimeSeconds - currentTime;
      const hours = Math.floor(timeDifference / 3600);
      const minutes = Math.floor((timeDifference % 3600) / 60);
      const seconds = timeDifference % 60;
      const timeString = `Time Remaining: ${hours}h ${minutes}m ${seconds}s`;
      setRemainingTime(timeString);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [contest.startTimeSeconds]);

  async function remindMe() {
    try {
      //

      console.log(
        "huehue:,",
        user.user?.id,
        user.user?.emailAddresses[0]?.emailAddress,
        user.user?.fullName
      );

      console.log(remainingTime);
      const data = {
        userId: user.user?.id,
        email: user.user?.emailAddresses[0]?.emailAddress,
        name: user.user?.fullName,
        startTime: remainingTime,
        contestName: contest.name,
        contestId: contest.id,
      };

      const createRemindcontest = await axios.post(
        "http://localhost:3030/api/contests",
        data
      );

      console.log(createRemindcontest);
    } catch (error) {
      console.log(`Got a error cannot remind this contests`);
    }
  }

  return (
    <>
      <Card className="w-[300px] h-[250px] bg-transparent mt-10">
        <CardContent>
          <div className="flex flex-col gap-3 pt-5 text-white items-center justify-center">
            {contest.name.length > 12 ? (
              <p>{contest.name}</p>
            ) : (
              <p>{contest.name.slice(0, 4)}...</p>
            )}
            <div className=" flex flex-col justify-end mb-5 items-center">
              <p>{remainingTime}</p>
              <div className=" flex items-center gap-3">
                <Button className="bg-blue-600" size={"sm"}>
                  Register
                </Button>
                <Button
                  className="bg-blue-600"
                  size={"sm"}
                  onClick={() => remindMe(contest.startTime)}
                >
                  Remind me
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ContestCard;
