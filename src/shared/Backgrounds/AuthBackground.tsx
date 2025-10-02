import Image from "next/image";

const AuthBackground = () => {
  return (
    <section className="bg-[#FFF7E8] w-full h-full ">
      <section className="">
        <Image
          src="/logoOne.png"
          alt="Auth Background"
          width={129}
          height={152}
        />
      </section>
      <section className="flex flex-col items-center justify-center relative">
        <Image
          src="/AuthBg.png"
          alt="Auth Background"
          width={500}
          height={500}
          className="mt-20 z-50"
        />
        <Image
          src="/Vector.png"
          alt="Vector"
          width={502}
          height={490}
          className="absolute -bottom-28  w-[502px] h-[490px]"
        />
      </section>
    </section>
  );
};

export default AuthBackground;
