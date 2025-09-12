import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

const leaderboard = [
  {
    ranking: "01",
    name: "Clare Brown",
    projects: 169,
    goals: 803,
    savings: 803,
    budget: 803,
    streak: "400 days",
  },
  {
    ranking: "02",
    name: "Kelvin Tade",
    projects: 138,
    goals: 682,
    savings: 682,
    budget: 682,
    streak: "387 days",
  },
  {
    ranking: "03",
    name: "White Jane",
    projects: 127,
    goals: 492,
    savings: 492,
    budget: 492,
    streak: "266 days",
  },
  {
    ranking: "04",
    name: "Ade shayo",
    projects: 114,
    goals: 302,
    savings: 302,
    budget: 302,
    streak: "118 days",
  },
  {
    ranking: "05",
    name: "Clare Brown",
    projects: 107,
    goals: 295,
    savings: 295,
    budget: 295,
    streak: "93 days",
  },
  {
    ranking: "06",
    name: "Clare Brown",
    projects: 93,
    goals: 110,
    savings: 110,
    budget: 110,
    streak: "62 days",
  },
  {
    ranking: "07",
    name: "Clare Brown",
    projects: 82,
    goals: 94,
    savings: 94,
    budget: 94,
    streak: "53 days",
  },
  {
    ranking: "08",
    name: "Clare Brown",
    projects: 73,
    goals: 82,
    savings: 82,
    budget: 82,
    streak: "49 days",
  },
];

const UserRankingTable = () => {
  const [loading, setLoading] = useState(true);

  // fake loading simulation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section>
      <div className="overflow-x-auto">
        <Table className="table-fixed w-full">
          <colgroup>
            <col style={{ width: "12.5%" }} /> {/* Ranking */}
            <col style={{ width: "25%" }} /> {/* Name (x2) */}
            <col style={{ width: "12.5%" }} /> {/* Projects */}
            <col style={{ width: "12.5%" }} /> {/* Goals */}
            <col style={{ width: "12.5%" }} /> {/* Savings */}
            <col style={{ width: "12.5%" }} /> {/* Budget */}
            <col style={{ width: "12.5%" }} /> {/* Streak */}
          </colgroup>

          <TableHeader>
            <TableRow className="bg-[#F9F9F7] h-[60px]">
              <TableHead className="whitespace-nowrap">Ranking</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="whitespace-nowrap text-center">
                Projects
              </TableHead>
              <TableHead className="whitespace-nowrap text-center">
                Goals
              </TableHead>
              <TableHead className="whitespace-nowrap text-center">
                Savings
              </TableHead>
              <TableHead className="whitespace-nowrap text-center">
                Budget
              </TableHead>
              <TableHead className="whitespace-nowrap text-right">
                Streak
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <TableRow key={i} className="h-[60px]">
                    <TableCell>
                      <Skeleton className="h-4 w-6" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-40" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Skeleton className="h-4 w-10 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Skeleton className="h-4 w-10 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Skeleton className="h-4 w-10 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Skeleton className="h-4 w-10 mx-auto" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-4 w-16 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))
              : leaderboard.map((item) => (
                  <TableRow className="h-[60px]" key={item.ranking}>
                    <TableCell className="font-medium whitespace-nowrap">
                      {item.ranking}
                    </TableCell>
                    <TableCell>
                      <div className="min-w-0">
                        <span className="block truncate">{item.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center whitespace-nowrap">
                      {item.projects}
                    </TableCell>
                    <TableCell className="text-center whitespace-nowrap">
                      {item.goals}
                    </TableCell>
                    <TableCell className="text-center whitespace-nowrap">
                      {item.savings}
                    </TableCell>
                    <TableCell className="text-center whitespace-nowrap">
                      {item.budget}
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      {item.streak}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default UserRankingTable;
