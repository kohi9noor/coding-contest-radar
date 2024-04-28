import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const ContestCard = ({ contest }) => {
  const [remainingTime, setRemainingTime] = useState<string | undefined>("");

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
              <Button className="bg-blue-600" size={"sm"}>
                Register
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ContestCard;
