import { Button } from "@/components/ui/button";
import { supportModalStore } from "@/store/supportStore";
import { useToastStore } from "@/store/toastStore";
import StatusBadge from "../StatusBadge";
import { SupportStatus } from "../SupportTable";
import { formatDate } from "@/utils/formatDate";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ViewTicket = () => {
  const { showToast } = useToastStore();
  const { closeModal, selectedTicket } = supportModalStore();
  const handleUpdateAdmin = () => {
    try {
      throw Error();
      showToast(
        "success",
        "Ticket Opened Successfully.",
        `Your support ticket ${selectedTicket?.ticket_id} has been opened and is now being reviewed.`
      );
    } catch (error) {
      showToast(
        "error",
        "Failed to Open Ticket.",
        `We couldn’t open ticket ${selectedTicket?.ticket_id} right now. Please try again later.`
      );
      console.log(error);
    } finally {
      closeModal();
    }
  };

  return (
    <section className="flex flex-col gap-[30px] py-[20px] px-[40px]">
      <aside className="flex flex-col gap-[4px] ">
        <h3 className="text-[24px] leading-[36px] font-semibold">
          Ticket Details
        </h3>
        <p className="text-[#65605C] text-[16px] leading-[24px]">
          View full information and progress on this support ticket.
        </p>
      </aside>

      <form className="flex flex-col gap-[44px]">
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[16px]">
            <div className="flex items-center">
              <h4 className="w-[83px] text-[#65605C] text-[1rem] leading-[24px] font-normal">
                Ticket ID
              </h4>
              <p className="text-[#2A2829] text-[1rem] leading-[24px] font-normal">
                #82937
              </p>
            </div>
            <div className="flex items-center">
              <h4 className="w-[83px] text-[#65605C] text-[1rem] leading-[24px] font-normal">
                Name
              </h4>
              <p className="text-[#2A2829] text-[1rem] leading-[24px] font-normal">
                Jane Austen
              </p>
            </div>
            <div className="flex items-center">
              <h4 className="w-[83px] text-[#65605C] text-[1rem] leading-[24px] font-normal">
                Status
              </h4>
              <p className="">
                <StatusBadge status={selectedTicket?.status as SupportStatus} />
              </p>
            </div>
            <div className="flex items-center">
              <h4 className="w-[83px] text-[#65605C] text-[1rem] leading-[24px] font-normal">
                Date
              </h4>
              <p className="text-[#2A2829] text-[1rem] leading-[24px] font-normal">
                {formatDate(selectedTicket?.createdAt as Date)}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-[24px]">
            <div className="flex-1 grid gap-[4px]">
              <Label
                className="text-[1.25rem] font-normal text-[#65605C] leading-[30px]"
                htmlFor="email"
              >
                Subject
              </Label>
              <Input
                type="text"
                id="last_name"
                placeholder="User’s Last Name"
                className="h-[40px] w-full text-[16px] rounded-[12px] border-[#B1B1AE] px-4 outline-none"
              />
            </div>
            <div className="flex-1 grid gap-[4px]">
              <Label
                className="text-[1.25rem] font-normal text-[#65605C] leading-[30px]"
                htmlFor="subject"
              >
                Description
              </Label>
              <Textarea
                id="subject"
                placeholder="Enter subject here"
                className="h-[150px] w-full text-[16px] rounded-[12px] border-[#B1B1AE] px-4 outline-none focus:border-none resize-none"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-[12px] ">
          <Button
            onClick={closeModal}
            className="flex-1  text-[20px] leading-[30px] font-medium border border-[#A2185A] text-[#A2185A] rounded-[16px] bg-white h-[62px] cursor-pointer hover:bg-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdateAdmin}
            className="flex-1  text-[20px] leading-[30px] font-medium  border-none text-[#fff] rounded-[16px] bg-[#A2185A] h-[62px] cursor-pointer hover:bg-[#A2185A]"
          >
            Open Ticket
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ViewTicket;
