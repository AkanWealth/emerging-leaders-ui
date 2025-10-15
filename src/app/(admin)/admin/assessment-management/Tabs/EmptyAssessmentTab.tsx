import Image from "next/image";

const EmptyAssessmentTab = () => {
  return (
    <section className="h-full w-full  flex items-center justify-center">
      <section className="flex justify-center h-[560px] items-center gap-[20px]">
        <div className="flex items-center flex-col justify-center">
          <Image
            src="/user-management/empty.svg"
            alt="Empty List"
            width={346}
            height={229}
          />
          <aside className="flex  flex-col items-center">
            <h3 className="text-[#2A2829] text-[20px] leading-[30px] font-medium">
              No Data here
            </h3>
            <p className="text-[#2A2829] text-[16px] leading-[24px]">
              Data will show up here as soon as it&apos;s available.
            </p>
          </aside>
        </div>
      </section>
    </section>
  );
};

export default EmptyAssessmentTab;
