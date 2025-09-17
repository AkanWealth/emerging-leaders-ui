import { Button } from "@/components/ui/button";
import { supportModalStore } from "@/store/supportStore";
import { useToastStore } from "@/store/toastStore";
import Image from "next/image";

const CloseTicket = () => {
  const { showToast } = useToastStore();
  const { closeModal,  selectedTicket } =
    supportModalStore();
  const handleUpdateAdmin = () => {
    try {
      //   throw Error();
      showToast(
        "success",
        "User Deactivated successfully.",
        `s account is now deactivated and access has been restricted.`
      );
    } catch (error) {
      showToast(
        "error",
        "Failed to Deactivate User.",
        `We couldn’t deactivateaccess. Please try again later.`
      );
      console.log(error);
    } finally {
      closeModal();
    }
  };

  return (
    <section className="flex flex-col gap-[40px] py-[30px] px-[40px]">
      <div className="flex items-center justify-center flex-col">
        <Image
          src="/support/close-ticket.svg"
          alt="Deactivate Icon"
          width={240}
          height={240}
        />
      </div>
      <div className="flex flex-col gap-[60px]">
        <div className="flex flex-col gap-[20px]">
          <aside className="flex flex-col gap-[4px] ">
            <h3 className="text-[24px] leading-[36px] font-semibold">
              Close Ticket
            </h3>
            <p className="text-[#65605C] text-[16px] leading-[24px]">
              Closing this ticket confirms that the issue has been resolved.
            </p>
          </aside>
          <h3 className="text-[#2A2829] text-[20px] leading-[30px] font-medium">
            Are you sure you want to close ticket ${selectedTicket?.ticket_id} ?
          </h3>
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
            className="flex-1  text-[20px] leading-[30px] font-medium  border-none text-[#fff] rounded-[16px] bg-[#A2185A] h-[62px] cursor-pointer hover:bg-[#E81313]"
          >
            Close Ticket
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CloseTicket;
