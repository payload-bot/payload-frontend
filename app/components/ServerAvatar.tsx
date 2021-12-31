import getServerAvatarNoSrc from "~/utils/getAvatarNoSource";

type ServerAvatarProps = {
  icon: string | null;
  name: string;
};

export default function ServerAvatar({ icon, name }: ServerAvatarProps) {
  return icon ? (
    <img
      className="rounded-full h-10 w-10 shadow-md shadow-gray-300 ring-inset object-cover"
      src={icon}
    />
  ) : (
    <div className="flex sm:flex-1">
      <div className="rounded-full text-white bg-gray-500 h-10 w-10 shadow-md shadow-gray-300 ring-inset flex items-center justify-center">
        {getServerAvatarNoSrc(name)}
      </div>
    </div>
  );
}
