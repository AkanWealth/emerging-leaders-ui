const userGrowthLabels = {
  "12-months": [
    "Jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ],
  "30-days": [
    "1 jun",
    "2 jun",
    "3 jun",
    "4 jun",
    "5 jun",
    "6 jun",
    "7 jun",
    "8 jun",
    "9 jun",
    "10 jun",
    "11 jun",
    "12 jun",
    "13 jun",
    "14 jun",
    "15 jun",
    "16 jun",
    "17 jun",
    "18 jun",
    "19 jun",
    "20 jun",
    "21 jun",
    "22 jun",
    "23 jun",
    "24 jun",
    "25 jun",
    "26 jun",
    "27 jun",
    "28 jun",
    "29 jun",
    "30 jun",
  ],
  "7-days": [
    "mon 4 jun",
    "tue 5 jun",
    "wed 6 jun",
    "thu 7 jun",
    "fri 8 jun",
    "sat 9 jun",
    "sun 10 jun",
  ],
};

type LabelType = keyof typeof userGrowthLabels;

const EmptyUserGrowthTab = ({ label }: { label: LabelType }) => {
  return (
    <div className="flex flex-col gap-5 p-3 h-[250px]">
      <div className="flex-1 bg-border-gray-300/15 border-t border-t-secondary-600 mt-2" />

      <div className="w-full flex justify-between items-center mt-auto">
        {userGrowthLabels[label].map((label) => (
          <span key={label} className="capitalize">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default EmptyUserGrowthTab;
