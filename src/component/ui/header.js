import { FiBell, FiLogOut, FiSearch } from 'react-icons/fi';
import { images } from '../../assets/images';
import { strings } from '../../utils/strings/strings';
import { logout } from '../../services/apiclient/apiClient';

const Header = ({ onSearch }) => {

  return (
    <header className="w-full h-24 relative bg-white overflow-hidden">
      <div className="left-[1300px] top-[29px] absolute inline-flex justify-start items-center gap-4">
        <button aria-label="Notifications" className="relative p-2 bg-gray-200/40 rounded-[11px] flex items-center justify-center h-[45] w-[45]">
          <FiBell size={25} className="text-neutral-800" />
          <span className="absolute top-[8px] right-[10px] w-2.5 h-2.5 bg-red-600 rounded-full border border-white" />
        </button>

        <button onClick={logout} className="p-2 bg-gray-200/40 rounded-[11px] flex items-center gap-2">
          <FiLogOut size={18} className="text-neutral-800" />
          <span className="text-black text-lg font-normal font-['Inter'] tracking-tight">{strings.logoutBtn}</span>
        </button>
      </div>

      <div className="w-[541px] p-2 left-[353px] top-[29px] absolute bg-gray-200/40 rounded-xl inline-flex items-center gap-3">
        <div className="w-[525px] h-8 px-2 flex items-center gap-2">
          <FiSearch size={18} className="text-neutral-400 mr-2" />
          <input
            type="search"
            aria-label="Search"
            placeholder="Search..."
            onChange={(e) => onSearch && onSearch(e.target.value)}
            className="w-full bg-transparent outline-none placeholder:text-neutral-400 text-neutral-700 text-lg"
          />
        </div>
      </div>

      <div className="left-[37px] top-[31px] absolute flex items-center">
        <img src={images.dashboardLogo} alt="Dashboard Logo" className="h-12 w-auto" />
      </div>
    </header>
  );
};

export default Header;
