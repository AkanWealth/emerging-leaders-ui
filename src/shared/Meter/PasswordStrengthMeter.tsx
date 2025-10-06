"use client";
import React from "react";

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
}) => {
  const getStrength = (pwd: string) => {
    if (!pwd) return "bad";

    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSymbol = /[^A-Za-z0-9]/.test(pwd);

    let score = 0;

    // check each condition
    if (pwd.length >= 8) score++;
    if (hasLower) score++;
    if (hasUpper) score++;
    if (hasNumber) score++;
    if (hasSymbol) score++;

    if (score >= 5) return "good"; // strong password
    if (score >= 4) return "average"; // medium password
    return "bad"; // weak password
  };

  const strength = getStrength(password);

  const barColors = {
    bad: ["#E81313", "#E5E7EB", "#E5E7EB"], // red + 2 gray
    average: ["#F39200", "#F39200", "#E5E7EB"], // orange + orange + gray
    good: ["#3DA755", "#3DA755", "#3DA755"], // green all
  };

  return (
    <div className="flex gap-2 mt-2">
      {barColors[strength].map((color, i) => (
        <div
          key={i}
          className="h-2 flex-1 rounded-full transition-colors"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default PasswordStrengthMeter;
