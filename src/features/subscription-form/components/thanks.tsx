import iconThankyou from "../../../assets/icon-thank-you.svg";

export default function Thanks() {
  return (
    <div className="flex flex-col lg:pt-10 lg:pb-4 justify-between flex-1 bg-blue-100 lg:justify-center lg:bg-transparent">
      <div className="space-y-8 p-6 py-20 lg:p-0 shadow-xl rounded-xl bg-white lg:shadow-none -mt-20 lg:m-0 mx-6">
        <div className="flex flex-col items-center justify-center flex-1">
          <img src={iconThankyou} alt="" className="mb-8" />

          <h4 className="text-center text-blue-950 font-bold text-4xl mb-2">Thank you!</h4>
          <p className="text-center text-grey-500">
            Thanks for confirming your subscriptions! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com
          </p>
        </div>
      </div>
    </div>
  );
}
