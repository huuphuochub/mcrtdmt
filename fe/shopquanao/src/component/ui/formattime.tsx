"use client";
import { useEffect, useState } from "react";

function getTimeRemaining(endTime: string) {
  const total = new Date(endTime).getTime() - new Date().getTime();

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours, minutes, seconds };
}

export default function PromotionTimer({
  start,
  end,
}: {
  start: string;
  end: string;
}) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(end));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(end));
    }, 1000);

    return () => clearInterval(timer);
  }, [end]);

  if (timeLeft.total <= 0) {
    return <p className="text-gray-500">Hết khuyến mãi</p>;
  }

  const formatDayMonth = (time: string) => {
    const date = new Date(time);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  return (
    <div className="bg-yellow-100 p-3 rounded-md text-sm">
      <p>
        Thời gian khuyến mãi:{" "}
        <span className="font-medium">
          {formatDayMonth(start)} - {formatDayMonth(end)}
        </span>
      </p>
      <p className="text-red-600">
        Còn lại:{" "}
        <span className="font-semibold">
          {timeLeft.days} ngày {timeLeft.hours} giờ {timeLeft.minutes} phút{" "}
          {timeLeft.seconds} giây
        </span>
      </p>
    </div>
  );
}
