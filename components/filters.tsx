import { UserData } from "@/types";
import { AccountFilter } from "./account-filter";
import { DateFilter } from "./date-filter";

interface FiltersProps {
  user?: UserData | null;
}

const Filters: React.FC<FiltersProps> = ({ user }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-2 items-center">
      <AccountFilter user={user} />
      <DateFilter user={user} />
    </div>
  );
};

export default Filters;
