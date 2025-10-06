import { Button } from "@/components/ui/button";
import {
  supportModalStore,
  useDeleteTicketMutation,
} from "@/store/supportStore";
import { useToastStore } from "@/store/toastStore";
import Image from "next/image";
import React from "react";
import { BeatLoader } from "react-spinners";

const DeleteTicket = () => {
  const { showToast } = useToastStore();
  const { closeModal, selectedTicket } = supportModalStore();
  const { mutate: deleteTicket, isPending: isLoading } =
    useDeleteTicketMutation();

  const handleUpdateAdmin = () => {
    if (!selectedTicket) {
      showToast(
        "error",
        "No Ticket Selected.",
        "Please select a ticket before performing this action."
      );
      return;
    }
    try {
      deleteTicket(selectedTicket.id);
    } catch (error) {
      showToast(
        "error",
        "Failed to Open Ticket.",
        `We couldn’t open ticket ${selectedTicket?.ticketNumber} right now. Please try again later.`
      );
      console.log(error);
    } finally {
      closeModal();
    }
  };
  // const handleUpdateAdmin = () => {
  //   try {
  //     //   throw Error();
  //     showToast(
  //       "success",
  //       "User Deactivated successfully.",
  //       `s account is now deactivated and access has been restricted.`
  //     );
  //   } catch (error) {
  //     showToast(
  //       "error",
  //       "Failed to Deactivate User.",
  //       `We couldn’t deactivateaccess. Please try again later.`
  //     );
  //     console.log(error);
  //   } finally {
  //     closeModal();
  //   }
  // };
  return (
    <section className="flex flex-col gap-[40px] py-[30px] px-[40px]">
      <div className="flex items-center justify-center flex-col">
        <Image
          src="/support/delete-ticket.svg"
          alt="Deactivate Icon"
          width={240}
          height={240}
        />
      </div>
      <div className="flex flex-col gap-[60px]">
        <div className="flex flex-col gap-[20px]">
          <aside className="flex flex-col gap-[4px] ">
            <h3 className="text-[24px] leading-[36px] font-semibold">
              Delete Support Ticket
            </h3>
            <p className="text-[#65605C] text-[16px] leading-[24px]">
              Once deleted, this ticket will no longer be accessible.
            </p>
          </aside>
          <h3 className="text-[#2A2829] text-[20px] leading-[30px] font-medium">
            Are you sure you want to permanently delete Ticket{" "}
            {selectedTicket?.ticketNumber} ?
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
            disabled={isLoading}
            onClick={handleUpdateAdmin}
            className="flex-1  text-[20px] leading-[30px] font-medium  border-none text-[#fff] rounded-[16px] bg-[#E81313] h-[62px] cursor-pointer hover:bg-[#E81313]"
          >
            {isLoading ? <BeatLoader size={8} color="#fff" /> : "Delete Ticket"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DeleteTicket;
