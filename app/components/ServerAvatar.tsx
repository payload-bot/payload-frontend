import getServerAvatarNoSrc from "~/utils/getAvatarNoSource";

type ServerAvatarProps = {
  icon: string | null;
  name: string;
};

export default function ServerAvatar({ icon, name }: ServerAvatarProps) {
  return icon ? (
    <img
      className="h-10 w-10 rounded-full object-cover shadow-md shadow-gray-300 ring-inset dark:shadow-slate-900"
      src={icon}
    />
  ) : (
    <div className="flex sm:flex-1">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-500 text-white shadow-md shadow-gray-300 ring-inset dark:bg-slate-800 dark:shadow-slate-900">
        {getServerAvatarNoSrc(name)}
      </div>
    </div>
  );
}
