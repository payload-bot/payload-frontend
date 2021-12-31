import getServerAvatarNoSrc from "~/utils/getAvatarNoSource";

type ServerAvatarProps = {
  icon: string | null;
  name: string;
};

export default function ServerAvatar({ icon, name }: ServerAvatarProps) {
  return icon ? (
    <img className="rounded-full bg-transparent h-[40px] w-[40px]" src={icon} />
  ) : (
    <div className="rounded-full text-gray-700 bg-transparent h-[40px] w-[40px] border border-red-500 flex items-center justify-center">
      {getServerAvatarNoSrc(name)}
    </div>
  );
}
